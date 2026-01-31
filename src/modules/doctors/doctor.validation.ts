import { z } from "zod";

export const createDoctorSchema = z.object({
    speciality: z.string().min(2),
    experience: z.number().min(0),
    bio: z.string().optional(),
    phone: z.string().min(11),
    location: z.string().min(2),
    profileImage: z.string().optional()
})

export const updateDoctorSchema = createDoctorSchema.partial()