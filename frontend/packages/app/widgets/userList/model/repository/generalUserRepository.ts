import { Tables } from "app/shared/type";

export interface GeneralUserRepository {
  findWithoutCurrentUser(id: number): Promise<Tables<"general_users">[]>;
}
