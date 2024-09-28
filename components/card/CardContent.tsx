import { CardData, CardThemeData } from '@/data/types';
import { Text, Root, Container } from '@react-three/uikit';
import { CARD_HEIGHT, CARD_WIDTH } from './Card';
import { MeshStandardMaterial } from 'three';
import React from 'react';
import {
  CardInlineBlocks,
  CardMarks,
  CardPortableTextBlock,
  CardTextStyles,
} from '@/components/card/types';

const CARD_TEXT_SIZE_TITLE = 20;
const CARD_TEXT_SIZE_HEADING = 16;
const CARD_TEXT_SIZE = 12;
const CARD_TEXT_GAP_HEADING = CARD_TEXT_SIZE_HEADING / 4;
const CARD_TEXT_GAP = CARD_TEXT_SIZE / 4;

type CardContentProps = Pick<CardData, 'content' | 'theme'>;

export const CardContent: React.FC<CardContentProps> = (props) => {
  const { content, theme } = props;

  return (
    <Root
      flexDirection="column"
      justifyContent="space-between"
      sizeX={CARD_WIDTH}
      sizeY={CARD_HEIGHT}
      anchorX="left"
      paddingY={24}
      paddingX={20}
      transformTranslateZ={1}
      panelMaterialClass={MeshStandardMaterial}
    >
      <Text fontSize={CARD_TEXT_SIZE_TITLE}>{content.title}</Text>
      <Container flexDirection="column" gap={8} width="100%">
        {content.message && (
          <CardPortableText
            data={content.message as CardPortableTextBlock[]}
            theme={theme}
          />
        )}
      </Container>
      <Text fontSize={CARD_TEXT_SIZE_TITLE}>{content.conclusion}</Text>
    </Root>
  );
};

type CardPortableTextProps = {
  data: CardPortableTextBlock[];
  theme: CardThemeData;
};

const CardPortableText: React.FC<CardPortableTextProps> = (props) => {
  const { data, theme } = props;

  return data.map((block, blockIndex) => {
    switch (block._type) {
      case 'block': {
        return (
          <Container
            key={blockIndex}
            flexDirection="row"
            flexWrap="wrap"
            width="100%"
            gap={block.style === 'h4' ? CARD_TEXT_GAP_HEADING : CARD_TEXT_GAP}
          >
            {block.children.map((child, index) => {
              return (
                <CustomPortableTextInlineBlock
                  key={index}
                  data={child}
                  markDefs={block.markDefs}
                  style={block.style}
                  theme={theme}
                />
              );
            })}
          </Container>
        );
      }
    }
  });
};

type CardPortableTextInlineBlockProps = {
  data: CardInlineBlocks;
  style: CardTextStyles | undefined;
  markDefs: CardMarks[] | undefined;
  theme: CardThemeData;
};

const CustomPortableTextInlineBlock: React.FC<
  CardPortableTextInlineBlockProps
> = (props) => {
  const { data, style, markDefs } = props;

  if (data._type !== 'span') {
    throw new Error('Unsupported inline block:', data._type);
  }

  // TODO handle link click and hover
  const isLink =
    markDefs &&
    data.marks?.some((mark) => markDefs.some((def) => def._key === mark));

  return data.text
    .trim()
    .split(' ')
    .map((word, index) => {
      return (
        <Text
          key={index}
          width={'auto'}
          flexGrow={0}
          fontSize={style === 'h4' ? CARD_TEXT_SIZE_HEADING : CARD_TEXT_SIZE}
          fontWeight={data.marks?.includes('strong') ? 'bold' : 'normal'}
          borderColor={'black'}
          borderBottomWidth={isLink ? 1 : 0}
        >
          {word}
        </Text>
      );
    });
};
