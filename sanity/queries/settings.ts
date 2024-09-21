import { groq } from 'next-sanity';

export const settingsQuery = groq`
  *[_type in ["settings"]][0]{
    accessCode
  }
`;
