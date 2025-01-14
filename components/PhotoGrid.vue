<template>
	<div class="p-4">
		<div class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
			<div
				v-for="photo in displayedPhotos"
				:key="photo.id"
				class="mb-4 break-inside-avoid"
			>
				<PhotoCard :photo="photo" />
			</div>
		</div>

		<div ref="loadingTrigger" class="h-20 my-4">
			<div v-if="loading" class="flex justify-center">
				<span class="loading-spinner"></span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const { mockPhotos } = usePhotos();

const displayedPhotos = ref([]);
const page = ref(1);
const loading = ref(false);
const loadingTrigger = ref(null);
const ITEMS_PER_PAGE = 12;
let observer = null;

const loadMorePhotos = async () => {
	if (loading.value) return;

	loading.value = true;
	const start = (page.value - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;

	// Check if we have more photos to load
	if (start < mockPhotos.length) {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		const newPhotos = mockPhotos.slice(start, end);
		displayedPhotos.value = [...displayedPhotos.value, ...newPhotos];
		page.value++;
	}

	loading.value = false;
};

onMounted(() => {
	// Load initial photos
	loadMorePhotos();

	// Setup intersection observer
	observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];
			if (
				entry.isIntersecting &&
				!loading.value &&
				displayedPhotos.value.length < mockPhotos.length
			) {
				loadMorePhotos();
			}
		},
		{
			rootMargin: '200px',
			threshold: 0,
		}
	);

	if (loadingTrigger.value) {
		observer.observe(loadingTrigger.value);
	}
});

onUnmounted(() => {
	if (observer) {
		observer.disconnect();
	}
});
</script>

<style scoped>
.loading-spinner {
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
