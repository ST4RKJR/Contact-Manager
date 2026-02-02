import { ContactModel } from "../models/contact.model";
import { Contact } from "../utils/contact.interface";

export class ContactService {
  private model = new ContactModel();

  createContact(data: Omit<Contact, "id" | "createdAt">) {
    if (!data.name || !data.phone) {
      throw new Error("Name and phone are required");
    }
    return this.model.create(data);
  }

  getAllContacts(search?: string, tag?: string) {
    let contacts = this.model.findAll();

    if (search) {
      contacts = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tag) {
      contacts = contacts.filter(c => c.tag === tag);
    }

    return contacts;
  }

  getContactById(id: string) {
    return this.model.findById(id);
  }

  updateContact(id: string, data: Partial<Contact>) {
    return this.model.update(id, data);
  }

  deleteContact(id: string) {
    return this.model.delete(id);
  }
}
