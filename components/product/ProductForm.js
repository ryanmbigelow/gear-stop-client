import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../utils/data/productData';
import getCategories from '../../utils/data/categoryData';

const initialState = {
  sellerId: '',
  categoryId: 0,
  title: '',
  description: '',
  quantityAvailable: 0,
  price: 0,
};

const ProductForm = ({ productObj }) => {
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
    if (productObj.id) {
      setCurrentProduct({
        id: productObj.id,
        sellerId: productObj.seller_id.id,
        categoryId: productObj.category_id?.id,
        title: productObj.title,
        description: productObj.description,
        quantityAvailable: productObj.quantity_available,
        price: productObj.price,
      });
    }
  }, [productObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productObj.id) {
      const updatedProduct = {
        id: currentProduct.id,
        sellerId: user.sellerId.id,
        categoryId: Number(currentProduct.categoryId),
        title: currentProduct.title,
        description: currentProduct.description,
        quantityAvailable: Number(currentProduct.quantityAvailable),
        price: Number(currentProduct.price),
      };
      updateProduct(updatedProduct)
        .then(() => router.push('/products'));
    } else {
      const product = {
        id: currentProduct.id,
        sellerId: user.id,
        categoryId: Number(currentProduct.categoryId),
        title: currentProduct.title,
        description: currentProduct.description,
        quantityAvailable: Number(currentProduct.quantityAvailable),
        price: Number(currentProduct.price),
      };
      createProduct(product).then(() => router.push('/products'));
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" required value={currentProduct.title} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={currentProduct.description} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity Available</Form.Label>
        <Form.Control name="quantityAvailable" required value={currentProduct.quantityAvailable} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" required value={currentProduct.price} onChange={handleChange} type="text" />
      </Form.Group>

      <Form.Group className="floatingSelect">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={currentProduct.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          {productObj.id ? 'Update' : 'Create'} Product
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    quantity_available: PropTypes.number,
    price: PropTypes.number,
    category_id: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    seller_id: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      uid: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
};

ProductForm.defaultProps = {
  productObj: initialState,
};

export default ProductForm;
