<template>
	<HorizontalGallery :photos="mockPhotos" />
</template>

<script setup>
import HorizontalGallery from '~/components/HorizontalGallery.vue';
import { usePhotos } from '~/composables/usePhotos';

// In a real application, you would fetch photos based on the route slug
// For example: const { photos } = await useFetchPhotos(route.params.slug)
const { mockPhotos } = usePhotos();
const route = useRoute();

// You can log the slug to see it changing
console.log('Project slug:', route.params.slug);
</script>
