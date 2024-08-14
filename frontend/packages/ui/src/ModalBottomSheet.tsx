import React from "react";
import { X } from "@tamagui/lucide-icons";
import { Sheet, Button, XStack } from "tamagui";

export interface ModalBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  snapPoints?: number[];
  snapPointsMode?: "percent" | "constant" | "fit" | "mixed";
  dismissOnSnapToBottom?: boolean;
  modal?: boolean;
  zIndex?: number;
  draggable?: boolean;
  showCloseButton?: boolean; // New prop for controlling close button visibility
  justifyContent?:
    | "unset"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  alignItems?:
    | "unset"
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline"
    | undefined;
}

export const ModalBottomSheet: React.FC<ModalBottomSheetProps> = ({
  open,
  onOpenChange,
  children,
  snapPoints = [100, 50, 25],
  snapPointsMode = "percent",
  dismissOnSnapToBottom = true,
  modal = true,
  zIndex = 100000,
  draggable = true,
  showCloseButton = true, // Default to true for backwards compatibility
  justifyContent = "center",
  alignItems = "center",
}) => {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      snapPointsMode={snapPointsMode}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
      zIndex={zIndex}
      animation="medium"
      disableDrag={!draggable}
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        padding="$4"
        justifyContent={justifyContent}
        alignItems={alignItems}
        gap="$5"
      >
        {showCloseButton && (
          <XStack width="100%" justifyContent="flex-start">
            <Button
              size="$4"
              circular
              icon={X}
              onPress={() => onOpenChange(false)}
            />
          </XStack>
        )}
        {open && children}
      </Sheet.Frame>
    </Sheet>
  );
};
