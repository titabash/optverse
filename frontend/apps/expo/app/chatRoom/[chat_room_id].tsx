import { ChatRoom } from "app/screens/chatRoom";
import { Stack } from "expo-router";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Chat Room",
        }}
      />
      <ChatRoom />
    </>
  );
}
