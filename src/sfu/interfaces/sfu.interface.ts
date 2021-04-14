import { Document } from 'mongoose';
import { AuthInterFace } from 'src/auth/interfaces/auth.interface';

export interface SFUInterFace extends Document {
    id: string;
    user: AuthInterFace;
    sdp: MediaStream;
    room_id: string;
    createdAt: Date;
    updatedAt: Date;
}