import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { currentUserAtom } from "app/entities/currentUser/model/currentUserAtom";
import { YStack, Input, Button, H2, useToastController } from "@my/ui";
import AuthGateway from "app/entities/currentUser/api/authGateway";
import GeneralUserGateway from "app/entities/currentUser/api/generalUserGateway";
import { useRouter } from "solito/router";

const authGateway = new AuthGateway();
const generalUserGateway = new GeneralUserGateway();

export function UserProfileEdit() {
  const [currentUser, refreshUser] = useAtom(currentUserAtom);
  const [accountName, setAccountName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const toast = useToastController();
  const { push, back } = useRouter();

  useEffect(() => {
    if (currentUser.data) {
      setAccountName(currentUser.data.account_name ?? "");
      setDisplayName(currentUser.data.display_name ?? "");
    }
  }, []);

  const handleUpdate = async () => {
    let message = "ユーザ情報の更新に失敗しました";
    try {
      await generalUserGateway.update(currentUser.data!.id, {
        account_name: accountName,
        display_name: displayName,
      });
      message = "ユーザ情報が更新されました";
      refreshUser();
      push("/user/profile");
    } catch (error) {
      console.error("Failed to update user data", error);
    }
    toast.show(message);
  };

  if (currentUser.state === "loading") {
    return <H2>読み込み中...</H2>;
  }

  return (
    <YStack f={1} jc="center" ai="center" gap>
      <H2 ta="center">ユーザ情報の編集</H2>
      <Input
        placeholder="アカウント名"
        value={accountName}
        onChangeText={setAccountName}
      />
      <Input
        placeholder="表示名"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Button onPress={handleUpdate} gap>
        更新
      </Button>
      <Button onPress={() => back()} gap>
        戻る
      </Button>
    </YStack>
  );
}
