import {Link} from 'react-router-dom'


function GameCard({ game,onDelete,isReadOnly,addToCart,isCartPage,removeFromCart }) { 
  console.log(game);
  const {id,name,genre,price,imageUrl} = game;
  return (
      <div className="card">
      <img 
        src={imageUrl || "https://placehold.co/600x400?text=No+Image"} 
        alt={name} 
        className="card-img" 
      />
      <h2>{name}</h2>
      <p>{genre}</p>
      <span className="price">{price} $</span>
    
      <div className="card-actions">
      {isCartPage ? (
        <button className="btn-delete" onClick={() => removeFromCart(id)}>Remove</button>
      ) : isReadOnly ? (
        <>
          <Link to={`/game/${id}`} className='card-details'>View Details</Link>
          <button className='buyButton' onClick={() => addToCart(game)}>Buy</button>
        </>
        ) : (
        <>
          <button onClick={() => onDelete(id)} className="btn-delete">Delete</button>
          <Link to={`/admin/edit/${id}`} className="btn-update">Update</Link>
        </>
      )}
    </div>
  </div>
    );
}

export default GameCard;