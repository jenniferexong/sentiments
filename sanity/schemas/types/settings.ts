import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      initialValue: 'Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      title: 'Access Code',
      name: 'accessCode',
      description: 'The global access code that can access any card.',
      type: 'maskedString',
      validation: (rule) => rule.required(),
    }),
  ],
});
