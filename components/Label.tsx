import { cn } from '@/utils/cn';

type Props = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
};

export const Label: React.FC<Props> = (props) => {
  const { icon: Icon, label, className } = props;

  const containerClassName = cn(
    'pointer-events-none flex items-center gap-2 rounded-lg border border-dashed border-white bg-gradient-to-b from-black to-black px-3 py-2 whitespace-nowrap flex-nowrap w-fit select-none',
    className
  );

  return (
    <div className={containerClassName}>
      <Icon className="size-4 fill-white" />
      <span className="text-sm italic text-white">{label}</span>
    </div>
  );
};
