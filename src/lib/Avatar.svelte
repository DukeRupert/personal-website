<!--
 @component
 An image element with a fallback for representing the user.
 #### Props
 - **src**: string - The URL of the image to display.
 - **alt**: string - The alt text for the image. Defaults to 'Avatar'.
 - **delayMs**: number - The delay in milliseconds before the image is displayed. Defaults to 0.
 - **initials**: string - The initials to display if the image fails to load.
 - **bg**: string - The background color to use for the fallback. Defaults to 'bg-neutral-200'.
 - **large**: boolean - Increase size of avatar to 64px instead of default 40px.
-->

<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';

	export let src: string = '';
	export let alt: string = 'Avatar';
	export let delayMs: number = 0;
	export let initials: string = 'LW';
	export let bg: string = 'bg-neutral-200';
	export let large: boolean = false;

	// Melt Avatar
	// https://www.melt-ui.com/docs/builders/avatar
	const {
		elements: { image, fallback }
	} = createAvatar({
		src: src,
		delayMs: delayMs
	});
</script>

<div class="relative flex {large ? "max-h-16" : "max-h-10"} w-auto items-center justify-center rounded-full {bg}">
	<img class="h-full w-full rounded-full" use:melt={$image} {alt} />
	<span use:melt={$fallback} class="text-3xl font-medium text-gray-500">{initials}</span>
</div>
