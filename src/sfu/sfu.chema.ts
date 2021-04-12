import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
export const SFUSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, ref: 'users' },
    sdp: { type: String, required: true },
    room_id: { type: String, required: true, unique: true },
}, { timestamps: true })
SFUSchema.plugin(mongoosePaginate);