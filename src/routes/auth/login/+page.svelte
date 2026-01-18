<script lang="ts">
	import { page } from '$app/stores';
	import { createSupabaseClient } from '$lib/supabase/client';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const supabase = createSupabaseClient();
	let loading = $state(false);
	let error = $state('');

	const redirectTo = $page.url.searchParams.get('redirect') || '/schools';

	async function signInWithGoogle() {
		loading = true;
		error = '';

		const { error: authError } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
			}
		});

		if (authError) {
			error = authError.message;
			loading = false;
		}
	}
</script>

<div class="min-h-[60vh] flex items-center justify-center px-4">
	<Card class="max-w-md w-full">
		<div class="text-center py-8">
			<span class="text-5xl mb-4 block">🏫</span>
			<h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome to Roman School Finder</h1>
			<p class="text-gray-600 mb-8">
				Sign in to save notes, track your favorites, and manage your school research.
			</p>

			{#if error}
				<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
					{error}
				</div>
			{/if}

			<Button onclick={signInWithGoogle} class="w-full" disabled={loading}>
				{#if loading}
					<span class="animate-spin mr-2">⏳</span>
				{:else}
					<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
					</svg>
				{/if}
				Continue with Google
			</Button>

			<p class="mt-6 text-xs text-gray-500">
				By signing in, you agree to our terms of service and privacy policy.
			</p>
		</div>
	</Card>
</div>
