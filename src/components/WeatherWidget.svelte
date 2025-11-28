<script>
    import { onMount } from "svelte";

    let weatherData = null;
    let loading = true;

    async function fetchWeather() {
        try {
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=-23.5475&longitude=-46.6361&current=temperature_2m,weather_code&timezone=America%2FSao_Paulo"
            );
            const data = await response.json();
            weatherData = data;
        } catch (e) {
            console.error("Error fetching weather widget:", e);
        } finally {
            loading = false;
        }
    }

    function getWeatherDescription(code) {
        const codes = {
            0: "céu limpo",
            1: "nublado", 2: "nublado", 3: "nublado",
            45: "nevoeiro", 48: "nevoeiro",
            51: "garoa", 53: "garoa", 55: "garoa",
            61: "chuva", 63: "chuva", 65: "chuva",
            80: "chuva", 81: "chuva", 82: "chuva",
            95: "trovoada", 96: "trovoada", 99: "trovoada",
        };
        return codes[code] || "clima";
    }

    onMount(() => {
        fetchWeather();
    });
</script>

<div class="w-full">
    <a href="/clima" class="group block w-full bg-neutral-100 dark:bg-neutral-800/50 rounded-lg p-6 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
        {#if loading}
            <div class="h-6 w-24 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse"></div>
        {:else if weatherData}
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400 lowercase mb-1">São Paulo</span>
                    <div class="flex items-baseline gap-3">
                        <span class="text-3xl font-medium text-black dark:text-white tracking-tight">
                            {Math.round(weatherData.current.temperature_2m)}°
                        </span>
                        <span class="text-lg text-neutral-600 dark:text-neutral-300 lowercase">
                            {getWeatherDescription(weatherData.current.weather_code)}
                        </span>
                    </div>
                </div>
                
                <div class="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
            </div>
        {/if}
    </a>
</div>

