import { useRef } from "react";

type ConfigProps = {
  handleIsReady: () => void;
  handleSetCards: (inputNumber: number) => void;
};

export default function Config({ handleIsReady, handleSetCards }: ConfigProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleStartGame() {
    if (inputRef.current) {
      if (inputRef.current.value === "0") {
        alert("You can't start game with 0 pairs");
      } else if (inputRef.current.value === "") {
        alert("You must enter the number of pairs!");
      } else {
        handleIsReady();
        handleSetCards(parseInt(inputRef.current.value));
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleStartGame();
    }
  }

  return (
    <div className='config'>
      <label>
        Choose the number of pairs!
        <input
          ref={inputRef}
          name='pairs'
          type='number'
          max='10'
          onKeyDown={handleKeyDown}
        />
      </label>
      <button onClick={handleStartGame}>Start Game!</button>
    </div>
  );
}
