import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";

const router = Router();
const controller = new ContactController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
