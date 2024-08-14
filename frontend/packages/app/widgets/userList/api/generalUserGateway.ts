// api/authApi.js
import { supabase } from "app/shared/util/supabase";
import { Tables } from "app/shared/type";
import { GeneralUserRepository } from "app/widgets/userList/model/repository/generalUserRepository";

// AuthGatewayクラス
class GeneralUserGateway implements GeneralUserRepository {
  constructor() {}
  async findWithoutCurrentUser(id: number): Promise<Tables<"general_users">[]> {
    const { data, error } = await supabase
      .from("general_users")
      .select("*")
      .not("id", "eq", id);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    if (data === null) {
      return [];
    }
    return data;
  }
}

export default GeneralUserGateway;
