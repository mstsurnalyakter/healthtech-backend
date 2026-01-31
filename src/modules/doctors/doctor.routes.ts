

import { Router } from "express"
import { authenticate } from "../../middleware/auth.js"
import { authorize } from "../../middleware/role.js"
import { createProfile, getAllDoctors, getProfile } from "./doctor.controller.js"
import { updateDoctorProfile } from "./doctor.service.js"

const router = Router()

router.post("/", authenticate, authorize("DOCTOR"), createProfile);
router.put("/", authenticate, authorize("DOCTOR"), updateDoctorProfile);
router.get("/:userId", authenticate, authorize("DOCTOR"), getProfile);
router.get("/", authenticate, getAllDoctors);

export default router;
