import { CardContentPreviewField } from '@/sanity/components/CardContentPreviewField';
import { defineType, defineField } from 'sanity';

export const cardThemeType = defineType({
  title: 'Card Theme',
  name: 'cardTheme',
  type: 'object',
  fields: [
    defineField({
      name: 'cardColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'textColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'contentPreview',
      type: 'string',
      components: {
        field: CardContentPreviewField,
      },
    }),
  ],
});
