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
	twitterCard: 'summary_large_image',
	twitterTitle: 'Contact Andrew Long - Software Engineer',
	twitterDescription:
		'Connect with Andrew Long, a software engineer specializing in full-stack development.',
	twitterImage: '/images/contact-og.png',
	robots: 'index, follow',
	canonical: 'https://idrewlong.com/contact',
});

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
		const response = await $fetch('/api/contact', {
			method: 'POST',
			body: {
				name: form.value.name,
				email: form.value.email,
				message: form.value.message,
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
	<main>
		<!-- Spacer div to push content below fixed header -->
		<div class="h-[100px]"></div>

		<section class="max-w-7xl mx-auto my-8 p-6">
			<div class="max-w-4xl mx-auto">
				<!-- Header Section -->
				<div class="text-center mb-12">
					<h1 class="text-4xl text-gray-50 font-bold mb-4">Let's Connect</h1>
					<p class="text-gray-50 max-w-2xl mx-auto">
						Have a question or want to collaborate? I'm always excited to
						connect with fellow photographers and film enthusiasts.
					</p>
				</div>

				<!-- Contact Card -->
				<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
					<!-- Contact Options -->
					<div class="grid md:grid-cols-2 gap-8 mb-12">
						<div
							class="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
						>
							<Icon
								name="heroicons:envelope"
								class="w-8 h-8 mx-auto mb-4 text-gray-600"
							/>
							<h3 class="font-semibold mb-2">Email</h3>
							<a
								href="mailto:idrewlong@gmail.com"
								class="text-gray-600 hover:text-orange-600 transition-colors"
							>
								idrewlong@gmail.com
							</a>
						</div>
						<div
							class="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
						>
							<Icon
								name="heroicons:chat-bubble-left-right"
								class="w-8 h-8 mx-auto mb-4 text-gray-600"
							/>
							<h3 class="font-semibold mb-2">Social</h3>
							<div class="flex justify-center gap-4">
								<a
									href="https://github.com/idrewlong"
									target="_blank"
									rel="noopener noreferrer"
									class="text-gray-600 hover:text-orange-500 transition-colors"
								>
									<Icon name="mdi:instagram" class="w-6 h-6" />
								</a>
								<a
									href="https://linkedin.com/in/yourprofile"
									target="_blank"
									rel="noopener noreferrer"
									class="text-gray-600 hover:text-orange-500 transition-colors"
								>
									<Icon name="mdi:linkedin" class="w-6 h-6" />
								</a>
							</div>
						</div>
					</div>

					<!-- Contact Form -->
					<form @submit.prevent="submitForm" class="space-y-6">
						<div class="relative">
							<input
								type="text"
								required
								v-model="form.name"
								class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-gray-500 rounded-lg bg-gray-50 text-gray-900 focus:outline-none transition-colors"
								:class="{ 'border-gray-500': form.name }"
								placeholder="Your Name"
							/>
							<label class="sr-only">Name</label>
						</div>

						<div class="relative">
							<input
								type="email"
								required
								v-model="form.email"
								class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-gray-500 rounded-lg bg-gray-50 text-gray-900 focus:outline-none transition-colors"
								:class="{ 'border-gray-500': form.email }"
								placeholder="Your Email"
							/>
							<label class="sr-only">Email</label>
						</div>

						<div class="relative">
							<textarea
								required
								v-model="form.message"
								rows="5"
								class="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-gray-500 rounded-lg bg-gray-50 text-gray-900 focus:outline-none transition-colors"
								:class="{ 'border-gray-500': form.message }"
								placeholder="Your Message"
							></textarea>
							<label class="sr-only">Message</label>
						</div>

						<!-- Honey Pot -->
						<input
							type="checkbox"
							name="botcheck"
							class="hidden"
							style="display: none"
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
							class="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
						>
							<span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
							<Icon name="heroicons:paper-airplane" class="w-5 h-5" />
						</button>
					</form>
				</div>
			</div>
		</section>
	</main>
</template>
