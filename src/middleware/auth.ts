import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import prisma from "../lib/prisma.js";

interface JwtPayload{
    userId: string;
}

export interface AuthRequest extends Request{
    user?: any;
}

export const authenticate = async (
    req:AuthRequest,
    res:Response,
    next:NextFunction
) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
     return res.status(401).json({
        message: "Token missing"
     })   
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as unknown as JwtPayload;
        const findUser = await prisma.user.findUnique({where: {id: decoded.userId}});

        if(!findUser) return res.status(401).json({
            message: "Invalid token "
        });
        req.user = findUser;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
        
}