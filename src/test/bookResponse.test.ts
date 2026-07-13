import { describe, expect, it } from 'vitest';
import { extractResource } from '@/lib/bookResponse';

describe('extractResource', () => {
  it('extract nested data', () => {
    const response = {
      data: {
        data: {
          id: 1,
          title: 'Book',
        },
      },
    };

    expect(extractResource(response)).toEqual({
      id: 1,
      title: 'Book',
    });
  });

  it('extract single wrapper', () => {
    const response = {
      data: {
        id: 1,
      },
    };

    expect(extractResource(response)).toEqual({
      id: 1,
    });
  });

  it('returns raw object', () => {
    const response = {
      id: 1,
      title: 'Book',
    };

    expect(extractResource(response)).toEqual(response);
  });

  it('extract array resource', () => {
    const response = {
      data: [
        {
          id: 1,
          title: 'Book',
        },
      ],
    };

    expect(extractResource(response)).toEqual([
      {
        id: 1,
        title: 'Book',
      },
    ]);
  });
});
