interface SignupRepository {
  signup(email: string, password: string, account_name?: string): Promise<any>;
}

export { SignupRepository };
