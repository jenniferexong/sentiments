import LoadingIcon from '@/assets/icons/loading.svg';

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-charcoal">
      <LoadingIcon className="size-20 animate-spin fill-white" />
    </div>
  );
};
