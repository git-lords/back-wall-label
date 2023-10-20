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
    <div className="page pt-20">
      <div className="border mx-4 flex h-[5vh] items-center justify-between">
        <h1 className="text-3xl mx-4">Merchandise</h1>
        <span>
          <label htmlFor="filter" className="mx-4">
            Filter by:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-inherit mx-4"
            id="filter"
          >
            <option value="--filter by category--">All</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Sticker">Sticker</option>
            {/* <option value="Tote">Tote</option> */}
            {/* <option value="Record">Record</option> */}
          </select>
        </span>
      </div>
      <div className="border flex h-full justify-evenly flex-wrap m-4">
        {selectedCategory !== "--filter by category--" ? (
          <>
            {filteredProducts.map((product) => (
              <div key={product.productId} className="w-1/4">
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
            ))}
          </>
        ) : (
          <>
            {productData.map((product) => {
              return (
                <div key={product.productId} className="w-1/4">
                  <Product
                    initialDetails={{
                      productId: product.id,
                      productName: product.name,
                      description: product.description,
                      category: product.features[0].name,
                      price: product.default_price,
                      image: product.images[0],
                      band: product.features[1].name,
                    }}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
