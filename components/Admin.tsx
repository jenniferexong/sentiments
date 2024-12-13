'use client';

import { useAdminStore } from '@/store/adminStore';
import { useLayoutEffect } from 'react';

type Props = {
  accessCode: string | null;
};

export const Admin: React.FC<Props> = (props) => {
  const { accessCode } = props;
  const { initialize, setAccessCode } = useAdminStore();

  useLayoutEffect(() => {
    initialize();
    setAccessCode(accessCode);
  }, [accessCode, initialize, setAccessCode]);

  return null;
};
