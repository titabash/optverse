import { Tables } from "packages/app/shared/type";

export interface ChatRoomRepository {
  findChatRoomsByUserId(userId: number): Promise<Tables<"chat_rooms">[]>;
}
