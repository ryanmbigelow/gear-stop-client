import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleProduct } from '../../utils/data/productData';

export default function ViewProduct() {
  const [productDetails, setProductDetails] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setProductDetails);
  }, [id]);

  const handleClick = () => {
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
          <Button variant="outline-dark" className="m-2" onClick={handleClick}>Buy Product</Button>
        </div>
      </div>
    </div>

  );
}
