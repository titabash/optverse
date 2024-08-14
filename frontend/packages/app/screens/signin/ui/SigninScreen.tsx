import React, { useState } from "react";
import {
  Button,
  Input,
  YStack,
  XStack,
  Card,
  H1,
  Paragraph,
  useToastController,
  Separator,
} from "@my/ui";
import { useRouter } from "solito/router";
import { ArrowLeft } from "@tamagui/lucide-icons";
import SigninGateway from "app/screens/signin/api/signinGateway";

const signinGateway = new SigninGateway();

export function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToastController();
  const { push, back } = useRouter();

  const handleSignin = async () => {
    let message = "";
    try {
      const { user, session } = await signinGateway.signin(email, password);
      if (user) {
        message = "サインインに成功しました！";
        push("/");
      } else {
        message = "サインインに失敗しました。";
      }
    } catch (error) {
      message = `エラーが発生しました: ${error.message}`;
      console.error(error);
    }
    toast.show(message);
  };

  return (
    <YStack f={1} jc="center" ai="center" padding="$4" space>
      <Card elevate size="$4" bordered width={350} height="auto" scale={0.9}>
        <Card.Header padded>
          <H1 size="$8" color="$blue10">
            サインイン
          </H1>
          <Paragraph theme="alt2">アカウントにログイン</Paragraph>
        </Card.Header>
        <Separator />
        <Card.Footer padded>
          <YStack space="$4" width="100%">
            <Input
              placeholder="メールアドレス"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <Input
              placeholder="パスワード"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
            />
            <Button
              onPress={handleSignin}
              theme="active"
              hoverStyle={{ scale: 0.975 }}
              pressStyle={{ scale: 0.95 }}
            >
              サインイン
            </Button>
          </YStack>
        </Card.Footer>
      </Card>
      <XStack space="$2" ai="center">
        <Button
          onPress={back}
          variant="outlined"
          size="$3"
          icon={ArrowLeft}
          borderRadius="$4"
        >
          戻る
        </Button>
      </XStack>
    </YStack>
  );
}
