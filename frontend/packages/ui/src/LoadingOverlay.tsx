import { Modal } from 'react-native';
import { Spinner, YStack, Text, styled } from 'tamagui';

const OverlayContainer = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const LoadingOverlay = () => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={true}
  >
    <OverlayContainer>
      <Spinner size="large" color="$blue10" />
      <Text color="white" marginTop="$2">
        Loading...
      </Text>
    </OverlayContainer>
  </Modal>
);
