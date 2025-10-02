import { useRouter } from 'next/router'
import { BlogCardList, TagList } from '@/components/blog'
import { asArray } from '@lib/as-array'
import { useEffect, useMemo, useState } from 'react'
import { useIsMobile } from '@/components/hooks/useIsMobile'
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

export default function Blog({ initialArticles = [], initialTags = [] }: { initialArticles: any[]; initialTags: any[] }) {
  const { query } = useRouter()
  const tagsFilter = !query.tag ? [] : asArray(query.tag)
  const [articles, setArticles] = useState(initialArticles)
  const [allTags, setAllTags] = useState(initialTags)
  const isMobile = useIsMobile(768)
  const [showAnim, setShowAnim] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  console.log(initialArticles, "initialArticles")

  const {allTags, articles} = useMemo(() => {

  }, [tagsFilter, initialArticles, initialTags])
  useEffect(() => {
    let filtered = initialArticles
    if (tagsFilter.length > 0) {
      filtered = initialArticles.filter(
        article => asArray(article.tags).some(tag => tagsFilter.includes(tag))
      )
    }
    setArticles(filtered)
    setAllTags(initialTags)
  }, [tagsFilter, initialArticles, initialTags])

  // 非移动端并在空闲时再加载动画，避免阻塞首屏
  useEffect(() => {
    if (isMobile) return
    if (typeof window === 'undefined') return
    const start = () => setShowAnim(true)
    const ric: any = (window as any).requestIdleCallback
    if (typeof ric === 'function') {
      ric(start, { timeout: 1200 })
    } else {
      const t = setTimeout(start, 300)
      return () => clearTimeout(t)
    }
  }, [isMobile])

  // 控制移动端初次渲染数量，减少首屏压力
  useEffect(() => {
    const nextCount = isMobile ? 8 : articles.length
    setVisibleCount(nextCount)
  }, [isMobile, articles.length])

  const displayedArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount])

  return (
    <>
      <div className="bg-transparent">
        {showAnim && (
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
        )}
        <div className="container relative z-10 px-4 pt-10 mx-auto mt-10 text-center md:px-6 lg:pt-44 md:-mt-16">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl md:text-white dark:text-white">
            Learn about our latest developments
          </h1>
        </div>

        <div className="container relative z-10 px-4 mx-auto mt-20 mb-20 transform translate-y-0 md:px-6 md:translate-y-16">
          <TagList tags={allTags} withCount asLink className="mb-10" />
          <BlogCardList articles={displayedArticles} />
          {visibleCount < articles.length && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md dark:bg-white dark:text-black"
                onClick={() => setVisibleCount(c => Math.min(c + 8, articles.length))}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
