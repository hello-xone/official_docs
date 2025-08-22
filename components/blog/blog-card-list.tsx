import { ReactElement } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { format } from 'date-fns';
import { MetaWithLink } from '@lib/meta';
import { Description } from './description';
import { Heading } from './heading';
import { TagList } from '@/components/blog'

export const BlogCardList = ({
  articles = [],
  className,
}: {
  articles: MetaWithLink[];
  className?: string;
}): ReactElement => {
  return (
    <div className={clsx('grid gap-6 my-12 md:grid-cols-2 xl:grid-cols-4', className)} style={{ contain: 'content', contentVisibility: 'auto' }}>
      {articles?.map && articles?.map(article => (
        <NextLink
          key={article.link}
          href={article.link}
          prefetch={false}
          className="
          hocus:bg-neutral-200
          hocus:dark:bg-[#24272E]
          flex
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[20px]
          bg-[#f1f1f1]
          transition-colors
          duration-300
          hover:!no-underline
          dark:bg-[#24272E]/50
          lg:[:is(&:hover,&:focus)>img]:h-36
          "
        >
          <img
            src={article.thumbnail ?? article.image}
            alt="Article logo"
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-40 transition-all duration-500"
          />
          <div className="flex flex-col p-5 grow">
            <Heading size="md" className="line-clamp-3 [hyphens:auto]">
              {article.title}
            </Heading>
            <Description
              size="md"
              className="line-clamp-4 overflow-hidden text-ellipsis !leading-[18px] [hyphens:auto]"
            >
              {article.description}
            </Description>
            <div className="flex justify-between items-center mt-auto text-xs">
              <div className="flex items-center space-x-1">
                <span className="font-bold dark:text-[#C4C4C4]">
                  {article.authors.join(', ')}
                </span>
                <span className="before:content-['_•_'] dark:text-gray-500">
                  {format(new Date(article.date), 'LLL do y')}
                </span>
              </div>

              {article.tags?.length > 0 && (
                <TagList
                  tags={article.tags}
                  asLink={false}
                  withCount={false}
                  className="gap-2 justify-end text-xs dark:text-gray-500"
                />
              )}
            </div>
          </div>
        </NextLink>
      ))}
    </div>
  );
};
