import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  XStack,
  Button,
  Stack,
  styled,
  Variable,
  Circle,
  YStack,
} from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

type IconProps = {
  color: string;
  size: number;
};

export type FloatingBottomTabItem = {
  name: string;
  icon: React.ComponentType<IconProps>;
  activeIcon?: React.ComponentType<IconProps>;
  component?: React.ComponentType<any>;
  onPress?: () => void;
  onLongPress?: () => void;
};

const Tab = createBottomTabNavigator();

const Indicator = styled(Circle, {
  width: 4,
  height: 4,
  background: "$accent",
  position: "absolute",
  bottom: -8,
});

const TabButton = ({
  onPress,
  onLongPress,
  isFocused,
  Icon,
  ActiveIcon,
  defaultColor,
  focusedColor,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  Icon: React.ComponentType<any>;
  ActiveIcon?: React.ComponentType<IconProps>;
  defaultColor: string;
  focusedColor: string;
}) => {
  const IconToRender = isFocused && ActiveIcon ? ActiveIcon : Icon;
  const iconColor = isFocused ? focusedColor : defaultColor;
  const iconSize = isFocused ? 24 : 20;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <YStack alignItems="center">
        <Button
          bg="transparent"
          pressStyle={{ scale: 0.9 }}
          icon={<IconToRender size={iconSize} color={iconColor} />}
          hoverStyle={{ borderColor: "transparent", background: "transparent" }}
        />
        {isFocused && (
          <Circle
            size={6}
            theme="accent"
            background="$background"
            elevation="$4"
          />
        )}
      </YStack>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  tabItems,
  defaultColor,
  focusedColor,
}: {
  state: any;
  descriptors: any;
  navigation: any;
  tabItems: FloatingBottomTabItem[];
  defaultColor: string;
  focusedColor: string;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurContainer
      style={{ height: 60 + insets.bottom, paddingBottom: insets.bottom }}
    >
      <TabBarContainer height={60}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const tabItem = tabItems[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              tabItem.onPress?.() ?? navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            tabItem.onLongPress?.() ??
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
          };

          return (
            <TabButton
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              Icon={tabItem.icon}
              ActiveIcon={tabItem.activeIcon}
              defaultColor={defaultColor}
              focusedColor={focusedColor}
            />
          );
        })}
      </TabBarContainer>
    </BlurContainer>
  );
};

interface FloatingBottomNavBarProps {
  tabItems: FloatingBottomTabItem[];
  defaultColor?: string;
  focusedColor?: string;
}

export const FloatingBottomNavBar: React.FC<FloatingBottomNavBarProps> = ({
  tabItems,
  defaultColor = "gray",
  focusedColor = "accent",
}) => (
  <Container>
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          tabItems={tabItems}
          defaultColor={defaultColor}
          focusedColor={focusedColor}
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      {tabItems.map(
        (item, index) =>
          item.component && (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                tabBarIcon: ({ focused, size }) => {
                  const IconComponent =
                    focused && item.activeIcon ? item.activeIcon : item.icon;
                  return (
                    <IconComponent
                      color={focused ? focusedColor : defaultColor}
                      size={size}
                    />
                  );
                },
              }}
            />
          )
      )}
    </Tab.Navigator>
  </Container>
);

const Container = styled(Stack, {
  flex: 1,
  background: "$backgroundStrong",
});

const BlurContainer = styled(Stack, {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  borderRadius: 30,
  overflow: "hidden",
});

const TabBarContainer = styled(XStack, {
  borderWidth: 1,
  borderColor: "$background05" as unknown as Variable<string>,
  borderRadius: 30,
  jc: "space-around",
  ai: "center",
  background: "$background025",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
});
