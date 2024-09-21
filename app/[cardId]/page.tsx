import { CardPage } from '@/components/page/CardPage';
import { getCardData } from '@/sanity/api/card';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    cardId: string;
  };
};

export default async function Card(props: Props) {
  const { cardId } = props.params;

  const data = await getCardData(cardId);

  if (!data) {
    console.error('Card with id ', cardId, 'not found');
    notFound();
  }

  return <CardPage {...data} />;
}
