export const usePhotos = () => {
	// Mock data - replace image URLs with your local images
	const mockPhotos = [
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 2,
			url: '/images/windmill.jpg',
			title: 'Mountain Range',
			location: 'Colorado',
			filmType: 'Fujifilm Pro 400H',
			views: 89,
		},
		{
			id: 1,
			url: '/images/tree.jpg', // Add some images to your public folder
			title: 'Sunset in California',
			location: 'San Francisco',
			filmType: 'Kodak Portra 400',
			views: 156,
		},
		// Add more mock photos as needed
	];

	return {
		mockPhotos,
	};
};
