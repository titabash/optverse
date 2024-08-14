import React, { useEffect, useState } from "react";
import GeneralUserGateway from "../api/generalUserGateway";
import { Tables } from "app/shared/type";
import { GeneralUserRepository } from "app/widgets/userList/model/repository/generalUserRepository";
import { Button, Paragraph, ScrollView, Spacer, XStack, YStack } from "@my/ui";
import { useAtom } from "jotai";
import { currentUserAtom } from "app/entities/currentUser/model/currentUserAtom";
import ChatRoomInService from "app/features/chatRoomIn/model/service/chatRoomInService";
import { useRouter } from "solito/router";

export const GeneralUserList = () => {
  const { push, back } = useRouter();
  const [users, setUsers] = useState<Tables<"general_users">[]>([]);
  const [currentUser] = useAtom(currentUserAtom);
  const userGateway: GeneralUserRepository = new GeneralUserGateway();

  useEffect(() => {
    if (currentUser.data === undefined || currentUser.data === null) {
      return;
    }
    const fetchUsers = async () => {
      const fetchedUsers = await userGateway.findWithoutCurrentUser(
        currentUser.data!.id
      );
      console.log(fetchedUsers);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [currentUser]);

  return (
    <ScrollView>
      {/* 初期レンダリング時のサーバーサイドとクライアントサイドの一致を確保 */}
      {users.length === 0 ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        users.map((user) => (
          <YStack key={user.id}>
            <XStack justifyContent="center" alignSelf="center" flex={1} gap>
              <Paragraph alignSelf="center">{"ID: " + user.id}</Paragraph>
              <Spacer />
              <Paragraph alignSelf="center">
                {"ユーザ名: " + user.display_name}
              </Paragraph>
              <Spacer />
              <Button
                disabled={currentUser.data === undefined}
                onPress={async () => {
                  const chatRoomInService = new ChatRoomInService();
                  const chat_room_id = await chatRoomInService.enterChatRoom(
                    currentUser.data!.id,
                    user.id
                  );
                  push(`/chatRoom/${chat_room_id}`);
                }}
              >
                チャット
              </Button>
            </XStack>
          </YStack>
        ))
      )}
    </ScrollView>
  );
};
