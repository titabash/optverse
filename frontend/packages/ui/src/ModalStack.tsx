import { YStack, Stack, Button, Text } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ModalStack = ({ isVisible, onClose, children }) => {
  // const insets = useSafeAreaInsets();

  return (
    <YStack
      fullscreen
      position="absolute"
      opacity={isVisible ? 1 : 0}
      animation="lazy"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <YStack
        backgroundColor="white"
        width="100%"
        height="90%"
        position="absolute"
        bottom={0}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        padding={20}
        animation="medium"
        y={isVisible ? 0 : "100%"}
      >
        <Button onPress={onClose} position="absolute" top={10} right={10}>
          Close
        </Button>
        {children}
      </YStack>
    </YStack>
  );
};
