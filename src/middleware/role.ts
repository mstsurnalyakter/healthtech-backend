import type{ Response, NextFunction } from "express";
// import type { AuthRequest } from "./auth.js";
import type { AuthRequest } from "./auth.js";

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
