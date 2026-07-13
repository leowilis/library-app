import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cn,
  formatDate,
  formatDateTime,
  formatDueDate,
  formatRelativeTime,
} from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
    });

    it('merges tailwind conflicts', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      expect(formatDate('2026-01-10')).toBe('10 January 2026');
    });
  });

  describe('formatDateTime', () => {
    it('formats datetime correctly', () => {
      expect(formatDateTime('2026-01-10T15:30:00')).toBe(
        '10 January 2026, 15:30',
      );
    });
  });

  describe('formatDueDate', () => {
    it('formats due date correctly', () => {
      expect(formatDueDate('2026-01-10')).toBe('10 Jan 2026');
    });
  });

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-10T12:00:00'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns Today', () => {
      expect(formatRelativeTime('2026-01-10')).toBe('Today');
    });

    it('returns Yesterday', () => {
      expect(formatRelativeTime('2026-01-09')).toBe('Yesterday');
    });

    it('returns days ago', () => {
      expect(formatRelativeTime('2026-01-07')).toBe('3 days ago');
    });

    it('returns formatted date for older dates', () => {
      expect(formatRelativeTime('2025-12-20')).toBe(
        formatDate('2025-12-20'),
      );
    });
  });
});