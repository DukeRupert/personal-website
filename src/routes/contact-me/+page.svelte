<script lang="ts">
	import type { PageData } from './$types';
	import { handleToast } from '$lib/toast/Toaster.svelte';
	import ContactForm from './ContactForm.svelte';

	export let data: PageData;
	$: ({ form } = data);
</script>

<div class="min-h-screen bg-surface-50 dark:bg-surface-900 px-6 py-16 sm:py-24 lg:px-8">
	<ContactForm data={form} on:toast={handleToast} />
</div>