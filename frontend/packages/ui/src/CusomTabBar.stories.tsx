import React from "react";
import { Story, Meta } from "@storybook/react";
import { CustomTabBar } from "./CustomTabBar";
import { YStack, Paragraph } from "tamagui";

// TabsPropsの型をインポートまたは再定義する
import { CustomTabsProps } from "./CustomTabBar"; // CustomTabBarコンポーネントからインポート

export default {
  title: "Components/CustomTabBar",
  component: CustomTabBar,
  argTypes: {
    indicatorStyle: {
      control: {
        type: "radio",
        options: ["background", "underline"],
      },
    },
  },
} as Meta;

// Story templateの型を正しく設定
const Template: Story<CustomTabsProps> = (args) => <CustomTabBar {...args} />;

const defaultTabs = [
  {
    value: "tab1",
    label: "Profile",
    content: (
      <YStack padding="$4">
        <Paragraph>This is the profile content.</Paragraph>
      </YStack>
    ),
  },
  {
    value: "tab2",
    label: "Connections",
    content: (
      <YStack padding="$4">
        <Paragraph>Here you can see your connections.</Paragraph>
      </YStack>
    ),
  },
  {
    value: "tab3",
    label: "Notifications",
    content: (
      <YStack padding="$4">
        <Paragraph>Your notifications will appear here.</Paragraph>
      </YStack>
    ),
  },
];

export const Default = Template.bind({});
Default.args = {
  tabs: defaultTabs,
  indicatorStyle: "background",
  onTabChange: (tab) => console.log(`Tab changed to: ${tab}`),
};

export const UnderlineStyle = Template.bind({});
UnderlineStyle.args = {
  ...Default.args,
  indicatorStyle: "underline",
};

export const ManyTabs = Template.bind({});
ManyTabs.args = {
  ...Default.args,
  tabs: [
    ...defaultTabs,
    {
      value: "tab4",
      label: "Settings",
      content: (
        <YStack padding="$4">
          <Paragraph>Adjust your settings here.</Paragraph>
        </YStack>
      ),
    },
    {
      value: "tab5",
      label: "Help",
      content: (
        <YStack padding="$4">
          <Paragraph>Need help? Check this section.</Paragraph>
        </YStack>
      ),
    },
  ],
};

export const LongLabels = Template.bind({});
LongLabels.args = {
  ...Default.args,
  tabs: [
    {
      value: "tab1",
      label: "Very Long Tab Label 1",
      content: (
        <YStack padding="$4">
          <Paragraph>Content for very long tab label 1.</Paragraph>
        </YStack>
      ),
    },
    {
      value: "tab2",
      label: "Extremely Long Tab Label 2",
      content: (
        <YStack padding="$4">
          <Paragraph>Content for extremely long tab label 2.</Paragraph>
        </YStack>
      ),
    },
  ],
};
