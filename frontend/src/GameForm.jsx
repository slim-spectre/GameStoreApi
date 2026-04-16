import { useState} from 'react';
import {useParams} from 'react-router-dom'


function GameForm({ onSubmit, onCancel,genres,games }) {
  const {id} = useParams();
  const editingGame = games.find(g => g.id == id);
  const initialGenre = genres.find(g => g.name === editingGame?.genre);
  
  const [name, setName] = useState(editingGame?.name || "");
  const [price, setPrice] = useState(editingGame?.price || "");
  const [genreId, setGenreId] = useState(initialGenre?.id || (genres[0]?.id || 1));
  const [img,setImg] = useState(editingGame?.imageUrl || "");
  const [nameError,setNameError] = useState("");
  const [priceError,setPriceError] = useState("");


  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if(value.trim().length > 0 && value.trim().length < 3){
      setNameError("Name must be at least 3 character");
    }else{
      setNameError("");
    }
  };
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);

    if(value <= 0 || value > 100){
      setPriceError("Price must be between 1 and 100$");
    }else{
      setPriceError("");
    }
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){
      onSubmit(editingGame.id, {name,price:Number(price),genreId,imageUrl:img});
    }else{
      onSubmit({name,price:Number(price),genreId,imageUrl:img});
    }
  };

  const isInvalid = name.trim().length < 3 || price <= 0 || price > 100;

  return (
    <form onSubmit={handleSubmit} className="add-game-form">
      <input value={name} onChange={handleNameChange} placeholder="Name" className={nameError ? 'input-error' : ""} required />
      {nameError && <span className='error-text'>{nameError}</span>}
      <select value={genreId} onChange={e => setGenreId(parseInt(e.target.value))}>
        {genres.map(genre => (
          <option value={genre.id} key={genre.id}>{genre.name}</option>
        ))}
      </select>
      <input type="number" value={price} onChange={handlePriceChange} className={priceError ? 'input-error' : ""} placeholder="Price" required />
      <input type="text" value={img} className='imgInput' onChange={e => setImg(e.target.value)} placeholder='IMG Url' required />
      {priceError && <span className='error-text'>{priceError}</span>}
      
      <button type="submit"
       disabled={isInvalid}
       style={{
        backgroundColor: isInvalid ? "#bdc3c7" : (editingGame ? "#f1c40f" : "#2ecc71"),
        cursor: isInvalid ? "not-allowed" : "pointer",
        opacity: isInvalid ? 0.7 : 1
       }}
      >{editingGame ? "Update" : "Add"}
      </button>
      {editingGame && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
export default GameForm;