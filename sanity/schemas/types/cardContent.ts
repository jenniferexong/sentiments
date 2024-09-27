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
      name: 'message',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
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
