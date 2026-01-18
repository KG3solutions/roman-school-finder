<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Rating from '$lib/components/ui/Rating.svelte';
	import { formatDate, formatDateRelative } from '$lib/utils/formatters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let sortBy = $state<'newest' | 'oldest' | 'rating' | 'thumbs'>('newest');
	let showEliminated = $state(true);
	let showScheduledVisits = $state(false);

	let filteredNotes = $derived.by(() => {
		let result = data.notes;

		if (!showEliminated) {
			result = result.filter((n) => !n.is_eliminated);
		}

		if (showScheduledVisits) {
			result = result.filter((n) => n.visit_scheduled);
		}

		// Sort
		switch (sortBy) {
			case 'oldest':
				result = [...result].sort((a, b) =>
					new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
				);
				break;
			case 'rating':
				result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
			case 'thumbs':
				result = [...result].filter((n) => n.thumbs === 'up');
				break;
			default:
				// newest first (default from query)
				break;
		}

		return result;
	});
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">My Notes</h1>
			<p class="text-gray-600 mt-1">
				{data.notes.length} note{data.notes.length !== 1 ? 's' : ''} across all schools
			</p>
		</div>
	</div>

	<!-- Filters -->
	<Card class="mb-6">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-2">
				<label for="sort-by" class="text-sm font-medium text-gray-700">Sort:</label>
				<select
					id="sort-by"
					bind:value={sortBy}
					class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white"
				>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
					<option value="rating">Highest Rating</option>
					<option value="thumbs">Thumbs Up Only</option>
				</select>
			</div>

			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={showEliminated} class="rounded" />
				<span>Show eliminated</span>
			</label>

			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={showScheduledVisits} class="rounded" />
				<span>Scheduled visits only</span>
			</label>
		</div>
	</Card>

	<!-- Notes List -->
	{#if filteredNotes.length === 0}
		<Card>
			<div class="text-center py-12 text-gray-500">
				<p class="text-lg font-medium">No notes found</p>
				<p class="text-sm mt-1">
					{#if data.notes.length > 0}
						Try adjusting your filters
					{:else}
						Start by adding notes to schools you're researching
					{/if}
				</p>
			</div>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each filteredNotes as note}
				<a href="/schools/{note.school_id}" class="block">
					<Card class="hover:border-blue-300 hover:shadow-md transition-all">
						<div class="flex items-start justify-between gap-4">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<h3 class="font-semibold text-gray-900">
										{note.schools?.name || 'Unknown School'}
									</h3>
									{#if note.is_eliminated}
										<Badge variant="charter">Eliminated</Badge>
									{/if}
								</div>

								<p class="text-gray-700 mb-3">{note.content}</p>

								<div class="flex items-center gap-4 text-sm">
									{#if note.rating}
										<Rating value={note.rating} readonly size="sm" />
									{/if}
									{#if note.thumbs === 'up'}
										<span class="text-green-600">👍 Positive</span>
									{:else if note.thumbs === 'down'}
										<span class="text-red-600">👎 Negative</span>
									{/if}
									{#if note.visit_scheduled}
										<span class="text-blue-600">📅 Visit: {formatDate(note.visit_scheduled)}</span>
									{/if}
									{#if note.visited_date}
										<span class="text-green-600">✓ Visited {formatDate(note.visited_date)}</span>
									{/if}
								</div>
							</div>

							<div class="text-right text-sm text-gray-400">
								{formatDateRelative(note.created_at)}
							</div>
						</div>
					</Card>
				</a>
			{/each}
		</div>
	{/if}
</div>
