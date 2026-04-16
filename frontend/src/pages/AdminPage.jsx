import GameForm from '../GameForm';
import GameCard from '../GameCard';

function AdminPage({ games, genres, onUpdate, onDelete, onAdd, editingGame, onCancel }) {
  return (
    <div className='admin-view'>
      <h1>Admin Dashboard</h1>
      <GameForm
        key={editingGame?.id || 'new'}
        onSubmit={editingGame ? onUpdate : onAdd}
        editingGame={editingGame}
        onCancel={onCancel}
        genres={genres}
        games={games} 
      />
      <div className="games-grid">
        {games.map(g => (
          <GameCard
            key={g.id}
            game={g}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;