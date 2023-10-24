import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Stripe from "stripe";
import { CartContext } from "../../shared/CartContext";
import BackButton from "../../elements/BackButton";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [band, setBand] = useState("");
  const [price, setPrice] = useState(0);
  //   const [isAdded, setIsAdded] = useState(false);
  const { id } = useParams();
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(id);
  const stripe = Stripe(
    "sk_test_51IRnJgK0mJ6IuZSRS1BZnXo3qpugm5CjPSZ6TULycYHtkBElg38SOGsPNrLf9Lg7o3S2ucxtANTVl0JGcftJxPM300GAjhhSIq"
  );

  useEffect(() => {
    stripe.products.retrieve(id).then((res) => {
      setItemData(res);
      setImage(res.images[0]);
      setCategory(res.features[0].name);
      setBand(res.features[1].name);
      stripe.prices.retrieve(res.default_price).then((res) => {
        setPrice(res.unit_amount / 100);
      });
    });
  }, []);

  return (
    <div className="min-h-screen h-full pt-20 flex flex-col items-center">
      <BackButton />
      <div className="h-full flex flex-col md:flex-row md:w-3/4">
        <div className="h-full overflow-hidden p-6">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col p-6 md:w-1/2 justify-evenly h-1/2">
          <div className="w-full flex flex-col justify-evenly">
            <h1 className="font-bold">{band}</h1>
            <h1 className="text-6xl font-semibold underline py-2">
              {itemData.name}
            </h1>
            <h1 className="text-xl italic py-2">{category}</h1>
          </div>
          <div className="flex flex-col md:flex-row md:w-1/2 justify-evenly">
            <h1 className="text-xl">${price}</h1>
            <button
              className={
                // !isAdded
                "p-4 bg-emerald-600 hover:bg-emerald-700  duration-200 text-xl font-semibold"
                //   : "border p-4 bg-neutral-700"
              }
              onClick={() => {
                setIsAdded(true);
                cart.addOneToCart(id);
                console.log(cart.items);
              }}
            >
              Add To Cart
            </button>
          </div>
          <div className="flex flex-col p-2">
            <h1 className="text-xl font-semibold">Features:</h1>
            <p>{itemData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
