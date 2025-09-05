<template>
	<div class="embed-container my-8">
		<iframe
			:src="src"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
</template>

<script setup>
defineProps({
	src: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
.embed-container {
	position: relative;
	overflow: hidden;
	width: 100%;
	padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.embed-container iframe {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
}
</style>
