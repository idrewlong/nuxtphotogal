<template>
	<div class="footer-wrapper flex flex-col items-center justify-center">
		<ContentContainer
			as="footer"
			class="flex flex-col justify-center items-center py-5 mt-auto mx-auto"
			:is-fat="isFat"
		>
			<p class="text-sm text-gray-600">
				© {{ year }} Andrew Long. All rights reserved.
			</p>
		</ContentContainer>
	</div>
</template>

<script setup>
const props = defineProps({
	isFat: {
		type: Boolean,
		default: false,
	},
});

const year = new Date().getFullYear();
</script>

<style scoped>
.footer-wrapper {
	width: 100%;
	margin-top: auto;
}
</style>
