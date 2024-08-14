import { XStack, YStack, Button, Input, Text, styled, GetProps } from "tamagui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useRouter } from "solito/router";

const AppBarContainer = styled(XStack, {
  height: 60,
  background: "$background",

  paddingHorizontal: "$4",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottomColor: "$borderColor",
});

type AppBarItemProps = {
  component: any;
  flex?: number;
};

type AppBarProps = GetProps<typeof AppBarContainer> & {
  leading?: AppBarItemProps;
  center?: AppBarItemProps;
  action?: AppBarItemProps;
};

export const AppBar: React.FC<AppBarProps> = ({ leading, center, action }) => {
  const { back } = useRouter();
  return (
    <AppBarContainer>
      <XStack flex={leading?.flex ?? 1} ai="center">
        {leading?.component ?? (
          <Button
            icon={ChevronLeft}
            onPress={back}
            circular
            hoverStyle={{ borderColor: "transparent" }}
            borderColor={"transparent"}
            background={"transparent"}
          />
        )}
      </XStack>
      <XStack flex={center?.flex ?? 2} ai="center" jc="center">
        {center?.component}
      </XStack>
      <XStack flex={action?.flex ?? 1} ai="center" jc="flex-end">
        {action?.component}
      </XStack>
    </AppBarContainer>
  );
};
