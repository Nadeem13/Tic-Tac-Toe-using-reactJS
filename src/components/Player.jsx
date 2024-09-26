import { useState } from "react"

export default function Player({ defaultPlayer, defaultSymbol, isActive, playerHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [player, setPlayer] = useState(defaultPlayer);

    function saveHandler(e) {
        setPlayer(e.target.value);
        playerHandler(defaultSymbol, e.target.value);
    }

    let playerTile = <span className="player-name">{player}</span>;
    if (isEditing) {
        playerTile = <input type="text" className="player-name" value={player}
            onChange={saveHandler} />;
    }

    function editClickHandler() {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            {playerTile}
            <span className="player-symbol">{defaultSymbol}</span>
            <button onClick={editClickHandler}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>

    )
}