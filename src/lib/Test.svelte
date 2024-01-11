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
