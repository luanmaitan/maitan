<script>
    import { slide } from "svelte/transition";

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
            <!-- X Icon -->
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
                ></line></svg
            >
        {:else}
            <!-- Menu Icon -->
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
            <a
                href="/escritorio"
                class="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                on:click={toggle}>escritório</a
            >
            <div class="flex flex-col gap-3">
                <a
                    href="/observatorio"
                    class="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    on:click={toggle}>observatório</a
                >
                {#if typeof window !== "undefined" && window.location.pathname.startsWith("/observatorio")}
                    <div
                        class="flex flex-col gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-1"
                        transition:slide
                    >
                        <a
                            href="/observatorio/livros"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white"
                            on:click={toggle}>livros</a
                        >
                        <a
                            href="/observatorio/filmes"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white"
                            on:click={toggle}>filmes</a
                        >
                        <a
                            href="/observatorio/citacoes"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white"
                            on:click={toggle}>citações</a
                        >
                        <a
                            href="/observatorio/links"
                            class="text-base text-neutral-500 hover:text-black dark:hover:text-white"
                            on:click={toggle}>links</a
                        >
                    </div>
                {/if}
            </div>
            <a
                href="/laboratorio"
                class="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                on:click={toggle}>laboratório</a
            >
            <a
                href="/portfolio"
                class="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                on:click={toggle}>portfólio</a
            >
            <a
                href="/projetos"
                class="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                on:click={toggle}>projetos</a
            >
            <hr class="border-neutral-200 dark:border-neutral-800" />
            <div class="flex flex-col gap-2">
                <a
                    href="/sobre"
                    class="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    on:click={toggle}>sobre</a
                >
                <a
                    href="/colophon"
                    class="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    on:click={toggle}>colophon</a
                >
            </div>
        </div>
    {/if}
</div>
