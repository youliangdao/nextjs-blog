import Layout from "../../components/layout";
import { getAllPostIds } from "../../../lib/posts";
import { getPostData } from "../../../lib/posts";
import Head from "next/head";
import { Date } from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Post } from "../../types/post";

type Props = {
  postData: Post;
};

export const getStaticPaths: GetStaticPaths<Pick<Post, "id">> = async () => {
  const paths = getAllPostIds();
  // Return a list of possible value for id
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { postData: Post },
  { id: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const postData = await getPostData(params.id);
  // By returning { props: { postData } }, the Blog component
  // will receive `postData` as a prop at build time
  return {
    props: {
      postData,
    },
  };
};

const Post: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={utilStyles.article}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;
