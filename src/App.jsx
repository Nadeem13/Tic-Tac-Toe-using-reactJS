import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { useState } from "react"
import { WINNING_COMBINATIONS } from './database/database.js'
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  X: "Player1",
  O: "Player2",
};

function deriveActivePlayer(gameTurns) {
  let detectedPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    detectedPlayer = '0';
  }

  return detectedPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
  if (gameTurns.length > 0) {
    for (const gameTurn of gameTurns) {
      const { square, player } = gameTurn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  }
  return gameBoard;
}

function deriveWinner(players, gameBoard) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function deriveDraw(gameTurns, winner) {
  let draw = null;
  draw = gameTurns.length === 9 && !winner;
  return draw;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(players, gameBoard);
  const draw = deriveDraw(gameTurns, winner);

  function playerHandler(symbol, name) {
    setPlayers(prevPlayers => {
      return ({ ...prevPlayers, [symbol]: name });
    });
  }

  function rematchHandler() {
    setGameTurns([]);
  }

  function activePlayerHandler(rowIndex, colIndex) {
    setGameTurns((prevGameTurn) => {
      let currentPlayer = deriveActivePlayer(prevGameTurn);
      const updatedGameTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurn];
      return updatedGameTurn;
    });
  }

  return (
    <>
      <header>
        <img src="game-logo.png" alt="Tic Tac Toe Logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main id="game-container">
        <ol id="players" className="highlight-player">
          <Player defaultPlayer={PLAYERS.X} defaultSymbol="X" isActive={activePlayer === 'X'} playerHandler={playerHandler} />
          <Player defaultPlayer={PLAYERS.O} defaultSymbol="0" isActive={activePlayer === '0'} playerHandler={playerHandler} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRematch={rematchHandler} />}
        <GameBoard gameBoard={gameBoard} setActivePlayer={activePlayerHandler} />
      </main >
      <Log gameTurns={gameTurns} />
    </>
  )
}

export default App
