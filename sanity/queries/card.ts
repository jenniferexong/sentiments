import { groq } from 'next-sanity';

export const cardQuery = groq`
  *[_type in ["card"] && _id == $cardId][0]{
    _id, title, recipient, accessCode, content, theme, date
  }
`;
