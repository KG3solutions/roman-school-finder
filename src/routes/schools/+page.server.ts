import type { PageServerLoad } from './$types';
import type { School, District } from '$lib/supabase/types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: schools, error: schoolsError } = await locals.supabase
		.from('schools')
		.select('*')
		.order('name') as { data: School[] | null; error: unknown };

	const { data: districts, error: districtsError } = await locals.supabase
		.from('districts')
		.select('*')
		.order('name') as { data: District[] | null; error: unknown };

	if (schoolsError) {
		console.error('Error loading schools:', schoolsError);
	}

	if (districtsError) {
		console.error('Error loading districts:', districtsError);
	}

	return {
		schools: schools || [],
		districts: districts || []
	};
};
