import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SchoolNote, School } from '$lib/supabase/types';

type NoteWithSchool = SchoolNote & { schools: School | null };

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/auth/login?redirect=/notes');
	}

	const { data: notes, error } = await locals.supabase
		.from('school_notes')
		.select('*, schools(*)')
		.eq('user_id', locals.user.id)
		.order('created_at', { ascending: false }) as { data: NoteWithSchool[] | null; error: unknown };

	if (error) {
		console.error('Error loading notes:', error);
	}

	return {
		notes: notes || []
	};
};
