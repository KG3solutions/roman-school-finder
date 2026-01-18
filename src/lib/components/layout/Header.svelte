<script lang="ts">
	import { page } from '$app/stores';
	import TabNav from './TabNav.svelte';
	import type { User } from '@supabase/supabase-js';

	interface Props {
		user: User | null;
	}

	let { user }: Props = $props();
	let showUserMenu = $state(false);

	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}
</script>

<header class="bg-white border-b border-gray-200 sticky top-0 z-40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<span class="text-2xl">🏫</span>
				<span class="font-bold text-gray-900 text-lg hidden sm:block">Roman School Finder</span>
			</a>

			<!-- Tab Navigation (desktop) -->
			<div class="hidden md:block">
				<TabNav />
			</div>

			<!-- User Menu / Auth -->
			<div class="relative">
				{#if user}
					<button
						type="button"
						class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
						onclick={toggleUserMenu}
					>
						{#if user.user_metadata?.avatar_url}
							<img
								src={user.user_metadata.avatar_url}
								alt=""
								class="w-8 h-8 rounded-full"
							/>
						{:else}
							<div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
								{(user.email?.[0] || 'U').toUpperCase()}
							</div>
						{/if}
						<svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if showUserMenu}
						<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
						<div class="fixed inset-0" onclick={closeUserMenu}></div>
						<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
							<div class="px-4 py-2 border-b border-gray-100">
								<p class="text-sm font-medium text-gray-900 truncate">
									{user.user_metadata?.full_name || user.email}
								</p>
								<p class="text-xs text-gray-500 truncate">{user.email}</p>
							</div>
							<a
								href="/auth/logout"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								data-sveltekit-preload-data="off"
							>
								Sign out
							</a>
						</div>
					{/if}
				{:else}
					<a
						href="/auth/login"
						class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
						</svg>
						<span class="hidden sm:inline">Sign in</span>
					</a>
				{/if}
			</div>
		</div>

		<!-- Tab Navigation (mobile) -->
		<div class="md:hidden pb-2 -mx-4 px-4 overflow-x-auto">
			<TabNav />
		</div>
	</div>
</header>
