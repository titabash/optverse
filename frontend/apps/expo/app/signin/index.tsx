import { SigninScreen } from "app/screens/signin";
import { Stack } from "expo-router";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Signup",
        }}
      />
      <SigninScreen />
    </>
  );
}
