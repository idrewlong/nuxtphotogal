<template>
	<div class="relative">
		<!-- Desktop Header -->
		<Header class="w-64 fixed left-0 top-0 h-full hidden md:block" />

		<!-- Mobile Header -->
		<div class="md:hidden">
			<NavigationMobileNav :navigation-links="navigationLinks" />
		</div>

		<main class="md:ml-64">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</main>
	</div>
</template>

<script setup>
import { useNavigation } from '~/composables/useNavigation';

const { navigationLinks } = useNavigation();
</script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
