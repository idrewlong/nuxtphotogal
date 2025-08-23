<template>
	<div
		class="hidden md:flex md:items-center md:justify-between md:w-full max-w-7xl mx-auto px-4"
	>
		<!-- Left Navigation -->
		<div class="flex items-center gap-8 uppercase flex-1 justify-end pr-8">
			<template v-for="(link, index) in leftNavItems" :key="link.to">
				<div
					v-if="link.children && link.children.length > 0"
					class="relative group"
					@mouseenter="handleMouseEnter(link.label)"
					@mouseleave="handleMouseLeave"
				>
					<div class="flex items-center gap-1">
						<NuxtLink
							:to="link.to"
							class="text-white transition-all duration-300 py-3 px-2 md:text-base text-sm tracking-wider font-light relative"
							:class="{
								'font-medium': $route.path.startsWith(link.to),
							}"
						>
							{{ link.label }}
							<!-- Hover underline effect -->
							<span
								class="absolute bottom-1 left-0 w-0 h-0.5 bg-luscored transition-all duration-300 group-hover:w-full"
							></span>
						</NuxtLink>
						<button
							class="flex items-center text-white hover:text-amber-200 transition-all duration-300 py-3 px-1"
							:aria-expanded="openDropdown === link.label"
							:aria-controls="`${link.label}-dropdown`"
							@click="toggleDropdown(link.label)"
						>
							<Icon
								name="heroicons:chevron-down"
								class="w-4 h-4 transition-transform duration-300"
								:class="{
									'rotate-180':
										openDropdown === link.label ||
										hoveredDropdown === link.label,
								}"
							/>
						</button>
					</div>
					<!-- Enhanced Dropdown -->
					<div
						v-show="
							openDropdown === link.label || hoveredDropdown === link.label
						"
						:id="`${link.label}-dropdown`"
						:aria-hidden="
							openDropdown !== link.label && hoveredDropdown !== link.label
						"
						class="absolute top-full left-0 min-w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl py-3 mt-2 border border-amber-200/30 z-50 opacity-0 transform translate-y-2 transition-all duration-300"
						:class="{
							'opacity-100 translate-y-0':
								openDropdown === link.label || hoveredDropdown === link.label,
						}"
					>
						<div class="py-1">
							<NuxtLink
								v-for="child in link.children"
								:key="child.to"
								:to="child.to"
								class="block px-6 py-3 text-neutralgray hover:text-luscored hover:bg-amber-50/50 transition-all duration-200 font-light tracking-wide border-l-3 border-transparent hover:border-luscored"
								@click="closeDropdown"
							>
								{{ child.label }}
							</NuxtLink>
						</div>
					</div>
				</div>
				<NuxtLink
					v-else
					:to="link.to"
					class="relative text-white transition-all duration-300 group py-3 px-2 md:text-base text-sm tracking-wider font-light"
					:class="{ ' font-medium': $route.path === link.to }"
				>
					{{ link.label }}
					<span
						class="absolute bottom-1 left-0 w-0 h-0.5 bg-luscored transition-all duration-300 group-hover:w-full"
						:class="{ 'w-full bg-luscored': $route.path === link.to }"
					/>
				</NuxtLink>
			</template>
		</div>

		<!-- Centered Logo -->
		<NavigationLogo
			container-class="flex items-center justify-center flex-shrink-0 group"
		/>

		<!-- Right Navigation -->
		<div class="flex items-center flex-1 justify-between">
			<div class="flex items-center gap-8 uppercase pl-8">
				<template v-for="link in regularRightNavItems" :key="link.to">
					<div
						v-if="link.children && link.children.length > 0"
						class="relative group"
						@mouseenter="handleMouseEnter(link.label)"
						@mouseleave="handleMouseLeave"
					>
						<div class="flex items-center gap-1">
							<NuxtLink
								:to="link.to"
								class="text-white transition-all duration-300 py-3 px-2 md:text-base text-sm tracking-wider font-light relative"
								:class="{
									'font-medium': $route.path.startsWith(link.to),
								}"
							>
								{{ link.label }}
								<!-- Hover underline effect -->
								<span
									class="absolute bottom-1 left-0 w-0 h-0.5 bg-luscored transition-all duration-300 group-hover:w-full"
								></span>
							</NuxtLink>
							<button
								class="flex items-center text-white transition-all duration-300 py-3 px-1"
								:aria-expanded="openDropdown === link.label"
								:aria-controls="`${link.label}-dropdown`"
								@click="toggleDropdown(link.label)"
							>
								<Icon
									name="heroicons:chevron-down"
									class="w-4 h-4 transition-transform duration-300"
									:class="{
										'rotate-180':
											openDropdown === link.label ||
											hoveredDropdown === link.label,
									}"
								/>
							</button>
						</div>
						<!-- Enhanced Dropdown -->
						<div
							v-show="
								openDropdown === link.label || hoveredDropdown === link.label
							"
							:id="`${link.label}-dropdown`"
							:aria-hidden="
								openDropdown !== link.label && hoveredDropdown !== link.label
							"
							class="absolute top-full right-0 min-w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl py-3 mt-2 border border-amber-200/30 z-50 opacity-0 transform translate-y-2 transition-all duration-300"
							:class="{
								'opacity-100 translate-y-0':
									openDropdown === link.label || hoveredDropdown === link.label,
							}"
						>
							<div class="py-1">
								<NuxtLink
									v-for="child in link.children"
									:key="child.to"
									:to="child.to"
									class="block px-6 py-3 text-neutralgray hover:text-luscored hover:bg-amber-50/50 transition-all duration-200 font-light tracking-wide border-l-3 border-transparent hover:border-luscored"
									@click="closeDropdown"
								>
									{{ child.label }}
								</NuxtLink>
							</div>
						</div>
					</div>
					<NuxtLink
						v-else
						:to="link.to"
						class="relative text-white transition-all duration-300 group py-3 px-2 md:text-base text-sm tracking-wider font-light"
						:class="{ 'font-medium': $route.path === link.to }"
					>
						{{ link.label }}
						<span
							class="absolute bottom-1 left-0 w-0 h-0.5 bg-luscored transition-all duration-300 group-hover:w-full"
							:class="{ 'w-full ': $route.path === link.to }"
						/>
					</NuxtLink>
				</template>
			</div>

			<NuxtLink
				v-if="instagramLink"
				:to="instagramLink.to"
				target="_blank"
				rel="noopener noreferrer"
				class="text-white hover:text-slate-300 transition-colors"
			>
				<Icon name="mdi:instagram" size="24" />
				<!-- <span class="sr-only">{{ instagramLink.label }}</span> -->
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { ref, onUnmounted, computed } from 'vue';

const props = defineProps({
	leftNavItems: {
		type: Array,
		required: true,
	},
	rightNavItems: {
		type: Array,
		required: true,
	},
});

const regularRightNavItems = computed(() =>
	props.rightNavItems.filter((item) => !item.isExternal)
);
const instagramLink = computed(() =>
	props.rightNavItems.find((item) => item.isExternal)
);

const openDropdown = ref(null);
const hoveredDropdown = ref(null);

// Hover functionality with timeout to prevent flickering
let hoverTimeout = null;

const handleMouseEnter = (label) => {
	if (hoverTimeout) {
		clearTimeout(hoverTimeout);
		hoverTimeout = null;
	}
	hoveredDropdown.value = label;
};

const handleMouseLeave = () => {
	hoverTimeout = setTimeout(() => {
		hoveredDropdown.value = null;
	}, 150); // Small delay to prevent flickering
};

const toggleDropdown = (label) => {
	openDropdown.value = openDropdown.value === label ? null : label;
	hoveredDropdown.value = null; // Clear hover state when clicking
};

const closeDropdown = () => {
	openDropdown.value = null;
	hoveredDropdown.value = null;
};

// Cleanup hover timeout on unmount
onUnmounted(() => {
	if (hoverTimeout) {
		clearTimeout(hoverTimeout);
	}
});

// Expose methods for parent component
defineExpose({
	closeDropdown,
});
</script>

<style scoped>
/* Enhanced hover effects */
.group:hover .hover\\:w-full {
	width: 100%;
}

/* Smooth dropdown animations */
.group:hover [aria-hidden='false'] {
	opacity: 1;
	transform: translateY(0);
}

/* Border accent for hover states */
.border-l-3 {
	border-left-width: 3px;
}

/* Improved backdrop blur */
.backdrop-blur-md {
	backdrop-filter: blur(12px);
}

/* Add smooth hover effect for nav items */
a,
button {
	position: relative;
	transition: all 0.3s ease;
}

/* Add subtle hover animation */
.group:hover span {
	transform: scaleX(1);
	opacity: 1;
}
</style>
