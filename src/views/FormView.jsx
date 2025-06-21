import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../features/products/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const productToEdit = useSelector(state =>
    state.products.items.find(p => p.id === parseInt(id))
  );

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (isEditing && productToEdit) {
      setForm(productToEdit);
    }
  }, [isEditing, productToEdit]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = { ...form, price: parseFloat(form.price) };

    if (isEditing) {
      dispatch(editProduct({ ...data, id: parseInt(id) }));
    } else {
      const newId = Date.now(); // o lógica que uses para nuevos IDs
      dispatch(addProduct({ ...data, id: newId }));
    }

    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'price', 'description', 'category', 'image'].map(field => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}
