import { CardData } from '@/data/types';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';

const components: Partial<PortableTextReactComponents> = {
  block: {
    h4: ({ children }) => {
      return <h4 className="text-2xl">{children}</h4>;
    },
    normal: ({ children }) => {
      return <p className="text-lg">{children}</p>;
    },
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 list-disc">{children}</ul>,
    number: ({ children }) => <ol className="ml-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <span className="relative">
          <span className="invisible">{children}</span>
          <a
            {...value}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 underline transition-all hover:text-xl"
          >
            {children}
          </a>
        </span>
      );
    },
  },
};

type Props = CardData['content'];

export const CardContent: React.FC<Props> = (props) => {
  const { title, message, conclusion } = props;

  return (
    <div className="flex h-full select-none flex-col justify-between px-10 py-16">
      <h2 className="text-3xl">{title}</h2>
      <div className="flex flex-col gap-3">
        {message && <PortableText value={message} components={components} />}
      </div>
      <p className="text-3xl">{conclusion}</p>
    </div>
  );
};
