<template>
	<component
		:is="as"
		:class="[
			'container px-4 md:px-8',
			isFat ? 'max-w-wide-content' : 'max-w-content',
			$attrs.class,
		]"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
interface Props {
	isFat?: boolean;
	as?: 'div' | 'main' | 'footer';
}

withDefaults(defineProps<Props>(), {
	isFat: false,
	as: 'div',
});
</script>
