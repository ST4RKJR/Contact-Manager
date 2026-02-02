import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";

const service = new ContactService();

export class ContactController {
  create(req: Request, res: Response): Response {
    try {
      const contact = service.createContact(req.body);
      return res.status(201).json(contact);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  getAll(req: Request, res: Response): Response {
    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const tag =
      typeof req.query.tag === "string"
        ? req.query.tag
        : undefined;

    const contacts = service.getAllContacts(search, tag);
    return res.json(contacts);
  }

  getById(req: Request, res: Response): Response {
    const id =
      typeof req.params.id === "string"
        ? req.params.id
        : undefined;

    if (!id) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = service.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json(contact);
  }

  update(req: Request, res: Response): Response {
    const id =
      typeof req.params.id === "string"
        ? req.params.id
        : undefined;

    if (!id) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const updatedContact = service.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json(updatedContact);
  }

  delete(req: Request, res: Response): Response {
    const id =
      typeof req.params.id === "string"
        ? req.params.id
        : undefined;

    if (!id) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const isDeleted = service.deleteContact(id);
    if (!isDeleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({ message: "Contact deleted successfully" });
  }
}
