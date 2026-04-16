import { useState, useEffect } from 'react';
import './App.css';
import GameCard from './GameCard';
import {Route,Routes,Link} from 'react-router-dom'
import GameForm from './GameForm';
import {useNavigate} from 'react-router-dom'
import AdminPage from './pages/AdminPage';
import HomePage from './/pages/HomePage'
import Cart from './pages/Cart'
import GameDetails from './GameDetails';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


function App() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres,setGenres] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(null);
  const [toast,setToast] = useState(null);
  const [sortBy,setSortBy] = useState("default");
  const [isAuth,setIsAuth] = useState(() => {
    const saved = localStorage.getItem('accessToken');
    return saved ? true : false;
  });
  const [cart,setCart] = useState(() => {
    const saved = localStorage.getItem("my_cart");
    return saved ? JSON.parse(saved) : [];
  });






  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    },3000);
  };

  const addToCart = (game) => {
    if(cart.some(g => g.id === game.id)){
      showToast("Already in cart!");
    }else{
      setCart([...cart,game]);
      showToast("Added to cart!");
    }
  };

  const removeFromCart = (gameId) => {
    setCart(cart.filter(g => g.id !== gameId));
    showToast("Removed from cart!");
  }





  const filteredGames = games.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedGames = [...filteredGames].sort((a,b) => {
    if(sortBy == "low") return a.price - b.price;
    if(sortBy == "high") return b.price - a.price;
    return 0;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("my_cart",JSON.stringify(cart));
  },[cart]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5214/games").then(res => {
        if(!res.ok) throw new Error("Failed to load games");
        return res.json();
      }),
      fetch("http://localhost:5214/genres").then(res => {
        if(!res.ok) throw new Error("Failed to load genres");
        return res.json();
      })
    ])
    .then(([gamesData,genresData]) => {
      setGames(gamesData);
      setGenres(genresData);
      setIsLoading(false);
    })
    .catch(err => {
      console.log("Error while loading...",err);
      setError(err.message);
      setIsLoading(false);
    });
  }, []);

  const handleAdd = async (gameData) => {
    const newGameDto = { ...gameData, releaseDate: new Date().toISOString().split("T")[0] };
    
    const response = await fetch('http://localhost:5214/games', {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json', // Обов'язково!
        'Authorization': "Bearer " + localStorage.getItem("accessToken") 
      },
      body: JSON.stringify(newGameDto)
    });

    if (response.ok) {
      const created = await response.json();

      const selectedGenre = genres.find(g => g.id === gameData.genreId);

      const gameWithGenreName = {
        ...created,
        genre:selectedGenre?.name || "Unknown"
      };
      setGames([...games, gameWithGenreName]);

      showToast("Game created successfully! 🎉")
    }
  };

  const handleUpdate = async (id,gameData) => {
    const oldGame = games.find(g => g.id == id);
    const updatedDto = { ...gameData, releaseDate: oldGame?.releaseDate || "" };

    const response = await fetch(`http://localhost:5214/games/${id}`, {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json', // Обов'язково!
        'Authorization': "Bearer " + localStorage.getItem("accessToken") 
      },
      body: JSON.stringify(updatedDto)
    });

    if (response.ok) {

      const selectedGenreObject = genres.find(g => g.id === gameData.genreId);

      const updatedFullGame = {
        ...oldGame,
        ...gameData,

        genre: selectedGenreObject?.name || oldGame.genre
      };


      setGames(games.map(g => g.id == id ? updatedFullGame : g));
      navigate('/admin');

      showToast("Game updated! ✨")
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sure?")) return;
    const response = await fetch(`http://localhost:5214/games/${id}`, {
       method: "DELETE",
       headers: {"Authorization": "Bearer " + localStorage.getItem("accessToken")}
      });
    if (response.ok) {
      setGames(games.filter(g => g.id !== id));
      showToast("Game deleted! 🗑️")
    }
  };

  const handleRegister = async (email,password) => {
    const registerDto = {email,password};

    const response = await fetch(`http://localhost:5214/register`,{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(registerDto)
    });


    if(response.ok){
      showToast("Registered Successfully!")
      navigate('/login');
    }
  }

  const handleLogin = async (email,password) => {
    const loginDto = {email,password};

    const response = await fetch(`http://localhost:5214/login`,{
      method:"POST",
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify(loginDto)
    });

    if(response.ok){
      showToast("Logined Successfully!");
      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken",accessToken);
      setIsAuth(true);
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('accessToken');
  }

  return (
    <div className="container">
      <nav className="main-nav">
        <Link to="/">Store</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/cart">Cart: {cart.length}</Link>
        {!isAuth ? (
          <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className='logout-button'>Logout</button>
        )}
      </nav>

      <div className="search-container">
          <input
             type="text"
             placeholder='Search Games...'
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className='searchInput'
                   /> 
        </div>

      {isLoading ? (
        <div className="loader">Loading games,please wait....</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (   
      <Routes>
        <Route path='/' element={<HomePage
         games={sortedGames}
         sortBy={setSortBy}
         setSearchTerm={setSearchTerm}
         addToCart={addToCart}
         />}/>

         <Route path='/cart' element={<Cart
            cart={cart}
            removeFromCart ={removeFromCart}
            setCart={setCart}
            showToast={showToast}
         />}/>

        <Route path='/admin' element={
          <AdminPage
              games={sortedGames}
              genres={genres}
              onUpdate={(game) => navigate(`/admin/edit/${game.id}`)}
              onDelete={handleDelete}
              onAdd={handleAdd}
              />
        } />

        <Route path='/register' element={
          <RegisterPage
              handleRegister={handleRegister}
              />
        } />

        <Route path='/login' element={
          <LoginPage
              handleLogin={handleLogin}
              />
        } />


       <Route path='/admin/edit/:id' element={
        <GameForm 
            key={window.location.pathname}
            onSubmit={(id,data) => handleUpdate(id,data)}
            onCancel={() => navigate('/admin')}
            genres={genres}
            games={games}></GameForm>
       }/>

       <Route path='/game/:id' element={<GameDetails  games={games} />}/>

      </Routes>
      )}
      {toast && (<div className='toast'>
          {toast}
        </div>)}
    </div>
  );
}
export default App;