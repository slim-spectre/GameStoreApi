import {useParams,useNavigate} from 'react-router-dom'

function GameDetails({games}){
    const {id} = useParams();
    const navigate = useNavigate();

    const game = games.find(g => g.id == id);

    if(!game){
        return (
            <div className="container">
                <h1>Game was not found</h1>
                <button onClick={() => navigate('/')}>Back to Store</button>
            </div>
        )
    }

    return (
        <div className="game-details">
            <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
            <h1>{game.name}</h1>
            
            <div className="details-grid">
                <p><strong>Genre:</strong>{game.genre}</p>
                <p><strong>Price:</strong>{game.price}</p>
                <p><strong>Date of release:</strong>{game.releaseDate || "Unknown"}</p>
            </div>
            <div className="description">
                <h1>About the game:</h1>
                <p>This is where the description would be</p>
            </div>
        </div>
    )
}

export default GameDetails;