import { Router } from "express";
import { validate } from "../middleware/validate";
import { protect } from "../middleware/auth.middleware";
import { instructorSchema } from "../utils/validations";
import * as instructorController from "../controllers/instructor.controller";

const router = Router();

router.use(protect);

router.post("/", validate(instructorSchema), instructorController.createInstructor);
router.get("/", instructorController.getAllInstructors);
router.get("/:id", instructorController.getInstructorById);
router.put("/:id", validate(instructorSchema), instructorController.updateInstructor);
router.delete("/:id", instructorController.deleteInstructor);

export default router;
