<template>
	<div class="bg-white p-4 flex justify-between items-center nav-font">
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

				<nav
					class="flex flex-col space-y-4 uppercase"
					aria-label="Mobile navigation"
				>
					<template v-for="link in internalLinks" :key="link.to">
						<template v-if="link.children && link.children.length > 0">
							<button
								class="flex items-center justify-between text-black w-full py-2 text-sm"
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
									class="block text-black py-1 text-sm"
									@click="closeNavbar"
								>
									{{ child.label }}
								</NuxtLink>
							</div>
						</template>
						<NuxtLink
							v-else
							:to="link.to"
							class="text-black py-2 text-sm"
							@click="closeNavbar"
						>
							{{ link.label }}
						</NuxtLink>
					</template>
				</nav>

				<!-- Social Links & Copyright -->
				<div class="mt-auto">
					<div class="flex items-center gap-6">
						<NuxtLink
							v-if="instagramLink"
							:to="instagramLink.to"
							target="_blank"
							rel="noopener noreferrer"
							class="text-black hover:text-gray-600 transition-colors"
							aria-label="Instagram"
						>
							<Icon name="hugeicons:instagram" size="24" />
						</NuxtLink>
						<NuxtLink
							v-if="threadsLink"
							:to="threadsLink.to"
							target="_blank"
							rel="noopener noreferrer"
							class="text-black hover:text-gray-600 transition-colors"
							aria-label="Threads"
						>
							<Icon name="hugeicons:threads" size="24" />
						</NuxtLink>
					</div>
					<div class="text-sm text-gray-500 mt-4">
						© {{ new Date().getFullYear() }} Andrew Long
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, readonly, computed } from 'vue';

const props = defineProps({
	navigationLinks: {
		type: Array,
		required: true,
	},
});

const internalLinks = computed(() =>
	props.navigationLinks.filter((link) => !link.isExternal)
);
const instagramLink = computed(() =>
	props.navigationLinks.find(
		(link) => link.isExternal && link.label === 'Instagram'
	)
);
const threadsLink = computed(() =>
	props.navigationLinks.find(
		(link) => link.isExternal && link.label === 'Threads'
	)
);

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
