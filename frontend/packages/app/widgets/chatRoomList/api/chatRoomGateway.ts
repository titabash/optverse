import { supabase } from "app/shared/util/supabase";
import { Tables } from "app/shared/type";
import { ChatRoomRepository } from "../model/repository/chatRoomRepository";

// ChatRoomGatewayクラス
class ChatRoomGateway implements ChatRoomRepository {
  // チャットルームの一覧を取得するメソッド
  async findChatRoomsByUserId(userId: number): Promise<Tables<"chat_rooms">[]> {
    // user_chatsテーブルからユーザが参加しているチャットルームのIDを取得
    const { data: chatRooms, error: userChatsError } = await supabase
      .from("chat_rooms")
      .select(
        `
      *,
      user_chats (
        user_id
      )
    `
      )
      .eq("user_chats.user_id", userId);

    if (userChatsError) {
      console.error(userChatsError);
      throw new Error(userChatsError.message);
    }

    return chatRooms;
  }

  // async createPrivateChatRoom(
  //   inviterId: number,
  //   inviteeId: number
  // ): Promise<Tables<"chat_rooms">> {
  //   const { data: chatRoom, error: chatRoomError } = await supabase
  //     .from("chat_rooms")
  //     .insert([{ type: "PRIVATE" }])
  //     .single<Tables<"chat_rooms">>();

  //   if (chatRoomError) {
  //     console.error(chatRoomError);
  //     throw new Error(chatRoomError.message);
  //   }

  //   const { error: userChatError1 } = await supabase
  //     .from("user_chats")
  //     .insert([{ user_id: inviterId, chat_room_id: chatRoom.id }]);

  //   if (userChatError1) {
  //     console.error(userChatError1);
  //     throw new Error(userChatError1.message);
  //   }

  //   const { error: userChatError2 } = await supabase
  //     .from("user_chats")
  //     .insert([{ user_id: inviteeId, chat_room_id: chatRoom.id }]);

  //   if (userChatError2) {
  //     console.error(userChatError2);
  //     throw new Error(userChatError2.message);
  //   }

  //   return chatRoom;
  // }
}

export default ChatRoomGateway;
