<template>
	<header
		class="md:fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50 p-4 px-6 flex-col"
	>
		<nav class="flex flex-col h-full" aria-label="Main navigation">
			<NavigationLogo class="mb-8" />

			<NavigationDesktopNav
				ref="desktopNavRef"
				:left-nav-items="leftNavItems"
				:right-nav-items="rightNavItems"
				class="flex-grow"
			/>
		</nav>
	</header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNavigation } from '~/composables/useNavigation';

// Use the navigation composable
const { navigationLinks, leftNavItems, rightNavItems } = useNavigation();

// Refs for child components
const mobileNavRef = ref(null);
const desktopNavRef = ref(null);

// Close menu functions for external clicks/keyboard events
const closeAllMenus = () => {
	if (mobileNavRef.value?.closeNavbar) {
		mobileNavRef.value.closeNavbar();
	}
	if (desktopNavRef.value?.closeDropdown) {
		desktopNavRef.value.closeDropdown();
	}
};

// Close menu when clicking outside
onMounted(() => {
	document.addEventListener('click', (event) => {
		const nav = document.querySelector('nav');
		if (nav && !nav.contains(event.target)) {
			const isMenuOpen =
				mobileNavRef.value?.showMenu || desktopNavRef.value?.openDropdown;
			if (isMenuOpen) {
				closeAllMenus();
			}
		}
	});

	// Close menu on escape key
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			const isMenuOpen =
				mobileNavRef.value?.showMenu || desktopNavRef.value?.openDropdown;
			if (isMenuOpen) {
				closeAllMenus();
			}
		}
	});
});
</script>
