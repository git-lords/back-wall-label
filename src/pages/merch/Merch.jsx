
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Product } from '../Product.jsx';

export default function Merch() {
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('getAllProducts')
        setProductData(response.data)
      } catch (error) {
        console.error('Error getting products:', error)
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <h3>Merch</h3>
      <div>
        <input placeholder='Search any item here!' />
        {/* <div>
          <a href=''>link </a>
          <a href=''>link </a>
          <a href=''>link </a>
          <a href=''>link </a>
        </div>
        <div>
          <a href=''>link </a>
          <a href=''>link </a>
          <a href=''>link </a>
          <a href=''>link </a>
        </div> */}
      </div>

      {productData.map((product) => (
        <div
          key={product.productId}
          style={{ border: '1px solid black', height: '100%' }}
        >
          <img
            src="https://reallygooddesigns.com/wp-content/uploads/2021/11/T-Shirt-Illustration-Design-Ideas-4.png" alt="clothing-product"
            height={150}
            width={150} />
          {/* <h4> {product.productName} </h4>
          <span>price: ${product.price} </span>
          <span> {product.description} </span> */}
          <Product
            initialDetails={{
              productId: product.productId,
              productName: product.productName,
              price: product.price,
              description: product.description
            }} />

          {/* <button>Add to Cart</button>
          <button>Remove from Cart</button> */}
        </div>
      ))}
    </>
  )
}
