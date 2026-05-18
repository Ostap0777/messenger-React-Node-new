import type { Contact } from "../api/contacts";

/** Показує customName, якщо задано; інакше — ім'я користувача з профілю. */
export function getContactDisplayName(contact: Contact): string {
  const custom = contact.customName?.trim();
  return custom || contact.contactUser.name;
}
