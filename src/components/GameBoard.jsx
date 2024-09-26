import React from 'react'

function GameBoard({ gameBoard, setActivePlayer }) {
    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}><ol>{row.map((col, colIndex) =>
                    <li key={colIndex}><button onClick={() => setActivePlayer(rowIndex, colIndex)} disabled={gameBoard[rowIndex][colIndex] != null}>{col}</button></li>)}</ol></li>)}
        </ol>
    )
}

export default GameBoard
