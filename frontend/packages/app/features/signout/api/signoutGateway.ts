import { supabase } from "app/shared/util/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { SignoutRepository } from "../model/repository/signoutRepository";

/**
 * Gateway for signing out a user.
 *
 * @class SignoutGateway
 * @typedef {SignoutGateway}
 * @implements {SignoutRepository}
 */
class SignoutGateway implements SignoutRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async signout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) throw error;
  }
}

export default SignoutGateway;
