import React from "react";
import { AlertDialog, Spinner, XStack, YStack, Text } from "tamagui";
import { Check, X } from "@tamagui/lucide-icons";

export const StatusAlertDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  status: "loading" | "success" | "error";
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}> = ({
  isOpen,
  onOpenChange,
  status,
  loadingMessage = "Processing...",
  successMessage = "Operation successful",
  errorMessage = "Operation failed",
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4" maxWidth={500}>
            <XStack justifyContent="center" alignItems="center" height={80}>
              {status === "loading" && <Spinner size="large" color="$blue10" />}
              {status === "success" && <Check color="green" size={40} />}
              {status === "error" && <X color="red" size={40} />}
            </XStack>
            <Text textAlign="center" fontWeight="bold">
              {status === "loading" && loadingMessage}
              {status === "success" && successMessage}
              {status === "error" && errorMessage}
            </Text>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default StatusAlertDialog;
