import { User, Session } from "@supabase/supabase-js";

export interface AuthRepository {
  getSession(): Promise<Session | null>;
  getCurrentUser(): Promise<User | null>;
  onAuthStateChange(callback: (event: any, session: any) => void): any;
  signOut(): Promise<void>;
  updateCurrentUser(
    newEmail?: string,
    newPassword?: string,
    newPhone?: string
  ): Promise<void>;
}
