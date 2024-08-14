// api/authApi.js
import { supabase } from "app/shared/util/supabase";
import { AuthRepository } from "app/entities/currentUser/model/repository/authRepository";

// AuthGatewayクラス
class AuthGateway implements AuthRepository {
  // ログインのセッションを取得するメソッド

  constructor() {}

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  async signOut() {
    await supabase.auth.signOut();
  }

  // 現在のユーザーを取得するメソッド
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Failed to get current user: ", error);
      throw error;
    }
    return data.user;
  }

  // メールアドレスを変更する関数
  async updateCurrentUser(
    newEmail?: string,
    newPassword?: string,
    newPhone?: string
  ): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
      password: newPassword,
      phone: newPhone,
    });
    if (error) {
      console.error("Failed to update email or password: ", error);
      throw new Error(error.message);
    }
  }

  // セッションを監視するリスナー
  onAuthStateChange(callback: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export default AuthGateway;
