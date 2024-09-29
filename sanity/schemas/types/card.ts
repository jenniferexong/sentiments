import { CardCoverPreviewField } from '@/sanity/components/CardCoverPreviewField';
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
    { name: Group.Details, title: 'Details', default: false },
    { name: Group.Content, title: 'Content', default: true },
  ],
  fields: [
    defineField({
      title: 'URL',
      name: 'url',
      type: 'string',
      components: {
        field: CardUrlField,
      },
      group: [Group.Details, Group.Content],
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Recipient',
      name: 'recipient',
      type: 'string',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Access Code',
      name: 'accessCode',
      type: 'maskedString',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Date',
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Cover Image',
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: Group.Content,
    }),
    defineField({
      title: 'Content Preview',
      name: 'coverPreview',
      type: 'string',
      components: {
        field: CardCoverPreviewField,
      },
      group: Group.Content,
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'cardContent',
      validation: (rule) => rule.required(),
      group: Group.Content,
    }),
    defineField({
      title: 'Theme',
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
      const formattedDate = dayjs(date).format('ddd D MMM YYYY');
      return {
        title,
        subtitle: `to ${recipient} - ${formattedDate}`,
        media: coverImage,
      };
    },
  },
});
