<template>
	<div class="bg-white p-4 flex justify-between items-center">
		<!-- Mobile Menu Toggle Button -->
		<NavigationLogo
			size="small"
			container-class="flex items-center"
			@click="closeNavbar"
		/>
		<button
			type="button"
			class="text-black focus:outline-none rounded"
			:aria-expanded="showMenu"
			aria-controls="main-navigation"
			@click="toggleNavbar"
		>
			<Icon
				:name="showMenu ? 'heroicons:x-mark' : 'heroicons:bars-3'"
				class="menu-icon"
				aria-hidden="true"
			/>
		</button>
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
				class="fixed inset-y-0 left-0 w-full bg-white p-6 z-[101] flex flex-col space-y-6"
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
						class="text-black focus:outline-none rounded"
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
								class="flex items-center justify-between text-black w-full py-2 text-lg"
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
								class="pl-4 mt-2 space-y-2"
							>
								<NuxtLink
									v-for="child in link.children"
									:key="child.to"
									:to="child.to"
									class="block text-gray-600 hover:text-black py-1"
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
							class="flex items-center gap-2 text-black py-2 text-lg"
						>
							<Icon name="mdi:instagram" size="24" />
						</NuxtLink>
						<NuxtLink
							v-else
							:to="link.to"
							class="text-black py-2 text-lg"
							@click="closeNavbar"
						>
							{{ link.label }}
						</NuxtLink>
					</template>
				</nav>
			</div>
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
