<script lang="ts">
	import type { District } from '$lib/supabase/types';

	interface Props {
		districts?: District[];
		selectedDistrict: string;
		selectedType: string;
		selectedFocus: string;
		onDistrictChange: (value: string) => void;
		onTypeChange: (value: string) => void;
		onFocusChange: (value: string) => void;
	}

	let {
		districts = [],
		selectedDistrict,
		selectedType,
		selectedFocus,
		onDistrictChange,
		onTypeChange,
		onFocusChange
	}: Props = $props();

	const schoolTypes = [
		{ value: '', label: 'All Types' },
		{ value: 'zoned', label: 'Zoned' },
		{ value: 'magnet', label: 'Magnet' },
		{ value: 'charter', label: 'Charter' }
	];

	const focusOptions = [
		{ value: '', label: 'All Focus Areas' },
		{ value: 'stem', label: 'STEM' },
		{ value: 'arts', label: 'Arts' },
		{ value: 'montessori', label: 'Montessori' },
		{ value: 'language', label: 'Language Immersion' },
		{ value: 'ib', label: 'IB Programme' }
	];
</script>

<div class="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-lg">
	<div class="flex items-center gap-2">
		<label for="district-filter" class="text-sm font-medium text-gray-700">District:</label>
		<select
			id="district-filter"
			class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			value={selectedDistrict}
			onchange={(e) => onDistrictChange(e.currentTarget.value)}
		>
			<option value="">All Districts</option>
			{#each districts as district}
				<option value={district.id}>{district.name}</option>
			{/each}
		</select>
	</div>

	<div class="flex items-center gap-2">
		<label for="type-filter" class="text-sm font-medium text-gray-700">Type:</label>
		<select
			id="type-filter"
			class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			value={selectedType}
			onchange={(e) => onTypeChange(e.currentTarget.value)}
		>
			{#each schoolTypes as type}
				<option value={type.value}>{type.label}</option>
			{/each}
		</select>
	</div>

	<div class="flex items-center gap-2">
		<label for="focus-filter" class="text-sm font-medium text-gray-700">Focus:</label>
		<select
			id="focus-filter"
			class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			value={selectedFocus}
			onchange={(e) => onFocusChange(e.currentTarget.value)}
		>
			{#each focusOptions as focus}
				<option value={focus.value}>{focus.label}</option>
			{/each}
		</select>
	</div>
</div>
