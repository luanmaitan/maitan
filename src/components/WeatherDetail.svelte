<script>
    import { onMount } from "svelte";

    let weatherData = null;
    let loading = true;
    let error = null;

    async function fetchWeather() {
        try {
            // Fetching more data for the detail page: temp, min/max, humidity, wind speed, weather code
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=-23.5475&longitude=-46.6361&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=7"
            );
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            weatherData = data;
        } catch (e) {
            console.error("Error fetching weather:", e);
            error = "Não foi possível carregar os dados do clima.";
        } finally {
            loading = false;
        }
    }

    function getWeatherDescription(code) {
        // WMO Weather interpretation codes (WW)
        const codes = {
            0: "Céu limpo",
            1: "Parcialmente nublado",
            2: "Parcialmente nublado",
            3: "Nublado",
            45: "Nevoeiro",
            48: "Nevoeiro com geada",
            51: "Garoa leve",
            53: "Garoa moderada",
            55: "Garoa densa",
            61: "Chuva leve",
            63: "Chuva moderada",
            65: "Chuva forte",
            80: "Pancadas de chuva leves",
            81: "Pancadas de chuva moderadas",
            82: "Pancadas de chuva violentas",
            95: "Trovoada",
            96: "Trovoada com granizo leve",
            99: "Trovoada com granizo forte",
        };
        return codes[code] || "Clima desconhecido";
    }

    function getDayName(dateStr) {
        const date = new Date(dateStr + 'T12:00:00'); // Force noon to avoid timezone shifts
        return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }

    onMount(() => {
        fetchWeather();
    });
</script>

<div class="w-full max-w-3xl">
    {#if loading}
        <div class="animate-pulse flex flex-col gap-4">
            <div class="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
            <div class="h-32 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
        </div>
    {:else if error}
        <div class="p-4 border border-red-200 bg-red-50 text-red-600 rounded dark:bg-red-900/20 dark:border-red-900 dark:text-red-400">
            {error}
        </div>
    {:else if weatherData}
        <div class="flex flex-col gap-12">
            <!-- Current Status -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-12">
                <div>
                    <div class="text-[100px] leading-none font-medium tracking-tighter text-black dark:text-white mb-2 -ml-1">
                        {Math.round(weatherData.current.temperature_2m)}°
                    </div>
                    <div class="text-xl text-neutral-600 dark:text-neutral-400 lowercase">
                        {getWeatherDescription(weatherData.current.weather_code)}
                    </div>
                </div>
                
                <div class="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400 font-mono w-full md:w-auto">
                    <div class="flex justify-between gap-12 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <span>sensação</span>
                        <span class="text-black dark:text-white">{Math.round(weatherData.current.apparent_temperature)}°C</span>
                    </div>
                    <div class="flex justify-between gap-12 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <span>umidade</span>
                        <span class="text-black dark:text-white">{weatherData.current.relative_humidity_2m}%</span>
                    </div>
                    <div class="flex justify-between gap-12 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <span>vento</span>
                        <span class="text-black dark:text-white">{weatherData.current.wind_speed_10m} km/h</span>
                    </div>
                     <div class="flex justify-between gap-12">
                        <span>min / max</span>
                        <span class="text-black dark:text-white">
                            {Math.round(weatherData.daily.temperature_2m_min[0])}° / {Math.round(weatherData.daily.temperature_2m_max[0])}°
                        </span>
                    </div>
                </div>
            </div>

            <!-- Weekly Forecast -->
            <div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">Próximos Dias</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {#each weatherData.daily.time as day, i}
                        {#if i > 0} <!-- Skip today -->
                            <div class="flex flex-col gap-2 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg text-center">
                                <span class="text-xs font-bold uppercase text-neutral-400 dark:text-neutral-500">{getDayName(day)}</span>
                                <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 mb-2">{formatDate(day)}</span>
                                
                                <div class="text-2xl font-medium text-black dark:text-white tracking-tight my-1">
                                    {Math.round(weatherData.daily.temperature_2m_max[i])}°
                                </div>
                                <div class="text-sm text-neutral-500 dark:text-neutral-400">
                                    {Math.round(weatherData.daily.temperature_2m_min[i])}°
                                </div>
                                
                                {#if weatherData.daily.precipitation_probability_max[i] > 0}
                                    <div class="mt-2 text-[10px] font-mono text-blue-500 dark:text-blue-400 flex items-center justify-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                                        {weatherData.daily.precipitation_probability_max[i]}%
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>

            <!-- Location Info -->
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-500 dark:text-neutral-500 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <p>
                    Dados fornecidos por Open-Meteo. Localização aproximada: São Paulo, Brasil (lat: -23.54, long: -46.63).
                </p>
                <p class="text-right font-mono text-xs">
                    Atualizado às {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                </p>
            </div>
        </div>
    {/if}
</div>
