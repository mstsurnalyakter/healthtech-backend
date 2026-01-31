import { Router } from "express";
import { authorize } from "../../middleware/role.js";
import { authenticate } from "../../middleware/auth.js";


const router = Router();

router.get("/admin-only", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get(
  "/doctor-or-admin",
  authenticate,
  authorize("DOCTOR", "ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Doctor/Admin!" });
  }
);

export default router;
