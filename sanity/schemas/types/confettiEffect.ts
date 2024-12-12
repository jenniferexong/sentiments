import { defineType, defineField } from 'sanity';

export const confettiEffectType = defineType({
  title: 'Confetti',
  name: 'confettiEffect',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable',
      name: 'enable',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Colors',
      name: 'colors',
      description: 'If empty, confetti will default to white',
      type: 'array',
      of: [
        {
          type: 'color',
          options: {
            disableAlpha: true,
          },
        },
      ],
    }),
  ],
});
