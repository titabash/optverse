import { Tables } from "app/shared/type";

export interface GeneralUserRepository {
  findOne(uuid: string): Promise<Tables<"general_users"> | null>;
  update(id: number, newData: Partial<Tables<"general_users">>): Promise<void>;
}
