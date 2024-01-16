---
title: Sveltekit Contact Form
description: Creating effective forms is a critical task to many web development project. This article will describe one method to create a contact form in Sveltekit that provides essential features such as form validation, error handling and user feedback.
date: '01-11-2024'
categories:
  - sveltekit
  - forms
published: true
---

There are a lot of examples out there of how to create a basic form in Svelte. The goal of this article is to demonstrate how to go beyond the basics and create a more practical form that implements input validation, user feedback and error handling. Most of the heavy lifting here will be performed by an amazing package, [Superforms](https://superforms.rocks/). In order to get going you first need to install these dependencies: 

```
pnpm i -D sveltekit-superforms zod
```

Input validation is performed by [Zod](https://zod.dev/). I won't describe how to use Zod. The documentation for that package is very good. Here is a basic validation schema for our contact form: 

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

In order to implement server-side validation and benefit from Superforms magic we first have to pass the Zod object to the [superValidate](https://superforms.rocks/get-started/#initializing-the-form-in-the-load-function) function provied by Superforms inside of the page load function.

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

Now that the backend is providing the enhanced form object we access it in the client-side page and pass it to the ContactForm component as a prop.

> Note. I use typescript in my .svelte components but the lang="ts" has been removed from .svelte script tags to improve markdown formatting.

```svelte
// +page.svelte
<script>
	import ContactForm from './ContactForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ form } = data);
</script>

<ContactForm data={form} />
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

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data, {
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
			required
		/>
	</div>
	<div>
		<label for="message" class="sr-only">Message</label>
		<textarea
			id="message"
			name="message"
			rows="4"
			required
		/>
	</div>
	<div>
		<button type="submit" class="btn variant-filled-primary">Submit</button>
	</div>
</form>
```

For brevity, we will enhance the first input only during the next few steps. First, we have to [bind](https://svelte.dev/docs/element-directives#bind-property) the values of the inputs to the form store. 

```svelte
<div>
	<label for="first_name" class="sr-only">First Name</label>
	<input
		type="text"
		name="first_name"
		id="first_name"
		autocomplete="given-name"
		required
		bind:value={$form.first_name}
	/>
</div>
```

Then spread the constraints store from superForm on the input in order to implement built in browser [constraints](https://superforms.rocks/concepts/client-validation/#constraints). Constraints will work without javascript, which is nice, but are limited in what they can do. 

```svelte
<div>
	<label for="first_name" class="sr-only">First Name</label>
	<input
		type="text"
		name="first_name"
		id="first_name"
		autocomplete="given-name"
		required
		bind:value={$form.first_name}
		{...$constraints.first_name}
	/>
</div>
```

Superforms provides an errors object that we will use to display any validation errors that are returned from zod's form validation. Also, if errors exist we want aria-invalid to be true. Bonus, this should cause the browser to automatically focus on the first error field for a better user experience. 

```svelte
<div>
	<label for="first_name" class="sr-only">First Name</label>
	<input
		type="text"
		name="first_name"
		id="first_name"
		autocomplete="given-name"
		required
		bind:value={$form.first_name}
		{...$constraints.first_name}
		aria-invalid={$errors.first_name ? 'true' : undefined}
	/>
	{#if $errors.first_name}
		<div>
			{#each $errors.first_name as error}
				<span>{error}</span>
			{/each}
		</div>
	{/if}
</div>
```

Lost yet? Let's recap. We bound the form input to the Superforms $form store, applied built-in browser validation via the $constraints store, displayed any errors returned by the Zod validation object we passed into Superforms and set the aria-invalid attribute to be true if any errors exist. Apply this pattern to each input in the form and voila! Input validation and error handling are implemented. Now it's time to handle the data and provide feedback to the user (ie. indicate success or error states). 

