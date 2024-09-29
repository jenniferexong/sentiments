import {
  CardContentHeadingStyle,
  CardContentNormalStyle,
  CardContentStrong,
} from '@/sanity/components/CardContentStyles';
import { defineType, defineArrayMember, defineField } from 'sanity';

export const cardContentType = defineType({
  title: 'Card Content',
  name: 'cardContent',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      description: 'e.g. "Dear ...,"',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Message',
      description: 'Multiple whitespaces in a row is not supported.',
      name: 'message',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {
              title: 'Normal',
              value: 'normal',
              component: CardContentNormalStyle,
            },
            {
              title: 'Heading',
              value: 'h4',
              component: CardContentHeadingStyle,
            },
          ],
          lists: [],
          marks: {
            decorators: [
              {
                title: 'Strong',
                value: 'strong',
                component: CardContentStrong,
              },
              // { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      title: 'Conclusion',
      description: 'e.g. "From ..."',
      name: 'conclusion',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
