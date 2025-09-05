<template>
	<div class="container mx-auto px-4 py-16 md:py-24">
		<h1
			class="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 text-gray-800"
		>
			From the Journal
		</h1>

		<!-- Loading State -->
		<div v-if="pending" class="text-center">
			<p class="text-gray-500">Loading posts...</p>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="text-center text-red-500">
			<p>An error occurred while fetching posts. Please try again later.</p>
		</div>

		<!-- No Posts State -->
		<div v-else-if="posts.length === 0" class="text-center">
			<p class="text-gray-500">No posts found.</p>
		</div>

		<!-- Blog List -->
		<div v-else class="max-w-4xl mx-auto border-t border-gray-200">
			<article
				v-for="(post, index) in posts"
				:key="post.id"
				:ref="(el) => (postRefs[index] = el)"
				class="scroll-animate group"
			>
				<NuxtLink
					:to="`/blog/${post.slug}`"
					class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-8 border-b border-gray-200"
				>
					<div v-if="post.featuredImage" class="overflow-hidden rounded-lg">
						<NuxtImg
							:src="post.featuredImage.node.sourceUrl"
							:alt="post.featuredImage.node.altText || post.title"
							class="w-full h-auto object-cover"
						/>
					</div>
					<div class="md:col-span-2">
						<h2
							class="text-2xl lg:text-3xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300 mb-2"
						>
							{{ post.title }}
						</h2>
						<p class="text-sm text-gray-500">
							{{ formatDate(post.date) }}
						</p>
					</div>
				</NuxtLink>
			</article>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import blogQuery from '~/queries/blog.gql';

// More robust data fetching with useAsyncData
const { data, pending, error } = await useAsyncData(
	'blog-posts',
	async () => {
		try {
			const { data: result } = await useAsyncQuery(blogQuery);
			return result.value;
		} catch (e) {
			console.error('Error fetching blog posts:', e);
			return null;
		}
	},
	{
		lazy: true, // Lazy loading can sometimes help with SSR issues
	}
);

const posts = computed(() => data.value?.posts?.nodes || []);

// Date formatting
const formatDate = (dateString) => {
	if (!dateString) return '';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

// Scroll animations
const postRefs = ref([]);
let observer = null;

onMounted(() => {
	// Ensure refs are populated before observing
	if (postRefs.value.length) {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{
				threshold: 0.1,
			}
		);

		postRefs.value.forEach((post) => {
			if (post) {
				observer.observe(post);
			}
		});
	}
});

onUnmounted(() => {
	if (observer) {
		observer.disconnect();
	}
});

// SEO
useSeoMeta({
	title: 'Blog - My Photography Journal',
	description:
		'A collection of stories, thoughts, and moments captured in time.',
	ogTitle: 'Blog - My Photography Journal',
	ogDescription:
		'A collection of stories, thoughts, and moments captured in time.',
});
</script>

<style scoped>
.scroll-animate {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-animate.is-visible {
	opacity: 1;
	transform: translateY(0);
}

.line-clamp-3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
