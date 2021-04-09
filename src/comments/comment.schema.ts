import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
export const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, ref: 'users' },
    content: { type: String, required: true },
    room: { type: String, required: true }
}, { timestamps: true })
CommentSchema.plugin(mongoosePaginate);