import GameCard from '../GameCard';
import Stats from '../Stats';

function HomePage({ games,sortBy,setSearchTerm,addToCart }) {


  return (
    <div className='shop-view'>
      <h1>Welcome to GameStore</h1>
      <Stats games={games} />
      <select className='sortSelect'  onChange={e => sortBy(e.target.value)}>
          <option value="default">Sort by:Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
      </select>
      <div className="games-grid">
        {games.map(g => (
          <GameCard key={g.id} game={g} isReadOnly={true} addToCart={addToCart} />
        ))}
        {games.length === 0 && <button className='clearSearch' onClick={() => setSearchTerm("")}>Clear Search</button>}
      </div>
    </div>
  );
}   

export default HomePage;