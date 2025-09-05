<template>
	<div
		ref="scrollContainer"
		class="flex overflow-x-auto h-contain w-full scrollbar-hide py-8"
		:class="{
			'cursor-none': cursorSide,
		}"
		@mousemove="handleMouseMove"
		@mouseleave="handleMouseLeave"
		@click="handleClick"
	>
		<!-- Custom Cursor Icons -->
		<Icon
			v-if="cursorSide === 'left'"
			name="ooui:previous-ltr"
			size="36"
			class="text-black fixed pointer-events-none z-50"
			:style="{
				left: `${cursorX}px`,
				top: `${cursorY}px`,
				transform: 'translate(-50%, -50%)',
			}"
		/>
		<Icon
			v-if="cursorSide === 'right'"
			name="ooui:previous-rtl"
			size="36"
			class="text-black fixed pointer-events-none z-50"
			:style="{
				left: `${cursorX}px`,
				top: `${cursorY}px`,
				transform: 'translate(-50%, -50%)',
			}"
		/>
		<div class="flex flex-nowrap pl-8">
			<div
				v-for="(photo, index) in photos"
				:key="index"
				:ref="(el) => (imageRefs[index] = el)"
				class="flex-shrink-0 h-full w-auto mr-8 pointer-events-none"
			>
				<img
					:src="photo.url"
					:alt="photo.title"
					class="h-full w-auto object-cover"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
	photos: {
		type: Array,
		required: true,
	},
});

const scrollContainer = ref(null);
const imageRefs = ref([]);
const activeIndex = ref(0);
const cursorSide = ref('');
const cursorX = ref(0);
const cursorY = ref(0);

let wheelHandler;

const handleMouseMove = (event) => {
	const container = scrollContainer.value;
	if (container) {
		cursorX.value = event.clientX;
		cursorY.value = event.clientY;

		const rect = container.getBoundingClientRect();
		const middle = rect.left + rect.width / 2;
		if (event.clientX < middle) {
			cursorSide.value = 'left';
		} else {
			cursorSide.value = 'right';
		}
	}
};

const handleMouseLeave = () => {
	cursorSide.value = '';
};

const handleClick = () => {
	const container = scrollContainer.value;
	if (!container || !imageRefs.value.length) return;

	let nextIndex;
	if (cursorSide.value === 'left') {
		nextIndex = Math.max(0, activeIndex.value - 1);
	} else {
		nextIndex = Math.min(imageRefs.value.length - 1, activeIndex.value + 1);
	}

	if (nextIndex !== activeIndex.value) {
		activeIndex.value = nextIndex;
	}

	const targetImage = imageRefs.value[activeIndex.value];
	if (targetImage) {
		const containerRect = container.getBoundingClientRect();
		const imageRect = targetImage.getBoundingClientRect();

		const scrollOffset =
			imageRect.left -
			containerRect.left -
			(containerRect.width - imageRect.width) / 2;

		container.scrollBy({
			left: scrollOffset,
			behavior: 'smooth',
		});
	}
};

onMounted(() => {
	const container = scrollContainer.value;
	if (container) {
		wheelHandler = (event) => {
			event.preventDefault();
			container.scrollLeft += event.deltaY;
		};
		container.addEventListener('wheel', wheelHandler);
	}
});

onUnmounted(() => {
	const container = scrollContainer.value;
	if (container && wheelHandler) {
		container.removeEventListener('wheel', wheelHandler);
	}
});
</script>

<style scoped>
.cursor-none {
	cursor: none;
}
</style>
