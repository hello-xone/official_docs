import { getAllBlogs } from '@lib/all-blogs'
import { extractRelevantTags } from '@lib/tags'
import { getAllPages } from 'nextra/context'

export async function getStaticProps() {
  const allBlogs = getAllBlogs(getAllPages());
  const tags = extractRelevantTags(allBlogs);
  console.log(allBlogs, "allBlogs")
  return {
    props: {
      initialArticles: allBlogs,
      initialTags: tags,
    },
    revalidate: 60,
  };
}


export default function BlogSSG() {
  return null
}