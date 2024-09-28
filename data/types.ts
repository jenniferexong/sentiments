import { CardQueryResult } from '@/sanity/generated/sanity.types';

export type CardData = NonNullable<CardQueryResult>;

export type CardThemeData = NonNullable<CardQueryResult>['theme'];
