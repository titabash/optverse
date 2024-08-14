import React from "react";
import { Story, Meta } from "@storybook/react";
import { ModalBottomSheet, ModalBottomSheetProps } from "./ModalBottomSheet";
import { Button, YStack, Paragraph } from "tamagui";

export default {
  title: "Components/ModalBottomSheet",
  component: ModalBottomSheet,
  argTypes: {
    open: { control: "boolean" },
    snapPoints: { control: "array" },
    snapPointsMode: {
      control: {
        type: "select",
        options: ["percent", "constant", "fit", "mixed"],
      },
    },
    dismissOnSnapToBottom: { control: "boolean" },
    modal: { control: "boolean" },
    zIndex: { control: "number" },
    draggable: { control: "boolean" },
  },
} as Meta;

const Template: Story<ModalBottomSheetProps> = (args) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Sheet</Button>
      <ModalBottomSheet {...args} open={open} onOpenChange={setOpen}>
        <YStack gap>
          <Paragraph>This is the content of the Modal Bottom Sheet</Paragraph>
          <Button onPress={() => setOpen(false)}>Close Sheet</Button>
        </YStack>
      </ModalBottomSheet>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  snapPoints: [90, 50, 25],
  snapPointsMode: "percent",
  dismissOnSnapToBottom: true,
  modal: true,
  zIndex: 100000,
  draggable: true,
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  snapPoints: [100],
  snapPointsMode: "percent",
  dismissOnSnapToBottom: true,
  modal: true,
  zIndex: 100000,
  draggable: false,
};

export const NonDraggable = Template.bind({});
NonDraggable.args = {
  ...Default.args,
  draggable: false,
};

export const CustomSnapPoints = Template.bind({});
CustomSnapPoints.args = {
  ...Default.args,
  snapPoints: [80, 40],
  snapPointsMode: "percent",
};

export const ConstantMode = Template.bind({});
ConstantMode.args = {
  ...Default.args,
  snapPoints: [300, 200, 100],
  snapPointsMode: "constant",
};

export const NonModal = Template.bind({});
NonModal.args = {
  ...Default.args,
  modal: false,
};
