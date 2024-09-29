'use client';

import { Card } from '@/components/card/Card';
import { CardAccessCode } from '@/components/card/CardAccessCode';
import { CardData } from '@/data/types';
import { useAdminStore } from '@/store/adminStore';

type Props = CardData;

export const CardPage: React.FC<Props> = (props) => {
  const { _id } = props;

  const hasAccessToCard = useAdminStore().cardAccess[_id];

  return !hasAccessToCard ? <CardAccessCode {...props} /> : <Card {...props} />;
};
