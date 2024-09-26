import React from 'react'

function GameOver({ winner, onRematch }) {
    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {winner && <p>{winner} won the match</p>}
            {!winner && <p>Match is draw</p>}
            <p><button onClick={onRematch}>Rematch</button></p>
        </div>
    )
}

export default GameOver
