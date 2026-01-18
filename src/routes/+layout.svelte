<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createSupabaseClient } from '$lib/supabase/client';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	const supabase = createSupabaseClient();

	onMount(() => {
		const { data: authData } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => authData.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Roman School Finder</title>
	<meta name="description" content="Nashville area kindergarten school research tool" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header user={data.user} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
