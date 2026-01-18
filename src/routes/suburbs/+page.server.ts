import type { PageServerLoad } from './$types';
import type { District } from '$lib/supabase/types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: districts, error } = await locals.supabase
		.from('districts')
		.select('*')
		.eq('type', 'county')
		.order('name') as { data: District[] | null; error: unknown };

	if (error) {
		console.error('Error loading districts:', error);
	}

	// Get school counts per district
	const { data: schools } = await locals.supabase
		.from('schools')
		.select('district_id') as { data: { district_id: string | null }[] | null };

	const schoolCounts: Record<string, number> = {};
	if (schools) {
		schools.forEach((s) => {
			if (s.district_id) {
				schoolCounts[s.district_id] = (schoolCounts[s.district_id] || 0) + 1;
			}
		});
	}

	return {
		districts: districts || [],
		schoolCounts
	};
};
