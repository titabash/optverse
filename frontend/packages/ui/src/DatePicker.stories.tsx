import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Button, Stack } from "tamagui"; // Stackをインポート

type DatePickerProps = {
  onSelect: (date: Date) => void;
};

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    onSelect: { action: "onSelect" },
  },
} as Meta<DatePickerProps>;

const Template: Story<DatePickerProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack>
      <Button onPress={() => setOpen(true)}>Open Date Picker</Button>
      <DatePicker
        open={open}
        onOpenChange={setOpen}
        onSelect={(date) => {
          args.onSelect(date);
          setOpen(false);
        }}
      />
    </Stack>
  );
};

export const Default = Template.bind({});
Default.args = {
  onSelect: (date: Date) => console.log("Selected date:", date),
};

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  onSelect: (date: Date) => console.log("Selected date:", date),
};
WithCustomStyling.decorators = [
  (Story) => (
    <Stack padding="$4" backgroundColor="$backgroundHover">
      <Story />
    </Stack>
  ),
];

export const WithPreselectedDate = Template.bind({});
WithPreselectedDate.args = {
  onSelect: (date: Date) => {
    console.log("Selected date:", date);
    alert(`Selected date: ${date.toLocaleDateString()}`);
  },
};
