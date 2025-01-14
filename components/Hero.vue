<template>
	<section class="relative h-screen w-full">
		<!-- Background Images -->
		<TransitionGroup name="fade">
			<div
				v-for="(image, index) in images"
				:key="image"
				v-show="currentImageIndex === index"
				class="absolute inset-0"
			>
				<img
					:src="`/images/${image}`"
					:alt="`Hero background ${index + 1}`"
					class="w-full h-full object-cover"
				/>
				<!-- Overlay -->
				<div class="absolute inset-0 bg-black/30"></div>
			</div>
		</TransitionGroup>

		<!-- Content -->
		<div class="relative h-full container px-4">
			<div class="absolute bottom-8 left-8 md:bottom-24 md:left-20 text-white">
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
					Capturing Moments in Time
				</h1>
				<p class="text-lg md:text-xl max-w-2xl">
					A collection of film photography exploring the time and space of life
					through my analog perspectives.
				</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = ['windmill.jpg', 'cow.jpg', 'palm.jpg'];
const currentImageIndex = ref(0);
let intervalId = null;

const nextImage = () => {
	currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

onMounted(() => {
	// Change image every 5 seconds
	intervalId = setInterval(nextImage, 5000);
});

onUnmounted(() => {
	if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
