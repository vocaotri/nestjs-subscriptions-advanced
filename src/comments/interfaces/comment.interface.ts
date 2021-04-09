import { Document } from 'mongoose';
import { AuthInterFace } from 'src/auth/interfaces/auth.interface';

export interface CommentInterFace extends Document {
    id: string;
    user: AuthInterFace;
    content: string;
    room: string;
    createdAt: Date;
    updatedAt: Date;
}