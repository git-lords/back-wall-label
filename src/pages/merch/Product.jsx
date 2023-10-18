import { CartContext } from "../../shared/CartContext";
import { useContext, useState, useEffect } from "react";
import Stripe from "stripe";

export const Product = ({ initialDetails }) => {
  const [productName, setProductName] = useState(initialDetails.productName);
  const [price, setPrice] = useState(initialDetails.price);
  const [description, setDescription] = useState(initialDetails.description);
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
    <div className="border">
      <img src={initialDetails.image} className="h-40" />
      <h3> {productName} </h3>
      <span> {category} </span>
      <span>price: ${price / 100} </span>
      <span> {description} </span>
      {productQuantity > 0 ? (
        <>
          <span>In Cart: {productQuantity} </span>
          <button onClick={() => cart.addOneToCart(id)}>+</button>
          <button onClick={() => cart.removeOneFromCart(id)}>-</button>
          <button onClick={() => cart.deleteFromCart(id)}>Remove</button>
        </>
      ) : (
        <>
          <button onClick={() => cart.addOneToCart(id)}>Add to Cart</button>
        </>
      )}
    </div>
  );
};
