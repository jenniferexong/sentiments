import { CardContentPreviewField } from '@/sanity/components/CardContentPreviewField';
import { defineType, defineField } from 'sanity';

export const cardThemeType = defineType({
  title: 'Card Theme',
  name: 'cardTheme',
  type: 'object',
  fields: [
    defineField({
      title: 'Card Colour',
      name: 'cardColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      title: 'Text Colour',
      name: 'textColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      title: 'Content Preview',
      name: 'contentPreview',
      type: 'string',
      components: {
        field: CardContentPreviewField,
      },
    }),
  ],
});
