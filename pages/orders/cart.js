import React, { useState, useEffect } from 'react';
import OrderProductCard from '../../components/orderProduct/OrderProductCard';
import { useAuth } from '../../utils/context/authContext';
import { getCartByCustomerId } from '../../utils/data/orderData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';

const Cart = () => {
  const { user } = useAuth();

  // Functionality to set cart
  const [currentCart, setCurrentCart] = useState({});
  const getCart = async () => {
    await getCartByCustomerId(user.id).then(setCurrentCart);
    await console.warn(currentCart);
  };
  useEffect(() => {
    getCart();
  }, []);

  // Functionality to set order products
  const [currentOrderProducts, setCurrentOrderProducts] = useState([]);
  const getOrderProducts = async () => {
    await getOrderProductsByOrderId(currentCart.id).then(setCurrentOrderProducts);
  };
  useEffect(() => {
    if (currentCart.id) {
      getOrderProducts();
    }
  }, [user.id, currentCart.id]);

  return (
    <>
      <div>Shopping Cart</div>
      {currentOrderProducts.map((orderProduct) => (
        <div key={orderProduct.id}>
          <OrderProductCard orderProductObj={orderProduct} />
        </div>
      ))}
    </>
  );
};

export default Cart;
