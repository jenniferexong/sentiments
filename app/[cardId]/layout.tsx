import { Admin } from '@/components/Admin';
import { getSettingsData } from '@/sanity/api/settings';
import { PropsWithChildren } from 'react';

export default async function CardLayout({ children }: PropsWithChildren) {
  const data = await getSettingsData();

  return (
    <>
      <Admin accessCode={data?.accessCode ?? null} />
      {children}
    </>
  );
}
