import React from "react";
import {
  FloatingBottomNavBar,
  FloatingBottomTabItem,
} from "./FloatingBottomNavBar";
import { Home, Search, Bell, User, Lamp } from "@tamagui/lucide-icons";
import { Variable, YStack, useTheme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { Story, Meta } from "@storybook/react";
import { getTokens } from "@tamagui/core";

export default {
  title: "Components/FloatingBottomNavBar",
  component: FloatingBottomNavBar,
  decorators: [
    (Story) => (
      <YStack f={1} background="$blue10" height={400}>
        <Story />
      </YStack>
    ),
  ],
} as Meta;

const DummyScreen: React.FC<{ colors: string[] }> = ({ colors }) => (
  <LinearGradient f={1} colors={colors} start={[0, 1]} end={[0, 0]} />
);

const tabItems: FloatingBottomTabItem[] = [
  {
    name: "Home",
    component: () => <DummyScreen colors={["#f6d365", "#fda085"]} />,
    icon: (props) => <Home />,
    activeIcon: (props) => <Home size={28} />,
  },
  {
    name: "Search",
    component: () => <DummyScreen colors={["#f093fb", "#f5576c"]} />,
    icon: (props) => <Search />,
    activeIcon: (props) => <Search size={28} />,
  },
  {
    name: "Notifications",
    component: () => <DummyScreen colors={["#4facfe", "#00f2fe"]} />,
    icon: (props) => <Bell />,
    activeIcon: (props) => <Bell size={28} />,
  },
  {
    name: "Profile",
    component: () => <DummyScreen colors={["#43e97b", "#38f9d7"]} />,
    icon: (props) => <User />,
    activeIcon: (props) => <User size={28} />,
  },
];

const Template: Story<{
  tabItems: FloatingBottomTabItem[];
  defaultColor?: string;
  focusedColor?: string;
}> = (args) => <FloatingBottomNavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabItems,
  defaultColor: "gray",
  focusedColor: "blue",
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  tabItems,
};

export const MixedColors = Template.bind({});
MixedColors.args = {
  tabItems,
};

export const WithCustomAction = Template.bind({});
WithCustomAction.args = {
  tabItems: [
    ...tabItems.slice(0, 2),
    {
      name: "CustomAction",
      icon: Lamp,
      onPress: () => console.log("Custom action executed"),
    },
    ...tabItems.slice(2),
  ],
};

export const WithLongPressAction = Template.bind({});
WithLongPressAction.args = {
  tabItems: tabItems.map((item, index) =>
    index === 1
      ? {
          ...item,
          onLongPress: () =>
            console.log(`Long press action on ${item.name} tab`),
        }
      : item
  ),
};

export const LargerActiveIcons = Template.bind({});
LargerActiveIcons.args = {
  tabItems: tabItems.map((item) => ({
    ...item,
    activeIcon: ({ color, size }) =>
      React.createElement(item.icon, { color, size: size * 1.2 }),
  })),
};
