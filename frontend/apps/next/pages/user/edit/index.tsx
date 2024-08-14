import { UserProfileEdit } from "app/entities/currentUser";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>User Edit</title>
      </Head>
      <UserProfileEdit />
    </>
  );
}
