import { CardCoverPreviewField } from '@/sanity/components/CardCoverPreviewField';
import { CardUrlField } from '@/sanity/components/CardUrlField';
import { BookIcon } from '@sanity/icons';
import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

const enum Group {
  Details = 'details',
  Content = 'content',
  Effects = 'effects',
}

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: Group.Details, title: 'Details', default: false },
    { name: Group.Content, title: 'Content', default: true },
    { name: Group.Effects, title: 'Effects', default: false },
  ],
  fields: [
    defineField({
      title: 'URL',
      name: 'url',
      type: 'string',
      components: {
        field: CardUrlField,
      },
      group: [Group.Details, Group.Content, Group.Effects],
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Category',
      name: 'category',
      type: 'reference',
      weak: false,
      to: [{ type: 'cardCategory' }],
      validation: (rule) => rule.required(),
      group: Group.Details,
    }),
    defineField({
      title: 'Recipient',
      name: 'recipient',
      type: 'reference',
      weak: false,
      to: [{ type: 'recipient' }],
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
      title: 'Size',
      name: 'size',
      type: 'number',
      initialValue: 1,
      options: {
        list: [
          { title: 'Square', value: 1 },
          { title: 'Portrait', value: 1.414 },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      group: Group.Content,
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
    defineField({
      title: 'Effects',
      name: 'effects',
      type: 'cardEffects',
      validation: (rule) => rule.required(),
      group: Group.Effects,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      recipient: 'recipient.name',
      date: 'date',
      coverImage: 'coverImage',
      category: 'category.name',
    },
    prepare(selection) {
      const { title, category, recipient, date, coverImage } = selection;
      const formattedDate = dayjs(date).format('D MMM YYYY');
      return {
        title,
        subtitle: `${recipient} | ${category} | ${formattedDate}`,
        media: coverImage,
      };
    },
  },
});
