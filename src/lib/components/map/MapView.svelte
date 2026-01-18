<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import type { School, RealEstateListing } from '$lib/supabase/types';

	interface Props {
		schools?: School[];
		listings?: RealEstateListing[];
		selectedSchoolId?: string | null;
		onSchoolClick?: (school: School) => void;
		onListingClick?: (listing: RealEstateListing) => void;
	}

	let {
		schools = [],
		listings = [],
		selectedSchoolId = null,
		onSchoolClick,
		onListingClick
	}: Props = $props();

	// Nashville coordinates
	const NASHVILLE_CENTER: [number, number] = [-86.7816, 36.1627];
	const DEFAULT_ZOOM = 11;

	// Color scheme for school types
	const COLORS = {
		zoned: { fill: '#3b82f6', outline: '#1d4ed8' },
		magnet: { fill: '#8b5cf6', outline: '#6d28d9' },
		charter: { fill: '#f97316', outline: '#c2410c' }
	};

	let mapContainer: HTMLDivElement;
	let map: mapboxgl.Map | null = null;
	let popup: mapboxgl.Popup | null = null;
	let markersLoaded = $state(false);

	// Update markers when schools change
	$effect(() => {
		if (map && map.loaded() && schools.length > 0) {
			addSchoolMarkers();
		}
	});

	// Update listing markers when listings change
	$effect(() => {
		if (map && map.loaded() && listings) {
			addListingMarkers();
		}
	});

	// Highlight selected school
	$effect(() => {
		if (map && markersLoaded && selectedSchoolId) {
			// Could add highlight logic here
		}
	});

	function addSchoolMarkers() {
		if (!map || schools.length === 0) return;

		// Remove existing school layers/sources
		['zoned', 'magnet', 'charter'].forEach((type) => {
			if (map!.getLayer(`${type}-markers`)) map!.removeLayer(`${type}-markers`);
			if (map!.getSource(`${type}-schools`)) map!.removeSource(`${type}-schools`);
		});

		// Group schools by type
		const schoolsByType = {
			zoned: schools.filter((s) => s.type === 'zoned'),
			magnet: schools.filter((s) => s.type === 'magnet'),
			charter: schools.filter((s) => s.type === 'charter')
		};

		Object.entries(schoolsByType).forEach(([type, typeSchools]) => {
			if (typeSchools.length === 0) return;

			const geojson: GeoJSON.FeatureCollection = {
				type: 'FeatureCollection',
				features: typeSchools.map((school) => ({
					type: 'Feature',
					properties: {
						id: school.id,
						name: school.name,
						type: school.type,
						rating: school.greatschools_rating,
						grades: school.grades_served
					},
					geometry: {
						type: 'Point',
						coordinates: [Number(school.lng), Number(school.lat)]
					}
				}))
			};

			map!.addSource(`${type}-schools`, { type: 'geojson', data: geojson });

			map!.addLayer({
				id: `${type}-markers`,
				type: 'circle',
				source: `${type}-schools`,
				paint: {
					'circle-radius': 8,
					'circle-color': COLORS[type as keyof typeof COLORS].fill,
					'circle-stroke-width': 2,
					'circle-stroke-color': '#fff'
				}
			});

			// Click handler
			map!.on('click', `${type}-markers`, (e) => {
				if (e.features && e.features[0]) {
					const props = e.features[0].properties;
					const school = schools.find((s) => s.id === props?.id);
					if (school && onSchoolClick) {
						onSchoolClick(school);
					}
				}
			});

			// Hover popup
			map!.on('mouseenter', `${type}-markers`, (e) => {
				if (!map) return;
				map.getCanvas().style.cursor = 'pointer';

				if (e.features && e.features[0]) {
					const props = e.features[0].properties;
					const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];

					popup = new mapboxgl.Popup({
						closeButton: false,
						closeOnClick: false
					})
						.setLngLat(coordinates)
						.setHTML(`
							<strong>${props?.name}</strong><br/>
							<span class="text-gray-500 text-xs">${(type.charAt(0).toUpperCase() + type.slice(1))} School</span>
							${props?.rating ? `<br/><span class="text-yellow-600">★ ${props.rating}</span>` : ''}
						`)
						.addTo(map);
				}
			});

			map!.on('mouseleave', `${type}-markers`, () => {
				if (!map) return;
				map.getCanvas().style.cursor = '';
				if (popup) {
					popup.remove();
					popup = null;
				}
			});
		});

		markersLoaded = true;
	}

	function addListingMarkers() {
		if (!map || listings.length === 0) return;

		// Remove existing listings layer/source
		if (map.getLayer('listings-markers')) map.removeLayer('listings-markers');
		if (map.getSource('listings')) map.removeSource('listings');

		const geojson: GeoJSON.FeatureCollection = {
			type: 'FeatureCollection',
			features: listings
				.filter((l) => l.lat && l.lng)
				.map((listing) => ({
					type: 'Feature',
					properties: {
						id: listing.id,
						address: listing.address,
						price: listing.price,
						beds: listing.beds,
						baths: listing.baths
					},
					geometry: {
						type: 'Point',
						coordinates: [Number(listing.lng), Number(listing.lat)]
					}
				}))
		};

		map.addSource('listings', { type: 'geojson', data: geojson });

		map.addLayer({
			id: 'listings-markers',
			type: 'circle',
			source: 'listings',
			paint: {
				'circle-radius': 8,
				'circle-color': '#dc2626',
				'circle-stroke-width': 2,
				'circle-stroke-color': '#fff'
			}
		});

		// Click handler
		map.on('click', 'listings-markers', (e) => {
			if (e.features && e.features[0]) {
				const props = e.features[0].properties;
				const listing = listings.find((l) => l.id === props?.id);
				if (listing && onListingClick) {
					onListingClick(listing);
				}
			}
		});

		// Hover popup
		map.on('mouseenter', 'listings-markers', (e) => {
			if (!map) return;
			map.getCanvas().style.cursor = 'pointer';

			if (e.features && e.features[0]) {
				const props = e.features[0].properties;
				const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];

				const price = props?.price ? `$${Number(props.price).toLocaleString()}` : 'Price TBD';

				popup = new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false
				})
					.setLngLat(coordinates)
					.setHTML(`
						<strong>${price}</strong><br/>
						<span class="text-gray-500 text-xs">${props?.beds || '?'} bed, ${props?.baths || '?'} bath</span><br/>
						<span class="text-gray-400 text-xs">${props?.address}</span>
					`)
					.addTo(map);
			}
		});

		map.on('mouseleave', 'listings-markers', () => {
			if (!map) return;
			map.getCanvas().style.cursor = '';
			if (popup) {
				popup.remove();
				popup = null;
			}
		});
	}

	onMount(() => {
		if (!PUBLIC_MAPBOX_TOKEN) {
			console.warn('Mapbox token not configured');
			return;
		}

		mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/light-v11',
			center: NASHVILLE_CENTER,
			zoom: DEFAULT_ZOOM
		});

		map.addControl(new mapboxgl.NavigationControl(), 'top-right');
		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true
			})
		);

		map.on('load', () => {
			addSchoolMarkers();
			addListingMarkers();
		});
	});

	onDestroy(() => {
		if (popup) popup.remove();
		if (map) {
			map.remove();
			map = null;
		}
	});
</script>

<div class="relative w-full h-full min-h-[400px]">
	<div bind:this={mapContainer} class="w-full h-full"></div>
	{#if !PUBLIC_MAPBOX_TOKEN}
		<div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
			<p class="font-medium">Map requires Mapbox token</p>
			<p class="text-sm text-gray-400">Add PUBLIC_MAPBOX_TOKEN to your .env file</p>
		</div>
	{/if}
</div>
