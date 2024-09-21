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

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>Card {cardId}</h1>
      <h1>Code {data.accessCode}</h1>
      {/* <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
