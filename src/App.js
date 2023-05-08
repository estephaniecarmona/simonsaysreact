import React from 'react';
import { useState } from 'react';



function Square({ onSquareClick, color }) {
  return (
    <button className="square" onClick={onSquareClick} style={{ backgroundColor: color }}>

    </button>
  );
}

function randomInt(number) {
  return Math.floor(Math.random() * (number))
}

function randomPick(array) {
  return array[randomInt(array.length)]
}

function Board({ squares, onPlay, currentColor }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    
    onPlay(nextSquares)
  }

  let status = "";
  // #fff700 yellow
  const componentArray = [
    <Square color={currentColor} onSquareClick={() => handleClick(0)} />,
    <Square color={"blue"} onSquareClick={() => handleClick(1)} />,
    <Square color={"green"} onSquareClick={() => handleClick(2)} />,
    <Square color={"red"} onSquareClick={() => handleClick(3)} />,
  ]

  randomPick(componentArray)

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        {componentArray}
      </div>
    </React.Fragment>
  );
}


export default function Game() {
  const [history] = useState([Array(9).fill(null)]);
  const colors = ["yellow", "blue", "green", "red"]

  const [currentColor, setCurrentColor] = useState(randomPick(colors));




  function handlePlay(nextSquares) {

  }

  function startGame() {
    console.log(currentColor)
    const randomColorPick = randomPick(colors)
    setCurrentColor(randomColorPick);
  }



  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'PLAY';
    }
    return (
      <li>
        <button onClick={() => startGame()}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} currentColor={currentColor}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}