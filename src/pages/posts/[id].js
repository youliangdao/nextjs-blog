import Layout from "../../components/layout";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  // Return a list of possible value for id
  return {
    paths,
    fallback: false,
  };
}

export default function Post() {
  return <Layout>...</Layout>;
}
