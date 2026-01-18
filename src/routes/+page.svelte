<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/schools');
	});
</script>

<div class="flex items-center justify-center min-h-[60vh]">
	<div class="text-center">
		<div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
		<p class="mt-4 text-gray-600">Loading...</p>
	</div>
</div>
