<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let { class: className = '', padding = 'md', children }: Props = $props();

	const paddings = {
		none: '',
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6'
	};
</script>

<div
	class="bg-white rounded-xl border border-gray-200 shadow-sm {paddings[padding]} {className}"
>
	{@render children()}
</div>
