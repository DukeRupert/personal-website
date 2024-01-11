<script lang="ts">
	import type { ToastEvent } from '$lib/toast';
	import { contactSchema, type ContactSchema } from './validator';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	export let data: SuperValidated<ContactSchema>;
	export let delayMs = 200;
	export let timeoutMs = 8000;

	const dispatch = createEventDispatcher<ToastEvent>();

	const { form, errors, constraints, delayed, enhance } = superForm(data, {
		onUpdated({ form }) {
			if (form.message) {
				if ($page.status === 400)
					dispatch('toast', {
						type: 'warning',
						title: 'Warning',
						description: form.message
					});
				if ($page.status === 500)
					dispatch('toast', {
						type: 'error',
						title: 'Error',
						description: form.message
					});
			} else {
				dispatch('toast', {
					type: 'success',
					title: 'Success',
					description: 'Success! Your message has been sent.'
				});
			}
		},
		onError({ result }) {
			console.log(result);
			dispatch('toast', {
				type: 'error',
				title: 'Error',
				description: result.error.message
			});
		},
		validators: contactSchema,
		resetForm: false,
		taintedMessage: false,
		delayMs: delayMs,
		timeoutMs: timeoutMs
	});
</script>

<div class="bg-surface-50 dark:bg-surface-900 relative w-full">
	<div class="absolute inset-0">
		<div class="absolute inset-y-0 left-0 w-1/2" />
	</div>
	<div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24 lg:grid lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="mx-auto max-w-2xl">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
				<p class="mt-6 text-xl leading-8 text-gray-600">
					We would be happy to answer any questions you may have or listen if you have a need that
					we may be able to address.
				</p>
				<dl class="mt-8 text-base">
					<div class="mt-6">
						<dt class="sr-only">Postal address</dt>
						<dd class="flex">
							<svg
								class="flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/></svg
							><a href="https://goo.gl/maps/atKvzA6CZgkVAtTP8">
								<span class="anchor ml-3">10609 234th St E, Graham, WA 98838</span>
							</a>
						</dd>
					</div>
					<div class="mt-6">
						<dt class="sr-only">Phone number</dt>
						<dd class="flex">
							<!-- Heroicon name: outline/phone -->
							<svg
								class="h-6 w-6 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/>
							</svg>
							<a href="+12538472223" class="anchor ml-3">253-847-2223</a>
						</dd>
					</div>
				</dl>
			</div>
		</div>
		<div id="contact-us" class="py-16 lg:col-span-3 lg:py-24 xl:pl-12">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<form use:enhance method="POST" class="grid grid-cols-1 gap-y-6">
					<div>
						<label for="first_name" class="sr-only">First Name</label>
						<input
							type="text"
							name="first_name"
							id="first_name"
							autocomplete="given-name"
							class="block w-full rounded-md py-3 px-4"
							placeholder="First"
							required
							aria-invalid={$errors.first_name ? 'true' : undefined}
							bind:value={$form.first_name}
							{...$constraints.first_name}
						/>
						{#if $errors.first_name}
							<div class="mt-2 pointer-events-none">
								{#each $errors.first_name as error}
									<span class="text-error-500">{error}</span>
								{/each}
							</div>
						{/if}
					</div>
					<div>
						<label for="last_name" class="sr-only">Last Name</label>
						<input
							type="text"
							name="last_name"
							id="last_name"
							autocomplete="given-name"
							class="block w-full rounded-md py-3 px-4"
							placeholder="Last"
							required
							aria-invalid={$errors.last_name ? 'true' : undefined}
							bind:value={$form.last_name}
							{...$constraints.last_name}
						/>
						{#if $errors.last_name}
							<div class="mt-2 pointer-events-none">
								{#each $errors.last_name as error}
									<span class="text-error-500">{error}</span>
								{/each}
							</div>
						{/if}
					</div>
					<div class="relative">
						<label for="email" class="sr-only">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							class="block w-full rounded-md py-3 px-4"
							placeholder="Email"
							required
							aria-invalid={$errors.email ? 'true' : undefined}
							bind:value={$form.email}
							{...$constraints.email}
						/>
						{#if $errors.email}
							<div class="mt-2 pointer-events-none">
								{#each $errors.email as error}
									<span class="text-error-500">{error}</span>
								{/each}
							</div>
						{/if}
					</div>
					<div>
						<label for="phone" class="sr-only">Phone</label>
						<input
							type="text"
							name="phone"
							id="phone"
							autocomplete="tel"
							class="block w-full rounded-md py-3 px-4"
							placeholder="Phone"
							aria-invalid={$errors.phone ? 'true' : undefined}
							bind:value={$form.phone}
							{...$constraints.phone}
						/>
						{#if $errors.phone}
							<div class="mt-2 pointer-events-none">
								{#each $errors.phone as error}
									<span class="text-error-500">{error}</span>
								{/each}
							</div>
						{/if}
					</div>
					<div>
						<label for="message" class="sr-only">Message</label>
						<textarea
							id="message"
							name="message"
							rows="4"
							class="block w-full rounded-md py-3 px-4"
							placeholder="Message"
							required
							aria-invalid={$errors.message ? 'true' : undefined}
							bind:value={$form.message}
							{...$constraints.message}
						/>
						{#if $errors.message}
							<div class="mt-2 pointer-events-none">
								{#each $errors.message as error}
									<span class="text-error-500">{error}</span>
								{/each}
							</div>
						{/if}
					</div>
					<div>
						<button type="submit" class="btn variant-filled-primary">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>