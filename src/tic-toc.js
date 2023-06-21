import styles from "./tic-toc.module.css";
import { useState } from "react";
//restart button

// render the button with the value empty
function Sqaure({ value, onSquareClick }) {
  return (
    <>
      <button className={styles.Sqaure} onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}
function Board() {
  const refresh = () => window.location.reload(true);
  let [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // to fix the X and O
    const nextSquares = squares.slice();

    // const restRT=document.querySelector('RestartBtn').addEventListener('click',function(){

    // updating the value of the square
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Yeah! ${winner} is the winner of Game`;
  } else if (squares.every((element) => element != null)) {
    status = `No one Win!`;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className={styles.MainContainer}>
        <h1 className={styles.MainHeading}>Play Your Game</h1>
        <div className={styles.Container}>
          <div className={styles.Status}>{status}</div>
          <div className={styles.ContainerRows}>
            <Sqaure value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Sqaure value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Sqaure value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className={styles.ContainerRows}>
            <Sqaure value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Sqaure value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Sqaure value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className={styles.ContainerRows}>
            <Sqaure value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Sqaure value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Sqaure value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>

          <button className={styles.RestartBtn} onClick={refresh}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
