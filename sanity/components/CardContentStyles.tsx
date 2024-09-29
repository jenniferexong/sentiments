import { CARD_TEXT_SIZE, CARD_TEXT_SIZE_HEADING } from '@/data/constants';
import { PreviewProps } from 'sanity';

export const CardContentLargeStyle = (props: PreviewProps) => (
  <p
    style={{
      fontFamily: 'var(--font-sentiments)',
      fontSize: CARD_TEXT_SIZE_HEADING * 2,
      lineHeight: '100%',
    }}
  >
    {props.children}
  </p>
);

export const CardContentNormalStyle = (props: PreviewProps) => (
  <p
    style={{
      fontFamily: 'var(--font-sentiments)',
      fontSize: CARD_TEXT_SIZE * 2,
      lineHeight: '100%',
    }}
  >
    {props.children}
  </p>
);

export const CardContentStrong = (props: PreviewProps) => (
  <strong
    style={{
      fontWeight: 700,
    }}
  >
    {props.children}
  </strong>
);
