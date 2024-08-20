type Props = {
  params: {
    cardId: string;
  };
};

export default async function Card(props: Props) {
  const { cardId } = props.params;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>Card</h1>
      <p>{cardId}</p>
    </div>
  );
}
