import React from "react";
import { TamaguiButton } from "./TamaguiButton";

export default {
  title: "Example/TamaguiButton",
  component: TamaguiButton,
  argTypes: {
    onPress: { action: "pressed" },
    theme: {
      control: { type: "select" },
      options: ["active", "inactive", "primary", "secondary"],
    },
  },
};

const Template = (args) => <TamaguiButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: "active",
};

export const InactiveTheme = Template.bind({});
InactiveTheme.args = {
  theme: "accent",
};

export const PrimaryTheme = Template.bind({});
PrimaryTheme.args = {
  theme: "alt1",
};

export const SecondaryTheme = Template.bind({});
SecondaryTheme.args = {
  theme: "surface1",
};
