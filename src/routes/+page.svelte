<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import Container from '$lib/container/index.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
	import Github from 'lucide-svelte/icons/github';
	import LinkedIn from 'lucide-svelte/icons/linkedin';
	import Twitter from 'lucide-svelte/icons/twitter';
	import Instagram from 'lucide-svelte/icons/instagram';
	// import Photos from '$lib/spotlight/components/Photos.svelte';
	import Post from '$lib/Post.svelte';
	// import Newsletter from '$lib/spotlight/components/Newsletter.svelte';
	// import Resume from '$lib/spotlight/components/Resume.svelte';

	export let data: PageData;

	const title = "Web developer, air traffic controller, and amateur writer."
	const description = " I'm Logan, a freelance web developer chilling in Helena, MT. This cozy space on the web is where I share my thoughts, articles, and projects. My goal? To make the web not just functional but downright lovely, especially for those who might find technology a bit tricky in our fast-paced modern world."
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Container cls="mt-24">
	<div class="max-w-2xl">
		<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
			{title}
		</h1>
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
			{description}
		</p>
		<div class="mt-6 flex gap-6">
			<SocialLink href="https://github.com/DukeRupert/" aria_label="Follow on GitHub" icon={Github} />
		</div>
	</div>
</Container>
<!-- <Photos /> -->
<Container cls="mt-24 md:mt-28">
	<div class="mx-auto grid grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
		<div class="flex flex-col gap-16">
			{#each data.posts as post}
				<Post {...post} />
			{/each}
		</div>
		<!-- <div class="space-y-10 lg:pl-16 xl:pl-24">
			<Newsletter />
			<Resume />
		</div> -->
	</div>
</Container>
