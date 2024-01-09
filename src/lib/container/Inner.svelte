<script lang="ts">
	export let cls: string = '';
</script>

<div class="relative px-4 sm:px-8 lg:px-12 {cls}">
	<div class="mx-auto max-w-2xl lg:max-w-5xl"><slot /></div>
</div>