<template>
	<NuxtLink
		to="/"
		:class="containerClass"
		aria-label="Go to homepage"
		@click="$emit('click')"
	>
		<img src="/images/id2.svg" alt="ID Film Logo" :class="imageClass" />
	</NuxtLink>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['click']);

const props = defineProps({
	size: {
		type: String,
		default: 'medium',
		validator: (value) => ['small', 'medium'].includes(value),
	},
	containerClass: {
		type: String,
		default: 'flex items-center',
	},
});

const imageClass = computed(() => {
	const sizeClasses = {
		small: 'h-10 w-auto',
		medium: 'h-10 w-auto',
	};
	return sizeClasses[props.size] || sizeClasses.medium;
});
</script>
