<template>
	<div class="gallery-container my-8" v-if="images.length">
		<!-- Main Image Display -->
		<div
			class="relative"
			:style="{
				'padding-bottom': aspectRatio ? `${aspectRatio * 100}%` : '56.25%',
			}"
		>
			<div
				class="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg bg-black"
			>
				<img
					:src="images[activeIndex].src"
					:alt="images[activeIndex].alt || 'Gallery image'"
					class="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
				/>
			</div>

			<!-- Navigation Arrows -->
			<div
				v-if="images.length > 1"
				class="absolute inset-0 flex items-center justify-between px-2"
			>
				<button @click="prev" class="gallery-arrow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button @click="next" class="gallery-arrow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Thumbnail Navigation -->
		<div v-if="images.length > 1" class="mt-4">
			<div class="grid grid-cols-5 gap-2">
				<div
					v-for="(image, index) in images"
					:key="index"
					@click="setActive(index)"
					class="cursor-pointer overflow-hidden rounded-md border-2 transition-all duration-200"
					:class="
						activeIndex === index
							? 'border-amber-500 ring-2 ring-amber-300'
							: 'border-transparent'
					"
				>
					<img
						:src="image.src"
						:alt="image.alt || 'Gallery thumbnail'"
						class="w-full h-full object-cover transition-opacity duration-200"
						:class="activeIndex !== index ? 'opacity-60 hover:opacity-100' : ''"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
	images: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const activeIndex = ref(0);
const aspectRatio = ref(null);

onMounted(() => {
	if (props.images.length > 0) {
		const img = new Image();
		img.onload = () => {
			aspectRatio.value = img.height / img.width;
		};
		img.src = props.images[0].src;
	}
});

const setActive = (index) => {
	activeIndex.value = index;
};

const prev = () => {
	if (activeIndex.value > 0) {
		activeIndex.value--;
	} else {
		activeIndex.value = props.images.length - 1; // Loop to last image
	}
};

const next = () => {
	if (activeIndex.value < props.images.length - 1) {
		activeIndex.value++;
	} else {
		activeIndex.value = 0; // Loop to first image
	}
};
</script>

<style scoped>
.gallery-arrow {
	background-color: rgba(0, 0, 0, 0.4);
	color: white;
	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
	border: 1px solid rgba(255, 255, 255, 0.2);
}
.gallery-arrow:hover {
	background-color: rgba(0, 0, 0, 0.7);
	transform: scale(1.1);
}
</style>
