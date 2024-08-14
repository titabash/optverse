import { Button } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import SignoutGateway from "../api/signoutGateway";
import {
  Adapt,
  Dialog,
  Sheet,
  Unspaced,
  useToastController,
  XStack,
} from "@my/ui";
import { useLink } from "solito/link";

export function SignoutButton() {
  const toast = useToastController();
  const linkHome = useLink({ href: "/" });
  const handleSignout = async () => {
    const signoutGateway = new SignoutGateway();
    let message = "";
    try {
      await signoutGateway.signout();
      message = "サインアウトしました！";
      linkHome.onPress();
    } catch (error) {
      message = `エラーが発生しました: ${error.message}`;
      console.error("Signout error", error);
    }
    toast.show(message);
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Sign Out</Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          opacity={0.5}
          animateOnly={["transform", "opacity"]}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>サインアウト</Dialog.Title>
          <Dialog.Description>サインアウトしますか？</Dialog.Description>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                theme="active"
                aria-label="signout"
                onPress={handleSignout}
              >
                サインアウト
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                キャンセル
              </Button>
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default SignoutButton;
