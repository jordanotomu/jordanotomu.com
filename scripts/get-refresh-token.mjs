#!/usr/bin/env node
// One-time helper to obtain a Spotify refresh token.
//
// Prerequisites:
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. In app settings, add redirect URI exactly: http://127.0.0.1:8888/callback
//      (Spotify requires the loopback IP literal, not "localhost".)
//   3. Copy your Client ID and Client Secret
//
// Usage:
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-refresh-token.mjs
//
// Then open the printed URL in a browser, approve access, and the script
// will print your SPOTIFY_REFRESH_TOKEN. Paste it (with the client id/secret)
// into your Vercel project env vars.

import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";

const PORT = 8888;
const HOST = "127.0.0.1";
const REDIRECT_URI = `http://${HOST}:${PORT}/callback`;
const SCOPES = ["user-read-currently-playing", "user-read-recently-played"].join(" ");

const { SPOTIFY_CLIENT_ID: CID, SPOTIFY_CLIENT_SECRET: CSEC } = process.env;

if (!CID || !CSEC) {
    console.error(
        "\n✗ missing env vars.\n\n  usage:\n    SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-refresh-token.mjs\n"
    );
    process.exit(1);
}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", CID);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("scope", SCOPES);

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);

    if (url.pathname !== "/callback") {
        res.writeHead(404);
        res.end("not found");
        return;
    }

    const code = url.searchParams.get("code");
    const err = url.searchParams.get("error");

    if (err) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(`spotify returned error: ${err}`);
        console.error("✗", err);
        server.close();
        process.exit(1);
    }

    if (!code) {
        res.writeHead(400);
        res.end("no code");
        return;
    }

    try {
        const basic = Buffer.from(`${CID}:${CSEC}`).toString("base64");
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
        });
        const data = await tokenRes.json();

        if (!tokenRes.ok || !data.refresh_token) {
            throw new Error(JSON.stringify(data));
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <html>
              <body style="font-family:system-ui;padding:40px;max-width:560px;margin:auto;background:#f3f1e7;color:#1a1a1a">
                <h2 style="font-family:Courier,monospace;font-style:italic">✓ got it.</h2>
                <p>Return to your terminal — the refresh token has been printed there.</p>
                <p>You can close this tab.</p>
              </body>
            </html>
        `);

        console.log("\n─────────────────────────────────────────────");
        console.log("✓ SPOTIFY_REFRESH_TOKEN");
        console.log("─────────────────────────────────────────────");
        console.log(data.refresh_token);
        console.log("─────────────────────────────────────────────");
        console.log("\nAdd the three variables to your Vercel project:");
        console.log("  SPOTIFY_CLIENT_ID=" + CID);
        console.log("  SPOTIFY_CLIENT_SECRET=" + CSEC);
        console.log("  SPOTIFY_REFRESH_TOKEN=<above>");
        console.log("");

        setTimeout(() => {
            server.close();
            process.exit(0);
        }, 300);
    } catch (e) {
        res.writeHead(500);
        res.end("token exchange failed: " + e.message);
        console.error("✗ token exchange failed:", e.message);
        server.close();
        process.exit(1);
    }
});

server.listen(PORT, HOST, () => {
    console.log("\nauthorize this app by opening:\n");
    console.log("  " + authUrl.toString() + "\n");
    console.log("(waiting for redirect to " + REDIRECT_URI + " ...)\n");
    const openCmd =
        process.platform === "darwin"
            ? "open"
            : process.platform === "win32"
            ? "start"
            : "xdg-open";
    exec(`${openCmd} "${authUrl.toString()}"`, () => {});
});
