<template>
	<component
		:is="`h${attributes.level}`"
		:class="[
			{
				'text-4xl': attributes.level === 1,
				'text-3xl': attributes.level === 2,
				'text-2xl': attributes.level === 3,
				'text-xl': attributes.level === 4,
				'text-lg': attributes.level === 5,
				'text-base': attributes.level === 6,
				'font-bold my-4': true,
				'text-left': attributes.textAlign === 'left',
				'text-center': attributes.textAlign === 'center',
				'text-right': attributes.textAlign === 'right',
			},
		]"
		v-html="attributes.content"
	></component>
</template>

<script setup>
defineProps({
	attributes: {
		type: Object,
		default: () => ({
			level: 1,
			content: '',
			textAlign: 'left',
		}),
	},
});
</script>
