type Props = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
};

export const Label: React.FC<Props> = (props) => {
  const { icon: Icon, label } = props;

  return (
    <div className="pointer-events-none flex items-center gap-2 rounded-lg border border-dashed border-white bg-gradient-to-b from-black to-black px-3 py-2">
      <Icon className="size-4 fill-white" />
      <span className="text-sm italic text-white">{label}</span>
    </div>
  );
};
