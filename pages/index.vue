<template>
	<div>
		<div
			v-if="pending"
			class="flex items-center justify-center h-screen font-bold text-3xl"
		>
			Loading...
		</div>
		<div
			v-else-if="error"
			class="flex items-center justify-center h-screen font-bold text-3xl text-red-500"
		>
			Error loading data
		</div>
		<div
			v-else
			class="min-h-screen p-4 min-[1115px]:h-screen min-[1115px]:flex min-[1115px]:items-center min-[1115px]:justify-center min-[1115px]:p-8"
		>
			<div
				class="grid grid-cols-1 gap-4 min-[1115px]:grid-cols-2 min-[1115px]:h-5/6 min-[1115px]:aspect-square"
			>
				<FeaturedProject
					v-for="project in projects"
					:key="project.heading"
					:project="project"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import FeaturedProject from '~/components/FeaturedProject.vue';
import GetHomePage from '~/queries/home.gql';

const { data, pending, error } = await useAsyncQuery(GetHomePage);
const projects = ref([]);

watch(
	data,
	(newData) => {
		if (newData && newData.page && newData.page.home) {
			const homeData = newData.page.home;
			const formattedProjects = [];

			for (let i = 1; i <= 4; i++) {
				const box = homeData[`homeBox${i}`];
				if (box) {
					formattedProjects.push({
						image: box.image.node.sourceUrl,
						heading: box.text.title,
						cta: {
							link: box.text.url,
						},
					});
				}
			}
			projects.value = formattedProjects;
		}
	},
	{ immediate: true }
);
</script>
