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
		const sortByOrder = (a, b) => {
			const ao = typeof a.order === 'number' ? a.order : 0;
			const bo = typeof b.order === 'number' ? b.order : 0;
			return ao - bo;
		};

		const dynamicLinks = data.value.primaryMenu.nodes
			.slice()
			.sort(sortByOrder)
			.filter((item) => !item.parentId && item.label.toLowerCase() !== 'home')
			.map((item) => ({
				to: item.uri,
				label: item.label,
				children:
					item.childItems?.nodes
						?.slice()
						.sort(sortByOrder)
						.map((child) => ({
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
			{
				to: 'https://www.threads.com/@idrewfilm?igshid=NTc4MTIwNjQ2YQ==',
				label: 'Threads',
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
		const items = data.value.primaryMenu.nodes
			.slice()
			.sort((a, b) => {
				const ao = typeof a.order === 'number' ? a.order : 0;
				const bo = typeof b.order === 'number' ? b.order : 0;
				return ao - bo;
			})
			.filter((item) => !item.parentId && item.label.toLowerCase() !== 'home');
		const middleIndex = Math.ceil(items.length / 2);
		return items.slice(0, middleIndex).map((item) => ({
			to: item.uri,
			label: item.label,
			children:
				item.childItems?.nodes
					?.slice()
					.sort((a, b) => {
						const ao = typeof a.order === 'number' ? a.order : 0;
						const bo = typeof b.order === 'number' ? b.order : 0;
						return ao - bo;
					})
					.map((child) => ({
						to: child.uri,
						label: child.label,
					})) || [],
		}));
	});

	const rightNavItems = computed(() => {
		if (!data.value?.primaryMenu?.nodes) {
			return [];
		}
		const items = data.value.primaryMenu.nodes
			.slice()
			.sort((a, b) => {
				const ao = typeof a.order === 'number' ? a.order : 0;
				const bo = typeof b.order === 'number' ? b.order : 0;
				return ao - bo;
			})
			.filter((item) => !item.parentId && item.label.toLowerCase() !== 'home');
		const middleIndex = Math.ceil(items.length / 2);
		const staticItems = [
			{
				to: 'https://www.instagram.com/idrewfilm/',
				label: 'Instagram',
				children: [],
				isExternal: true,
			},
			{
				to: 'https://www.threads.com/@idrewfilm?igshid=NTc4MTIwNjQ2YQ==',
				label: 'Threads',
				children: [],
				isExternal: true,
			},
		];
		const dynamicItems =
			items.slice(middleIndex).map((item) => ({
				to: item.uri,
				label: item.label,
				children:
					item.childItems?.nodes
						?.slice()
						.sort((a, b) => {
							const ao = typeof a.order === 'number' ? a.order : 0;
							const bo = typeof b.order === 'number' ? b.order : 0;
							return ao - bo;
						})
						.map((child) => ({
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
