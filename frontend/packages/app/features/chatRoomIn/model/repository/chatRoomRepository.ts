import { Tables } from "packages/app/shared/type";

export interface ChatRoomRepository {
  findChatRoomsByUserId(userId: number): Promise<Tables<"chat_rooms">[]>;
  insertPrivateChatRoom(
    inviterId: number,
    inviteeId: number
  ): Promise<Tables<"chat_rooms">>;
  findChatRoomByInviterIdAndInviteeId(
    inviterId: number,
    inviteeId: number
  ): Promise<Tables<"chat_rooms">>;
}
