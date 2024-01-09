<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/header/index.svelte';
	import Footer from '$lib/Footer.svelte';
	import PageTransition from '$lib/PageTransition.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="relative flex w-full flex-col bg-zinc-50 dark:bg-black">
	<Header />
	<main class="flex-auto min-h-screen">
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>
	<Footer />
</div>
