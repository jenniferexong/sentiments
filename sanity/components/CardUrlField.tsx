import { ShareIcon } from '@sanity/icons';
import { Button, Card, Inline, Stack, Text, useToast } from '@sanity/ui';
import { useFormValue } from 'sanity';

export const CardUrlField: React.FC = () => {
  const id = useFormValue(['_id']);
  const password = useFormValue(['accessCode']);

  const url = `${window.location.origin}/${String(id)}`;
  const toast = useToast();

  return (
    <Card>
      <Stack space={4}>
        <Text>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </Text>
        <Inline>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${url}\nPassword: ${password}`);
              toast.push({
                status: 'warning',
                title: 'Copied to clipboard',
              });
            }}
            mode="ghost"
            tone="caution"
            icon={ShareIcon}
            padding={[2, 2, 3]}
            text="Share"
          />
        </Inline>
      </Stack>
    </Card>
  );
};
