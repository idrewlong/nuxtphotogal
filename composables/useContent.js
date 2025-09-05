import DOMPurify from 'isomorphic-dompurify';
import { parse } from 'node-html-parser';

export const useContent = () => {
	/**
	 * Decodes HTML entities in a given text.
	 * It handles both client-side and server-side decoding.
	 * @param {string} text - The text containing HTML entities.
	 * @returns {string} The decoded text.
	 */
	const decodeHtmlEntities = (text) => {
		if (!text) return '';
		// Basic server-side/client-side decoding for common entities
		return text
			.replace(/&#8217;/g, "'")
			.replace(/&#8216;/g, "'")
			.replace(/&#8220;/g, '"')
			.replace(/&#8221;/g, '"')
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"');
	};

	/**
	 * Sanitizes an HTML string to prevent XSS attacks.
	 * @param {string} html - The HTML string to sanitize.
	 * @returns {string} The sanitized HTML string.
	 */
	const sanitizeHtml = (html) => {
		if (!html) return '';
		return DOMPurify.sanitize(html, {
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'src'],
		});
	};

	/**
	 * Processes raw HTML content by decoding entities and sanitizing it.
	 * @param {string} rawHtml - The raw HTML content from the CMS.
	 * @returns {string} The processed and safe HTML string for rendering.
	 */
	const processContent = (rawHtml) => {
		const decoded = decodeHtmlEntities(rawHtml);
		return sanitizeHtml(decoded);
	};

	/**
	 * Parses and transforms HTML content, replacing specific elements with component definitions.
	 * @param {string} rawHtml - The raw HTML content.
	 * @returns {Array} An array of content blocks (HTML strings or component objects).
	 */
	const parseAndTransform = (rawHtml) => {
		if (!rawHtml) return [];

		const sanitizedHtml = processContent(rawHtml);
		const root = parse(sanitizedHtml);
		const contentBlocks = [];

		root.childNodes.forEach((node) => {
			if (node.nodeType === 1) {
				// Element node
				const element = node;

				// Gallery
				if (element.classList.contains('wp-block-gallery')) {
					const images = element.querySelectorAll('img').map((img) => ({
						src: img.getAttribute('src'),
						alt: img.getAttribute('alt'),
					}));
					if (images.length > 0) {
						contentBlocks.push({
							component: 'Gallery',
							props: { images },
						});
						return; // Skip adding the raw HTML for the gallery
					}
				}

				// YouTube Embed
				if (
					element.classList.contains('wp-block-embed') &&
					element.querySelector('iframe[src*="youtube.com"]')
				) {
					const iframe = element.querySelector('iframe');
					const src = iframe.getAttribute('src');
					if (src) {
						contentBlocks.push({
							component: 'YouTubeEmbed',
							props: { src },
						});
						return;
					}
				}
			}

			// Add the outerHTML of the node if it's not a special component
			contentBlocks.push(node.outerHTML);
		});

		return contentBlocks;
	};

	return {
		decodeHtmlEntities,
		sanitizeHtml,
		processContent,
		parseAndTransform,
	};
};
