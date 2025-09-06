<script setup>
import { ref, watch } from 'vue';
import GetAboutPage from '~/queries/about.gql';
import { useContent } from '~/composables/useContent';

useSeoMeta({
	title: 'About - Andrew Long | Software Engineer & Film Photographer',
	ogTitle: 'About Andrew Long - Software Engineer & Film Photographer',
	description:
		'Learn more about Andrew Long, a software engineer and passionate film photographer who finds the synergy between technology and creative expression.',
	ogDescription:
		'Discover the story behind Andrew Long, a developer and photographer exploring the intersection of code and creativity through the lens of a film camera.',
	ogImage: '/images/about-og.png', // Create this image
});

const { data, pending, error } = await useAsyncQuery(GetAboutPage);
const { processContent } = useContent();

const aboutImage = ref(null);
const aboutText = ref('');
const pageTitle = ref('About');

watch(
	data,
	(newData) => {
		if (newData && newData.page && newData.page.about) {
			const aboutData = newData.page.about;
			aboutImage.value = aboutData.aboutImage?.node;
			aboutText.value = processContent(aboutData.aboutText);
			pageTitle.value = newData.page.title || 'About';
		}
	},
	{ immediate: true }
);
</script>

<template>
	<main class="min-h-screen flex items-center">
		<div
			v-if="pending"
			class="flex items-center justify-center h-screen font-bold text-3xl"
		>
			Loading...
		</div>
		<div
			v-else-if="error"
			class="flex items-center justify-center h-screen font-bold text-3xl text-red-500"
		>
			Error loading page
		</div>
		<section
			v-else
			class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
		>
			<!-- Image Column -->
			<div v-if="aboutImage" class="w-full h-auto">
				<NuxtImg
					:src="aboutImage.sourceUrl"
					:alt="aboutImage.altText"
					class="rounded-lg object-cover w-full h-full"
					sizes="100vw sm:50vw md:400px"
				/>
			</div>

			<!-- Content Column -->
			<div>
				<h1 class="text-4xl font-bold mb-6 text-gray-800">Andrew Long</h1>
				<div class="space-y-4 text-lg text-gray-900" v-html="aboutText"></div>
				<NuxtLink
					to="/contact"
					class="underline underline-offset-4 inline-flex items-center gap-2 text-black transition-colors hover:text-gray-500 mt-6"
					>Contact Me <Icon name="mdi:arrow-right" size="24"
				/></NuxtLink>
			</div>
		</section>
	</main>
</template>

<style scoped></style>
