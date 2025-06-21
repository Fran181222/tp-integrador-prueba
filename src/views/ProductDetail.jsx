import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/products/favoritesSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(state =>
    state.products.items.find(p => p.id === parseInt(id))
  );
  const isFavorite = useSelector(state => state.favorites.includes(parseInt(id)));
  const dispatch = useDispatch();

  if (!product) {
    return <p className="p-4">Producto no encontrado</p>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded">
      <img src={product.image} alt={product.title} className="h-60 object-contain mb-4 mx-auto" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
      <p className="mb-2">Categoría: {product.category}</p>
      <p className="mb-4">{product.description}</p>

      <button
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        onClick={() => dispatch(toggleFavorite(product.id))}
      >
        {isFavorite ? 'Quitar de Favoritos 💔' : 'Agregar a Favoritos 💖'}
      </button>

      <button
        onClick={() => navigate('/')}
        className="ml-4 bg-gray-300 px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
}
