// Haversine formula to calculate distance between two coordinates
export function calculateDistance(
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number
): number {
	const R = 3959; // Earth's radius in miles
	const dLat = toRad(lat2 - lat1);
	const dLng = toRad(lng2 - lng1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

function toRad(deg: number): number {
	return deg * (Math.PI / 180);
}

export function formatDistance(miles: number): string {
	if (miles < 0.1) return '< 0.1 mi';
	if (miles < 10) return `${miles.toFixed(1)} mi`;
	return `${Math.round(miles)} mi`;
}

// Nashville center coordinates
export const NASHVILLE_CENTER = {
	lat: 36.1627,
	lng: -86.7816
};

// Calculate bounding box from center point and radius (in miles)
export function getBoundingBox(
	centerLat: number,
	centerLng: number,
	radiusMiles: number
): { minLat: number; maxLat: number; minLng: number; maxLng: number } {
	const latDelta = radiusMiles / 69; // ~69 miles per degree of latitude
	const lngDelta = radiusMiles / (69 * Math.cos(toRad(centerLat)));

	return {
		minLat: centerLat - latDelta,
		maxLat: centerLat + latDelta,
		minLng: centerLng - lngDelta,
		maxLng: centerLng + lngDelta
	};
}
