import type { Actions, PageServerLoad } from './$types';
import { contactSchema } from './validator';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	// Server API:
	const form = await superValidate(contactSchema);

	// Always return { form } in load and form actions.
	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, contactSchema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// Check the honeypot
		if (form.data.password !== '') return message(form, 'Nice try bot', { status: 400 });

		console.log("Validation checks passed")
		// Send email

		// Yep, return { form } here too
		return { form };
	}
};