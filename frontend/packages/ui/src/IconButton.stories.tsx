import { Meta, StoryObj } from "@storybook/react";
import { Home, Heart, Settings } from "@tamagui/lucide-icons";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    size: {
      control: "select",
      options: ["$1", "$2", "$3", "$4", "$5", "$6"],
    },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    onPress: { action: "pressed" },
    onLongPress: { action: "long pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <Home />,
    size: "$4",
    color: "$color",
    backgroundColor: "transparent",
  },
};

export const CustomColor: Story = {
  args: {
    ...Default.args,
    color: "red",
  },
};

export const CustomBackground: Story = {
  args: {
    ...Default.args,
    backgroundColor: "lightblue",
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: "$6",
  },
};

export const HeartIcon: Story = {
  args: {
    ...Default.args,
    icon: <Heart />,
    color: "pink",
  },
};

export const SettingsIcon: Story = {
  args: {
    ...Default.args,
    icon: <Settings />,
    color: "gray",
  },
};
