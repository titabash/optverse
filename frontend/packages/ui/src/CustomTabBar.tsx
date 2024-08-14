import React, { useState, ReactNode } from "react";
import {
  AnimatePresence,
  ScrollView,
  Text,
  Stack,
  StackProps,
  Tabs,
  XStack,
  YStack,
  styled,
} from "tamagui";

// Types
type TabLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type TabState = {
  currentTab: string;
  intentAt: TabLayout | null;
  activeAt: TabLayout | null;
  prevActiveAt: TabLayout | null;
};

type TabDefinition = {
  value: string;
  label: string;
  content: ReactNode;
};

export type CustomTabsProps = {
  tabs: Array<TabDefinition>;
  indicatorStyle: "background" | "underline";
  onTabChange?: (tab: string) => void;
};

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color2"
      opacity={0.7}
      borderRadius={"$10"}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$color8",
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  f: 1,
  x: 0,
  o: 1,

  animation: "100ms",
  variants: {
    direction: {
      ":number": (direction) => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});

export const CustomTabBar: React.FC<CustomTabsProps> = ({
  tabs,
  indicatorStyle,
  onTabChange,
}) => {
  const [tabState, setTabState] = useState<TabState>({
    currentTab: tabs[0].value,
    intentAt: null,
    activeAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) => {
    setTabState({ ...tabState, currentTab });
    onTabChange?.(currentTab);
  };

  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction = (type: "select" | "focus", layout: TabLayout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  const isUnderline = indicatorStyle === "underline";

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      flexDirection="column"
      activationMode="manual"
      borderRadius="$4"
      position="relative"
      flex={1}
    >
      <YStack height={80} justifyContent="center">
        <ScrollView
          horizontal
          disableScrollViewPanResponder
          showsHorizontalScrollIndicator={false}
          flex={1}
          width={"100%"}
          contentContainerStyle={{
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <XStack flex={1} width={"100%"}>
            <AnimatePresence>
              {intentAt && !isUnderline && (
                <TabsRovingIndicator
                  borderRadius="$10"
                  width={intentAt.width}
                  height={intentAt.height}
                  x={intentAt.x}
                  y={intentAt.y}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeAt && (
                <TabsRovingIndicator
                  active
                  borderRadius={isUnderline ? undefined : "$10"}
                  width={activeAt.width}
                  height={isUnderline ? "$0.5" : activeAt.height}
                  x={activeAt.x}
                  y={isUnderline ? undefined : activeAt.y}
                  bottom={isUnderline ? 0 : undefined}
                />
              )}
            </AnimatePresence>

            <Tabs.List
              disablePassBorderRadius
              loop={false}
              aria-label="Manage your account"
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              borderTopRightRadius={0}
              borderTopLeftRadius={0}
              flex={1}
            >
              {tabs.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  borderColor={"$color3"}
                  backgroundColor={"transparent"}
                  hoverStyle={{ backgroundColor: "transparent" }}
                  focusStyle={{ backgroundColor: "transparent" }}
                  value={tab.value}
                  onInteraction={handleOnInteraction}
                  margin={isUnderline ? "$1" : "$2"}
                  borderRadius={isUnderline ? undefined : "$10"}
                  borderWidth={isUnderline ? undefined : "$1"}
                >
                  <Text>{tab.label}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </XStack>
        </ScrollView>
      </YStack>
      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content value={currentTab} forceMount flex={1}>
            {tabs.find((tab) => tab.value === currentTab)?.content}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
};
