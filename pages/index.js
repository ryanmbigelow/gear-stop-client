import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../utils/data/productData';
import ProductCard from '../components/product/ProductCard';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const getAllProducts = () => {
    getProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <article className="products">
        <h3>Products</h3>
        {products.map((product) => (
          <section key={`product--${product.id}`} className="products">
            <ProductCard productObj={product} onUpdate={getAllProducts} />
          </section>
        ))}
      </article>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
