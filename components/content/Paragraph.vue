<template>
	<p
		:class="[
			'text-base leading-relaxed',
			'my-4',
			{
				'text-left': attributes.align === 'left',
				'text-center': attributes.align === 'center',
				'text-right': attributes.align === 'right',
			},
		]"
		v-html="attributes.content"
	></p>
</template>

<script setup>
defineProps({
	attributes: {
		type: Object,
		default: () => ({}),
	},
});
</script>
