'use client';

import { CardAccessCode } from '@/components/card/CardAccessCode';
import { CardData } from '@/data/types';
import { useAdminStore } from '@/store/adminStore';

type Props = CardData;

export const Card: React.FC<Props> = (props) => {
  const { _id, title, accessCode } = props;

  const hasAccessToCard = useAdminStore().cardAccess[_id];

  return (
    <>
      {!hasAccessToCard ? (
        <CardAccessCode {...props} />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <h1>{title}</h1>
          <h1>Code {accessCode}</h1>
        </div>
      )}
    </>
  );
};
