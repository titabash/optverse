import { ArticleListScreen } from "app/screens/article/list-screen";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Article List</title>
      </Head>
      <ArticleListScreen />
    </>
  );
}
