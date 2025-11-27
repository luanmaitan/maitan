<script>
    import { slide } from "svelte/transition";
    import { navigation } from "../lib/navigation"; 

    // Hardcoded counts for now to match layout logic (client-side limitation)
    // Ideally this would be passed from layout props, but keeping it simple for now
    const counts = {
        '/escritorio': '06',
        '/observatorio': '04',
        '/laboratorio': '01',
        '/portfolio': '01',
    };

    let isOpen = false;

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="md:hidden">
    <button
        on:click={toggle}
        class="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
        aria-label="Menu"
    >
        {#if isOpen}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><line x1="18" y1="6" x2="6" y2="18"></line><line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    class="transition-all"
                ></line></svg
            >
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><line x1="3" y1="12" x2="21" y2="12"></line><line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
            >
        {/if}
    </button>

    {#if isOpen}
        <div
            transition:slide={{ duration: 300 }}
            class="absolute top-full left-0 w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg py-4 px-6 flex flex-col gap-4 z-50"
        >
            {#each navigation as item}
                <a
                    href={item.href}
                    class="flex items-center justify-between text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    on:click={toggle}
                >
                    <span class="lowercase">{item.name}</span>
                    <span class="text-sm text-neutral-400 dark:text-neutral-600">{counts[item.href] || '00'}</span>
                </a>
            {/each}
            
            {#if typeof window !== "undefined" && window.location.pathname.startsWith("/observatorio")}
                    <div
                        class="flex flex-col gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-1"
                        transition:slide
                    >
                        <a
                            href="/observatorio/livros"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white lowercase"
                            on:click={toggle}>livros</a
                        >
                        <a
                            href="/observatorio/filmes"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white lowercase"
                            on:click={toggle}>filmes</a
                        >
                         <a
                            href="/observatorio/citacoes"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white lowercase"
                            on:click={toggle}>citações</a
                        >
                        <a
                            href="/observatorio/links"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white lowercase"
                            on:click={toggle}>links</a
                        >
                    </div>
            {/if}

            <hr class="border-neutral-200 dark:border-neutral-800" />
            
            <!-- Expanded Mobile Footer Links -->
            <div class="flex flex-col gap-3">
                 <a
                    href="/colophon"
                    class="text-[15px] font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors lowercase"
                    on:click={toggle}>colophon</a
                >
                <a
                    href="/policy"
                    class="text-[15px] font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors lowercase"
                    on:click={toggle}>políticas</a
                >
                <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    class="text-[15px] font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors lowercase"
                    on:click={toggle}>cc by-nc-sa</a
                >
            </div>
        </div>
    {/if}
</div>
