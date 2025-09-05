<template>
	<div class="flex flex-col gap-4 nav-font">
		<template v-for="(link, index) in allNavItems" :key="link.to">
			<div
				v-if="link.children && link.children.length > 0"
				class="relative group"
			>
				<div class="flex items-center justify-between">
					<NuxtLink
						:to="link.to"
						class="text-black transition-all duration-300 py-2 text-lg"
						:class="{
							'font-bold': $route.path.startsWith(link.to),
						}"
					>
						{{ link.label }}
					</NuxtLink>
					<button
						class="flex items-center text-black"
						@click="toggleDropdown(link.label)"
					>
						<Icon
							name="heroicons:chevron-right"
							class="w-4 h-4 transition-transform duration-300"
							:class="{
								'rotate-90': openDropdown === link.label,
							}"
						/>
					</button>
				</div>
				<!-- Dropdown -->
				<div v-show="openDropdown === link.label" class="pl-4 mt-2 space-y-2">
					<NuxtLink
						v-for="child in link.children"
						:key="child.to"
						:to="child.to"
						class="block text-gray-600 hover:text-black transition-all duration-200"
						@click="closeDropdown"
					>
						{{ child.label }}
					</NuxtLink>
				</div>
			</div>
			<NuxtLink
				v-else
				:to="link.to"
				class="text-black transition-all duration-300 py-2 text-lg"
				:class="{ 'font-bold': $route.path === link.to }"
			>
				{{ link.label }}
			</NuxtLink>
		</template>
		<div class="mt-auto">
			<div class="flex items-center gap-4">
				<NuxtLink
					v-if="instagramLink"
					:to="instagramLink.to"
					target="_blank"
					rel="noopener noreferrer"
					class="text-black hover:text-gray-600 transition-colors"
				>
					<Icon name="mdi:instagram" size="24" />
				</NuxtLink>
				<!-- Add other social links here -->
			</div>
			<div class="text-sm text-gray-500 mt-4">
				© {{ new Date().getFullYear() }} Andrew Long
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

const allNavItems = computed(() => {
	const rightItems = props.rightNavItems.filter((item) => !item.isExternal);
	return [...props.leftNavItems, ...rightItems];
});

const instagramLink = computed(() =>
	props.rightNavItems.find((item) => item.isExternal)
);

const openDropdown = ref(null);

const toggleDropdown = (label) => {
	openDropdown.value = openDropdown.value === label ? null : label;
};

const closeDropdown = () => {
	openDropdown.value = null;
};

// Expose methods for parent component
defineExpose({
	closeDropdown,
});
</script>
<style scoped>
/* You can add specific styles for the vertical nav here if needed */
</style>
