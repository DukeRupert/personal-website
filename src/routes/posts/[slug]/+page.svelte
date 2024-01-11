<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';

	export let data: PageData;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>


<article class="max-w-3xl mt-8 sm:mt-16 px-6 lg:px-8 mx-auto">
	<!-- Title -->
	<hgroup>
		<p class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">{formatDate(data.meta.date)}</p>
		<h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">{data.meta.title}</h1>
	</hgroup>

	<!-- Tags -->
	<div class="mt-4 flex space-x-4">
		{#each data.meta.categories as category}
			<span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">&num;{category}</span>
		{/each}
	</div>

	<!-- Post -->
	<div class="prose dark:prose-invert mt-4 lg:mt-12">
		<svelte:component this={data.content} />
	</div>
</article>