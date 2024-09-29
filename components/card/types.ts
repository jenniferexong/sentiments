import {
  PortableTextBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from '@portabletext/types';

export interface LinkMark extends PortableTextMarkDefinition {
  _type: 'link';
  href?: string;
}

export type CardMarks = LinkMark;

export type CardInlineBlocks = PortableTextSpan;

export type CardTextStyles = 'normal' | 'h4';

export type CardListStyles = never;

export type CardPortableTextBlock = PortableTextBlock<
  CardMarks,
  CardInlineBlocks,
  CardTextStyles,
  CardListStyles
>;
