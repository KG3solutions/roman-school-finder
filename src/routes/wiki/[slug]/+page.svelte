<script lang="ts">
	import WikiSidebar from '$lib/components/wiki/WikiSidebar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.title} - Roman School Finder</title>
</svelte:head>

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
				<article class="prose prose-gray max-w-none">
					<h1>{data.page.title}</h1>
					<!-- Render markdown content -->
					<!-- For now, just render as text. You could add a markdown renderer later -->
					{@html data.page.content.replace(/\n/g, '<br>')}
				</article>
			</Card>
		</main>
	</div>
</div>
