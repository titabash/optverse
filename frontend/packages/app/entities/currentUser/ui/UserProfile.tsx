import { useAtom } from "jotai";
import { currentUserAtom } from "app/entities/currentUser/model/currentUserAtom";
import { Button, H2, Paragraph, YStack } from "@my/ui";
import { useRouter } from "solito/router";
import { useEffect } from "react";

export function UserProfile() {
  const [currentUser] = useAtom(currentUserAtom);
  const { push, back } = useRouter();

  useEffect(() => {
    if (
      currentUser.state === "hasError" ||
      (!currentUser.data && currentUser.state === "hasData")
    ) {
      push("/signin");
    }
  }, [currentUser]);

  if (currentUser.state === "loading") {
    return <H2>読み込み中...</H2>;
  }

  return (
    <YStack f={1} jc="center" ai="center" gap rowGap={10}>
      <H2 ta="center">ログイン中のユーザ情報</H2>
      <Paragraph ta="center">ユーザID: {currentUser?.data?.id ?? ""}</Paragraph>
      <Paragraph ta="center">
        アカウント名: {currentUser?.data?.account_name ?? ""}
      </Paragraph>
      <Paragraph ta="center">
        表示名: {currentUser?.data?.display_name ?? ""}
      </Paragraph>
      <Button onPress={() => push("/user/edit")}>編集</Button>
      <Button onPress={() => push("/")}>戻る</Button>
    </YStack>
  );
}
