import { CardData, CardThemeData } from '@/data/types';
import { Text, Root, Container } from '@react-three/uikit';
import { CARD_HEIGHT, CARD_WIDTH } from './Card';
import { MeshStandardMaterial } from 'three';
import React, { useMemo } from 'react';
import {
  CardInlineBlocks,
  CardMarks,
  CardPortableTextBlock,
  CardTextStyles,
  LinkMark,
} from '@/components/card/types';
import { DEFAULT_CARD_TEXT_COLOR } from '@/data/constants';

const CARD_TEXT_SIZE_TITLE = 16;
const CARD_TEXT_SIZE_HEADING = 14;
const CARD_TEXT_SIZE = 10;
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
      transformTranslateZ={0.1}
      backgroundOpacity={0}
      panelMaterialClass={MeshStandardMaterial}
    >
      <Text
        fontSize={CARD_TEXT_SIZE_TITLE}
        color={theme.textColor.hex ?? DEFAULT_CARD_TEXT_COLOR}
      >
        {content.title}
      </Text>
      <Container flexDirection="column" gap={8} width="100%">
        {content.message && (
          <CardPortableText
            data={content.message as CardPortableTextBlock[]}
            theme={theme}
          />
        )}
      </Container>
      <Text
        fontSize={CARD_TEXT_SIZE_TITLE}
        color={theme.textColor.hex ?? DEFAULT_CARD_TEXT_COLOR}
      >
        {content.conclusion}
      </Text>
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
  const { data, style, markDefs, theme } = props;

  if (data._type !== 'span') {
    throw new Error('Unsupported inline block:', data._type);
  }

  const link: LinkMark | undefined = markDefs?.find(
    (def) => def._type === 'link' && data.marks?.includes(def._key)
  );

  const handleClick = () => {
    if (!link) return;

    window.open(link.href, '_blank');
  };

  const handleHoverChange = (hovering: boolean) => {
    if (!link) return;

    document.body.style.cursor = hovering ? 'pointer' : 'auto';
  };

  const textProps = useMemo(
    () => ({
      color: theme.textColor.hex ?? DEFAULT_CARD_TEXT_COLOR,
      fontSize: style === 'h4' ? CARD_TEXT_SIZE_HEADING : CARD_TEXT_SIZE,
      fontWeight: data.marks?.includes('strong') ? 600 : 400,
      borderBottomWidth: link ? 1 : 0,
      borderColor: link && (theme.textColor.hex ?? DEFAULT_CARD_TEXT_COLOR),
    }),
    [data.marks, link, style, theme.textColor.hex]
  );

  return data.text
    .trim()
    .split(' ')
    .map((word, index) => {
      return (
        <Container key={index} positionType="relative">
          {/* 'absolute' position, so we can change font size without effecting the rest of the text */}
          <Text
            {...textProps}
            positionType="absolute"
            positionLeft="50%"
            positionTop="50%"
            transformTranslateX="-50%"
            transformTranslateY="-50%"
            onHoverChange={handleHoverChange}
            onClick={handleClick}
            hover={
              link && {
                fontWeight: textProps.fontWeight + 100,
              }
            }
          >
            {word}
          </Text>
          {/* Ghost element to set correct size of container */}
          <Text {...textProps} opacity={0}>
            {word}
          </Text>
        </Container>
      );
    });
};
