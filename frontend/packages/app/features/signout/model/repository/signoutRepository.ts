interface SignoutRepository {
  signout(): Promise<void>;
}

export { SignoutRepository };
