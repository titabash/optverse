import { useEffect, useState } from "react";
import { useRouter } from "solito/router";
import { useAtom } from "jotai";
import { currentUserAtom, useAuthListener } from "app/entities/currentUser";

type AuthRedirectResult = {
  isLoading: boolean;
  shouldRedirect: boolean;
  isAuthenticated: boolean;
};

export const useAuthRedirect = (
  redirectPath: string = "/signin"
): AuthRedirectResult => {
  const [currentUserState] = useAtom(currentUserAtom);
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useAuthListener();

  useEffect(() => {
    if (currentUserState.state !== "loading") {
      if (currentUserState.state === "hasError" || !currentUserState.data) {
        setShouldRedirect(true);
      } else {
        setShouldRedirect(false);
      }
      setIsInitialCheck(false);
    }
  }, [currentUserState]);

  useEffect(() => {
    if (shouldRedirect && !isInitialCheck) {
      router.replace(redirectPath, undefined, {
        experimental: {
          nativeBehavior: "stack-replace",
          isNestedNavigator: true,
        },
      });
    }
  }, [shouldRedirect, isInitialCheck, router, redirectPath]);

  return {
    isLoading: currentUserState.state === "loading" || isInitialCheck,
    shouldRedirect,
    isAuthenticated:
      currentUserState.state === "hasData" && !!currentUserState.data,
  };
};
