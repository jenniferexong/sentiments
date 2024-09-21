import { SettingsQueryResult } from '@/sanity/generated/sanity.types';
import { client } from '@/sanity/lib/client';
import { settingsQuery } from '@/sanity/queries/settings';

export const getSettingsData = async (): Promise<SettingsQueryResult> => {
  const data = await client.fetch<SettingsQueryResult>(
    settingsQuery,
    {},
    {
      cache: 'no-store',
    }
  );

  return data;
};
