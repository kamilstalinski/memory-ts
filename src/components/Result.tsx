type ResultProps = {
  turns: number;
  handleIsReady: () => void;
};

export default function Result({ turns, handleIsReady }: ResultProps) {
  return (
    <>
      <div className='result'>
        <div className='turns'>Turns: {turns}</div>
        <button className='new-game' onClick={handleIsReady}>
          New Game
        </button>
      </div>
    </>
  );
}
