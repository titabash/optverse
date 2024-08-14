import React from "react";
import { YStack } from "tamagui";
import TimePicker from "./TimePicker";

export default {
  title: "Components/TimePicker",
  component: TimePicker,
};

const Template = (args) => (
  <YStack padding="$4">
    <TimePicker {...args} />
  </YStack>
);

export const Default = Template.bind({});
Default.args = {
  onChange: (time) => console.log("Selected time:", time),
};

export const WithInitialTime = Template.bind({});
WithInitialTime.args = {
  onChange: (time) => console.log("Selected time:", time),
  initialHour: "14",
  initialMinute: "30",
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  onChange: (time) => console.log("Selected time:", time),
  buttonStyle: {
    backgroundColor: "$color5",
    borderRadius: "$4",
  },
  popoverStyle: {
    backgroundColor: "$color1",
    borderRadius: "$4",
  },
};
