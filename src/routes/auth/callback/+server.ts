import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const redirectTo = url.searchParams.get('redirect') || '/schools';

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (error) {
			console.error('Auth callback error:', error);
			throw redirect(303, '/auth/login?error=callback_failed');
		}
	}

	throw redirect(303, redirectTo);
};
