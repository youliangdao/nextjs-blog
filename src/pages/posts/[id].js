import Layout from "../../components/layout";
import { getAllPostIds } from "../../../lib/posts";
import { getPostData } from "../../../lib/posts";
import Head from "next/head";
import { Date } from "../../components/date";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  // Return a list of possible value for id
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  // By returning { props: { postData } }, the Blog component
  // will receive `postData` as a prop at build time
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {/* Add this <Date dateString={postData.date} /> */}
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
