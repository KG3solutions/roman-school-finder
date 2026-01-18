export function formatPrice(price: number | null | undefined): string {
	if (!price) return 'Price TBD';
	return `$${price.toLocaleString()}`;
}

export function formatDate(date: string | null | undefined): string {
	if (!date) return '';
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

export function formatDateRelative(date: string | null | undefined): string {
	if (!date) return '';
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return formatDate(date);
}

export function truncate(str: string, length: number): string {
	if (str.length <= length) return str;
	return str.slice(0, length) + '...';
}

export function pluralize(count: number, singular: string, plural?: string): string {
	if (count === 1) return `${count} ${singular}`;
	return `${count} ${plural || singular + 's'}`;
}
