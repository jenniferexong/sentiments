import { CardData } from '@/data/types';
import { useAdminStore } from '@/store/adminStore';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = Pick<CardData, '_id' | 'accessCode'>;

type Inputs = {
  accessCode: string;
};

export const CardAccessCode: React.FC<Props> = (props) => {
  const { _id, accessCode } = props;
  const { accessCode: adminAccessCode, setAccessedCard } = useAdminStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      accessCode: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (![accessCode, adminAccessCode].includes(data.accessCode)) {
      setError('accessCode', { type: 'custom', message: 'Incorrect code' });
      return;
    }

    setAccessedCard(_id);
  };

  useEffect(() => {
    setFocus('accessCode');
  }, [setFocus]);

  const errorClassName = cn(
    'text-error font-reddit-mono absolute top-full mt-2 uppercase tracking-wide transition-all',
    {
      'opacity-0': !errors.accessCode,
      'opacity-100': errors.accessCode,
    }
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-charcoal text-white">
      <form
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <label
            htmlFor="access-code"
            className="absolute bottom-full mb-2 font-reddit-mono uppercase tracking-wide"
          >
            Access code
          </label>
          <input
            {...register('accessCode', {
              required: 'Code is required',
            })}
            autoComplete="off"
            className="flex h-16 items-center rounded border border-white/50 bg-transparent px-4 font-ubunto-mono text-2xl tracking-[0.5em] outline-none sm:w-[400px]"
          />
          <p className={errorClassName}>{errors.accessCode?.message}</p>
        </div>
        <button
          className="flex h-16 w-fit items-center rounded border border-white/50 bg-white/5 px-6 font-reddit-mono text-2xl uppercase tracking-wide outline-none transition-colors hover:bg-transparent"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};
