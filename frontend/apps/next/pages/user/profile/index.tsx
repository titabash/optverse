import { UserProfile } from "app/entities/currentUser";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <UserProfile />
    </>
  );
}
