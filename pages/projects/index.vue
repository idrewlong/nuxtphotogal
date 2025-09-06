<template>
	<div class="bg-gray-50 min-h-screen text-gray-900">
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
			Error loading projects
		</div>
		<div v-else-if="projects" class="container mx-auto px-4 py-12">
			<!-- <h1 class="text-5xl font-bold mb-12 text-center text-gray-900">
				{{ pageTitle }}
			</h1> -->
			<div class="columns-1 md:columns-2 lg:columns-3 gap-8">
				<div
					v-for="project in projects"
					:key="project.id"
					class="mb-8 break-inside-avoid"
				>
					<NuxtLink :to="project.uri" class="group block">
						<div class="overflow-hidden">
							<img
								v-if="project.featuredImage"
								:src="project.featuredImage.node.sourceUrl"
								:alt="project.featuredImage.node.altText"
								class="w-full h-auto object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
							/>
							<div
								v-else
								class="w-full h-64 bg-gray-200 flex items-center justify-center"
							>
								<span class="text-gray-500">No Image</span>
							</div>
						</div>
						<div class="pt-4">
							<h2 class="text-sm font-semibold text-gray-800 text-left">
								{{ project.title }}
							</h2>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import GetProjectsPageChildren from '~/queries/projects.gql';

const { data, pending, error } = await useAsyncQuery(GetProjectsPageChildren);
const projects = ref([]);
const pageTitle = ref('Projects');

watch(
	data,
	(newData) => {
		if (newData && newData.page && newData.page.children) {
			projects.value = newData.page.children.nodes;
		}
	},
	{ immediate: true }
);
</script>

<style scoped></style>
