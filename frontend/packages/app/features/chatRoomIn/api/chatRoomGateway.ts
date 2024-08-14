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
      .eq("user_chats.user_id", userId)
      .returns<Tables<"chat_rooms">[]>();

    if (userChatsError) {
      console.error(userChatsError);
      throw new Error(userChatsError.message);
    }

    return chatRooms;
  }

  async insertPrivateChatRoom(
    inviterId: number,
    inviteeId: number
  ): Promise<Tables<"chat_rooms">> {
    const { data: chatRoom, error: chatRoomError } = await supabase
      .from("chat_rooms")
      .insert([{ type: "PRIVATE" }])
      .select()
      .single<Tables<"chat_rooms">>();

    if (chatRoomError) {
      console.error(chatRoomError);
      throw new Error(chatRoomError.message);
    }

    const { error: userChatError1 } = await supabase
      .from("user_chats")
      .insert([{ user_id: inviterId, chat_room_id: chatRoom.id }]);

    if (userChatError1) {
      console.error(userChatError1);
      throw new Error(userChatError1.message);
    }

    const { error: userChatError2 } = await supabase
      .from("user_chats")
      .insert([{ user_id: inviteeId, chat_room_id: chatRoom.id }]);

    if (userChatError2) {
      console.error(userChatError2);
      throw new Error(userChatError2.message);
    }

    return chatRoom;
  }

  async findChatRoomByInviterIdAndInviteeId(
    inviterId: number,
    inviteeId: number
  ): Promise<Tables<"chat_rooms">> {
    const { data: chatRooms1, error: chatRoom1Error } = await supabase
      .from("chat_rooms")
      .select(
        `
      *,
      user_chats (
        user_id
      )
    `
      )
      .eq("user_chats.user_id", inviterId)
      .returns<Tables<"chat_rooms">[]>();

    if (chatRoom1Error) {
      console.error(chatRoom1Error);
      throw new Error(chatRoom1Error.message);
    }

    const { data: chatRooms2, error: chatRoom2Error } = await supabase
      .from("chat_rooms")
      .select(
        `
      *,
      user_chats (
        user_id
      )
    `
      )
      .eq("user_chats.user_id", inviteeId)
      .returns<Tables<"chat_rooms">[]>();

    if (chatRoom2Error) {
      console.error(chatRoom2Error);
      throw new Error(chatRoom2Error.message);
    }

    const commonChatRooms = chatRooms1.filter((chatRoom1) =>
      chatRooms2.some((chatRoom2) => chatRoom1.id === chatRoom2.id)
    );

    return commonChatRooms[0];
  }
}

export default ChatRoomGateway;
