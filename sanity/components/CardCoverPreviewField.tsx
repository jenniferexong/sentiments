import { CARD_RATIO, DEFAULT_CARD_COLOR } from '@/data/constants';
import { urlFor } from '@/sanity/lib/image';
import { Card, Stack, Text } from '@sanity/ui';
import { isImage, useFormValue } from 'sanity';
import Image from 'next/image';

export const CardCoverPreviewField: React.FC = () => {
  const image = useFormValue(['coverImage']);
  const cardColor = useFormValue(['theme', 'cardColor']);

  return (
    <Stack space={4}>
      <Text>Cover preview</Text>
      <Card
        style={{
          backgroundColor: (cardColor as any)?.hex ?? DEFAULT_CARD_COLOR,
          position: 'relative',
          width: '100%',
          aspectRatio: 1 / CARD_RATIO,
          height: 'auto',
        }}
        padding={8}
      >
        {isImage(image) && (
          <Image src={urlFor(image).url()} alt="" fill objectFit="contain" />
        )}
      </Card>
    </Stack>
  );
};
