<template>
	<div v-if="post" class="container mx-auto px-4 py-12 md:py-20">
		<article class="max-w-4xl mx-auto">
			<header class="mb-12 text-center">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
					{{ post.title }}
				</h1>
				<p class="text-md text-gray-500">{{ formatDate(post.date) }}</p>
			</header>

			<div v-if="post.featuredImage" class="mb-12">
				<NuxtImg
					:src="post.featuredImage.node.sourceUrl"
					:alt="post.featuredImage.node.altText || post.title"
					class="w-full h-auto rounded-lg object-cover"
				/>
			</div>

			<ContentRenderer v-if="processedContent" :content="processedContent" />
		</article>
	</div>
	<div v-else-if="pending" class="text-center py-20">
		<p>Loading post...</p>
	</div>
	<div v-else class="text-center py-20">
		<p>Post not found.</p>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import getPost from '~/queries/post.gql';
import { useContent } from '~/composables/useContent';
import ContentRenderer from '~/components/ContentRenderer.vue';

const route = useRoute();
const slug = route.params.slug;

const { data, pending, error } = await useAsyncData(
	`post-${slug}`,
	async () => {
		const { data: result } = await useAsyncQuery(getPost, { slug });
		return result.value;
	}
);

const post = computed(() => data.value?.postBy);

const { parseAndTransform } = useContent();

const processedContent = computed(() => {
	if (post.value?.content) {
		return parseAndTransform(post.value.content);
	}
	return [];
});

const formatDate = (dateString) => {
	if (!dateString) return '';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

// SEO Meta
useSeoMeta({
	title: () => post.value?.title || 'Blog Post',
	description: () =>
		post.value?.excerpt ||
		post.value?.content?.substring(0, 150) ||
		'A journal entry',
	ogTitle: () => post.value?.title || 'Blog Post',
	ogDescription: () =>
		post.value?.excerpt ||
		post.value?.content?.substring(0, 150) ||
		'A journal entry',
	ogImage: () => post.value?.featuredImage?.node?.sourceUrl,
});
</script>
