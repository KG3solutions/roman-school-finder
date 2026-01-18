<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MapView from '$lib/components/map/MapView.svelte';
	import SchoolCard from '$lib/components/schools/SchoolCard.svelte';
	import SchoolFilters from '$lib/components/schools/SchoolFilters.svelte';
	import type { School } from '$lib/supabase/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Filter state from URL params
	let selectedDistrict = $derived($page.url.searchParams.get('district') || '');
	let selectedType = $derived($page.url.searchParams.get('type') || '');
	let selectedFocus = $derived($page.url.searchParams.get('focus') || '');

	// Mobile view toggle
	let showMap = $state(true);

	// Filtered schools
	let filteredSchools = $derived.by(() => {
		let result = data.schools;

		if (selectedDistrict) {
			result = result.filter((s) => s.district_id === selectedDistrict);
		}

		if (selectedType) {
			result = result.filter((s) => s.type === selectedType);
		}

		if (selectedFocus) {
			switch (selectedFocus) {
				case 'stem':
					result = result.filter((s) => s.is_stem);
					break;
				case 'montessori':
					result = result.filter((s) => s.is_montessori);
					break;
				case 'language':
					result = result.filter((s) => s.is_language_immersion);
					break;
				case 'arts':
					result = result.filter((s) => s.magnet_focus?.toLowerCase().includes('art'));
					break;
				case 'ib':
					result = result.filter((s) => s.magnet_focus?.toLowerCase().includes('ib'));
					break;
			}
		}

		return result;
	});

	function updateFilter(key: string, value: string) {
		const url = new URL($page.url);
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
		goto(url.toString(), { replaceState: true, noScroll: true });
	}

	function handleSchoolClick(school: School) {
		goto(`/schools/${school.id}`);
	}
</script>

<div class="h-[calc(100vh-8rem)]">
	<!-- Filter Bar -->
	<div class="px-4 py-3 bg-white border-b border-gray-200">
		<SchoolFilters
			districts={data.districts}
			{selectedDistrict}
			{selectedType}
			{selectedFocus}
			onDistrictChange={(v) => updateFilter('district', v)}
			onTypeChange={(v) => updateFilter('type', v)}
			onFocusChange={(v) => updateFilter('focus', v)}
		/>
	</div>

	<!-- Mobile Toggle -->
	<div class="md:hidden flex border-b border-gray-200">
		<button
			type="button"
			class="flex-1 py-2 text-sm font-medium {showMap ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600'}"
			onclick={() => (showMap = true)}
		>
			Map
		</button>
		<button
			type="button"
			class="flex-1 py-2 text-sm font-medium {!showMap ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600'}"
			onclick={() => (showMap = false)}
		>
			List ({filteredSchools.length})
		</button>
	</div>

	<!-- Main Content -->
	<div class="flex h-[calc(100%-7rem)] md:h-[calc(100%-4rem)]">
		<!-- Map (60% on desktop) -->
		<div class="hidden md:block md:w-3/5 h-full {showMap ? 'block w-full' : 'hidden'} md:block">
			<MapView schools={filteredSchools} onSchoolClick={handleSchoolClick} />
		</div>

		<!-- Mobile Map -->
		<div class="md:hidden w-full h-full {showMap ? 'block' : 'hidden'}">
			<MapView schools={filteredSchools} onSchoolClick={handleSchoolClick} />
		</div>

		<!-- List (40% on desktop) -->
		<div class="hidden md:block md:w-2/5 h-full overflow-y-auto border-l border-gray-200 bg-gray-50 {!showMap ? 'block w-full' : 'hidden'} md:block">
			<div class="p-4 space-y-3">
				{#if filteredSchools.length === 0}
					<div class="text-center py-12 text-gray-500">
						<p class="text-lg font-medium">No schools found</p>
						<p class="text-sm mt-1">Try adjusting your filters</p>
					</div>
				{:else}
					<p class="text-sm text-gray-500 mb-3">
						{filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
					</p>
					{#each filteredSchools as school (school.id)}
						<SchoolCard {school} onclick={() => handleSchoolClick(school)} />
					{/each}
				{/if}
			</div>
		</div>

		<!-- Mobile List -->
		<div class="md:hidden w-full h-full overflow-y-auto bg-gray-50 {!showMap ? 'block' : 'hidden'}">
			<div class="p-4 space-y-3">
				{#if filteredSchools.length === 0}
					<div class="text-center py-12 text-gray-500">
						<p class="text-lg font-medium">No schools found</p>
						<p class="text-sm mt-1">Try adjusting your filters</p>
					</div>
				{:else}
					{#each filteredSchools as school (school.id)}
						<SchoolCard {school} onclick={() => handleSchoolClick(school)} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
