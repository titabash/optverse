"use client";
import React from "react";
import {
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
  H2,
  Spinner,
  ScrollView,
  Card,
  Theme,
  Spacer,
} from "@my/ui";
import {
  ChevronDown,
  ChevronUp,
  User,
  MessageSquare,
} from "@tamagui/lucide-icons";
import { useState } from "react";
import { useAtom } from "jotai/react";
import { SignoutButton } from "app/features/signout";
import { useRouter } from "solito/router";
import { GeneralUserList } from "app/widgets/userList";
import { ChatRoomList } from "app/widgets/chatRoomList";
import { currentUserAtom } from "app/entities/currentUser";
import { ThemeToggle } from "app/features/themeToggle";

export function HomeScreen() {
  const { push } = useRouter();
  const [currentUser] = useAtom(currentUserAtom);

  if (currentUser.state === "loading") {
    return (
      <YStack f={1} jc="center" ai="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const isLoggedIn = currentUser.state === "hasData" && currentUser.data;

  return (
    <ScrollView>
      <YStack f={1} jc="center" ai="center" p="$6" space="$6">
        <Card elevate p="$4" space="$4" w="100%">
          <H1 ta="center" color="$blue10">
            Welcome to Tamagui
          </H1>
          <Paragraph ta="center" color="$gray11">
            Here is a basic starter to show navigating from one screen to
            another. This screen uses the same code on Next.js and React Native.
          </Paragraph>
          <Separator />
          <ThemeToggle />
        </Card>

        <Card elevate p="$4" space="$4" w="100%">
          <H2 ta="center" color="$blue10">
            Current User Information
          </H2>
          <YStack space="$2">
            <Paragraph>
              <strong>User ID:</strong>{" "}
              {isLoggedIn ? currentUser.data?.id : "Not logged in"}
            </Paragraph>
            <Paragraph>
              <strong>Account Name:</strong>{" "}
              {isLoggedIn ? currentUser.data?.account_name : "Not logged in"}
            </Paragraph>
            <Paragraph>
              <strong>Display Name:</strong>{" "}
              {isLoggedIn ? currentUser.data?.display_name : "Not logged in"}
            </Paragraph>
          </YStack>
        </Card>

        <Card elevate p="$4" space="$4" w="100%">
          <H2 ta="center" color="$blue10">
            User List
          </H2>
          <GeneralUserList />
        </Card>

        <Card elevate p="$4" space="$4" w="100%">
          <H2 ta="center" color="$blue10">
            Chat Rooms
          </H2>
          <ChatRoomList />
        </Card>

        <XStack space="$4" flexWrap="wrap" jc="center">
          <Button
            onPress={() => push("/user/profile")}
            icon={User}
            theme="active"
          >
            User Profile
          </Button>
          {isLoggedIn ? (
            <SignoutButton />
          ) : (
            <>
              <Button onPress={() => push("/signup")} theme="blue">
                Sign Up
              </Button>
              <Spacer />
              <Button onPress={() => push("/signin")} theme="green">
                Sign In
              </Button>
            </>
          )}
        </XStack>

        <SheetDemo />
      </YStack>
    </ScrollView>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const toast = useToastController();

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        theme="blue"
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame ai="center" jc="center" space="$4">
          <Sheet.Handle />
          <H2>Sheet Content</H2>
          <Paragraph>You can add any content here.</Paragraph>
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            theme="blue"
            onPress={() => {
              setOpen(false);
              toast.show("Sheet closed!", {
                message: "Just showing how toast works...",
              });
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
