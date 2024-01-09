<script lang="ts">
	export let href: string = '';
	export let aria_label: string = '';
	export let icon: any;
</script>

<a {href} target="_blank" class="group -m-1 p-1" aria-label={aria_label}>
	<svelte:component
		this={icon}
		class="h-6 w-6 fill-white stroke-zinc-500 transition group-hover:fill-zinc-400 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
	/>
</a>
