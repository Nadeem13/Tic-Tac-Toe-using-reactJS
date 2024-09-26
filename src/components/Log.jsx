import React from 'react'

function Log({ gameTurns }) {
    return (
        <ol id='log'>
            {gameTurns.map((gameTurn) => <li key={`${gameTurn.square.row}${gameTurn.square.col}`}>{gameTurn.player} clicked on {gameTurn.square.row},{gameTurn.square.col}</li>)}
        </ol>
    )
}

export default Log
