import { defineType, defineField } from 'sanity';

export const cardEffectsType = defineType({
  title: 'Card Effects',
  name: 'cardEffects',
  type: 'object',
  fields: [
    defineField({
      title: 'Confetti',
      name: 'confetti',
      type: 'confettiEffect',
      validation: (rule) => rule.required(),
    }),
  ],
});
