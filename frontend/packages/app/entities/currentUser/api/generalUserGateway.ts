// api/authApi.js
import { supabase } from "app/shared/util/supabase";
import { Tables } from "app/shared/type";
import { SupabaseClient } from "@supabase/supabase-js";
import { GeneralUserRepository } from "../model/repository/generalUserRepository";

// AuthGatewayクラス
class GeneralUserGateway implements GeneralUserRepository {
  constructor() {

  }
  async findOne(uuid: string): Promise<Tables<"general_users"> | null> {
    const { data, error } = await supabase
      .from("general_users")
      .select("*")
      .eq("uuid", uuid)
      .single<Tables<"general_users">>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return data;
  }

  async update(
    id: number,
    newData: Partial<Tables<"general_users">>
  ): Promise<void> {
    console.log("id: ", id);
    const { error } = await supabase
      .from("general_users")
      .update(newData)
      .eq("id", id);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default GeneralUserGateway;
