<template>
	<div
		v-if="modelValue"
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
	>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-black/75 transition-opacity"
			@click="closeModal"
		></div>

		<!-- Modal Content -->
		<div class="relative z-10 max-w-4xl w-full mx-auto">
			<div class="relative">
				<!-- Info button -->
				<div class="info-button absolute top-4 left-4 z-20">
					<div class="relative">
						<!-- Info Button -->
						<button
							class="bg-gray-800/50 hover:bg-gray-800/75 rounded-full p-2 transition-colors"
						>
							<svg
								class="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>

						<!-- Info Panel -->
						<div
							class="info-panel absolute left-full ml-2 top-0 opacity-0 pointer-events-none"
						>
							<div class="bg-white rounded-lg shadow-lg p-4 min-w-[250px]">
								<h2 class="text-xl font-bold text-black mb-2">
									{{ photo.title }}
								</h2>
								<p class="mb-1">
									<span class="font-semibold">Location:</span>
									{{ photo.location }}
								</p>
								<p class="mb-1">
									<span class="font-semibold">Film:</span> {{ photo.filmType }}
								</p>
								<p>
									<span class="font-semibold">Views:</span> {{ photo.views }}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Navigation Arrows -->
				<!-- <button
					@click.stop="previousImage"
					class="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/75 rounded-full w-12 h-12 flex items-center justify-center transition-colors text-white transform hover:scale-105 focus:outline-none"
					aria-label="Previous image"
				>
					<Icon name="heroicons:chevron-left" class="w-8 h-8" />
				</button>

				<button
					@click.stop="nextImage"
					class="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/75 rounded-full w-12 h-12 flex items-center justify-center transition-colors text-white transform hover:scale-105 focus:outline-none"
					aria-label="Next image"
				>
					<Icon name="heroicons:chevron-right" class="w-8 h-8" />
				</button> -->

				<!-- Close button -->
				<button
					class="absolute top-4 right-4 z-20 bg-gray-800/50 hover:bg-gray-800/75 rounded-full p-2 transition-colors"
					@click.stop="closeModal"
				>
					<svg
						class="w-6 h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<!-- Main Image Container -->
				<div class="relative w-full">
					<div class="relative">
						<img
							:src="currentPhoto.url"
							:alt="currentPhoto.title"
							class="w-full h-auto max-h-[80vh] object-contain rounded-lg transition-all duration-300"
							:class="{ 'opacity-0': isTransitioning }"
							@load="handleImageLoad"
						/>
					</div>
				</div>

				<!-- Preload adjacent images -->
				<div class="hidden">
					<img v-for="url in preloadUrls" :key="url" :src="url" alt="preload" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
const { mockPhotos } = usePhotos();

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
	photo: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(['update:modelValue']);
const isTransitioning = ref(false);
const currentIndex = ref(mockPhotos.findIndex((p) => p.id === props.photo.id));
const currentPhoto = computed(() => mockPhotos[currentIndex.value]);

// Compute URLs for preloading
const preloadUrls = computed(() => {
	const nextIndex = (currentIndex.value + 1) % mockPhotos.length;
	const prevIndex =
		currentIndex.value <= 0 ? mockPhotos.length - 1 : currentIndex.value - 1;
	return [mockPhotos[nextIndex].url, mockPhotos[prevIndex].url];
});

const handleImageLoad = () => {
	isTransitioning.value = false;
};

const nextImage = () => {
	if (isTransitioning.value) return; // Prevent rapid clicking
	isTransitioning.value = true;
	currentIndex.value = (currentIndex.value + 1) % mockPhotos.length;
};

const previousImage = () => {
	if (isTransitioning.value) return; // Prevent rapid clicking
	isTransitioning.value = true;
	currentIndex.value =
		currentIndex.value <= 0 ? mockPhotos.length - 1 : currentIndex.value - 1;
};

const closeModal = () => {
	emit('update:modelValue', false);
};

// Handle keyboard navigation
const handleKeydown = (e) => {
	if (!props.modelValue) return;

	switch (e.key) {
		case 'ArrowRight':
			nextImage();
			break;
		case 'ArrowLeft':
			previousImage();
			break;
		case 'Escape':
			closeModal();
			break;
	}
};

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.info-button:hover .info-panel {
	opacity: 1;
	pointer-events: auto;
	transition: opacity 0.2s ease-out;
}

.info-panel {
	transition: opacity 0.2s ease-out;
}
</style>
