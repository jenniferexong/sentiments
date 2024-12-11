import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const cardCategoryType = defineType({
  name: 'cardCategory',
  title: 'Card Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
