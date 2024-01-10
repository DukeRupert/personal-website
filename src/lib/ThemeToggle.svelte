<script lang="ts">
	import { SunIcon, MoonIcon } from 'lucide-svelte';
	import { browser } from '$app/environment';
	let darkMode = true;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');

		darkMode ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<button
	type="button"
	id="theme-toggle"
	title="Toggles light & dark"
	aria-label="auto"
	aria-live="polite"
	class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
	on:click={handleSwitchDarkMode}
>
	<MoonIcon
		class="hidden h-6 w-6 fill-zinc-500 stroke-zinc-500 transition duration-100 ease-out dark:block"
	/>
	<SunIcon class="h-6 w-6 fill-zinc-700 transition duration-100 ease-out dark:hidden" />
</button>
