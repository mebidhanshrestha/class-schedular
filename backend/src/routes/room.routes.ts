import { Router } from "express";
import { validate } from "../middleware/validate";
import { protect } from "../middleware/auth.middleware";
import { roomSchema } from "../utils/validations";
import * as roomController from "../controllers/room.controller";

const router = Router();

router.use(protect);

router.post("/", validate(roomSchema), roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);
router.put("/:id", validate(roomSchema), roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

export default router;
