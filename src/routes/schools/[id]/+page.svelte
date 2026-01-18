<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { createSupabaseClient } from '$lib/supabase/client';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Rating from '$lib/components/ui/Rating.svelte';
	import NoteEditor from '$lib/components/schools/NoteEditor.svelte';
	import { formatDate } from '$lib/utils/formatters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const supabase = createSupabaseClient();
	let showNoteEditor = $state(false);
	let saving = $state(false);

	function getBadgeVariant(type: string | null): 'zoned' | 'magnet' | 'charter' | 'default' {
		if (type === 'zoned') return 'zoned';
		if (type === 'magnet') return 'magnet';
		if (type === 'charter') return 'charter';
		return 'default';
	}

	async function handleSaveNote(noteData: any) {
		if (!data.user) return;

		saving = true;
		const { error } = await supabase.from('school_notes').insert({
			school_id: data.school.id,
			user_id: data.user.id,
			...noteData
		});

		if (error) {
			console.error('Error saving note:', error);
		} else {
			showNoteEditor = false;
			invalidateAll();
		}
		saving = false;
	}

	async function handleSaveToList(listType: 'favorite' | 'interested' | 'eliminated' | 'applied') {
		if (!data.user) return;

		if (data.savedStatus) {
			// Update existing
			await (supabase
				.from('saved_schools') as any)
				.update({ list_type: listType })
				.eq('id', data.savedStatus.id);
		} else {
			// Insert new
			await (supabase.from('saved_schools') as any).insert({
				school_id: data.school.id,
				user_id: data.user.id,
				list_type: listType
			});
		}
		invalidateAll();
	}

	async function handleRemoveFromList() {
		if (!data.savedStatus) return;
		await supabase.from('saved_schools').delete().eq('id', data.savedStatus.id);
		invalidateAll();
	}
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
	<!-- Back Link -->
	<a href="/schools" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
		<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to schools
	</a>

	<!-- Header -->
	<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">{data.school.name}</h1>
			<div class="flex flex-wrap items-center gap-2 mt-2">
				{#if data.school.type}
					<Badge variant={getBadgeVariant(data.school.type)} size="md">
						{data.school.type.charAt(0).toUpperCase() + data.school.type.slice(1)}
					</Badge>
				{/if}
				{#if data.school.is_stem}
					<Badge variant="stem" size="md">STEM</Badge>
				{/if}
				{#if data.school.is_montessori}
					<Badge variant="montessori" size="md">Montessori</Badge>
				{/if}
				{#if data.school.is_language_immersion}
					<Badge variant="language" size="md">{data.school.language_program || 'Language'}</Badge>
				{/if}
			</div>
		</div>

		{#if data.school.greatschools_rating}
			<div class="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
				<span class="text-2xl font-bold text-yellow-600">{data.school.greatschools_rating}</span>
				<span class="text-sm text-gray-600">/10 GreatSchools</span>
			</div>
		{/if}
	</div>

	<!-- Main Info Grid -->
	<div class="grid md:grid-cols-2 gap-6 mb-8">
		<Card>
			<h2 class="font-semibold text-gray-900 mb-4">School Information</h2>
			<dl class="space-y-3 text-sm">
				{#if data.school.address}
					<div>
						<dt class="text-gray-500">Address</dt>
						<dd class="text-gray-900">{data.school.address}</dd>
					</div>
				{/if}
				{#if data.school.grades_served}
					<div>
						<dt class="text-gray-500">Grades Served</dt>
						<dd class="text-gray-900">{data.school.grades_served}</dd>
					</div>
				{/if}
				{#if data.school.student_count}
					<div>
						<dt class="text-gray-500">Students</dt>
						<dd class="text-gray-900">{data.school.student_count.toLocaleString()}</dd>
					</div>
				{/if}
				{#if data.school.student_teacher_ratio}
					<div>
						<dt class="text-gray-500">Student-Teacher Ratio</dt>
						<dd class="text-gray-900">{data.school.student_teacher_ratio}:1</dd>
					</div>
				{/if}
				{#if data.school.phone}
					<div>
						<dt class="text-gray-500">Phone</dt>
						<dd class="text-gray-900">{data.school.phone}</dd>
					</div>
				{/if}
				{#if data.school.website}
					<div>
						<dt class="text-gray-500">Website</dt>
						<dd>
							<a href={data.school.website} target="_blank" rel="noopener" class="text-blue-600 hover:underline">
								Visit website
							</a>
						</dd>
					</div>
				{/if}
			</dl>
		</Card>

		<Card>
			<h2 class="font-semibold text-gray-900 mb-4">Programs & Features</h2>
			<dl class="space-y-3 text-sm">
				{#if data.school.calendar_type}
					<div>
						<dt class="text-gray-500">Calendar</dt>
						<dd class="text-gray-900 capitalize">{data.school.calendar_type}</dd>
					</div>
				{/if}
				{#if data.school.magnet_focus}
					<div>
						<dt class="text-gray-500">Magnet Focus</dt>
						<dd class="text-gray-900">{data.school.magnet_focus}</dd>
					</div>
				{/if}
				<div class="flex flex-wrap gap-2 pt-2">
					{#if data.school.transportation_provided}
						<span class="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Transportation</span>
					{/if}
					{#if data.school.before_after_care}
						<span class="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Before/After Care</span>
					{/if}
					{#if data.school.uniform_required}
						<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Uniforms Required</span>
					{/if}
				</div>
			</dl>
		</Card>
	</div>

	<!-- Save to List Buttons -->
	{#if data.user}
		<Card class="mb-8">
			<h2 class="font-semibold text-gray-900 mb-4">Save to List</h2>
			<div class="flex flex-wrap gap-2">
				<Button
					variant={data.savedStatus?.list_type === 'favorite' ? 'primary' : 'secondary'}
					onclick={() => handleSaveToList('favorite')}
				>
					{data.savedStatus?.list_type === 'favorite' ? '★' : '☆'} Favorite
				</Button>
				<Button
					variant={data.savedStatus?.list_type === 'interested' ? 'primary' : 'secondary'}
					onclick={() => handleSaveToList('interested')}
				>
					Interested
				</Button>
				<Button
					variant={data.savedStatus?.list_type === 'applied' ? 'primary' : 'secondary'}
					onclick={() => handleSaveToList('applied')}
				>
					Applied
				</Button>
				<Button
					variant={data.savedStatus?.list_type === 'eliminated' ? 'danger' : 'ghost'}
					onclick={() => handleSaveToList('eliminated')}
				>
					Eliminate
				</Button>
				{#if data.savedStatus}
					<Button variant="ghost" onclick={handleRemoveFromList}>
						Remove from lists
					</Button>
				{/if}
			</div>
		</Card>
	{/if}

	<!-- Notes Section -->
	<Card>
		<div class="flex items-center justify-between mb-4">
			<h2 class="font-semibold text-gray-900">My Notes</h2>
			{#if data.user && !showNoteEditor}
				<Button onclick={() => (showNoteEditor = true)}>Add Note</Button>
			{/if}
		</div>

		{#if !data.user}
			<p class="text-gray-500 text-center py-8">
				<a href="/auth/login" class="text-blue-600 hover:underline">Sign in</a> to add notes about this school.
			</p>
		{:else if showNoteEditor}
			<NoteEditor
				onSave={handleSaveNote}
				onCancel={() => (showNoteEditor = false)}
			/>
		{:else if data.notes.length === 0}
			<p class="text-gray-500 text-center py-8">
				No notes yet. Add your first note about this school!
			</p>
		{:else}
			<div class="space-y-4">
				{#each data.notes as note}
					<div class="border-b border-gray-100 pb-4 last:border-0">
						<div class="flex items-center gap-3 mb-2">
							{#if note.rating}
								<Rating value={note.rating} readonly size="sm" />
							{/if}
							{#if note.thumbs === 'up'}
								<span class="text-green-600">👍</span>
							{:else if note.thumbs === 'down'}
								<span class="text-red-600">👎</span>
							{/if}
							{#if note.is_eliminated}
								<Badge variant="charter">Eliminated</Badge>
							{/if}
						</div>
						<p class="text-gray-700">{note.content}</p>
						<p class="text-xs text-gray-400 mt-2">{formatDate(note.created_at)}</p>
					</div>
				{/each}
			</div>
		{/if}
	</Card>
</div>
