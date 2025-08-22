import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BlogCardList } from '@components/blog';
import { useConfig } from 'nextra-theme-docs';
import { MetaWithLink } from '@lib/meta';
import { getAllBlogs } from '@lib/all-blogs';
import { getAllPages } from 'nextra/context';

export const BottomContent = () => {
    const { route } = useRouter();
    const config = useConfig();
    const { tags } = config.frontMatter;
    const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);

    const init = async () => {
      const allBlogs = getAllBlogs(getAllPages());
      if (!tags) {
      return;
      }

      const similarArticles = allBlogs
        .filter(
          article =>
            article.link !== route &&
            (tags.length === 0 || article.tags?.some(tag => tags.includes(tag))),
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setSimilarArticles(similarArticles);
    }

    useEffect(() => {
      init();
    }, []);

    return (
      <>
        {similarArticles.length > 0 && (
          <>
            <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">
              Similar articles
            </h3>
            <BlogCardList articles={similarArticles} className="!grid-cols-2" />
          </>
        )}
      </>
    );
}

