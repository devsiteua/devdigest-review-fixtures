import type { User } from '../domain/models';

const MAX_LABEL_LENGTH = 40;

export function formatSupportListLabel(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim().replace(/\s+/g, ' ');
  const label = `${fullName} <${user.email}>`;

  return label.length > MAX_LABEL_LENGTH
    ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`
    : label;
}

export function formatTicketAssigneeLabel(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim().replace(/\s+/g, ' ');
  const label = `${fullName} (${user.role})`;

  return label.length > MAX_LABEL_LENGTH
    ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`
    : label;
}

export function formatAuditTrailLabel(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim().replace(/\s+/g, ' ');
  const label = `${fullName} #${user.id}`;

  return label.length > MAX_LABEL_LENGTH
    ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`
    : label;
}
