import { SignupScreen } from "app/screens/signup";
import { Stack } from "expo-router";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Signup",
        }}
      />
      <SignupScreen />
    </>
  );
}
