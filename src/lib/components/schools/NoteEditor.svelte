<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Rating from '$lib/components/ui/Rating.svelte';
	import ThumbsVote from '$lib/components/ui/ThumbsVote.svelte';

	interface Props {
		content?: string;
		rating?: number | null;
		thumbs?: 'up' | 'down' | null;
		isEliminated?: boolean;
		visitScheduled?: string | null;
		onSave: (data: {
			content: string;
			rating: number | null;
			thumbs: 'up' | 'down' | null;
			is_eliminated: boolean;
			visit_scheduled: string | null;
		}) => void;
		onCancel: () => void;
	}

	let {
		content: initialContent = '',
		rating: initialRating = null,
		thumbs: initialThumbs = null,
		isEliminated: initialIsEliminated = false,
		visitScheduled: initialVisitScheduled = null,
		onSave,
		onCancel
	}: Props = $props();

	let content = $state(initialContent);
	let rating = $state<number | null>(initialRating);
	let thumbs = $state<'up' | 'down' | null>(initialThumbs);
	let isEliminated = $state(initialIsEliminated);
	let visitScheduled = $state(initialVisitScheduled || '');

	function handleSave() {
		onSave({
			content,
			rating,
			thumbs,
			is_eliminated: isEliminated,
			visit_scheduled: visitScheduled || null
		});
	}
</script>

<div class="space-y-4">
	<div>
		<label for="note-content" class="block text-sm font-medium text-gray-700 mb-1">
			Your Notes
		</label>
		<textarea
			id="note-content"
			bind:value={content}
			rows="4"
			class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Add your thoughts about this school..."
		></textarea>
	</div>

	<div class="flex flex-wrap items-center gap-6">
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
			<Rating value={rating || 0} onchange={(v) => (rating = v)} />
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">Quick Vote</label>
			<ThumbsVote value={thumbs} onchange={(v) => (thumbs = v)} />
		</div>
	</div>

	<div class="flex flex-wrap items-center gap-6">
		<div>
			<label for="visit-date" class="block text-sm font-medium text-gray-700 mb-1">
				Schedule Visit
			</label>
			<input
				type="date"
				id="visit-date"
				bind:value={visitScheduled}
				class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>

		<div class="flex items-center gap-2">
			<input
				type="checkbox"
				id="is-eliminated"
				bind:checked={isEliminated}
				class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
			/>
			<label for="is-eliminated" class="text-sm text-gray-700">
				Mark as eliminated
			</label>
		</div>
	</div>

	<div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
		<Button variant="ghost" onclick={onCancel}>Cancel</Button>
		<Button onclick={handleSave}>Save Note</Button>
	</div>
</div>
