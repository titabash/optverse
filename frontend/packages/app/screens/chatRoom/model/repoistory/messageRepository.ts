import { Tables } from "app/shared/type";
import { TablesInsert } from "app/shared/type";

export type MessageWithGeneralUser = Tables<"messages"> & {
  general_users: Tables<"general_users"> | null;
};

export interface MessageRepository {
  getMessages(
    chatRoomId: number,
    page: number,
    limit: number
  ): Promise<MessageWithGeneralUser[]>;
  createMessage(
    chatRoomId: number,
    senderId: number,
    content: string
  ): Promise<TablesInsert<"messages">>;
  subscribeToNewMessages(
    chatRoomId: number,
    callback: (message: MessageWithGeneralUser) => void
  ): void;
}
