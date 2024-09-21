import { Box, TextInput } from '@sanity/ui';
import { StringInputProps } from 'sanity';

export const MaskedStringInput = (props: StringInputProps) => {
  const { elementProps, focused } = props;

  return (
    <Box style={{ position: 'relative' }}>
      <TextInput {...elementProps} style={{ opacity: focused ? 100 : 0 }} />
      {/* Mask text */}
      {!focused && !!elementProps.value && (
        <Box style={{ position: 'absolute', inset: 0 }}>
          <TextInput
            defaultValue="••••••••••"
            onFocus={() => elementProps.ref.current?.focus()}
          />
        </Box>
      )}
    </Box>
  );
};
