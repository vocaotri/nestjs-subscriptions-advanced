import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SFUModel } from './models/sfu.model';
import { SFUInput } from './inputs/sfu.input';
import { JWTService } from 'src/auth/jwt/JWTToken';
import { SfuService } from './sfu.service';
const webrtc = require("wrtc");
@Resolver()
export class SfuResolver {
    constructor(private readonly jwtService: JWTService, private readonly sfuService: SfuService) { }
    @Mutation(() => SFUModel)
    async addStreamBroadcast(@Context() context, @Args('sfuData') sfuData: SFUInput): Promise<SFUModel> {
        const auth = await this.jwtService.checkUserLogger(context, null);
        var roomID = parseInt(sfuData.room_id);
        var _this = this;
        var sfu;
        var sfuInfo;
        const peer = new webrtc.RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.ontrack = async (e) => {
            sfuInfo = await _this.sfuService.saveRoom(e, peer, roomID, auth)
        }
        const desc = new webrtc.RTCSessionDescription(sfuData.sdp);
        await peer.setRemoteDescription(desc);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        const payload = {
            sdp: peer.localDescription
        }
        sfu = { ...sfuInfo, payload: payload }
        return sfu;
    }
}
