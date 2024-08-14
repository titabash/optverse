import React, { useState, ReactNode } from "react";
import { YStack, Button, XStack, Text } from "tamagui";
// アイコンのインポートは不要になるため削除します

export type MenuItem = {
  icon: ReactNode;
  title: string;
  onPress: () => void;
};

export interface SideMenuProps {
  items: MenuItem[];
}

export const SideMenu = ({ items }: SideMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <YStack
      width={isExpanded ? 200 : 50}
      padding={10}
      alignItems="flex-start"
      space
    >
      <Button onPress={toggleMenu}>{isExpanded ? "<" : ">"}</Button>
      {/* メニュー項目を動的に生成 */}
      {items.map((item, index) => (
        <MenuOption
          key={index}
          icon={item.icon}
          title={item.title}
          isExpanded={isExpanded}
          onPress={item.onPress}
        />
      ))}
    </YStack>
  );
};

const MenuOption = ({ icon, title, isExpanded, onPress }) => (
  <XStack alignItems="center" space>
    {icon}
    {isExpanded && <Text onPress={onPress}>{title}</Text>}
  </XStack>
);
