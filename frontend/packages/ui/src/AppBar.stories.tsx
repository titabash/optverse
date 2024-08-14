import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { AppBar } from "./AppBar";
import { Button, Input, Text } from "tamagui";
import { Menu, Search, Bell } from "@tamagui/lucide-icons";

const meta: Meta<typeof AppBar> = {
  title: "Components/AppBar",
  component: AppBar,
};

export default meta;

const Template: StoryFn<typeof AppBar> = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  leading: { component: <Menu /> },
  center: { component: <Text>AppBar</Text> },
  action: { component: <Bell /> },
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  leading: { component: <Menu /> },
  center: { component: <Input placeholder="Search..." /> },
  action: { component: <Bell /> },
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  leading: { component: <Text>Left</Text> },
  center: { component: <Text>Center</Text> },
  action: { component: <Text>Right</Text> },
};
