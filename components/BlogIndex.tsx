import { useRouter } from 'next/router'
import { BlogCardList, TagList } from '@/components/blog'
import { getAllBlogs } from '@lib/all-blogs'
import { asArray } from '@lib/as-array'
import { extractRelevantTags } from '@lib/tags'
import { getAllPages } from 'nextra/context';
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic";

type PAGProps = {
  src: string;
  infinite?: boolean;
  aspectRatio?: number;
  className?: string;
};

const PagAnimation = dynamic<PAGProps>(
  () => import("@/components/PagAnimation").then((m) => m.PagAnimation),
  { ssr: false }
);

export async function getBlogs() {
  return getAllBlogs(getAllPages());
}


export default function Blog() {
  const { query } = useRouter()
  const tagsFilter = !query.tag ? [] : asArray(query.tag)
  const [articles, setArticles] = useState([])
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    const init = async () => {
      const allBlogs = await getBlogs()
      const tags = extractRelevantTags(allBlogs)
      setAllTags(tags)

      let filtered = allBlogs
      if (tagsFilter.length > 0) {
        filtered = allBlogs.filter(
          article =>
            tagsFilter.length === 0 || asArray(article.tags).some(tag => tagsFilter.includes(tag))
        )
      }
      setArticles(filtered)
    }
    init()
  }, [tagsFilter])

  return (
    <>
      <div className="bg-transparent">
        <PagAnimation
          src="/pag/hellow_xone.pag"
          aspectRatio={0.148}
          infinite
          className="
          absolute
          inset-x-0
          top-[66px]
          sm:top-[50px]
          md:top-[66px]
          isolate
          pointer-events-none
        "
        />
        <div className="relative z-10 container md:px-6 mx-auto px-4 pt-10 lg:pt-44 text-center mt-10 md:-mt-16">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black md:text-white dark:text-white">
            Learn about our latest developments
          </h1>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 mt-20 mb-20 transform translate-y-0 md:translate-y-16">
          <TagList tags={allTags} withCount asLink className="mb-10" />
          <BlogCardList articles={articles} />
        </div>
      </div>
    </>
  )
}
