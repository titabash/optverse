import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { XStack, Button, View } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { isWeb } from "@tamagui/core";

const Tab = createBottomTabNavigator();

// TabItemの型定義
type IconProps = {
  color: any;
  size: number;
  strokeWidth: number;
  isFocused: boolean;
};

export type BottomTabItem = {
  name: string;
  icon: (props: IconProps) => React.ReactNode;
  component: React.ComponentType<any>;
  onPress?: () => void;
  onLongPress?: () => void;
  iconProps?: Record<string, any>;
  color?: {
    default: any;
    focused: any;
  };
};

const CustomTabBar: React.FC<{
  state: any;
  descriptors: any;
  navigation: any;
  tabItems: BottomTabItem[];
}> = ({ state, descriptors, navigation, tabItems }) => {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);

  return (
    <XStack
      height={60 + insets.bottom}
      backgroundColor={"$backgroundHover"}
      borderRadius="$4"
      jc="space-around"
      ai="center"
      pb={insets.bottom}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.25}
      shadowRadius={3.84}
      elevationAndroid={5}
      onLayout={(e) => {
        const width = e.nativeEvent.layout.width;
        setTabWidth(width / state.routes.length);
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const tabItem = tabItems[index];

          if (tabItem.onPress) {
            tabItem.onPress();
          } else {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          const tabItem = tabItems[index];

          if (tabItem.onLongPress) {
            tabItem.onLongPress();
          } else {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          }
        };

        const tabItem = tabItems[index];

        return (
          <Button
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            bg="transparent"
            pressStyle={{ scale: 0.9 }}
          >
            {tabItem.icon({
              size: isFocused ? 24 : 20,
              strokeWidth: isFocused ? 2 : 1,
              color: isFocused
                ? tabItem.color?.focused || "$purple10"
                : tabItem.color?.default || "$gray10",
              isFocused: isFocused,
              ...tabItem.iconProps,
            })}
          </Button>
        );
      })}
      <View
        position="absolute"
        top={0}
        left={0}
        height={3}
        width={tabWidth}
        background="$color10"
        x={state.index * tabWidth}
        animation="quick"
      />
    </XStack>
  );
};

interface BottomNavBarProps {
  tabItems: BottomTabItem[];
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ tabItems }) => {
  const TabNavigator = (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} tabItems={tabItems} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabItems.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({ color, size }) =>
                item.icon({
                  color,
                  size,
                  strokeWidth: 1,
                  isFocused: false,
                  ...item.iconProps,
                }),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );

  return isWeb ? (
    <NavigationContainer>{TabNavigator}</NavigationContainer>
  ) : (
    TabNavigator
  );
};
