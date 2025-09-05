<template>
	<figure :class="['my-8', `align${attributes.align}`]">
		<NuxtImg
			:src="attributes.src"
			:alt="attributes.alt"
			class="w-full h-auto"
		/>
		<figcaption
			v-if="attributes.caption"
			class="text-center text-sm text-gray-500 mt-2"
		>
			{{ attributes.caption }}
		</figcaption>
	</figure>
</template>

<script setup>
defineProps({
	attributes: {
		type: Object,
		default: () => ({
			src: '',
			alt: '',
			caption: '',
			align: 'none',
		}),
	},
});
</script>

<style scoped>
.aligncenter {
	display: table;
	margin-left: auto;
	margin-right: auto;
}
.alignleft {
	float: left;
	margin-right: 1.5em;
}
.alignright {
	float: right;
	margin-left: 1.5em;
}
</style>
