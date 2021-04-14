import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SFUInterFace } from './interfaces/sfu.interface';


@Injectable()
export class SfuService {
    constructor(@InjectModel('sfus') private readonly sfuModel: Model<SFUInterFace>) { }
    async saveRoom(e, peer, roomID, auth): Promise<SFUInterFace> {
        var room = await this.sfuModel.findOne({
            room_id: roomID
        })
        if (room) {
            room.sdp = e.streams[0]
            return await room.save();
        } else {
            room = new this.sfuModel({ room_id: roomID, user: auth.id, sdp: e.streams[0] });
            room = await room.save();
        }
        return room;
    }
    async getRoom(roomID): Promise<SFUInterFace> {
        return this.sfuModel.findOne({
            room_id: roomID
        })
    }
}
