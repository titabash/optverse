import React, { useState } from "react";
import {
  Button,
  Input,
  YStack,
  XStack,
  Text,
  Card,
  H1,
  Paragraph,
  useToastController,
  Theme,
  Separator,
} from "@my/ui";
import { useRouter } from "solito/router";
import { ChevronLeft, Mail, Lock, ArrowLeft } from "@tamagui/lucide-icons";
import SignupGateway from "app/screens/signup/api/signupGateway";
import { SignupRepository } from "app/screens/signup/model/repository/signupRepository";

const signupRepository: SignupRepository = new SignupGateway();

export function SignupScreen() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToastController();
  const { push, back } = useRouter();

  const handleSignup = async () => {
    let message = "";
    try {
      const { user, session } = await signupRepository.signup(email, password);
      if (user) {
        message = "サインアップに成功しました！";
        push("/");
      } else {
        message = "サインアップに失敗しました。";
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
            サインアップ
          </H1>
          <Paragraph theme="alt2">新しいアカウントを作成</Paragraph>
        </Card.Header>
        <Separator />
        <Card.Footer padded>
          <YStack space="$4" width="100%">
            <Input
              placeholder="メールアドレス"
              value={email}
              onChangeText={setUsername}
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
              onPress={handleSignup}
              theme="active"
              hoverStyle={{ scale: 0.975 }}
              pressStyle={{ scale: 0.95 }}
            >
              サインアップ
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
