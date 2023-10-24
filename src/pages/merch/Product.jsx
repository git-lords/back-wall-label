import { CartContext } from "../../shared/CartContext";
import { useContext, useState, useEffect } from "react";
import Stripe from "stripe";
import { Link } from "react-router-dom";

export const Product = ({ initialDetails }) => {
  const [productName, setProductName] = useState(initialDetails.productName);
  const [price, setPrice] = useState(initialDetails.price);
  const [category, setCategory] = useState(initialDetails.category);
  const [id, setId] = useState(initialDetails.productId);

  const stripe = Stripe(
    "sk_test_51IRnJgK0mJ6IuZSRS1BZnXo3qpugm5CjPSZ6TULycYHtkBElg38SOGsPNrLf9Lg7o3S2ucxtANTVl0JGcftJxPM300GAjhhSIq"
  );

  useEffect(() => {
    const getPrice = async () => {
      const priceAmount = await stripe.prices.retrieve(price);
      setPrice(priceAmount.unit_amount);
    };
    getPrice();
  }, []);

  const cart = useContext(CartContext);

  const productQuantity = cart.getProductQuantity(id);

  return (
    <div className=" w-11/12 p-4 flex flex-col justify-evenly items-center border-2 border-mint bg-zinc-200 dark:bg-zinc-900 shadow-lg shadow-zinc-600 dark:shadow-black my-4 rounded-lg cursor-pointer">
      <div className="w-full">
        <Link to={`/merch/${id}`}>
          <div
            style={{ backgroundImage: `url(${initialDetails.image})` }}
            className="h-80 bg-center bg-cover rounded-md"
          ></div>
        </Link>
        <h2 className="text-md font-bold text-mint">{initialDetails.band}</h2>
        <Link to={`/merch/${id}`} className="text-xl">
          {productName}
        </Link>
        <h3 className="text-lg font-semibold" >${price / 100}.00 </h3>
      </div>
    </div>
  );
};
