import { atom } from "jotai";

// 処理の状態を表す汎用的な型
type AsyncStatus<T> = {
  state: "loading" | "hasData" | "hasError";
  data?: T;
  error?: Error;
};

// 初期状態を設定するための関数
function createInitialState<T>(): AsyncStatus<T> {
  return {
    state: "loading",
    data: undefined,
    error: undefined,
  };
}

// 汎用的なアトムを作成する関数
export const asyncAtom = <T>(fetchFunction: () => Promise<T>) => {
  const initialState = createInitialState<T>();
  const dataAtom = atom<AsyncStatus<T>>(initialState);
  const refreshAtom = atom(
    (get) => get(dataAtom),
    async (_, set) => {
      set(dataAtom, { state: "loading", data: undefined, error: undefined });

      try {
        const data = await fetchFunction();
        set(dataAtom, {
          state: "hasData",
          data: data,
          error: undefined,
        });
      } catch (error) {
        set(dataAtom, { state: "hasError", data: undefined, error });
      }
    }
  );

  return refreshAtom;
};
