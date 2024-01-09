<script lang="ts">
	export let cls: string = '';
	export let stl: string = '';
</script>

<div class="sm:px-8 {cls}" style={stl}>
	<div class="mx-auto w-full max-w-7xl lg:px-8"><slot /></div>
</div>