import { Card, Stack, Text } from '@sanity/ui';
import { useFormValue } from 'sanity';

export const CardContentPreviewField: React.FC = () => {
  const cardColor = useFormValue(['theme.cardColor']);
  const textColor = useFormValue(['theme.textColor']);

  return (
    <Stack space={4}>
      <Text>Theme preview</Text>
      <Card
        radius={2}
        style={{ backgroundColor: (cardColor as any)?.hex ?? 'white' }}
        padding={4}
      >
        <Text style={{ color: (textColor as any)?.hex ?? 'black' }}>
          This is some sample text.
        </Text>
      </Card>
    </Stack>
  );
};
