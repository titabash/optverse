import { ToastViewport as ToastViewportOg } from "@my/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * This component controls the display position of the Toast.
 *
 * @returns {*}
 */
export const ToastViewport = () => {
  const { top, right, left } = useSafeAreaInsets();
  return <ToastViewportOg top={top + 5} left={left} right={right} />;
};
