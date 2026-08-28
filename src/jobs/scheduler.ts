export interface ScheduledTask {
  expression: string;
  task: () => void;
}

const tasks: ScheduledTask[] = [];

export const scheduledTasks: readonly ScheduledTask[] = tasks;

export const cron = {
  schedule(expression: string, task: () => void): void {
    tasks.push({ expression, task });
  },
};
