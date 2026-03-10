import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, truncate } from '../../src/utils/format';

describe('formatPrice', () => {
	it('formats a price in EUR by default', () => {
		const result = formatPrice(1234.5, 'EUR', 'es-ES');
		expect(result).toContain('1');
		expect(result).toContain('234');
	});

	it('formats a price in USD', () => {
		const result = formatPrice(99.99, 'USD', 'en-US');
		expect(result).toContain('99.99');
	});
});

describe('formatDate', () => {
	it('returns a non-empty string for a valid date', () => {
		const result = formatDate(new Date('2024-01-15'), 'es-ES');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});
});

describe('truncate', () => {
	it('does not truncate text shorter than maxLength', () => {
		expect(truncate('hello', 10)).toBe('hello');
	});

	it('truncates text longer than maxLength and appends ellipsis', () => {
		const result = truncate('hello world', 5);
		expect(result).toBe('hello\u2026');
	});

	it('returns empty string for empty input', () => {
		expect(truncate('', 10)).toBe('');
	});
});
