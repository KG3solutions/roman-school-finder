<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'zoned' | 'magnet' | 'charter' | 'stem' | 'montessori' | 'language' | 'default';
		size?: 'sm' | 'md';
		children: Snippet;
	}

	let { variant = 'default', size = 'sm', children }: Props = $props();

	const variants = {
		zoned: 'bg-blue-100 text-blue-800',
		magnet: 'bg-purple-100 text-purple-800',
		charter: 'bg-orange-100 text-orange-800',
		stem: 'bg-green-100 text-green-800',
		montessori: 'bg-pink-100 text-pink-800',
		language: 'bg-cyan-100 text-cyan-800',
		default: 'bg-gray-100 text-gray-800'
	};

	const sizes = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm'
	};
</script>

<span class="inline-flex items-center rounded-full font-medium {variants[variant]} {sizes[size]}">
	{@render children()}
</span>
