import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { TamaguiDrawer } from "./TamaguiDrawer"; // コンポーネントのパスを適切に調整してください
import { YStack, Paragraph, Button } from "tamagui";

export default {
  title: "Components/TamaguiDrawer",
  component: TamaguiDrawer,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
  },
} as Meta<typeof TamaguiDrawer>;

const Template: StoryFn<typeof TamaguiDrawer> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  React.useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <YStack height={400}>
      <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
      <TamaguiDrawer
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
      >
        <Paragraph>This is the content of the drawer.</Paragraph>
        <Paragraph>You can add any components here.</Paragraph>
      </TamaguiDrawer>
    </YStack>
  );
};

const Template2: StoryFn<typeof TamaguiDrawer> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  React.useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <YStack height={400}>
      <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
      <TamaguiDrawer
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <Paragraph>This is the content of the drawer.</Paragraph>
        <Paragraph>You can add any components here.</Paragraph>
      </TamaguiDrawer>
    </YStack>
  );
};

export const NormalDrawer = Template.bind({});
NormalDrawer.args = {
  isOpen: false,
};

export const EndDrawer = Template2.bind({});
EndDrawer.args = {
  isOpen: false,
};
