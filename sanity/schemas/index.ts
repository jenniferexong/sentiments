import { type SchemaTypeDefinition } from 'sanity';

import { cardType } from './types/card';
import { cardContentType } from './types/cardContent';
import { cardThemeType } from './types/cardTheme';
import { settingsType } from '@/sanity/schemas/types/settings';
import { maskedStringType } from '@/sanity/schemas/types/maskedString';
import { recipientType } from '@/sanity/schemas/types/recipient';
import { cardCategoryType } from '@/sanity/schemas/types/cardCategory';
import { confettiEffectType } from '@/sanity/schemas/types/confettiEffect';
import { cardEffectsType } from '@/sanity/schemas/types/cardEffects';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    cardType,
    cardCategoryType,
    cardContentType,
    cardEffectsType,
    cardThemeType,
    maskedStringType,
    recipientType,
    confettiEffectType,
  ],
};
