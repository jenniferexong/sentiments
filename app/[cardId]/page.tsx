import { getCardData } from '@/sanity/api/card';

type Props = {
  params: {
    cardId: string;
  };
};

export default async function Card(props: Props) {
  const { cardId } = props.params;

  const data = await getCardData(cardId);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>Card {cardId}</h1>
      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
