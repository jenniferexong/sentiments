import { Text } from '@sanity/ui';
import { useFormValue } from 'sanity';

export const CardUrlField: React.FC = () => {
  const id = useFormValue(['_id']);

  const url = `${window.location.origin}/${String(id)}`;

  return (
    <Text>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </Text>
  );
};
