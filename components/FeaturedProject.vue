<template>
	<NuxtLink
		:to="project.cta.link"
		class="relative aspect-square w-full h-full group overflow-hidden"
	>
		<img
			:src="project.image"
			:alt="project.heading"
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 min-[1115px]:opacity-0 min-[1115px]:group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
		></div>
		<div
			class="absolute inset-0 flex items-end justify-start p-8 text-white opacity-100 min-[1115px]:opacity-0 min-[1115px]:group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
		>
			<h2 class="text-3xl font-bold">{{ project.heading }}</h2>
		</div>
	</NuxtLink>
</template>

<script setup>
defineProps({
	project: {
		type: Object,
		required: true,
	},
});
</script>
