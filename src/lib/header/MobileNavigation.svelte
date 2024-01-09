<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { X, ChevronDown } from 'lucide-svelte';
	import { quadOut } from 'svelte/easing';

	export let links = [{ label: 'About', href: '/spotlight/about' }];

	// To track what the active page is
	export let path: string;

	// Dialog for Mobile Menu
	// https://www.melt-ui.com/docs/builders/dialog
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<!-- <MobileNavigation -->
<div class="pointer-events-auto md:hidden">
	<button
		use:melt={$trigger}
		class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
	>
		Menu
		<ChevronDown
			class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
		/>
	</button>
</div>
{#if $open}
	<div use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"
			transition:fade={{ duration: 150, easing: quadOut }}
		/>

		<div
			use:melt={$content}
			focus
			class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
			transition:fade={{ duration: 150, easing: quadOut }}
		>
			<div class="flex flex-row-reverse items-center justify-between">
				<button use:melt={$close} aria-label="Close menu" class="-m-1 p-1">
					<X class="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
				</button>
				<h2 use:melt={$title} class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
					Navigation
				</h2>
			</div>
			<nav class="mt-6">
				<ul
					class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
				>
					{#each links as { label, href }}
						<li>
							<a {href} use:melt={$close} class="block py-2">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}
