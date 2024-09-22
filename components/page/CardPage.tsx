'use server';

import { Card } from '@/components/card/Card';
import { CardData } from '@/data/types';

type Props = CardData;

export const CardPage: React.FC<Props> = (props) => {
  return <Card {...props} />;
};
