import { CardUrlField } from '@/sanity/components/CardUrlField';
import { BookIcon } from '@sanity/icons';
import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'URL',
      type: 'string',
      components: {
        field: CardUrlField,
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipient',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      type: 'cardContent',
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
