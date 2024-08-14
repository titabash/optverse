import { supabase } from "app/shared/util/supabase";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { SigninRepository } from "app/screens/signin/model/repository/signinRepository";

/**
 * Gateway for signing in a user.
 *
 * @class SigninGateway
 * @typedef {SigninGateway}
 * @implements {SigninRepository}
 */
class SigninGateway implements SigninRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async signin(
    username: string,
    password: string
  ): Promise<{
    user: User | null;
    session: Session | null;
  }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) throw error;
    return data;
  }
}

export default SigninGateway;
