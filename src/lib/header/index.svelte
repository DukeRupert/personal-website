<script lang="ts">
	// import avatarImage from '../../assets/images/avatar.jpg?enhanced';
	import { page } from '$app/stores';
	import Container from '$lib/container/index.svelte';
	import Avatar from '$lib/Avatar.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import DesktopNavigation from './DesktopNavigation.svelte';
	import MobileNavigation from './MobileNavigation.svelte';
	import { onMount } from 'svelte';

	const links = [
		{ label: 'About', href: '/spotlight/about' },
		{ label: 'Articles', href: '/spotlight/posts' },
		{ label: 'Projects', href: '/spotlight/projects' },
		{ label: 'Speaking', href: '/spotlight/speaking' },
		{ label: 'Uses', href: '/spotlight/uses' }
	];

	// To track what the active page is
	$: path = $page.url.pathname;
	$: isHomePage = path === '/spotlight';

	// Adjust header styles on scroll
	let headerRef: HTMLDivElement;
	let avatarRef: HTMLDivElement;
	let isInitial = { current: true };
	let downDelay = 0;
	let upDelay = 64;

	onMount(() => {
		downDelay = avatarRef?.offsetTop ?? 0;
		upDelay = 64;

		function setProperty(property: string, value: string) {
			document.documentElement.style.setProperty(property, value);
		}

		function removeProperty(property: string) {
			document.documentElement.style.removeProperty(property);
		}

		function updateHeaderStyles() {
			if (!headerRef) {
				return;
			}

			let { top, height } = headerRef.getBoundingClientRect();
			let scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

			if (isInitial.current) {
				setProperty('--header-position', 'sticky');
			}

			setProperty('--content-offset', `${downDelay}px`);

			if (isInitial.current || scrollY < downDelay) {
				setProperty('--header-height', `${downDelay + height}px`);
				setProperty('--header-mb', `${-downDelay}px`);
			} else if (top + height < -upDelay) {
				let offset = Math.max(height, scrollY - upDelay);
				setProperty('--header-height', `${offset}px`);
				setProperty('--header-mb', `${height - offset}px`);
			} else if (top === 0) {
				setProperty('--header-height', `${scrollY + height}px`);
				setProperty('--header-mb', `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
				setProperty('--header-inner-position', 'fixed');
				removeProperty('--header-top');
				removeProperty('--avatar-top');
			} else {
				removeProperty('--header-inner-position');
				setProperty('--header-top', '0px');
				setProperty('--avatar-top', '0px');
			}
		}

		function updateAvatarStyles() {
			if (!isHomePage) {
				return;
			}

			let fromScale = 1;
			let toScale = 36 / 64;
			let fromX = 0;
			let toX = 2 / 16;

			let scrollY = downDelay - window.scrollY;

			let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
			scale = clamp(scale, fromScale, toScale);

			let x = (scrollY * (fromX - toX)) / downDelay + toX;
			x = clamp(x, fromX, toX);

			setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`);

			let borderScale = 1 / (toScale / scale);
			let borderX = (-toX + x) * borderScale;
			let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

			setProperty('--avatar-border-transform', borderTransform);
			setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyles();
			isInitial.current = false;
		}

		updateStyles();
		window.addEventListener('scroll', updateStyles, { passive: true });
		window.addEventListener('resize', updateStyles);

		return () => {
			window.removeEventListener('scroll', updateStyles);
			window.removeEventListener('resize', updateStyles);
		};
	});

	function clamp(number: number, a: number, b: number) {
		let min = Math.min(a, b);
		let max = Math.max(a, b);
		return Math.min(Math.max(number, min), max);
	}
</script>

<header
	class="pointer-events-none relative z-50 flex flex-none flex-col"
	style="height: var(--header-height)', marginBottom: 'var(--header-mb)'"
>
	<div bind:this={headerRef} class="top-0 z-10 h-16 pt-6" style="position: var(--header-position)">
		<Container
			cls="top-[var(--header-top,theme(spacing.6))] w-full"
			stl="position: var(--header-inner-position)"
		>
			<div class="relative flex gap-4">
				<div class="flex flex-1">
					{#if !isHomePage}
						<Avatar initials="LW" src="/favicon.png" />
					{/if}
				</div>
				<div class="flex flex-1 justify-end md:justify-center">
					<MobileNavigation {links} {path} />
					<DesktopNavigation {links} {path} />
				</div>
				<div class="flex justify-end md:flex-1">
					<div class="pointer-events-auto">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</Container>
	</div>
</header>
{#if isHomePage}
	<div class="flex-none" style="height: var(--content-offset)" />
{/if}
