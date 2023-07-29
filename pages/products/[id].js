import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleProduct } from '../../utils/data/productData';
import { getCartByCustomerId } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';
import { createOrderProduct, updateOrderProduct } from '../../utils/data/orderProductData';

export default function ViewProduct() {
  const { user } = useAuth();
  const router = useRouter();

  const { id } = router.query;

  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    getSingleProduct(id).then(setProductDetails);
  }, [id]);

  // Functionality to set cart
  const [currentCart, setCurrentCart] = useState({});
  const getCart = async () => {
    await getCartByCustomerId(user.id).then(setCurrentCart);
  };
  useEffect(() => {
    getCart();
  }, []);

  const handleSubmit = () => {
    const payload = {
      orderId: currentCart.id,
      productId: productDetails.id,
      quantity: 1,
      total: productDetails.price,
    };
    createOrderProduct(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateOrderProduct(patchPayload).then(() => window.confirm('Added to cart'));
    });
  };

  return (
    <div className="product-details-page">
      <Head>
        <title> View {productDetails.title} </title>
      </Head>
      <div className="PD-container">
        <div className="PD-detail-container">
          <h5 className="PD-pin-name">
            {productDetails.title}
          </h5>
          <hr />
          <p className="PD-desc">Sold by: {productDetails.seller_id?.first_name || ''} {productDetails.seller_id?.last_name || ''}
          </p>
          <p className="PD-desc">Category: {productDetails.category_id?.label || ''}
          </p>
          <p className="PD-desc">Quantity Available: {productDetails.quantity_available || ''}
          </p>
          <p className="PD-desc">Price: {productDetails.price || ''}
          </p>
          <hr />
          <Button variant="outline-dark" className="m-2" onClick={handleSubmit}>Buy Product</Button>
        </div>
      </div>
    </div>

  );
}
