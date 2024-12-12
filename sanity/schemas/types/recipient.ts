import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const recipientType = defineType({
  name: 'recipient',
  title: 'Recipient',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
