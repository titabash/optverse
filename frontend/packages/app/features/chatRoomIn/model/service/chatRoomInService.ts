import { ChatRoomRepository } from "packages/app/features/chatRoomIn/model/repository/chatRoomRepository";
import ChatRoomGateway from "../../api/chatRoomGateway";

class ChatRoomInService {
  private chatRoomGateway: ChatRoomRepository;

  constructor() {
    this.chatRoomGateway = new ChatRoomGateway();
  }

  async enterChatRoom(inviterId: number, inviteeId: number): Promise<number> {
    try {
      // 既存のチャットルームがあるか確認
      const existingChatRoom =
        await this.chatRoomGateway.findChatRoomByInviterIdAndInviteeId(
          inviterId,
          inviteeId
        );

      if (existingChatRoom) {
        return existingChatRoom!.id;
      } else {
        // チャットルームがない場合、新たに作成
        const newChatRoom = await this.chatRoomGateway.insertPrivateChatRoom(
          inviterId,
          inviteeId
        );
        return newChatRoom.id;
      }
    } catch (error) {
      console.error(error);
      throw new Error("チャットルームの入室に失敗しました。");
    }
  }
}

export default ChatRoomInService;
