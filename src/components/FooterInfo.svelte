<script>
    import { onMount, onDestroy } from "svelte";

    let timeString = "";
    let weatherTemp = "";
    let interval;

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        timeString = `${hours}:${minutes}:${seconds}`;
    }

    async function fetchWeather() {
        try {
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=-23.5475&longitude=-46.6361&current=temperature_2m&timezone=America%2FSao_Paulo",
            );
            const data = await response.json();
            weatherTemp = Math.round(data.current.temperature_2m) + "°C";
        } catch (e) {
            console.error("Error fetching weather:", e);
            weatherTemp = "";
        }
    }

    onMount(() => {
        updateTime();
        fetchWeather();
        interval = setInterval(updateTime, 1000);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<div
    class="flex items-center gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500"
>
    <!-- Clock -->
    <a href="/calendario" class="flex items-center gap-2 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{timeString} GMT-3</span>
    </a>

    <!-- Weather -->
    {#if weatherTemp}
        <div class="flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path
                    d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3s1.3 3 3 3h11c1.7 0 3-1.3 3-3z"
                ></path>
                <path d="M3.5 16a6 6 0 1 1 11.3-2.5"></path>
                <line x1="12" y1="3" x2="12" y2="5"></line>
                <line x1="12" y1="9" x2="12" y2="9.01"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="19.78" y1="4.22" x2="18.36" y2="5.64"></line>
            </svg>
            <span>{weatherTemp}</span>
        </div>
    {/if}
</div>
