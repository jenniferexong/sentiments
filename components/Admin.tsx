'use client';

import { useAdminStore } from '@/store/adminStore';
import { useLayoutEffect } from 'react';

type Props = {
  accessCode: string | null;
};

export const Admin: React.FC<Props> = (props) => {
  const { accessCode } = props;
  const { setAccessCode } = useAdminStore();

  useLayoutEffect(() => {
    console.log('setting code', accessCode);
    setAccessCode(accessCode);
  }, [accessCode, setAccessCode]);

  return null;
};
