<script lang="ts" setup>
useSeoMeta({
	title: 'About - Andrew Long | Software Engineer & Film Photographer',
	ogTitle: 'About Andrew Long - Software Engineer & Film Photographer',
	description:
		'Learn more about Andrew Long, a software engineer and passionate film photographer who finds the synergy between technology and creative expression.',
	ogDescription:
		'Discover the story behind Andrew Long, a developer and photographer exploring the intersection of code and creativity through the lens of a film camera.',
	ogImage: '/images/about-og.png', // Create this image
});
</script>

<template>
	<main class="py-24 sm:py-32">
		<section
			class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
		>
			<!-- Image Column -->
			<div class="w-full h-auto">
				<NuxtImg
					src="/images/tree.jpg"
					alt="A portrait of Andrew Long"
					class="rounded-lg object-cover w-full h-full"
					sizes="100vw sm:50vw md:400px"
				/>
			</div>

			<!-- Content Column -->
			<div class="text-gray-800">
				<h1 class="text-4xl font-bold mb-6">Richard Andrew Long</h1>
				<div class="space-y-4 text-lg text-gray-900">
					<p>
						A software engineer by trade and a photographer by heart, I find a
						unique synergy between the logical precision of coding and the
						creative freedom of film photography. My journey into photography
						began as a way to disconnect from the digital world, but it quickly
						grew into a passion for capturing fleeting moments and telling
						stories through a vintage lens.
					</p>
					<p>
						I specialize in landscape and street photography, always seeking the
						quiet beauty in everyday scenes. Whether I'm developing a new web
						application or a roll of film, I'm driven by a desire to build
						things that are both functional and beautiful.
					</p>
					<p>
						This space is where my two passions converge—a gallery of my
						photographic work and a journal of my thoughts on technology,
						creativity, and the art of seeing.
					</p>
					<NuxtLink
						to="/contact"
						class="underline underline-offset-4 inline-flex items-center gap-2 text-black transition-colors hover:text-gray-500"
						>Contact Me <Icon name="mdi:arrow-right" size="24"
					/></NuxtLink>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped></style>
