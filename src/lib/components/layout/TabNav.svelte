<script lang="ts">
	import { page } from '$app/stores';

	const tabs = [
		{ href: '/wiki', label: 'Wiki', icon: '📚' },
		{ href: '/schools', label: 'Research', icon: '🏫' },
		{ href: '/suburbs', label: 'Suburbs', icon: '🏘️' },
		{ href: '/notes', label: 'Notes', icon: '📝' },
		{ href: '/real-estate', label: 'Real Estate', icon: '🏠' }
	];

	function isActive(href: string): boolean {
		const pathname = $page.url.pathname;
		if (href === '/schools') {
			return pathname === '/schools' || pathname.startsWith('/schools/');
		}
		return pathname.startsWith(href);
	}
</script>

<nav class="flex items-center gap-1">
	{#each tabs as tab}
		<a
			href={tab.href}
			class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
				{isActive(tab.href)
					? 'bg-blue-50 text-blue-700'
					: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
		>
			<span class="text-base">{tab.icon}</span>
			<span>{tab.label}</span>
		</a>
	{/each}
</nav>
