interface SigninRepository {
  signin(username: string, password: string): Promise<any>;
}

export { SigninRepository };
