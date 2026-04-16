

function Stats({games}){
    if(!games || games.length === 0) return null;

    const gamesCount = games.length;
    const totalPrice = games.reduce((total,game) => total + game.price,0);
    const averagePrice = (totalPrice / gamesCount).toFixed(2);

    const maxPrice = Math.max(...games.map(g => g.price));
    const mostExpensiveProduct = games.find(g => g.price === maxPrice);
    
    return (
        <div className="stats" style={{ marginBottom: '20px', padding: '15px', background: '#f0f2f5', borderRadius: '8px' }}>
            <p className="games-count"><strong>Games Count: </strong>{gamesCount}</p>
            <p className="avg-price"><strong>Average Price: </strong>{averagePrice}</p>
            <p className="rich-product"><strong>The most expensive product: </strong>{mostExpensiveProduct?.name} (${maxPrice})</p>
        </div>
    );
}

export default Stats;