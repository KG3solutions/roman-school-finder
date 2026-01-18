<script lang="ts">
	import { page } from '$app/stores';
	import type { WikiPage } from '$lib/supabase/types';

	interface Props {
		pages: WikiPage[];
	}

	let { pages }: Props = $props();

	const categories = [
		{ id: 'mnps-rules', label: 'MNPS Rules', icon: '📋' },
		{ id: 'lottery', label: 'Lottery System', icon: '🎲' },
		{ id: 'deadlines', label: 'Key Deadlines', icon: '📅' },
		{ id: 'resources', label: 'Resources', icon: '📚' },
		{ id: 'county-info', label: 'County Info', icon: '🗺️' }
	];

	function getPagesByCategory(category: string): WikiPage[] {
		return pages
			.filter((p) => p.category === category)
			.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
	}

	function isActive(slug: string): boolean {
		return $page.url.pathname === `/wiki/${slug}`;
	}
</script>

<nav class="space-y-6">
	{#each categories as category}
		{@const categoryPages = getPagesByCategory(category.id)}
		{#if categoryPages.length > 0}
			<div>
				<h3 class="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
					<span>{category.icon}</span>
					<span>{category.label}</span>
				</h3>
				<ul class="space-y-1">
					{#each categoryPages as wikiPage}
						<li>
							<a
								href="/wiki/{wikiPage.slug}"
								class="block px-3 py-1.5 text-sm rounded-lg transition-colors
									{isActive(wikiPage.slug)
										? 'bg-blue-50 text-blue-700 font-medium'
										: 'text-gray-600 hover:bg-gray-100'}"
							>
								{wikiPage.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/each}
</nav>
