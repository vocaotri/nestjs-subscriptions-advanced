import { Document } from 'mongoose';

export interface AuthInterFace extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    status?: number;
    role?: number;
    createdAt?: Date;
    updatedAt?: Date;
    access_token?: string;
}