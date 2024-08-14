import React, { useState, useRef, useEffect } from "react";
import { Button, YStack, XStack, AnimatePresence, Stack } from "tamagui";

export const TamaguiDrawer = ({
  isOpen,
  onClose,
  children,
  position = "right",
}) => {
  const isLeft = position === "left";
  const [drawerPosition, setDrawerPosition] = useState(
    isOpen ? 0 : isLeft ? -300 : 300
  );
  const dragStartX = useRef(0);
  const lastPosition = useRef(drawerPosition);

  useEffect(() => {
    setDrawerPosition(isOpen ? 0 : isLeft ? -300 : 300);
  }, [isOpen, isLeft]);

  const handleTouchStart = (event) => {
    console.log(event);
    dragStartX.current = event.nativeEvent.locationX;
    lastPosition.current = drawerPosition;
  };

  const handleTouchMove = (event) => {
    const diff = event.nativeEvent.locationX - dragStartX.current;
    const newPosition = lastPosition.current + (isLeft ? diff : -diff);
    setDrawerPosition(Math.min(Math.max(newPosition, -300), 0));
  };

  const handleTouchEnd = () => {
    if (Math.abs(drawerPosition) > 150) {
      setDrawerPosition(isLeft ? -300 : 300);
      onClose();
    } else {
      setDrawerPosition(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Stack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={100000}
        >
          <Stack
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            animation="300ms"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            onPress={onClose}
          />
          <XStack
            enterStyle={{ x: isLeft ? -300 : 300 }}
            exitStyle={{ x: isLeft ? -300 : 300 }}
            animation="300ms"
            x={drawerPosition}
            position="absolute"
            top={0}
            bottom={0}
            left={isLeft ? 0 : undefined}
            right={isLeft ? undefined : 0}
            width={300}
            backgroundColor="$background"
            borderLeftWidth={isLeft ? 0 : 1}
            borderRightWidth={isLeft ? 1 : 0}
            borderColor="$borderColor"
            zIndex={100001}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <YStack f={1} p="$4" gap>
              {children}
            </YStack>
          </XStack>
        </Stack>
      )}
    </AnimatePresence>
  );
};
