<template>
	<div
		class="group cursor-pointer overflow-hidden rounded-lg shadow-lg"
		@click="openModal"
	>
		<div class="relative">
			<img
				:src="photo.url"
				:alt="photo.title"
				class="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
				:style="{ aspectRatio: photo.aspectRatio || 'auto' }"
			/>
			<div
				class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"
			></div>
		</div>

		<PhotoModal v-model="showModal" :photo="photo" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import PhotoModal from './PhotoModal.vue';

const props = defineProps({
	photo: {
		type: Object,
		required: true,
	},
});

const showModal = ref(false);
const openModal = () => {
	showModal.value = true;
};
</script>
