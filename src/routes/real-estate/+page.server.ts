import type { PageServerLoad } from './$types';
import type { RealEstateListing, School } from '$lib/supabase/types';

type ListingWithSchool = RealEstateListing & { schools: School | null };

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return {
			listings: [] as ListingWithSchool[],
			requiresAuth: true
		};
	}

	const { data: listings, error } = await locals.supabase
		.from('real_estate_listings')
		.select('*, schools(*)')
		.order('created_at', { ascending: false }) as { data: ListingWithSchool[] | null; error: unknown };

	if (error) {
		console.error('Error loading listings:', error);
	}

	return {
		listings: listings || [],
		requiresAuth: false
	};
};
