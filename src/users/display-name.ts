import type { User } from '../domain/models';

export function buildDisplayName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim();
}
