<script lang="ts">
	export let links = [{ label: 'About', href: '/spotlight/about' }];

	// To track what the active page is
	export let path: string;
</script>

<!-- Desktop Navigation -->
<nav class="pointer-events-auto hidden md:block">
	<ul
		class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
	>
		{#each links as { label, href }}
			<li>
				<a
					{href}
					class="relative block px-3 py-2 transition {href === path
						? 'text-teal-500 dark:text-teal-400'
						: 'hover:text-teal-500 dark:hover:text-teal-400'}"
				>
					{label}
					{#if href === path}
						<span
							class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
						/>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>
