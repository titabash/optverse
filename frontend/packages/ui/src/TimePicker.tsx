import React, { useState, useEffect } from "react";
import { Popover, Button, XStack, YStack, Text, ScrollView } from "tamagui";
import { Clock } from "@tamagui/lucide-icons";

type TimePickerProps = {
  onChange: (time: string) => void;
  initialTime?: string;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  onChange,
  initialTime = "00:00",
}) => {
  const [hour, setHour] = useState(initialTime.split(":")[0] || "00");
  const [minute, setMinute] = useState(initialTime.split(":")[1] || "00");

  useEffect(() => {
    setHour(initialTime.split(":")[0] || "00");
    setMinute(initialTime.split(":")[1] || "00");
  }, [initialTime]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleTimeChange = (newHour: string, newMinute: string) => {
    setHour(newHour);
    setMinute(newMinute);
    onChange(`${newHour}:${newMinute}`);
  };

  return (
    <Popover placement="bottom">
      <Popover.Trigger asChild>
        <Button icon={Clock}>{`${hour}:${minute}`}</Button>
      </Popover.Trigger>

      <Popover.Content
        elevate
        key={`${hour}:${minute}`}
        animateOnly={["transform", "opacity"]}
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        x={0}
        y={0}
        opacity={1}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        width={280}
      >
        <YStack padding="$4">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">
            Select Time
          </Text>
          <XStack>
            <ScrollView
              height={200}
              width={120}
              contentContainerStyle={{ paddingRight: 10 }}
            >
              <YStack>
                {hours.map((h) => (
                  <Button
                    key={h}
                    size="$2"
                    onPress={() => handleTimeChange(h, minute)}
                    backgroundColor={h === hour ? "$color10" : "$color2"}
                    marginVertical="$1"
                  >
                    {h}
                  </Button>
                ))}
              </YStack>
            </ScrollView>
            <ScrollView
              height={200}
              width={120}
              contentContainerStyle={{ paddingLeft: 10 }}
            >
              <YStack>
                {minutes.map((m) => (
                  <Button
                    key={m}
                    size="$2"
                    onPress={() => handleTimeChange(hour, m)}
                    backgroundColor={m === minute ? "$color10" : "$color2"}
                    marginVertical="$1"
                  >
                    {m}
                  </Button>
                ))}
              </YStack>
            </ScrollView>
          </XStack>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};
