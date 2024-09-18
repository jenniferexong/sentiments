import { groq } from 'next-sanity';

export const cardQuery = groq`
  *[_type in ["card"] && _id == $cardId][0]{
    title, recipient, content, theme, date
  }
`;
