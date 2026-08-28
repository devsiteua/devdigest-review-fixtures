import { describe, expect, it } from 'vitest';
import { readLastOrderDigest, runOrderDigest } from '../src/jobs/order-digest';
import { scheduledTasks } from '../src/jobs/scheduler';

describe('order digest job', () => {
  it('is scheduled every hour', () => {
    expect(scheduledTasks).toContainEqual({
      expression: '0 * * * *',
      task: runOrderDigest,
    });
  });

  it('collects every order the reviewer may see', () => {
    runOrderDigest();

    expect(readLastOrderDigest().map((order) => order.id)).toEqual([
      'order-1',
      'order-2',
    ]);
  });
});
