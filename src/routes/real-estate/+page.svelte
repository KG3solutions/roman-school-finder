<script lang="ts">
	import MapView from '$lib/components/map/MapView.svelte';
	import ListingCard from '$lib/components/real-estate/ListingCard.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import type { RealEstateListing, School } from '$lib/supabase/types';
	import { formatPrice } from '$lib/utils/formatters';
	import type { PageData } from './$types';

	type ListingWithSchool = RealEstateListing & { schools: School | null };

	let { data }: { data: PageData } = $props();

	let selectedListing = $state<ListingWithSchool | null>(null);
	let showMap = $state(true);
	let sortBy = $state<'date' | 'price-asc' | 'price-desc' | 'beds'>('date');

	let sortedListings = $derived.by(() => {
		let result = [...data.listings];

		switch (sortBy) {
			case 'price-asc':
				result.sort((a, b) => (a.price || 0) - (b.price || 0));
				break;
			case 'price-desc':
				result.sort((a, b) => (b.price || 0) - (a.price || 0));
				break;
			case 'beds':
				result.sort((a, b) => (b.beds || 0) - (a.beds || 0));
				break;
			default:
				// date (default from query)
				break;
		}

		return result;
	});

	let favoriteListings = $derived(data.listings.filter((l) => l.is_favorited));

	function handleListingClick(listing: RealEstateListing) {
		selectedListing = listing as ListingWithSchool;
	}
</script>

<div class="h-[calc(100vh-8rem)]">
	{#if data.requiresAuth}
		<div class="flex items-center justify-center h-full">
			<Card class="max-w-md text-center">
				<div class="py-8">
					<span class="text-4xl mb-4 block">🏠</span>
					<h2 class="text-xl font-semibold text-gray-900 mb-2">Sign in to view listings</h2>
					<p class="text-gray-600 mb-6">
						The real estate section helps you track homes based on their zoned schools.
					</p>
					<a
						href="/auth/login?redirect=/real-estate"
						class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
					>
						Sign in with Google
					</a>
				</div>
			</Card>
		</div>
	{:else}
		<!-- Filter Bar -->
		<div class="px-4 py-3 bg-white border-b border-gray-200">
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<label for="sort-listings" class="text-sm font-medium text-gray-700">Sort:</label>
					<select
						id="sort-listings"
						bind:value={sortBy}
						class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white"
					>
						<option value="date">Newest</option>
						<option value="price-asc">Price: Low to High</option>
						<option value="price-desc">Price: High to Low</option>
						<option value="beds">Bedrooms</option>
					</select>
				</div>
				<span class="text-sm text-gray-500">
					{data.listings.length} listing{data.listings.length !== 1 ? 's' : ''}
				</span>
			</div>
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
				List ({sortedListings.length})
			</button>
		</div>

		<!-- Main Content -->
		<div class="flex h-[calc(100%-7rem)] md:h-[calc(100%-4rem)]">
			<!-- Map -->
			<div class="hidden md:block md:w-3/5 h-full">
				<MapView listings={sortedListings} onListingClick={handleListingClick} />
			</div>

			<!-- Mobile Map -->
			<div class="md:hidden w-full h-full {showMap ? 'block' : 'hidden'}">
				<MapView listings={sortedListings} onListingClick={handleListingClick} />
			</div>

			<!-- List -->
			<div class="hidden md:block md:w-2/5 h-full overflow-y-auto border-l border-gray-200 bg-gray-50">
				<div class="p-4 space-y-4">
					{#if favoriteListings.length > 0}
						<div class="mb-6">
							<h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
								<span>❤️</span> Favorites ({favoriteListings.length})
							</h3>
							<div class="space-y-3">
								{#each favoriteListings as listing}
									<ListingCard {listing} onclick={() => handleListingClick(listing)} />
								{/each}
							</div>
						</div>
					{/if}

					{#if sortedListings.length === 0}
						<div class="text-center py-12 text-gray-500">
							<p class="text-lg font-medium">No listings yet</p>
							<p class="text-sm mt-1">Listings from your realtor emails will appear here</p>
						</div>
					{:else}
						{#each sortedListings as listing}
							<ListingCard {listing} onclick={() => handleListingClick(listing)} />
						{/each}
					{/if}
				</div>
			</div>

			<!-- Mobile List -->
			<div class="md:hidden w-full h-full overflow-y-auto bg-gray-50 {!showMap ? 'block' : 'hidden'}">
				<div class="p-4 space-y-3">
					{#each sortedListings as listing}
						<ListingCard {listing} onclick={() => handleListingClick(listing)} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Listing Detail Modal -->
<Modal
	open={!!selectedListing}
	title={selectedListing?.address || 'Listing Details'}
	onclose={() => (selectedListing = null)}
>
	{#if selectedListing}
		<div class="space-y-4">
			<p class="text-2xl font-bold text-gray-900">{formatPrice(selectedListing.price)}</p>

			<div class="flex gap-4 text-gray-600">
				{#if selectedListing.beds}
					<span>{selectedListing.beds} bed</span>
				{/if}
				{#if selectedListing.baths}
					<span>{selectedListing.baths} bath</span>
				{/if}
				{#if selectedListing.sqft}
					<span>{selectedListing.sqft.toLocaleString()} sqft</span>
				{/if}
			</div>

			{#if selectedListing.schools}
				<div class="pt-4 border-t border-gray-200">
					<h4 class="font-medium text-gray-900 mb-2">Zoned School</h4>
					<a
						href="/schools/{selectedListing.zoned_school_id}"
						class="text-blue-600 hover:underline"
					>
						{selectedListing.schools.name}
					</a>
				</div>
			{/if}

			{#if selectedListing.listing_url}
				<a
					href={selectedListing.listing_url}
					target="_blank"
					rel="noopener"
					class="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
				>
					View Listing
				</a>
			{/if}
		</div>
	{/if}
</Modal>
