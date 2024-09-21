import { CardQueryResult } from '@/sanity/generated/sanity.types';
import { client } from '@/sanity/lib/client';
import { cardQuery } from '@/sanity/queries/card';

export const getCardData = async (id: string): Promise<CardQueryResult> => {
  const data = await client.fetch<CardQueryResult>(
    cardQuery,
    { cardId: id },
    { cache: 'no-store' }
  );

  return data;
};
