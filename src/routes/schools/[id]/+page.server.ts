import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { School, District, SchoolNote, SavedSchool } from '$lib/supabase/types';

type SchoolWithDistrict = School & { districts: District | null };

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data: school, error: schoolError } = await locals.supabase
		.from('schools')
		.select('*, districts(*)')
		.eq('id', params.id)
		.single() as { data: SchoolWithDistrict | null; error: unknown };

	if (schoolError || !school) {
		throw error(404, 'School not found');
	}

	// Get user's notes if authenticated
	let notes: SchoolNote[] = [];
	let savedStatus: SavedSchool | null = null;

	if (locals.user) {
		const { data: userNotes } = await locals.supabase
			.from('school_notes')
			.select('*')
			.eq('school_id', params.id)
			.eq('user_id', locals.user.id)
			.order('created_at', { ascending: false }) as { data: SchoolNote[] | null; error: unknown };

		notes = userNotes || [];

		const { data: saved } = await locals.supabase
			.from('saved_schools')
			.select('*')
			.eq('school_id', params.id)
			.eq('user_id', locals.user.id)
			.single() as { data: SavedSchool | null; error: unknown };

		savedStatus = saved;
	}

	return {
		school,
		notes,
		savedStatus
	};
};
