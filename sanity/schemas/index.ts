import { type SchemaTypeDefinition } from 'sanity';

import { cardType } from './types/card';
import { cardContentType } from './types/cardContent';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cardType, cardContentType],
};
