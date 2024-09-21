import { MaskedStringInput } from '@/sanity/components/MaskedStringInput';
import { LockIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const maskedStringType = defineType({
  name: 'maskedString',
  type: 'string',
  icon: LockIcon,
  components: {
    input: MaskedStringInput,
  },
});
