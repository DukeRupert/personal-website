<script lang="ts">
	import Inner from './Inner.svelte';
	import Outer from './Outer.svelte';
	export let cls: string = '';
	export let stl: string = '';
</script>

<Outer {cls} {stl}>
	<Inner>
		<slot />
	</Inner>
</Outer>