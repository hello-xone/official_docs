import { getAllBlogs } from '@lib/all-blogs'
import { extractRelevantTags } from '@lib/tags'
import { getAllPages } from 'nextra/context'
import { getCurrentLanguage } from "@/i18n";

export async function getStaticProps() {
  const savedLanguage = getCurrentLanguage();
  const allBlogs = getAllBlogs(getAllPages());
  let filterBlogs = allBlogs.filter(post => {
      if(savedLanguage === 'en'){
        return post.link.includes('/en/');
      }else if(savedLanguage === 'zh'){
        return post.link.include('/zh/');
      }
    })
  const tags = extractRelevantTags(filterBlogs);
  return {
    props: {
      initialArticles: filterBlogs,
      initialTags: tags,
    },
    revalidate: 60,
  };
}


export default function BlogSSG() {
  return null
}