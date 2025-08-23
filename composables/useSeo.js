export default function (seoData) {
	if (!seoData) return;
	useSeoMeta({
		title: seoData.title,
		description: seoData.metaDesc,
		ogTitle: seoData.opengraphTitle,
		ogDescription: seoData.opengraphDescription,
		ogImage: seoData.opengraphImage?.sourceUrl,
	});
}
