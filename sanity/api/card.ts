import { CardData } from '@/data/types';
import { CardQueryResult } from '@/sanity/generated/sanity.types';
import { client } from '@/sanity/lib/client';
import { cardQuery } from '@/sanity/queries/card';

const CARD_WIDTH = 3;

export const getCardData = async (id: string): Promise<CardData> => {
  const data = await client.fetch<CardQueryResult>(
    cardQuery,
    { cardId: id },
    { cache: 'no-store' }
  );

  if (!data) throw new Error(`Missing card data for id: ${id}`);

  return {
    ...data,
    size: {
      width: CARD_WIDTH,
      height: CARD_WIDTH * data.size,
    },
  };
};
