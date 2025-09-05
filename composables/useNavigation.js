import { ref, computed } from 'vue';
import getMenu from '~/queries/menu.gql';

export const useNavigation = () => {
	const { data, pending, error } = useAsyncQuery({
		query: getMenu,
	});

	const navigationLinks = computed(() => {
		if (!data.value?.primaryMenu?.nodes) {
			return [];
		}
		const dynamicLinks = data.value.primaryMenu.nodes
			.filter((item) => item.label.toLowerCase() !== 'home')
			.map((item) => ({
				to: item.uri,
				label: item.label,
				children:
					item.childItems?.nodes?.map((child) => ({
						to: child.uri,
						label: child.label,
					})) || [],
			}));

		const staticItems = [
			{
				to: 'https://www.instagram.com/idrewfilm/',
				label: 'Instagram',
				children: [],
				isExternal: true,
			},
		];

		return [...dynamicLinks, ...staticItems];
	});

	const leftNavItems = computed(() => {
		if (!data.value?.primaryMenu?.nodes) {
			return [];
		}
		const items = data.value.primaryMenu.nodes.filter(
			(item) => item.label.toLowerCase() !== 'home'
		);
		const middleIndex = Math.ceil(items.length / 2);
		return items.slice(0, middleIndex).map((item) => ({
			to: item.uri,
			label: item.label,
			children:
				item.childItems?.nodes?.map((child) => ({
					to: child.uri,
					label: child.label,
				})) || [],
		}));
	});

	const rightNavItems = computed(() => {
		if (!data.value?.primaryMenu?.nodes) {
			return [];
		}
		const items = data.value.primaryMenu.nodes.filter(
			(item) => item.label.toLowerCase() !== 'home'
		);
		const middleIndex = Math.ceil(items.length / 2);
		const staticItems = [
			{
				to: 'https://www.instagram.com/idrewfilm/',
				label: 'Instagram',
				children: [],
				isExternal: true,
			},
		];
		const dynamicItems =
			items.slice(middleIndex).map((item) => ({
				to: item.uri,
				label: item.label,
				children:
					item.childItems?.nodes?.map((child) => ({
						to: child.uri,
						label: child.label,
					})) || [],
			})) || [];
		return [...dynamicItems, ...staticItems];
	});

	return {
		data,
		pending,
		error,
		navigationLinks,
		leftNavItems,
		rightNavItems,
	};
};
