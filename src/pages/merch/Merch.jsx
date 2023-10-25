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
    <div className="page flex flex-col bricks dark:bg-zinc-900 overflow-y-scroll">
      <div className="w-full">
        <h1 className="text-3xl m-6 text-center font-bold text-shadow dark:shadow-black">Merch</h1>
      </div>
      <div className="px-4 flex h-[10%] items-center justify-between ">
        <span className="dark:bg-zinc-900 bg-zinc-200 rounded-lg border-2 border-mint shadow-lg shadow-zinc-600 dark:shadow-black py-1">
          <label htmlFor="filter" className="mx-4 ">
            Filter by:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-inherit mx-4"
            id="filter"
          >
            <option className="dark:bg-zinc-900" value="--filter by category--">All</option>
            <option className="dark:bg-zinc-900" value="T-Shirt">T-Shirt</option>
            <option className="dark:bg-zinc-900" value="Sticker">Sticker</option>
            {/* <option value="Tote">Tote</option> */}
            {/* <option value="Record">Record</option> */}
          </select>
        </span>
      </div>
      <div className="flex flex-wrap justify-evenly px-8">
        {selectedCategory !== "--filter by category--" ? (
          <>
            {filteredProducts.map((product) => (
              <div key={product.productId} className="w-full sm:w-1/2 md:w-1/3 flex items-center justify-center">
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
                <div key={product.productId} className="w-full sm:w-1/2 md:w-1/3 flex items-center justify-center">
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
