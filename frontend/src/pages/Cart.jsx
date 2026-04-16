import GameCard from "../GameCard";


function Cart({cart,removeFromCart,setCart,showToast}){
    const totalCost = cart.reduce((sum,game) => sum += game.price,0);

    const clearCart = () => {
        setCart([]);
        showToast("Cart was cleared!");
        
    };

    return(
        <div className="cart-box">
            <div className="cart-grid">
                {cart.map(g => (
                    <GameCard
                    key={g.id}
                    game={g}
                    isReadOnly={true}
                    isCartPage={true}
                    removeFromCart={removeFromCart}
                    ></GameCard>
                ))}
             </div>
            
             <h3 className="cart-sum">Total cost: {totalCost.toFixed(2)}</h3>
             <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
        </div>
             
    );
}


export default Cart;