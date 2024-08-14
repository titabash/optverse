import { UserProfile } from "app/entities/currentUser";
import { Stack } from "expo-router";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "User",
        }}
      />
      <UserProfile />
    </>
  );
}
