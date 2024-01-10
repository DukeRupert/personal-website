<script lang="ts">
	import { ChevronRightIcon } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
	export let published: boolean = false;
	export let categories: string[] = [];
	export let title: string = 'Card Title';
	export let slug: string = '#';
	export let date: string = '2021-10-10';
	export let description: string =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique quis te';
	$: datetime = formatDate(date);
</script>

<article class="group relative flex flex-col items-start">
	<h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
		<!-- Hover effect on card -->
		<div
			class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-100 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
		/>
		<a href={`/posts/${slug}`}>
			<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
			<span class="relative z-10">{title}</span>
		</a>
	</h2>
	<time
		class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500"
		datetime={date}
	>
		<span aria-hidden="true" class="absolute inset-y-0 left-0 flex items-center">
			<span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
		</span>
		{datetime}
	</time>
	<p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
	<div
		aria-hidden="true"
		class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
	>
		Read article
		<ChevronRightIcon class="ml-1 h-3 w-3" />
	</div>
</article>
