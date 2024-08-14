import React from "react";
import { BottomNavBar, BottomTabItem } from "./BottomNavBar";
import {
  Home,
  Activity,
  Plus,
  FileEdit,
  Settings,
} from "@tamagui/lucide-icons";
import { YStack, Button } from "tamagui";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Components/BottomNavBar",
  component: BottomNavBar,
  decorators: [
    (Story) => (
      <YStack f={1} height={400}>
        <Story />
      </YStack>
    ),
  ],
} as Meta;

const DummyScreen: React.FC<{ name: string }> = ({ name }) => (
  <YStack f={1} jc="center" ai="center">
    <Button>{name} Screen</Button>
  </YStack>
);

const Template: Story<{ tabItems: BottomTabItem[] }> = (args) => (
  <BottomNavBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabItems: [
    {
      name: "Home",
      component: () => <DummyScreen name="Home" />,
      icon: ({ color, size, isFocused }) => (
        <Home color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
    {
      name: "Activity",
      component: () => <DummyScreen name="Activity" />,
      icon: ({ color, size, isFocused }) => (
        <Activity color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
    {
      name: "Edit",
      component: () => <DummyScreen name="Edit" />,
      icon: ({ color, size, isFocused }) => (
        <FileEdit color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
    {
      name: "Settings",
      component: () => <DummyScreen name="Settings" />,
      icon: ({ color, size, isFocused }) => (
        <Settings color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
  ],
};

export const ThreeTabsOnly = Template.bind({});
ThreeTabsOnly.args = {
  tabItems: [
    {
      name: "Home",
      component: () => <DummyScreen name="Home" />,
      icon: ({ color, size, isFocused }) => (
        <Home color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
    {
      name: "Activity",
      component: () => <DummyScreen name="Activity" />,
      icon: ({ color, size, isFocused }) => (
        <Activity color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
    {
      name: "Settings",
      component: () => <DummyScreen name="Settings" />,
      icon: ({ color, size, isFocused }) => (
        <Settings color={isFocused ? color : "$gray10"} size={size} />
      ),
    },
  ],
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  tabItems: Default.args.tabItems.map((item) => ({
    ...item,
    color: {
      default: "$gray10",
      focused: "$blue10",
    },
  })),
};

export const MixedColors = Template.bind({});
MixedColors.args = {
  tabItems: [
    {
      ...Default.args.tabItems[0],
      color: { default: "$gray10", focused: "$red10" },
    },
    {
      ...Default.args.tabItems[1],
      color: { default: "$gray10", focused: "$green10" },
    },
    {
      ...Default.args.tabItems[2],
      color: { default: "$gray10", focused: "$yellow10" },
    },
    {
      ...Default.args.tabItems[3],
      color: { default: "$gray10", focused: "$purple10" },
    },
  ],
};

export const WithCustomActions = Template.bind({});
WithCustomActions.args = {
  tabItems: Default.args.tabItems.map((item, index) => ({
    ...item,
    onPress: () => console.log(`${item.name} pressed`),
    onLongPress: () => console.log(`${item.name} long pressed`),
    color: {
      default: "$gray10",
      focused: index % 2 === 0 ? "$blue10" : "$purple10",
    },
  })),
};
