<template>
	<main class="min-h-screen relative">
		<Header />
		<Hero />
		<div class="py-8">
			<div class="mx-auto px-4">
				<PhotoGrid />
			</div>
		</div>
	</main>
</template>

<script setup>
import Hero from '~/components/Hero.vue';
</script>
