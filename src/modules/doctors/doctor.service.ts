import { prisma as basePrisma } from "../../lib/prisma.js";

// Cast to any to work around type checking issue with newly added DoctorProfile model
const prisma = basePrisma as any;


export const createDoctorProfile = async (userId: string, data: any) => {
  const existing = await prisma.doctorProfile.findUnique({ where: { userId } });
  if (existing) throw new Error("Profile already exists");

  const profile = await prisma.doctorProfile.create({
    data: { ...data, userId }
  });
  return profile;
};

export const updateDoctorProfile = async (userId: string, data: any) => {
  const profile = await prisma.doctorProfile.update({
    where: { userId },
    data
  });
  return profile;
};

export const getDoctorProfile = async (userId: string) => {
  return prisma.doctorProfile.findUnique({ where: { userId } });
};

export const listDoctors = async () => {
  return prisma.doctorProfile.findMany();
};
