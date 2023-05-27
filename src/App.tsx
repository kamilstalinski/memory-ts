import { useEffect, useState } from "react";
import "./App.css";
import Config from "./components/Config";
import Card from "./components/Card";
import Result from "./components/Result";

interface CardObject {
  value: number;
  id: number;
  matched: boolean;
}

function App() {
  const [cards, setCards] = useState<CardObject[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [choiceOne, setChoiceOne] = useState<CardObject>();
  const [choiceTwo, setChoiceTwo] = useState<CardObject>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);
  const [allMatched, setAllMatched] = useState<boolean>(false);

  function handleIsReady() {
    setIsReady(!isReady);
    setTurns(0);
    setAllMatched(false);
  }

  function handleSetCards(inputNumber: number) {
    const newArray = [];
    for (let i = 0; i < inputNumber; i++) {
      newArray.push({ value: i + 1, matched: false });
    }

    const shuffledArray = [...newArray, ...newArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random() * inputNumber,
      }));
    setCards(shuffledArray);
  }

  function handleChoice(card: CardObject) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTurns((prevTurns: number) => prevTurns + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.value === choiceTwo.value) {
        setTimeout(() => {
          setCards((prevCards: CardObject[]) => {
            return prevCards.map((card: CardObject) => {
              if (card.value === choiceOne.value) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        }, 700);
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setAllMatched(cards.every((card) => card.matched === true));
  }, [cards]);

  return (
    <>
      {allMatched && cards.length > 0 ? (
        <div className='win'>
          <h1>You won in {turns} turns!</h1>
          <button className='new-game' onClick={handleIsReady}>
            New Game
          </button>
        </div>
      ) : (
        <div>
          {isReady && <Result turns={turns} handleIsReady={handleIsReady} />}
          {!isReady ? (
            <Config
              handleSetCards={handleSetCards}
              handleIsReady={handleIsReady}
            />
          ) : (
            <div className='board'>
              {cards.map((card) => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    disabled={disabled}
                    visible={
                      card.id === choiceOne?.id ||
                      card.id === choiceTwo?.id ||
                      card.matched
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
