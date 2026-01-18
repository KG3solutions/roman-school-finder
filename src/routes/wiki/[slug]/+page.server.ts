import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { WikiPage } from '$lib/supabase/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data: page, error: pageError } = await locals.supabase
		.from('wiki_pages')
		.select('*')
		.eq('slug', params.slug)
		.eq('is_published', true)
		.single() as { data: WikiPage | null; error: unknown };

	if (pageError || !page) {
		throw error(404, 'Page not found');
	}

	// Get all pages for sidebar
	const { data: allPages } = await locals.supabase
		.from('wiki_pages')
		.select('*')
		.eq('is_published', true)
		.order('sort_order') as { data: WikiPage[] | null; error: unknown };

	return {
		page,
		pages: allPages || []
	};
};
