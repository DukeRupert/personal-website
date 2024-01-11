---
title: Sveltekit Contact Form
description: Creating effective forms is a critical task to many web development project. This article will describe one method to create a contact form in Sveltekit that provides essential features such as form validation, error handling and user feedback.
date: '01-11-2024'
categories:
  - sveltekit
  - forms
published: true
---

Most of the heavy lifting here will be performed by an amazing package, [Superforms](https://superforms.rocks/). In order to get going you first need to install these dependencies: 

```
pnpm i -D sveltekit-superforms zod
```

Input validation is accomplished by [Zod](https://zod.dev/). Here is a basic validation schema for our contact form: 

```ts
// validator.ts
import { z } from 'zod';

export const contactSchema = z.object({
	first_name: z.string().max(30),
	last_name: z.string().max(30),
	email: z.string().email(),
	message: z.string().max(1500)
});

export type ContactSchema = typeof contactSchema;
```

Now it is time to set up our load function. Per the Superforms [installation instructions](https://superforms.rocks/get-started/#initializing-the-form-in-the-load-function) we will initialize the form in the load function.

```ts
// +page.server.ts
import type { PageServerLoad } from './$types';
import { contactSchema } from '$lib/validators';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
	// Server API:
	const form = await superValidate(contactSchema);

	// Always return { form } in load and form actions.
	return {
		form
	};
};
```

Now we can access the validation data in our front end page and pass it into our form component.
> Note. I use typescript in my .svelte components but the lang="ts" has been removed from .svelte script tags to improve formatting.

```svelte
// +page.svelte
<script>
	import ContactForm from './ContactForm.svelte';
	import { handleToast } from '$lib/toast/Toaster.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ form } = data);
</script>

<div class="min-h-screen bg-surface-50 px-6 py-16 sm:py-24 lg:px-8">
	<ContactForm data={form} />
</div>
```

Now we can start to enhance the form with Superforms magic.
> Note: Client-side validation is achieved by passing the Zod object contactSchema to the superform function. The type ContactSchema is passed to SuperValidated in order to type the server-side validation performed in the load function.

```svelte
// ContactForm.svelte
<script>
	import { contactSchema, type ContactSchema } from './validator';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: SuperValidated<ContactSchema>;

	const { form, errors, constraints, delayed, enhance } = superForm(data, {
		validators: contactSchema,
	});
</script>

<form method="POST" class="grid grid-cols-1 gap-y-6">
	<div>
		<label for="first_name" class="sr-only">First Name</label>
		<input
			type="text"
			name="first_name"
			id="first_name"
			autocomplete="given-name"
			class="block w-full rounded-md px-4 py-3"
			required
		/>
	</div>
	<div>
		<label for="last_name" class="sr-only">Last Name</label>
		<input
			type="text"
			name="last_name"
			id="last_name"
			autocomplete="given-name"
			class="block w-full rounded-md px-4 py-3"
			placeholder="Last"
			required
		/>
	</div>
	<div class="relative">
		<label for="email" class="sr-only">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			class="block w-full rounded-md px-4 py-3"
			required
		/>
	</div>
	<div>
		<label for="message" class="sr-only">Message</label>
		<textarea
			id="message"
			name="message"
			rows="4"
			class="block w-full rounded-md px-4 py-3"
			required
		/>
	</div>
	<div>
		<button type="submit" class="btn variant-filled-primary">Submit</button>
	</div>
</form>
```