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
    <div>
      <article>
        <h3>Hello {user.fbUser.displayName}, welcome to Gear Stop! </h3>
        <div className="row row-cols-1 row-cols-md-2">
          {products.map((product) => (
            <section key={`product--${product.id}`} className="col mb-4">
              <ProductCard productObj={product} onUpdate={getAllProducts} className="card" />
            </section>
          ))}
        </div>
      </article>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
