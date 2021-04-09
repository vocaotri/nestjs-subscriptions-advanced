import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
export const AuthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    status: { type: Number, required: false },
    role: { type: Number, required: false },
}, { timestamps: true })
AuthSchema.plugin(mongoosePaginate);