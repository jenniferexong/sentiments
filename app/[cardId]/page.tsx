import { CardPage } from '@/components/page/CardPage';
import { getCardData } from '@/sanity/api/card';
import { Metadata } from 'next';

type Props = {
  params: {
    cardId: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { cardId } = props.params;

  const data = await getCardData(cardId);

  if (!data) {
    return {
      title: 'Sentiments',
    };
  }

  // TODO add background color?
  // const images = data.coverImage?.asset
  //   ? [urlFor(data.coverImage.asset).url()]
  //   : undefined;

  return {
    title: data.title,
    openGraph: {
      title: data.title,
      // images,
    },
  };
}

export default async function Card(props: Props) {
  const { cardId } = props.params;

  const data = await getCardData(cardId);

  return <CardPage {...data} />;
}
