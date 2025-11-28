<script>
    import Fuse from "fuse.js";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    export let variant = "desktop"; // "desktop" | "mobile"

    let query = "";
    let results = [];
    let searchIndex = [];
    let fuse;
    let isOpen = false; // For mobile modal
    let inputElement; // Reference to input

    onMount(async () => {
        const response = await fetch("/search.json");
        searchIndex = await response.json();

        fuse = new Fuse(searchIndex, {
            keys: ["title", "description", "category"],
            threshold: 0.4,
            ignoreLocation: true,
        });
    });

    function handleSearch() {
        if (!query) {
            results = [];
            return;
        }
        results = fuse.search(query).map((result) => result.item).slice(0, 5);
    }

    function toggleMobileSearch() {
        isOpen = !isOpen;
        if (isOpen) {
            setTimeout(() => inputElement?.focus(), 100);
        } else {
            query = "";
            results = [];
        }
    }

    function handleKeydown(e) {
        if (e.key === "Escape") {
            if (variant === "mobile") toggleMobileSearch();
            else {
                query = "";
                results = [];
                inputElement?.blur();
            }
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if variant === "desktop"}
    <div class="relative w-full group">
        <div class="relative flex items-center w-full">
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
                class="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 dark:text-neutral-700 pointer-events-none"
            >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
                bind:this={inputElement}
                bind:value={query}
                on:input={handleSearch}
                type="text"
                placeholder="encontrar..."
                class="w-full bg-transparent border-none p-0 pl-6 text-[15px] font-medium placeholder:text-neutral-300 dark:placeholder:text-neutral-700 text-black dark:text-white focus:ring-0 focus:outline-none lowercase tracking-[-0.3px] h-[24px]"
            />
        </div>

        {#if results.length > 0 || (query && results.length === 0)}
            <div
                transition:slide={{ duration: 200 }}
                class="absolute top-full left-0 w-full mt-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm max-h-[300px] overflow-y-auto z-50"
            >
                {#if results.length > 0}
                    <ul class="flex flex-col">
                        {#each results as result}
                            <li>
                                <a
                                    href={result.slug}
                                    class="block px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                                    on:click={() => { query = ""; results = []; }}
                                >
                                    <p class="text-[14px] font-medium text-black dark:text-white lowercase leading-tight mb-0.5">
                                        {result.title}
                                    </p>
                                    <p class="text-[12px] text-neutral-500 leading-tight line-clamp-1">
                                        {result.description}
                                    </p>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <div class="p-4 text-[13px] text-neutral-500 text-center">
                        nenhum resultado encontrado
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{:else}
    <!-- Mobile Variant -->
    <button
        on:click={toggleMobileSearch}
        class="flex items-center justify-center w-8 h-8 text-black dark:text-white hover:opacity-70 transition-opacity"
        aria-label="Buscar"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </button>

    {#if isOpen}
        <div
            transition:fade={{ duration: 150 }}
            class="fixed inset-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm z-[100] p-6 flex flex-col"
        >
            <div class="flex items-center justify-between mb-8">
                <span class="text-sm font-bold uppercase tracking-widest text-neutral-400">Busca</span>
                <button
                    on:click={toggleMobileSearch}
                    class="p-2 -mr-2 text-black dark:text-white hover:opacity-70"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <input
                bind:this={inputElement}
                bind:value={query}
                on:input={handleSearch}
                type="text"
                placeholder="digite para buscar..."
                class="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 pb-4 text-2xl font-medium text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 focus:outline-none focus:border-black dark:focus:border-white transition-colors lowercase"
            />

            <div class="mt-8 flex-1 overflow-y-auto">
                {#if results.length > 0}
                    <ul class="flex flex-col gap-4">
                        {#each results as result}
                            <li>
                                <a
                                    href={result.slug}
                                    class="block group"
                                    on:click={toggleMobileSearch}
                                >
                                    <p class="text-lg font-medium text-black dark:text-white lowercase mb-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                                        {result.title}
                                    </p>
                                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                        {result.description}
                                    </p>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {:else if query}
                    <div class="text-neutral-500 text-center mt-8">
                        nenhum resultado encontrado
                    </div>
                {/if}
            </div>
        </div>
    {/if}
{/if}

