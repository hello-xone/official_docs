import { ComponentProps, ReactElement } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Link } from 'nextra-theme-docs';
import { asArray } from '@lib/as-array';

const Tag = ({
  children,
  isActive = false,
  href = '',
  ...props
}: Omit<ComponentProps<'a'>, 'ref'> & {
  isActive?: boolean;
}): ReactElement => {
  return (
    <Link
      href={href}
      className={clsx(
        'rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E]',
        'flex px-2.5 py-1.5 text-sm font-medium transition-colors',
        href
          ? 'hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF]'
          : 'cursor-default',
        isActive ? 'dark:bg-[#15AFD04C] dark:text-[#82E9FF]' : 'text-gray-500 dark:text-[#7F818C]',
      )}
      style={{
        textDecoration: 'none',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export const TagList = ({
  tags,
  asLink = false,
  withCount = false,
  className,
  ...props
}: {
  tags:
    | Array<{
        tag: string;
        title: string;
        count: number;
      }>
    | string[] | string;
  asLink?: boolean;
  withCount?: boolean;
  className?: string;
}): ReactElement => {
  const router = useRouter();
  return (
    <div className={clsx('flex flex-wrap justify-center gap-2.5', className)} {...props}>
      {asArray(tags).map(tag => {
        const tagToDisplay = typeof tag === 'string' ? tag.replaceAll('-', ' ') : tag.title;
        const tagSlug = typeof tag === 'string' ? tag : tag.tag;
        const count = typeof tag === 'string' ? 0 : tag.count;

        return (
          <Tag
            key={tagToDisplay}
            href={asLink ? `/blog/tag/${tagSlug}` : ''}
            title={`View other articles about ${tagToDisplay}`}
            isActive={tagSlug === router.query.tag}
          >
            {withCount && count > 0 ? `${tagToDisplay} (${count})` : tagToDisplay}
          </Tag>
        );
      })}
    </div>
  );
};
