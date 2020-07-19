import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from '../../styles/utils.module.css'

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // gets all paths for all the posts you have on the posts folder
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // gets the param id from the url to try and get teh post data
  // from the .md files under posts folder
  const postData = await getPostData(params.id);
  return {
    props: {
      post: postData,
    },
  };
}
