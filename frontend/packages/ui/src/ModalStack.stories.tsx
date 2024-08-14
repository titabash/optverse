import React, { useState } from "react";
import { Button, Text, YStack } from "tamagui";
import { ModalStack } from "./ModalStack"; // Assume this import works

export default {
  title: "Components/ModalStack",
  component: ModalStack,
  argTypes: {
    isVisible: { control: "boolean" },
    onClose: { action: "closed" },
  },
};

const Template = (args) => {
  const [isVisible, setIsVisible] = useState(args.isVisible);

  const handleClose = () => {
    setIsVisible(false);
    args.onClose();
  };

  return (
    <>
      <Button onPress={() => setIsVisible(true)}>Open Modal</Button>
      <ModalStack {...args} isVisible={isVisible} onClose={handleClose}>
        {args.children}
      </ModalStack>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isVisible: false,
  children: <Text>Default Modal Content</Text>,
};

export const VisibleModal = Template.bind({});
VisibleModal.args = {
  isVisible: true,
  children: <Text>This modal is initially visible</Text>,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  isVisible: true,
  children: (
    <YStack space="$4">
      <Text fontSize={24} fontWeight="bold">
        Custom Modal Content
      </Text>
      <Text>This is some custom content inside the modal.</Text>
      <Button>Action Button</Button>
    </YStack>
  ),
};
