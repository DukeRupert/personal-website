<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition';
	import { quadIn } from 'svelte/easing';

	export let url: string;

	const fadeParams: FadeParams = {
		delay: 0,
		duration: 300,
		easing: quadIn
	};
</script>

{#key url}
	<div class="h-full" in:fade={fadeParams}>
		<slot />
	</div>
{/key}
