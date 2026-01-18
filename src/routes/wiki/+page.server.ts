import type { PageServerLoad } from './$types';
import type { WikiPage } from '$lib/supabase/types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: pages, error } = await locals.supabase
		.from('wiki_pages')
		.select('*')
		.eq('is_published', true)
		.order('sort_order') as { data: WikiPage[] | null; error: unknown };

	if (error) {
		console.error('Error loading wiki pages:', error);
	}

	return {
		pages: pages || []
	};
};
