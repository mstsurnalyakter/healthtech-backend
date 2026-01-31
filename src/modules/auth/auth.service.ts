// import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";
import { config } from "../../config/index.js";

const generateTokens = (userId: string) => {
  const jwtSecret = config.JWT_SECRET;
  const refreshSecret = config.JWT_REFRESH_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  if (!refreshSecret) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set');
  }

  const accessToken = jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn: config.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    refreshSecret,
    { expiresIn: config.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

export const registerUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const exitingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (exitingUser) throw new Error("User already exists");


  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const tokens = generateTokens(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return tokens;
};
