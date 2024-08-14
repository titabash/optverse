import { Button, GetThemeValueForKey, SizeTokens } from "tamagui";

export const IconButton = ({
  icon,
  size = "$4" as unknown as SizeTokens,
  color = "$color",
  backgroundColor = "transparent" as unknown as GetThemeValueForKey<"backgroundColor">,
  onPress = () => {},
  onLongPress = () => {},
  ...props
}) => {
  return (
    <Button
      size={size}
      borderRadius={999}
      backgroundColor={backgroundColor}
      {...props}
      circular
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {icon}
    </Button>
  );
};
