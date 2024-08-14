import React, { useEffect, useState } from "react";
import ChatRoomGateway from "../api/chatRoomGateway";
import AuthGateway from "app/entities/currentUser/api/authGateway";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "app/entities/currentUser";
import { Tables } from "packages/app/shared/type";
import { Paragraph, ScrollView, YStack } from "@my/ui";

export const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<Tables<"chat_rooms">[]>([]);
  const chatRoomGateway = new ChatRoomGateway();
  const currentUser = useAtomValue(currentUserAtom);

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (currentUser.data) {
        const rooms = await chatRoomGateway.findChatRoomsByUserId(
          currentUser!.data!.id
        );
        setChatRooms(rooms);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <ScrollView>
      {chatRooms.map((room) => (
        <YStack key={room.id}>
          <Paragraph>{"Room ID: " + room.id}</Paragraph>
        </YStack>
      ))}
    </ScrollView>
  );
};
