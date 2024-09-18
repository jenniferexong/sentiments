import { CardUrlField } from '@/sanity/components/CardUrlField';
import { BookIcon } from '@sanity/icons';
import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

const enum Group {
  Details = 'details',
  Content = 'content',
}

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: Group.Details, title: 'Details', default: true },
    { name: Group.Content, title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'URL',
      type: 'string',
      components: {
        field: CardUrlField,
      },
      group: Group.Details,
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      name: 'recipient',
      type: 'string',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: Group.Content,
    }),
    defineField({
      name: 'content',
      type: 'cardContent',
      group: Group.Content,
    }),
    defineField({
      name: 'theme',
      type: 'cardTheme',
      group: Group.Content,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      recipient: 'recipient',
      date: 'date',
      coverImage: 'coverImage',
    },
    prepare(selection) {
      const { title, recipient, date, coverImage } = selection;
      const formattedDate = dayjs(date).format('dddd D MMMM YYYY');
      return {
        title,
        subtitle: `to ${recipient} - ${formattedDate}`,
        media: coverImage,
      };
    },
  },
});
