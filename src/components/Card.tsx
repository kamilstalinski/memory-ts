interface CardObject {
  value: number;
  id: number;
  matched: boolean;
}

type CardProps = {
  card: CardObject;
  handleChoice: (card: CardObject) => void;
  disabled: boolean;
  visible: boolean;
};

export default function Card({
  handleChoice,
  card,
  disabled,
  visible,
}: CardProps) {
  function handleClick() {
    if (card.matched || visible) return;
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div
      key={Math.random() * card.id}
      className={`card ${card.matched ? "matched" : ""} ${
        visible ? "visible" : ""
      }`}
      onClick={handleClick}>
      <h2>{card.value}</h2>
    </div>
  );
}
