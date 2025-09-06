<template>
	<div class="flex flex-col gap-4 nav-font">
		<template v-for="(link, index) in allNavItems" :key="link.to">
			<div
				v-if="link.children && link.children.length > 0"
				class="relative group"
				@mouseenter="openDropdownOnHover(link.label)"
				@mouseleave="closeDropdownWithDelay"
				@focusin="openDropdownOnHover(link.label)"
				@focusout="onFocusOut"
			>
				<div class="flex items-center justify-between">
					<NuxtLink
						:to="link.to"
						class="text-black transition-all duration-300 py-2 text-sm uppercase"
						:class="{
							'font-bold': $route.path.startsWith(link.to),
						}"
					>
						{{ link.label }}
					</NuxtLink>
					<button
						class="flex items-center text-black"
						@click="toggleDropdown(link.label)"
						aria-haspopup="menu"
						:aria-expanded="openDropdown === link.label"
						:aria-controls="submenuId(link.label)"
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
				<Transition
					@enter="onEnter"
					@after-enter="onAfterEnter"
					@leave="onLeave"
				>
					<div
						v-show="openDropdown === link.label"
						class="pl-4 mt-2 space-y-2"
						role="menu"
						:aria-label="`${link.label} submenu`"
						:id="submenuId(link.label)"
					>
						<NuxtLink
							v-for="child in link.children"
							:key="child.to"
							:to="child.to"
							class="block text-black text-sm hover:text-gray-600 transition-all duration-200 uppercase"
							role="menuitem"
							@click="closeDropdown"
						>
							{{ child.label }}
						</NuxtLink>
					</div>
				</Transition>
			</div>
			<NuxtLink
				v-else
				:to="link.to"
				class="text-black transition-all duration-300 py-2 text-sm uppercase"
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
					<Icon name="hugeicons:instagram" size="24" />
				</NuxtLink>
				<NuxtLink
					v-if="threadsLink"
					:to="threadsLink.to"
					target="_blank"
					rel="noopener noreferrer"
					class="text-black hover:text-gray-600 transition-colors"
				>
					<Icon name="hugeicons:threads" size="24" />
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
	props.rightNavItems.find(
		(item) => item.isExternal && item.label === 'Instagram'
	)
);
const threadsLink = computed(() =>
	props.rightNavItems.find(
		(item) => item.isExternal && item.label === 'Threads'
	)
);

const openDropdown = ref(null);

const toggleDropdown = (label) => {
	openDropdown.value = openDropdown.value === label ? null : label;
};

const closeDropdown = () => {
	openDropdown.value = null;
};

const openDropdownOnHover = (label) => {
	openDropdown.value = label;
};

let closeTimer = null;
const closeDropdownWithDelay = () => {
	if (closeTimer) {
		clearTimeout(closeTimer);
	}
	closeTimer = setTimeout(() => {
		closeDropdown();
		closeTimer = null;
	}, 100);
};

// Height transition helpers
const onEnter = (el) => {
	if (closeTimer) {
		clearTimeout(closeTimer);
		closeTimer = null;
	}
	el.style.height = '0px';
	el.style.opacity = '0';
	el.style.overflow = 'hidden';
	el.style.transition =
		'height 180ms ease-out, opacity 180ms ease-out, transform 180ms ease-out';
	el.style.transform = 'translateY(-4px)';
	requestAnimationFrame(() => {
		el.style.height = el.scrollHeight + 'px';
		el.style.opacity = '1';
		el.style.transform = 'translateY(0)';
	});
};

const onAfterEnter = (el) => {
	el.style.height = 'auto';
	el.style.overflow = '';
	el.style.transform = '';
};

const onLeave = (el) => {
	el.style.height = el.scrollHeight + 'px';
	el.style.opacity = '1';
	el.style.overflow = 'hidden';
	el.style.transition =
		'height 150ms ease-in, opacity 150ms ease-in, transform 150ms ease-in';
	requestAnimationFrame(() => {
		el.style.height = '0px';
		el.style.opacity = '0';
		el.style.transform = 'translateY(-4px)';
	});
};

const onFocusOut = (event) => {
	const next = event.relatedTarget;
	const container = event.currentTarget;
	if (!container) {
		closeDropdown();
		return;
	}
	if (!next) {
		closeDropdown();
		return;
	}
	// If focus moved outside the container, close the dropdown
	if (!(container instanceof HTMLElement) || !container.contains(next)) {
		closeDropdown();
	}
};

const submenuId = (label) => {
	const safe = String(label)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
	return `submenu-${safe}`;
};

// Expose methods for parent component
defineExpose({
	closeDropdown,
	openDropdown,
});
</script>
<style scoped>
/* You can add specific styles for the vertical nav here if needed */
</style>
