import { TablesInsert } from "app/shared/type";

interface GeneralUserRepository {
  insert(userData: TablesInsert<"general_users">): Promise<void>;
}

export { GeneralUserRepository };
