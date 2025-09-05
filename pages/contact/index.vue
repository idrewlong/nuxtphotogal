<script lang="ts" setup>
useSeoMeta({
	title: 'Contact - Andrew Long | Software Engineer & Film Photographer',
	ogTitle:
		'Get in Touch with Andrew Long - Software Engineer & Film Photographer',
	description:
		'Connect with Andrew Long, a software engineer specializing in full-stack development. Reach out for collaboration, questions about tech, or just to say hello!',
	ogDescription:
		'Looking to collaborate or have questions? Get in touch with Andrew Long, a passionate software engineer focused on creating impactful web solutions.',
	ogImage: '/images/contact-og.png',
});

interface ContactFormResponse {
	success: boolean;
	message?: string;
}

// Form state management
const form = ref({
	name: '',
	email: '',
	message: '',
});

const isSubmitting = ref(false);
const result = ref('');
const status = ref('');

const submitForm = async () => {
	if (isSubmitting.value) return;

	isSubmitting.value = true;
	result.value = 'Sending message...';

	try {
		const response = await $fetch<ContactFormResponse>('/api/contact', {
			method: 'POST',
			body: {
				name: form.value.name,
				email: form.value.email,
				message: form.value.message,
				site: 'idrewfilm.com',
			},
		});

		if (response.success) {
			status.value = 'success';
			result.value = "Thank you for your message! I'll get back to you soon.";

			// Reset form after successful submission
			form.value.name = '';
			form.value.email = '';
			form.value.message = '';
		} else {
			status.value = 'error';
			result.value = 'Something went wrong. Please try again.';
		}
	} catch (error) {
		status.value = 'error';
		result.value = 'Failed to send message. Please try again later.';
	} finally {
		isSubmitting.value = false;

		// Clear result after delay
		setTimeout(() => {
			result.value = '';
			status.value = '';
		}, 5000);
	}
};
</script>

<template>
	<main class="py-24 sm:py-32">
		<section class="max-w-4xl mx-auto px-6 text-center">
			<!-- Header Section -->
			<div class="mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Have a question or want to collaborate? I'd love to hear from you.
				</p>
			</div>

			<!-- Contact Info -->
			<div class="flex justify-center items-center gap-8 mb-12 text-gray-600">
				<a
					href="mailto:idrewlong@gmail.com"
					class="hover:text-black transition-colors"
					>idrewlong@gmail.com</a
				>
				<div class="flex items-center gap-4">
					<a
						href="https://www.instagram.com/idrewfilm/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="hover:text-black transition-colors"
					>
						<Icon name="hugeicons:instagram" size="24" />
					</a>
					<!-- <a
						href="https://linkedin.com/in/yourprofile"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						class="hover:text-black transition-colors"
					>
						<Icon name="mdi:linkedin" class="w-6 h-6" />
					</a> -->
				</div>
			</div>

			<form @submit.prevent="submitForm" class="space-y-6 text-left">
				<div>
					<label for="name" class="sr-only">Name</label>
					<input
						type="text"
						id="name"
						required
						v-model="form.name"
						class="w-full px-4 py-3 bg-transparent border-b border-gray-300 focus:border-gray-900 text-gray-900 focus:outline-none transition-colors"
						placeholder="Your Name"
					/>
				</div>

				<div>
					<label for="email" class="sr-only">Email</label>
					<input
						type="email"
						id="email"
						required
						v-model="form.email"
						class="w-full px-4 py-3 bg-transparent border-b border-gray-300 focus:border-gray-900 text-gray-900 focus:outline-none transition-colors"
						placeholder="Your Email"
					/>
				</div>

				<div>
					<label for="message" class="sr-only">Message</label>
					<textarea
						id="message"
						required
						v-model="form.message"
						rows="5"
						class="w-full px-4 py-3 bg-transparent border-b border-gray-300 focus:border-gray-900 text-gray-900 focus:outline-none transition-colors"
						placeholder="Your Message"
					></textarea>
				</div>

				<!-- Honey Pot -->
				<input
					type="checkbox"
					name="botcheck"
					class="hidden"
					style="display: none"
					tabindex="-1"
					autocomplete="off"
				/>

				<!-- Status Message -->
				<div
					v-if="result"
					:class="[
						'text-center p-4 rounded-lg',
						status === 'success'
							? 'bg-green-100 text-green-700'
							: 'bg-red-100 text-red-700',
					]"
				>
					{{ result }}
				</div>

				<button
					type="submit"
					:disabled="isSubmitting"
					class="w-full px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
				>
					<span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
					<Icon name="heroicons:paper-airplane" class="w-5 h-5" />
				</button>
			</form>
		</section>
	</main>
</template>
