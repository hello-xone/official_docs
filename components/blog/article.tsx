import { ReactElement } from 'react';
import { format } from 'date-fns';
import { Image, TagList } from './';
import { asArray } from '@lib/as-array';
import { Meta } from '@lib/meta';
import { useConfig } from 'nextra-theme-docs';

const Authors = ({ meta }: { meta: Meta }): ReactElement => {
  const date = meta.date ? new Date(meta.date) : new Date();
  const updatedDate = meta.updateDate ? new Date(meta.updateDate) : null;

  const authors = asArray(meta.authors);
  return (
    <>
      <time
        dateTime={date.toISOString()}
        title={
          updatedDate
            ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
            : `Posted ${format(date, 'EEEE, LLL do y')}`
        }
        className="mt-5 block text-center text-xs text-[#777]"
      >
        {format(date, 'EEEE, LLL do y')}
      </time>
      <div className="my-5 flex flex-wrap justify-center gap-5">
        {authors.map(author =>
           <span className="ml-2.5 text-sm" key={author}>{author}</span>
        )}
      </div>
    </>
  );
};

export const Article = (): ReactElement => {
  const { frontMatter } = useConfig();

  return (
    <>
      <h1>{frontMatter.title}</h1>
      <Authors meta={frontMatter as Meta} />
      <TagList tags={frontMatter.tags} asLink className="mt-4" />
      <Image src={frontMatter.image} className="mx-auto mt-6 aspect-video object-contain mb-6" />
    </>
  );
};
