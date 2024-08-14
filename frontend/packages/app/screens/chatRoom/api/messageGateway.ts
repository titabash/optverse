import { supabase } from "app/shared/util/supabase";
import { Tables, TablesInsert } from "app/shared/type";
import { MessageRepository } from "app/screens/chatRoom/model/repoistory/messageRepository";
import { MessageWithGeneralUser } from "app/screens/chatRoom/model/repoistory/messageRepository";

class MessageGateway implements MessageRepository {
  async getMessages(
    chatRoomId: number,
    page: number,
    limit: number = 10
  ): Promise<MessageWithGeneralUser[]> {
    const { data: messages, error } = await supabase
      .from("messages")
      .select(
        `
      *,
      general_users (*)
      `
      )
      .eq("chat_room_id", chatRoomId)
      .range((page - 1) * limit, page * limit - 1)
      .order("created_at", { ascending: false })
      .returns<MessageWithGeneralUser[]>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(messages[0]);
    return messages;
  }

  async createMessage(
    chatRoomId: number,
    senderId: number,
    content: string
  ): Promise<TablesInsert<"messages">> {
    const { data: message, error } = await supabase
      .from("messages")
      .insert([{ chat_room_id: chatRoomId, sender_id: senderId, content }])
      .single<Tables<"messages">>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return message;
  }

  subscribeToNewMessages(chatRoomId: number, callback: (message) => void) {
    try {
      supabase
        .channel("table_postgres_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `chat_room_id=eq.${chatRoomId}`,
          },
          async (payload) => {
            const message = payload.new as MessageWithGeneralUser;
            const { data: generalUser } = await supabase
              .from("general_users")
              .select("*")
              .eq("id", message.sender_id)
              .single<Tables<"general_users">>();
            message.general_users = generalUser;
            callback(message);
          }
        )
        .subscribe();

      return () => supabase.channel("table_postgres_changes").unsubscribe();
    } catch (error) {
      console.error(error);
    }
  }
}

export default MessageGateway;
