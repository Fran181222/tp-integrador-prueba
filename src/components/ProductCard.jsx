import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/products/favoritesSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.title} className="h-40 object-contain" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>
        {isFavorite ? '💖' : '🤍'}
      </button>
      <Link to={`/detalle/${product.id}`}>Ver más detalles</Link>
    </div>
  );
}
