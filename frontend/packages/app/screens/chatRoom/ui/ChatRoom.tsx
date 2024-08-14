import { useState, useEffect, useRef, createRef, use, Ref } from "react";
import { MessageRepository } from "app/screens/chatRoom/model/repoistory/messageRepository";
import MessageGateway from "app/screens/chatRoom/api/messageGateway";
import { useAtom } from "jotai";
import { currentUserAtom } from "app/entities/currentUser/model/currentUserAtom";
import { YStack, XStack, Text, Input, Button, ScrollView } from "@my/ui";
import { Tables } from "app/shared/type";
import { useRouter } from "solito/router";
import { createParam } from "solito";
import { MessageWithGeneralUser } from "app/screens/chatRoom/model/repoistory/messageRepository";
import { ScrollView as SV } from "react-native";

const messageRepository: MessageRepository = new MessageGateway();

export function ChatRoom() {
  const { push, back } = useRouter();
  const { useParam } = createParam();
  const [chatRoomId] = useParam("chat_room_id");
  const [currentUser] = useAtom(currentUserAtom);
  const [messages, setMessages] = useState<MessageWithGeneralUser[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<SV>(null);

  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (
      Math.round(layoutMeasurement.height + contentOffset.y) >=
      contentSize.height
    ) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  const fetchMessages = async (page = 1, limit = 10) => {
    const fetchedMessages = await messageRepository.getMessages(
      Number(chatRoomId),
      page,
      limit
    );
    setMessages((prevMessages) => [...prevMessages, ...fetchedMessages]);
  };

  const postMessage = async () => {
    if (newMessage?.trim() !== "") {
      await messageRepository.createMessage(
        Number(chatRoomId),
        currentUser.data!.id,
        newMessage
      );
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages();
      messageRepository.subscribeToNewMessages(
        Number(chatRoomId),
        (message) => {
          setMessages((prevMessages) => [message, ...prevMessages]);
        }
      );
    }
    scrollToBottom();
  }, [chatRoomId]);

  useEffect(() => {
    if (isBottom) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <YStack f={1}>
      <ScrollView
        ref={messagesEndRef}
        scrollEventThrottle={16}
        maxHeight={500}
        onScroll={(event) => {
          handleScroll(event);
          const scrollContentOffsetY = event.nativeEvent.contentOffset.y;
          if (scrollContentOffsetY === 0) {
            const nextPageNum = Math.ceil(messages.length / 10) + 1;
            fetchMessages(nextPageNum);
          }
        }}
      >
        {[...messages].reverse().map((message, index) => (
          <XStack
            key={index}
            backgroundColor={
              message.sender_id === currentUser.data?.id ? "lightblue" : "gray"
            }
            padding={10}
            margin={5}
            borderRadius={5}
          >
            <YStack>
              <Text>
                {"ユーザ名: " + message.general_users?.display_name ??
                  "No name"}
              </Text>
              <Text>{message.content}</Text>
              <Text>{new Date(message.created_at).toLocaleString()}</Text>
            </YStack>
          </XStack>
        ))}
      </ScrollView>
      <XStack padding={10} borderTopWidth={1} borderColor="gray">
        <Input
          f={1}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="メッセージを入力"
        />
        <Button onPress={postMessage} marginLeft={10}>
          送信
        </Button>
      </XStack>
    </YStack>
  );
}
