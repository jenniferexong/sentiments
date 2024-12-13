import LoadingIcon from '@/assets/icons/loading.svg';
import { useEffect } from 'react';

type Props = {
  onLoaded: () => void;
};

export const Loading: React.FC<Props> = ({ onLoaded }) => {
  useEffect(() => {
    return () => {
      onLoaded();
    };
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-charcoal">
      <LoadingIcon className="size-20 animate-spin fill-white" />
    </div>
  );
};
