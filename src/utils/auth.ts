import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'default_secret';

// Hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT
export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verify JWT
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};