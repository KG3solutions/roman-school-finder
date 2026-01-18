<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		onclose: () => void;
		children: Snippet;
	}

	let { open = false, title, onclose, children }: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		role="dialog"
		aria-modal="true"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
			{#if title}
				<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<h2 class="text-lg font-semibold text-gray-900">{title}</h2>
					<button
						type="button"
						class="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
						onclick={onclose}
						aria-label="Close"
					>
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/if}
			<div class="p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
