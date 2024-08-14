import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "app/shared";
import { TablesInsert } from "app/shared/type";
import { GeneralUserRepository } from "../model/repository/generalUserRepository";

class GeneralUserGateway implements GeneralUserRepository {
  // コンストラクタ
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  // ユーザーデータを挿入するメソッド
  async insert(userData: TablesInsert<"general_users">): Promise<void> {
    // データベースにユーザーデータを挿入
    const { data, error } = await this.supabase
      .from("general_users")
      .insert([userData]);

    // エラーが発生した場合は例外をスロー
    if (error) {
      throw new Error(error.message);
    }
  }
}

export default GeneralUserGateway;
