<script lang="ts">
	import WikiSidebar from '$lib/components/wiki/WikiSidebar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="flex flex-col md:flex-row gap-8">
		<!-- Sidebar -->
		<aside class="md:w-64 flex-shrink-0">
			<Card>
				<h2 class="font-semibold text-gray-900 mb-4">Documentation</h2>
				<WikiSidebar pages={data.pages} />
			</Card>
		</aside>

		<!-- Main Content -->
		<main class="flex-1">
			<Card>
				<h1 class="text-3xl font-bold text-gray-900 mb-4">Nashville School Research Wiki</h1>
				<p class="text-gray-600 mb-6">
					Welcome to the Roman School Finder knowledge base. Here you'll find information about
					Nashville area schools, the MNPS lottery system, important deadlines, and resources for
					your kindergarten search.
				</p>

				<div class="grid md:grid-cols-2 gap-4">
					<a href="/wiki/mnps-overview" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
						<h3 class="font-semibold text-gray-900 flex items-center gap-2">
							<span>📋</span> MNPS Overview
						</h3>
						<p class="text-sm text-gray-600 mt-1">Learn about Metro Nashville Public Schools system</p>
					</a>

					<a href="/wiki/lottery-system" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
						<h3 class="font-semibold text-gray-900 flex items-center gap-2">
							<span>🎲</span> Lottery System
						</h3>
						<p class="text-sm text-gray-600 mt-1">How the magnet school lottery works</p>
					</a>

					<a href="/wiki/enrollment-deadlines" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
						<h3 class="font-semibold text-gray-900 flex items-center gap-2">
							<span>📅</span> Key Deadlines
						</h3>
						<p class="text-sm text-gray-600 mt-1">Important dates for 2026-2027 enrollment</p>
					</a>

					<a href="/suburbs" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
						<h3 class="font-semibold text-gray-900 flex items-center gap-2">
							<span>🏘️</span> Surrounding Counties
						</h3>
						<p class="text-sm text-gray-600 mt-1">Explore Williamson, Rutherford, and more</p>
					</a>
				</div>
			</Card>
		</main>
	</div>
</div>
