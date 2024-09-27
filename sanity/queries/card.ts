import { DEFAULT_CARD_COLOR, DEFAULT_CARD_TEXT_COLOR } from '@/data/constants';
import { groq } from 'next-sanity';

export const cardQuery = groq`
  *[_type in ["card"] && _id == $cardId][0]{
    _id, title, recipient, accessCode, date,
    "content": content{
      title, message, conclusion
    },
    "theme": coalesce(theme{
      "cardColor": coalesce(cardColor, {
        "hex": "${DEFAULT_CARD_COLOR}"
      }),
      "textColor": coalesce(textColor, {
        "hex": "${DEFAULT_CARD_TEXT_COLOR}"
      })
    }, {
     "cardColor": {
        "hex": "${DEFAULT_CARD_COLOR}"
      },
      "textColor": {
        "hex": "${DEFAULT_CARD_TEXT_COLOR}"
      },
    })
  }
`;
