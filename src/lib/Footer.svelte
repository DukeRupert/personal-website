<script lang="ts">
	import Inner from '$lib/container/Inner.svelte';
	import Outer from '$lib/container/Outer.svelte';

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<footer class="mt-32 flex-none">
	<Outer>
		<div class="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
			<Inner>
				<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<div
						class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200"
					>
						{#each links as { href, label }}
							<a {href} class="transition hover:text-teal-500 dark:hover:text-teal-400">
								{label}
							</a>
						{/each}
					</div>
					<p class="text-sm text-zinc-400 dark:text-zinc-500">
						&copy; {new Date().getFullYear()} Logan Williams. All rights reserved.
					</p>
				</div>
			</Inner>
		</div>
	</Outer>
</footer>
