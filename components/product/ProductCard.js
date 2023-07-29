import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteProduct } from '../../utils/data/productData';

function ProductCard({ productObj, onUpdate }) {
  const user = useAuth();

  const deleteSingleProduct = () => {
    if (window.confirm(`Delete ${productObj.title} post?`)) {
      deleteProduct(productObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center post-card">
      <Card.Header>{productObj.title}</Card.Header>
      <Card.Body>
        <Card.Text>Description: {productObj.description}</Card.Text>
        <Card.Text>Quantity Available: {productObj.quantity_available}</Card.Text>
        <Card.Text>Category: {productObj.category_id.label}</Card.Text>
        <Card.Text>Sold by: {productObj.seller_id.first_name} {productObj.seller_id.last_name}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="btn-group">
          <div>
            <Link href={`/products/${productObj.id}`} passHref>
              <Button type="button" className="m-2">View Product</Button>
            </Link>
          </div>
          <div>
            <Link href={`/products/edit/${productObj.id}`} passHref>
              {productObj.seller_id.uid === user.user.uid ? (<Button type="button" className="m-2">Edit Product</Button>) : ''}
            </Link>
          </div>
          <div>
            {productObj.seller_id.uid === user.user.uid ? (<Button type="button" className="m-2" onClick={deleteSingleProduct}>Delete Product</Button>) : ''}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    quantity_available: PropTypes.number,
    price: PropTypes.number,
    category_id: PropTypes.shape({
      label: PropTypes.string,
    }),
    seller_id: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
