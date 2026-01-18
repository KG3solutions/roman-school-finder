<script lang="ts">
	import type { RealEstateListing } from '$lib/supabase/types';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		listing: RealEstateListing;
		onclick?: () => void;
	}

	let { listing, onclick }: Props = $props();

	function formatPrice(price: number | null): string {
		if (!price) return 'Price TBD';
		return `$${price.toLocaleString()}`;
	}
</script>

<button type="button" class="w-full text-left" onclick={onclick}>
	<Card class="hover:border-blue-300 hover:shadow-md transition-all">
		<div class="flex gap-4">
			{#if listing.image_url}
				<img
					src={listing.image_url}
					alt=""
					class="w-24 h-24 object-cover rounded-lg flex-shrink-0"
				/>
			{:else}
				<div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
					<span class="text-3xl">🏠</span>
				</div>
			{/if}

			<div class="flex-1 min-w-0">
				<p class="font-bold text-lg text-gray-900">{formatPrice(listing.price)}</p>
				<p class="text-sm text-gray-600 truncate">{listing.address}</p>

				<div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
					{#if listing.beds}
						<span>{listing.beds} bed</span>
					{/if}
					{#if listing.baths}
						<span>{listing.baths} bath</span>
					{/if}
					{#if listing.sqft}
						<span>{listing.sqft.toLocaleString()} sqft</span>
					{/if}
				</div>

				{#if listing.status && listing.status !== 'active'}
					<span class="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full
						{listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
						{listing.status === 'sold' ? 'bg-red-100 text-red-800' : ''}
					">
						{listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
					</span>
				{/if}
			</div>

			{#if listing.is_favorited}
				<span class="text-red-500 text-xl">❤️</span>
			{/if}
		</div>
	</Card>
</button>
