import { type SchemaTypeDefinition } from 'sanity';

import { cardType } from './types/card';
import { cardContentType } from './types/cardContent';
import { cardThemeType } from './types/cardTheme';
import { settingsType } from '@/sanity/schemas/types/settings';
import { maskedStringType } from '@/sanity/schemas/types/maskedString';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    cardType,
    cardContentType,
    cardThemeType,
    maskedStringType,
  ],
};
