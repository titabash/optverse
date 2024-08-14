import { Button } from "tamagui";
import { Home } from "@tamagui/lucide-icons";

export const TamaguiButton = ({ onPress = () => {}, theme = "active" }) => (
  <Button icon={<Home size={24} />} onPress={onPress} theme={theme}>
    ホームボタン
  </Button>
);
