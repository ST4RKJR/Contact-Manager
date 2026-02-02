import crypto from "crypto";
import { Contact } from "../utils/contact.interface";

export class ContactModel {
  private contacts: Contact[] = [];

  create(data: Omit<Contact, "id" | "createdAt">): Contact {
    const contact: Contact = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data
    };

    this.contacts.push(contact);
    return contact;
  }

  findAll(): Contact[] {
    return this.contacts;
  }

  findById(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  update(id: string, data: Partial<Contact>): Contact | null {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.contacts[index] = { ...this.contacts[index], ...data };
    return this.contacts[index];
  }

  delete(id: string): boolean {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.contacts.splice(index, 1);
    return true;
  }
}
