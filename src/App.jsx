import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import FormView from './views/FormView';

export default function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/crear">Crear Producto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/detalle/:id" element={<ProductDetail />} />
        <Route path="/crear" element={<FormView />} />
        <Route path="/editar/:id" element={<FormView editar />} />
      </Routes>
    </div>
  );
}
