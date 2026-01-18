<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { formatPrice } from '$lib/utils/formatters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getAffordabilityBadge(price: number | null): { label: string; class: string } {
		if (!price) return { label: 'N/A', class: 'bg-gray-100 text-gray-600' };
		if (price < 350000) return { label: 'Affordable', class: 'bg-green-100 text-green-700' };
		if (price < 500000) return { label: 'Moderate', class: 'bg-yellow-100 text-yellow-700' };
		if (price < 700000) return { label: 'Expensive', class: 'bg-orange-100 text-orange-700' };
		return { label: 'Premium', class: 'bg-red-100 text-red-700' };
	}
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Nashville Suburbs</h1>
		<p class="text-gray-600 mt-2">
			Explore school districts in counties surrounding Nashville. Each county has its own school system
			with different options, ratings, and home prices.
		</p>
	</div>

	{#if data.districts.length === 0}
		<Card>
			<div class="text-center py-12 text-gray-500">
				<p class="text-lg font-medium">No county data yet</p>
				<p class="text-sm mt-1">District information will be added soon.</p>
			</div>
		</Card>
	{:else}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.districts as district}
				{@const schoolCount = data.schoolCounts[district.id] || 0}
				{@const affordability = getAffordabilityBadge(district.median_home_price)}

				<a
					href="/schools?district={district.id}"
					class="block"
				>
					<Card class="h-full hover:border-blue-300 hover:shadow-md transition-all">
						<div class="flex items-start justify-between mb-4">
							<div>
								<h2 class="text-xl font-semibold text-gray-900">{district.name}</h2>
								<p class="text-sm text-gray-500">{district.county} County</p>
							</div>
							<span class="px-2 py-1 text-xs font-medium rounded-full {affordability.class}">
								{affordability.label}
							</span>
						</div>

						<div class="space-y-3">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Schools</span>
								<span class="font-medium text-gray-900">{schoolCount}</span>
							</div>

							{#if district.greatschools_rating}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Avg. Rating</span>
									<span class="font-medium text-yellow-600">
										★ {district.greatschools_rating}/10
									</span>
								</div>
							{/if}

							{#if district.avg_test_score_math || district.avg_test_score_reading}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Test Scores</span>
									<span class="font-medium text-gray-900">
										{#if district.avg_test_score_math}Math: {district.avg_test_score_math}%{/if}
										{#if district.avg_test_score_reading}, Read: {district.avg_test_score_reading}%{/if}
									</span>
								</div>
							{/if}

							{#if district.median_home_price}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Median Home Price</span>
									<span class="font-medium text-gray-900">
										{formatPrice(district.median_home_price)}
									</span>
								</div>
							{/if}
						</div>

						{#if district.website}
							<div class="mt-4 pt-4 border-t border-gray-100">
								<span class="text-sm text-blue-600">View schools →</span>
							</div>
						{/if}
					</Card>
				</a>
			{/each}
		</div>
	{/if}
</div>
