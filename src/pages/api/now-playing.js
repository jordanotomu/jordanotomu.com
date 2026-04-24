export const prerender = false;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
    "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
    const {
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REFRESH_TOKEN,
    } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        throw new Error("missing Spotify credentials in env");
    }
    const basic = Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
    });

    if (!res.ok) {
        throw new Error(`token refresh failed: ${res.status}`);
    }
    return res.json();
}

function shape(track, { isPlaying, lastPlayed } = {}) {
    if (!track) return { isPlaying: false };
    return {
        isPlaying: !!isPlaying,
        lastPlayed: !!lastPlayed,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        album: track.album?.name,
        albumArt:
            track.album?.images?.find((i) => i.width <= 300)?.url ||
            track.album?.images?.[0]?.url ||
            null,
        trackUrl: track.external_urls?.spotify || null,
    };
}

function json(body, { status = 200, cache } = {}) {
    const headers = { "Content-Type": "application/json" };
    if (cache) headers["Cache-Control"] = cache;
    return new Response(JSON.stringify(body), { status, headers });
}

export async function GET() {
    try {
        const { access_token } = await getAccessToken();
        const headers = { Authorization: `Bearer ${access_token}` };

        const now = await fetch(NOW_PLAYING_ENDPOINT, { headers });
        if (now.status === 200) {
            const data = await now.json();
            if (data?.is_playing && data?.item?.type === "track") {
                return json(shape(data.item, { isPlaying: true }), {
                    cache: "public, s-maxage=20, stale-while-revalidate=60",
                });
            }
        }

        const recent = await fetch(RECENTLY_PLAYED_ENDPOINT, { headers });
        if (recent.ok) {
            const data = await recent.json();
            const track = data?.items?.[0]?.track;
            if (track) {
                return json(
                    shape(track, { isPlaying: false, lastPlayed: true }),
                    {
                        cache: "public, s-maxage=60, stale-while-revalidate=120",
                    }
                );
            }
        }

        return json({ isPlaying: false });
    } catch (err) {
        console.error("now-playing error:", err);
        return json({ isPlaying: false, error: "unavailable" }, { status: 500 });
    }
}
