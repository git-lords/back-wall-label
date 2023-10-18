import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../shared/CartContext";
import { Product } from "./Product.jsx";
import Stripe from "stripe";

export default function Merch() {
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "--filter by category--"
  );
  const stripe = Stripe(
    "sk_test_51IRnJgK0mJ6IuZSRS1BZnXo3qpugm5CjPSZ6TULycYHtkBElg38SOGsPNrLf9Lg7o3S2ucxtANTVl0JGcftJxPM300GAjhhSIq"
  );

  useEffect(() => {
    stripe.products.list().then((res) => {
      setProductData(res.data);
      console.log(res.data);
    });
  }, []);

  const cart = useContext(CartContext);
  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "--filter by category--"
      ? productData
      : productData.filter(
          (product) =>
            product.features[0].name.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div className="pt-20 border">
      {productCount > 0 ? (
        <>
          <h3>Merch</h3>
          <button onClick={() => navigate("/cart")}>
            Cart ({productCount} items)
          </button>
        </>
      ) : null}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="--filter by category--">--filter by category--</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Tote">Tote</option>
          <option value="Record">Record</option>
        </select>
      </div>

      {selectedCategory !== "--filter by category--" ? (
        <>
          <h3>Selected Category: {selectedCategory}</h3>
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              style={{ border: "1px solid black", height: "100%" }}
            >
              <img
                src="https://reallygooddesigns.com/wp-content/uploads/2021/11/T-Shirt-Illustration-Design-Ideas-4.png"
                alt="clothing-product"
                height={150}
                width={150}
              />
              <Product
                initialDetails={{
                  productId: product.productId,
                  productName: product.productName,
                  price: product.price,
                  description: product.description,
                  category: product.category,
                }}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          {productData.map((product) => {
            return (
              <div
                key={product.productId}
                style={{ border: "1px solid black", height: "100%" }}
              >
                <Product
                  initialDetails={{
                    productId: product.id,
                    productName: product.name,
                    description: product.description,
                    category: product.features[0].name,
                    price: product.default_price,
                    image: product.images[0],
                  }}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
