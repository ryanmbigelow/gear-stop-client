import ProductForm from '../../components/product/ProductForm';
import { useAuth } from '../../utils/context/authContext';

const NewProduct = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Product</h2>
      <ProductForm user={user} />
    </div>
  );
};

export default NewProduct;
