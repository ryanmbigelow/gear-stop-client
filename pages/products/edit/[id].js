import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/product/ProductForm';
import { getSingleProduct } from '../../../utils/data/productData';

const EditProduct = () => {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditProduct);
  }, [id]);

  return (
    <div>
      <h2>Edit Post</h2>
      <ProductForm productObj={editProduct} />
    </div>
  );
};

export default EditProduct;
