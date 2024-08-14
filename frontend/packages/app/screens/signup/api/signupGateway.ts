import { supabase } from "app/shared";
import { v4 as uuid } from "uuid";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { SignupRepository } from "app/screens/signup/model/repository/signupRepository";

/**
 * Gateway for signing up a user.
 *
 * @class SignupGateway
 * @typedef {SignupGateway}
 * @implements {SignupRepository}
 */
class SignupGateway implements SignupRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  private defaultAccountName(): string {
    const originId = uuid();
    // uuidを16進数に変換した配列
    const hexArray: number[] = originId
      .split("-")
      .join("")
      .split("", 16)
      .map((hex: string) => parseInt(hex, 16));

    const shortId = Buffer.from(hexArray).toString("base64").replace("==", "");
    return shortId;
  }

  async signup(
    email: string,
    password: string,
    account_name: string = this.defaultAccountName()
  ): Promise<{
    user: User | null;
    session: Session | null;
  }> {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { account_name: account_name },
      },
    });

    if (error) throw error;
    return data;
  }
}

export default SignupGateway;
