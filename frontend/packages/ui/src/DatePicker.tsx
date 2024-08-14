import React, { useState, useEffect } from "react";
import {
  Button,
  XStack,
  YStack,
  Text,
  Dialog,
  styled,
  Spacer,
  Adapt,
  Sheet,
} from "tamagui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarGrid = styled(XStack, {
  gap: "$1",
  flexWrap: "wrap",
  width: 300,
});

const DayButton = styled(Button, {
  width: 40,
  height: 40,
  padding: 0,
});

interface DatePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (date: Date) => void;
  initialDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  open,
  onOpenChange,
  onSelect,
  initialDate,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );

  useEffect(() => {
    if (initialDate) {
      setCurrentDate(initialDate);
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
  };

  const handleSelect = () => {
    if (selectedDate) {
      onSelect(selectedDate);
      onOpenChange(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDayOfMonth = getFirstDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days = [] as JSX.Element[];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<DayButton key={`empty-${i}`} disabled />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <DayButton
          key={`day-${day}`}
          onPress={() => handleDateClick(day)}
          theme={isSelected ? "accent" : undefined}
        >
          <Text>{day}</Text>
        </DayButton>
      );
    }

    return days;
  };

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          y={0}
          opacity={1}
          scale={1}
          zIndex={99999999999}
        >
          <YStack padding="$4" gap>
            <Dialog.Title>Select a Date</Dialog.Title>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom="$2"
            >
              <Button onPress={handlePrevMonth}>&lt;</Button>
              <Text>
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Text>
              <Button onPress={handleNextMonth}>&gt;</Button>
            </XStack>
            <CalendarGrid>
              {DAYS.map((day) => (
                <DayButton key={day} disabled backgroundColor={"transparent"}>
                  <Text fontSize="$1" fontWeight="bold">
                    {day}
                  </Text>
                </DayButton>
              ))}
              {renderCalendar()}
            </CalendarGrid>
            <XStack justifyContent="flex-end" marginTop="$2">
              <Dialog.Close asChild>
                <Button background="$gray" marginRight="$2">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button onPress={handleSelect} theme="accent">
                Select
              </Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
