import React from "react";
import { Button, Variable, Stack, Theme } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";

export const FloatingActionButton = ({
  icon = <Plus size={24} color="white" />,
  onPress = () => {},
  onLongPress = () => {},
}) => {
  return (
    <Stack position="absolute" bottom={20} right={50}>
      <Button
        elevation={4}
        shadowColor={"$black0"}
        shadowOffset={{ width: 4, height: 4 }}
        shadowOpacity={0.1}
        size="$6"
        circular
        icon={icon}
        onPress={onPress}
        onLongPress={onLongPress}
        theme={"accent"}
      />
    </Stack>
  );
};

export default FloatingActionButton;
