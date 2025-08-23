<template>
	<header
		class="header-fixed md:absolute md:top-0 md:left-0 md:right-0 md:z-50 md:bg-transparent bg-black border-b border-slate-200 md:border-b-0"
	>
		<nav
			class="p-4 px-6 mx-auto md:flex md:items-center relative"
			aria-label="Main navigation"
		>
			<!-- Mobile Navigation -->
			<NavigationMobileNav
				ref="mobileNavRef"
				:navigation-links="navigationLinks"
			/>

			<!-- Desktop Navigation -->
			<NavigationDesktopNav
				ref="desktopNavRef"
				:left-nav-items="leftNavItems"
				:right-nav-items="rightNavItems"
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
