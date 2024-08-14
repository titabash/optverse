import { useState, useCallback, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

// asyncAtom.tsと同じ型定義を使用
type AsyncStatus<T> = {
  state: "loading" | "hasData" | "hasError";
  data?: T;
  error?: Error;
};

// カスタムフックの型定義
export function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  initialFetch: boolean = true,
  refreshOnFocus: boolean = true
) {
  const [state, setState] = useState<AsyncStatus<T>>({
    state: "loading",
    data: undefined,
    error: undefined,
  });

  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState((prevState) => ({ ...prevState, state: "loading" }));
    try {
      const data = await fetchFunction();
      if (isMountedRef.current) {
        setState({
          state: "hasData",
          data,
          error: undefined,
        });
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState({ state: "hasError", data: undefined, error: error as Error });
      }
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (initialFetch) {
      execute();
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [execute, initialFetch]);

  useFocusEffect(
    useCallback(() => {
      if (refreshOnFocus) {
        execute();
      }
    }, [execute, refreshOnFocus])
  );

  const refresh = useCallback(() => {
    execute();
  }, [execute]);

  return { ...state, refresh };
}
