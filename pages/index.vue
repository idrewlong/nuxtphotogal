<template>
	<HorizontalGallery :photos="mockPhotos" />
</template>

<script setup>
import HorizontalGallery from '~/components/HorizontalGallery.vue';
import { usePhotos } from '~/composables/usePhotos';

const { mockPhotos } = usePhotos();
</script>
