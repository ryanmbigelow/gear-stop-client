import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteOrderProduct } from '../../utils/data/orderProductData';

function OrderProductCard({ orderProductObj, onUpdate }) {
  const user = useAuth();

  const deleteSingleOrderProduct = () => {
    if (window.confirm(`Remove ${orderProductObj.product_id.title} from cart?`)) {
      deleteOrderProduct(orderProductObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center post-card">
      <Card.Header>{orderProductObj.product_id.title}</Card.Header>
      <Card.Body>
        <p>Total: {orderProductObj.total}</p>
        <p>Quantity: {orderProductObj.quantity}</p>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="btn-group">
          <div>
            <Link href={`/products/${orderProductObj.product_id.id}`} passHref>
              <Button type="button" className="m-2">View Product</Button>
            </Link>
          </div>
          <div>
            {orderProductObj.order_id.customer_id.uid === user.user.uid ? (<Button type="button" className="m-2" onClick={deleteSingleOrderProduct}>Remove from order</Button>) : ''}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

OrderProductCard.propTypes = {
  orderProductObj: PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.shape({
      customer_id: PropTypes.shape({
        uid: PropTypes.string,
      }),
    }),
    product_id: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    quantity: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderProductCard;
