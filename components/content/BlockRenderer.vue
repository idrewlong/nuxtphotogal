<template>
	<div class="prose lg:prose-xl max-w-none mx-auto">
		<template v-for="block in blocks" :key="block.clientId">
			<component :is="resolveComponent(block.name)" v-bind="block" />
		</template>
	</div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

defineProps({
	blocks: {
		type: Array,
		default: () => [],
	},
});

const componentMap = {
	'core/paragraph': defineAsyncComponent(() => import('./Paragraph.vue')),
	'core/heading': defineAsyncComponent(() => import('./Heading.vue')),
	'core/image': defineAsyncComponent(() => import('./Image.vue')),
	'core/embed': defineAsyncComponent(() => import('./YouTubeEmbed.vue')),
	'core/gallery': defineAsyncComponent(() => import('./Gallery.vue')),
	'core/list': defineAsyncComponent(() => import('./List.vue')),
	// Add other block mappings here
};

const resolveComponent = (blockName) => {
	return componentMap[blockName] || null;
};
</script>
