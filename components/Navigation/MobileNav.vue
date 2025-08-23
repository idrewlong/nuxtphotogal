<template>
	<div>
		<!-- Mobile Menu Toggle Button -->
		<div class="flex items-center justify-between md:hidden">
			<NavigationLogo
				size="small"
				container-class="flex items-center"
				@click="closeNavbar"
			/>

			<div class="flex items-center gap-3">
				<button
					type="button"
					class="text-white hover:text-slate-300 focus:outline-none rounded transition-colors duration-300"
					:aria-expanded="showMenu"
					aria-controls="main-navigation"
					@click="toggleNavbar"
				>
					<span class="sr-only">{{
						showMenu ? 'Close menu' : 'Open menu'
					}}</span>
					<Icon
						:name="showMenu ? 'heroicons:x-mark' : 'heroicons:bars-3'"
						class="menu-icon transition-all duration-300"
						:class="{ 'rotate-180': showMenu }"
						aria-hidden="true"
					/>
				</button>
			</div>
		</div>

		<!-- Side Drawer Mobile Menu -->
		<Transition
			enter-active-class="transition-transform duration-300 ease-out"
			leave-active-class="transition-transform duration-200 ease-in"
			enter-from-class="-translate-x-full"
			enter-to-class="translate-x-0"
			leave-from-class="translate-x-0"
			leave-to-class="-translate-x-full"
		>
			<div
				v-show="showMenu"
				class="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-black/95 backdrop-blur-sm p-6 z-[101] rounded-r-2xl shadow-2xl flex flex-col space-y-6 md:hidden focus:outline-none"
				role="dialog"
				aria-modal="true"
				id="main-navigation"
			>
				<div class="flex items-center justify-between mb-8">
					<NavigationLogo
						size="small"
						container-class="flex items-center"
						@click="closeNavbar"
					/>
					<button
						type="button"
						class="text-white/90 focus:outline-none rounded"
						@click="closeNavbar"
						aria-label="Close menu"
					>
						<Icon name="heroicons:x-mark" class="w-8 h-8" aria-hidden="true" />
					</button>
				</div>

				<nav class="flex flex-col space-y-4" aria-label="Mobile navigation">
					<template v-for="link in navigationLinks" :key="link.to">
						<template v-if="link.children && link.children.length > 0">
							<button
								class="flex items-center justify-between text-white/80 hover:text-white transition-colors duration-300 w-full py-2 text-lg"
								:aria-expanded="openDropdown === link.label"
								:aria-controls="`${link.label}-dropdown-mobile`"
								@click="toggleDropdown(link.label)"
							>
								{{ link.label }}
								<Icon
									name="heroicons:chevron-down"
									class="w-4 h-4 transition-transform duration-300"
									:class="{ 'rotate-180': openDropdown === link.label }"
								/>
							</button>
							<div
								v-show="openDropdown === link.label"
								:id="`${link.label}-dropdown-mobile`"
								class="pl-4 mt-2 space-y-2"
							>
								<NuxtLink
									v-for="child in link.children"
									:key="child.to"
									:to="child.to"
									class="block text-white/70 hover:text-white transition-colors duration-300 py-1"
									@click="closeNavbar"
								>
									{{ child.label }}
								</NuxtLink>
							</div>
						</template>
						<NuxtLink
							v-else-if="link.isExternal"
							:to="link.to"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 py-2 text-lg"
						>
							<Icon name="mdi:instagram" size="24" />
							<!-- <span>{{ link.label }}</span> -->
						</NuxtLink>
						<NuxtLink
							v-else
							:to="link.to"
							class="text-white/80 hover:text-white transition-colors duration-300 py-2 text-lg"
							@click="closeNavbar"
						>
							{{ link.label }}
						</NuxtLink>
					</template>
				</nav>
			</div>
		</Transition>

		<!-- Backdrop -->
		<Transition
			enter-active-class="transition-opacity duration-200"
			leave-active-class="transition-opacity duration-200"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-show="showMenu"
				class="fixed inset-0 bg-black/50 z-[100] md:hidden"
				@click="closeNavbar"
				aria-hidden="true"
			></div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, readonly } from 'vue';

const props = defineProps({
	navigationLinks: {
		type: Array,
		required: true,
	},
});

const showMenu = ref(false);
const openDropdown = ref(null);

const toggleNavbar = () => {
	showMenu.value = !showMenu.value;
};

const closeNavbar = () => {
	showMenu.value = false;
	openDropdown.value = null;
};

const toggleDropdown = (label) => {
	openDropdown.value = openDropdown.value === label ? null : label;
};

// Expose methods for parent component
defineExpose({
	closeNavbar,
	showMenu: readonly(showMenu),
	openDropdown: readonly(openDropdown),
});
</script>

<style scoped>
.menu-icon {
	width: 28px;
	height: 28px;
}
</style>
