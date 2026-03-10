import { describe, it, expect } from 'vitest';
import {
	isValidEmail,
	isValidPassword,
	isUUID,
} from '../../src/utils/validate';

describe('isValidEmail', () => {
	it('returns true for valid email', () => {
		expect(isValidEmail('user@example.com')).toBe(true);
	});

	it('returns false for email without @', () => {
		expect(isValidEmail('userexample.com')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(isValidEmail('')).toBe(false);
	});

	it('returns false for email without domain', () => {
		expect(isValidEmail('user@')).toBe(false);
	});
});

describe('isValidPassword', () => {
	it('returns true for valid password', () => {
		expect(isValidPassword('Password1')).toBe(true);
	});

	it('returns false for password shorter than 8 chars', () => {
		expect(isValidPassword('Pass1')).toBe(false);
	});

	it('returns false for password without uppercase', () => {
		expect(isValidPassword('password1')).toBe(false);
	});

	it('returns false for password without number', () => {
		expect(isValidPassword('Password')).toBe(false);
	});
});

describe('isUUID', () => {
	it('returns true for valid UUID v4', () => {
		// Formato: xxxxxxxx-xxxx-4xxx-[89ab]xxx-xxxxxxxxxxxx
		expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
	});

	it('returns false for invalid UUID', () => {
		expect(isUUID('not-a-uuid')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(isUUID('')).toBe(false);
	});
});
