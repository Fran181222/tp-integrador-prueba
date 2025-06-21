import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const products = useSelector(state => state.products.items);
  const favorites = useSelector(state => state.favorites);
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {favoriteProducts.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">
          No hay productos favoritos marcados.
        </p>
      ) : (
        favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
