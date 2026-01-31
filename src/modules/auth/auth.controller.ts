import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";
// import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({ message: "User registered", user });
};

export const login = async (req: Request, res: Response) => {
  const tokens = await loginUser(req.body.email, req.body.password);
  res.json(tokens);
};
