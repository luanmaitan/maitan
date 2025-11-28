<script>
    import { onMount } from "svelte";

    let weatherData = null;
    let loading = true;
    let error = null;

    async function fetchWeather() {
        try {
            // Fetching more data for the detail page: temp, min/max, humidity, wind speed, weather code
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=-23.5475&longitude=-46.6361&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FSao_Paulo&forecast_days=1"
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

    onMount(() => {
        fetchWeather();
    });
</script>

<div class="w-full max-w-2xl">
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
        <div class="flex flex-col gap-8">
            <!-- Current Status -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                <div>
                    <div class="text-[80px] leading-none font-medium tracking-tighter text-black dark:text-white mb-2">
                        {Math.round(weatherData.current.temperature_2m)}°
                    </div>
                    <div class="text-xl text-neutral-600 dark:text-neutral-400 lowercase">
                        {getWeatherDescription(weatherData.current.weather_code)}
                    </div>
                </div>
                
                <div class="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                    <div class="flex justify-between gap-8">
                        <span>sensação</span>
                        <span class="text-black dark:text-white">{Math.round(weatherData.current.apparent_temperature)}°C</span>
                    </div>
                    <div class="flex justify-between gap-8">
                        <span>umidade</span>
                        <span class="text-black dark:text-white">{weatherData.current.relative_humidity_2m}%</span>
                    </div>
                    <div class="flex justify-between gap-8">
                        <span>vento</span>
                        <span class="text-black dark:text-white">{weatherData.current.wind_speed_10m} km/h</span>
                    </div>
                     <div class="flex justify-between gap-8">
                        <span>min / max</span>
                        <span class="text-black dark:text-white">
                            {Math.round(weatherData.daily.temperature_2m_min[0])}° / {Math.round(weatherData.daily.temperature_2m_max[0])}°
                        </span>
                    </div>
                </div>
            </div>

            <!-- Location Info -->
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                <p>
                    Dados fornecidos por Open-Meteo. Localização aproximada: São Paulo, Brasil (lat: -23.54, long: -46.63).
                </p>
                <p class="text-right">
                    Atualizado às {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                </p>
            </div>
        </div>
    {/if}
</div>

