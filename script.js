(() => {
    const root = document.documentElement;
    const KEY = "jotheme";

    function applyTheme(t) {
        if (t === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
    }

    const saved = localStorage.getItem(KEY);
    applyTheme(saved || "dark");

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const next =
                root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(KEY, next);
        });
    }

    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;
            tabs.forEach((t) => t.classList.toggle("active", t === tab));
            panels.forEach((p) => {
                const on = p.dataset.panel === target;
                p.classList.toggle("active", on);
                p.hidden = !on;
            });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href").slice(1);
            if (!id) return;
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();

            const tabBtn = document.querySelector(`.tab[data-tab="${id}"]`);
            if (tabBtn) tabBtn.click();

            const scrollTarget = el.closest(".box") || el;
            scrollTarget.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    /* ---------- NOW PLAYING (Spotify) ---------- */
    const np = document.getElementById("now-playing");
    if (np) {
        const els = {
            art: np.querySelector(".np-art"),
            label: np.querySelector(".np-label-text"),
            title: np.querySelector(".np-title"),
            artist: np.querySelector(".np-artist"),
        };

        const setState = (state, data) => {
            np.setAttribute("data-state", state);
            if (data?.trackUrl) {
                np.setAttribute("href", data.trackUrl);
            } else {
                np.setAttribute("href", "#");
            }
            if (data?.albumArt) {
                np.setAttribute("data-art", "1");
                np.style.setProperty("--art", `url("${data.albumArt}")`);
            } else {
                np.removeAttribute("data-art");
                np.style.removeProperty("--art");
            }
            const labels = {
                playing: "now playing",
                lastplayed: "last played",
                idle: "not playing",
                error: "unavailable",
                loading: "checking...",
            };
            els.label.textContent = labels[state] || "";
            els.title.textContent = data?.title || "—";
            els.artist.textContent = data?.artist || (state === "idle" ? "offline" : "—");
        };

        async function poll() {
            try {
                const r = await fetch("/api/now-playing", { cache: "no-store" });
                if (!r.ok) throw new Error(r.status);
                const data = await r.json();
                if (data.isPlaying) setState("playing", data);
                else if (data.lastPlayed) setState("lastplayed", data);
                else setState("idle");
            } catch {
                setState("error");
            }
        }

        poll();
        setInterval(poll, 30_000);
    }
})();
