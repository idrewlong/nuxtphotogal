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
	color: #78350f; /* amber-900 */
	line-height: 1.7;
}

/* Heading styles with proper spacing */
.content-renderer :deep(h1) {
	font-size: 2.25rem; /* text-4xl */
	font-family: serif;
	font-weight: 700;
	color: #92400e; /* amber-800 */
	border-bottom: 2px solid #d97706; /* amber-600 */
	padding-bottom: 0.75rem;
	margin-top: 3rem;
	margin-bottom: 2rem;
}

.content-renderer :deep(h2) {
	font-size: 1.875rem; /* text-3xl */
	font-family: serif;
	font-weight: 600; /* amber-800 */
	border-bottom: 1px solid #fbbf24; /* amber-400 */
	padding-bottom: 0.5rem;
	margin-top: 3rem;
	margin-bottom: 1.5rem;
}

.content-renderer :deep(h3) {
	font-size: 1.5rem; /* text-2xl */
	font-family: serif;
	font-weight: 600;
	color: #92400e; /* amber-800 */
	margin-top: 2.5rem;
	margin-bottom: 1.25rem;
}

.content-renderer :deep(h4) {
	font-size: 1.25rem; /* text-xl */
	font-family: serif;
	font-weight: 600;
	color: #92400e; /* amber-800 */
	margin-top: 2rem;
	margin-bottom: 1rem;
}

/* Paragraph spacing */
.content-renderer :deep(p) {
	margin-bottom: 2rem;
	text-align: justify;
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
	color: #92400e; /* amber-800 */
	font-weight: 600;
}

.content-renderer :deep(em) {
	font-style: italic;
	color: #a16207; /* amber-700 */
}

/* Links */
.content-renderer :deep(a) {
	color: #dc2626; /* red-600 */
	text-decoration: underline;
	transition: color 0.2s ease;
}

.content-renderer :deep(a:hover) {
	color: #b91c1c; /* red-700 */
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
