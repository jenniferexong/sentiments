import { CardQueryResult } from '@/sanity/generated/sanity.types';

export type CardData = Omit<NonNullable<CardQueryResult>, 'size'> & {
  size: {
    width: number;
    height: number;
  };
};

export type CardThemeData = NonNullable<CardQueryResult>['theme'];
