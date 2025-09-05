<template>
	<div class="content-renderer">
		<template v-for="(block, index) in content" :key="index">
			<component
				v-if="typeof block === 'object' && block.component"
				:is="componentMap[block.component]"
				v-bind="block.props"
			/>
			<div v-else-if="typeof block === 'string'" v-html="block"></div>
		</template>
	</div>
</template>

<script setup>
import Gallery from '~/components/Gallery.vue';
import YouTubeEmbed from '~/components/YouTubeEmbed.vue';

defineProps({
	content: {
		type: Array,
		required: true,
	},
});

const componentMap = {
	Gallery,
	YouTubeEmbed,
};
</script>

<style scoped>
.content-renderer {
	color: #1f2937; /* gray-800 */
	line-height: 1.7;
	margin: 0 auto;
}

/* Heading styles with proper spacing */
.content-renderer :deep(h1) {
	font-size: 2.25rem; /* text-4xl */
	font-family: serif;
	font-weight: 700;
	color: #000000; /* black */
	border-bottom: 1px solid #e5e7eb; /* gray-200 */
	padding-bottom: 0.75rem;
	margin-top: 3rem;
	margin-bottom: 2rem;
}

.content-renderer :deep(h2) {
	font-size: 1.875rem; /* text-3xl */
	font-family: serif;
	font-weight: 600;
	color: #000000; /* black */
	border-bottom: 1px solid #e5e7eb; /* gray-200 */
	padding-bottom: 0.5rem;
	margin-top: 3rem;
	margin-bottom: 1.5rem;
}

.content-renderer :deep(h3) {
	font-size: 1.5rem; /* text-2xl */
	font-family: serif;
	font-weight: 600;
	color: #000000; /* black */
	margin-top: 2.5rem;
	margin-bottom: 1.25rem;
}

.content-renderer :deep(h4) {
	font-size: 1.25rem; /* text-xl */
	font-family: serif;
	font-weight: 600;
	color: #000000; /* black */
	margin-top: 2rem;
	margin-bottom: 1rem;
}

/* Paragraph spacing */
.content-renderer :deep(p) {
	margin-bottom: 2rem;
	text-align: left;
	font-size: 1.125rem; /* text-lg */
	line-height: 1.8;
}

/* List styling */
.content-renderer :deep(ul),
.content-renderer :deep(ol) {
	margin: 2rem 0;
	padding-left: 2rem;
	font-size: 1.125rem; /* text-lg */
}

.content-renderer :deep(li) {
	margin-bottom: 0.75rem;
	line-height: 1.7;
}

.content-renderer :deep(ul) {
	list-style-type: disc;
}

.content-renderer :deep(ol) {
	list-style-type: decimal;
}

/* Strong and emphasis */
.content-renderer :deep(strong) {
	color: #000000; /* black */
	font-weight: 600;
}

.content-renderer :deep(em) {
	font-style: italic;
	color: #4b5563; /* gray-600 */
}

/* Links */
.content-renderer :deep(a) {
	color: #000000; /* black */
	text-decoration: none;
	border-bottom: 1px solid #9ca3af; /* gray-400 */
	transition: border-color 0.2s ease;
}

.content-renderer :deep(a:hover) {
	border-bottom-color: #000000; /* black */
}

/* First paragraph after heading should have less top margin */
.content-renderer :deep(h1 + p),
.content-renderer :deep(h2 + p),
.content-renderer :deep(h3 + p),
.content-renderer :deep(h4 + p) {
	margin-top: 0;
}

/* Responsive typography */
@media (max-width: 768px) {
	.content-renderer {
		padding: 0 1rem; /* Add some padding on smaller screens */
	}

	.content-renderer :deep(h1) {
		font-size: 1.875rem; /* text-3xl */
	}

	.content-renderer :deep(h2) {
		font-size: 1.5rem; /* text-2xl */
	}

	.content-renderer :deep(h3) {
		font-size: 1.25rem; /* text-xl */
	}

	.content-renderer :deep(p),
	.content-renderer :deep(ul),
	.content-renderer :deep(ol) {
		font-size: 1rem; /* text-base */
	}
}
</style>
