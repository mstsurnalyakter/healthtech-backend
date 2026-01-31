import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/auth.js";
import { createDoctorProfile, getDoctorProfile, listDoctors, updateDoctorProfile } from "./doctor.service.js";

export const createProfile = async (req:AuthRequest, res:Response) =>{
    const profile = await createDoctorProfile(req.user.id,req.body);
    res.status(201).json(profile)
}

export const updateProfile = async (req:AuthRequest, res:Response) =>{
    const profile = await updateDoctorProfile(req.user.id, req.body);
    res.status(201).json(profile)
}
export const getProfile = async (req:AuthRequest, res:Response) =>{
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0]! : req.params.userId!;
    const profile = await getDoctorProfile(userId);
    res.json(profile)
};

export const getAllDoctors = async (req:Request, res:Response ) =>{
    const doctors = await listDoctors();
    res.json(doctors);
}