import React from "react";
import { Story, Meta } from "@storybook/react";
import { YStack } from "tamagui";
import { Heart, Star, Bell } from "@tamagui/lucide-icons";
import FloatingActionButton from "./FloatingActionButton";

export default {
  title: "Components/FloatingActionButton",
  component: FloatingActionButton,
  decorators: [
    (Story) => (
      <YStack flex={1} padding="$4" backgroundColor="$gray5" height={400}>
        <Story />
      </YStack>
    ),
  ],
} as Meta;

const Template: Story = (args) => <FloatingActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  icon: <Heart size={24} color="white" />,
  backgroundColor: "$red10",
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  icon: <Star size={24} color="white" />,
  backgroundColor: "$yellow10",
};

export const WithActions = Template.bind({});
WithActions.args = {
  icon: <Bell size={24} color="white" />,
  backgroundColor: "$green10",
  onPress: () => console.log("Pressed"),
  onLongPress: () => console.log("Long Pressed"),
};
