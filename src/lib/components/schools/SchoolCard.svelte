<script lang="ts">
	import type { School } from '$lib/supabase/types';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Rating from '$lib/components/ui/Rating.svelte';

	interface Props {
		school: School;
		onclick?: () => void;
	}

	let { school, onclick }: Props = $props();

	function getBadgeVariant(type: string | null): 'zoned' | 'magnet' | 'charter' | 'default' {
		if (type === 'zoned') return 'zoned';
		if (type === 'magnet') return 'magnet';
		if (type === 'charter') return 'charter';
		return 'default';
	}
</script>

<button
	type="button"
	class="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all"
	onclick={onclick}
>
	<div class="flex items-start justify-between gap-3">
		<div class="flex-1 min-w-0">
			<h3 class="font-semibold text-gray-900 truncate">{school.name}</h3>

			<div class="flex flex-wrap items-center gap-2 mt-1.5">
				{#if school.type}
					<Badge variant={getBadgeVariant(school.type)}>
						{school.type.charAt(0).toUpperCase() + school.type.slice(1)}
					</Badge>
				{/if}
				{#if school.is_stem}
					<Badge variant="stem">STEM</Badge>
				{/if}
				{#if school.is_montessori}
					<Badge variant="montessori">Montessori</Badge>
				{/if}
				{#if school.is_language_immersion}
					<Badge variant="language">{school.language_program || 'Language'}</Badge>
				{/if}
			</div>

			{#if school.address}
				<p class="text-sm text-gray-500 mt-2 truncate">{school.address}</p>
			{/if}

			{#if school.grades_served}
				<p class="text-sm text-gray-500">Grades: {school.grades_served}</p>
			{/if}
		</div>

		<div class="flex flex-col items-end gap-1">
			{#if school.greatschools_rating}
				<div class="flex items-center gap-1">
					<Rating value={Math.round(school.greatschools_rating)} max={10} readonly size="sm" />
					<span class="text-sm font-medium text-gray-700">{school.greatschools_rating}</span>
				</div>
			{/if}
			{#if school.student_count}
				<p class="text-xs text-gray-400">{school.student_count} students</p>
			{/if}
		</div>
	</div>
</button>
