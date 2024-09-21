'use client';

import { CardData } from '@/data/types';

type Props = CardData;

export const Card: React.FC<Props> = (props) => {
  const { title, accessCode } = props;

  console.log('data', props);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>{title}</h1>
      <h1>Code {accessCode}</h1>
    </div>
  );
};
