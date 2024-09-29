import { CardPage } from '@/components/page/CardPage';
import { getCardData } from '@/sanity/api/card';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  return {
    title: data.title,
  };
}

export default async function Card(props: Props) {
  const { cardId } = props.params;

  const data = await getCardData(cardId);

  if (!data) {
    console.error('Card with id ', cardId, 'not found');
    notFound();
  }

  return <CardPage {...data} />;
}
