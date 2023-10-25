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
  const [isAdded, setIsAdded] = useState(false);
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
      {/* Success Popup */}
      <div
        className={
          isAdded
            ? "h-[5vh] fixed bg-emerald-700 w-full flex justify-center items-center transition-opacity duration-300"
            : "h-[5vh] hidden bg-emerald-700 w-full transition-opacity duration-300 opacity-0"
        }
      >
        <h1>Item successfully added to cart!</h1>
        <a href="/cart" className="underline pl-2">
          View Cart
        </a>
      </div>

      <BackButton />
      <div className="h-full flex flex-col md:flex-row md:w-3/4">
        <div className="basis-1/2 h-full overflow-hidden p-6 ">
          <img src={image} alt="" className="border border-dashed p-2" />
        </div>
        <div className="basis-1/2 flex flex-col p-6 md:w-1/2 justify-evenly md:h-1/2 h-full">
          <div className="w-full flex flex-col justify-evenly items-center md:items-start">
            <h1 className="font-bold">{band}</h1>
            <h1 className="text-6xl font-semibold underline py-2">
              {itemData.name}
            </h1>
          </div>
          <div className="flex flex-col justify-evenly py-4 items-center md:items-start">
            <h1 className="text-xl pb-4">${price}.00</h1>
            <button
              className={
                "p-4 bg-emerald-600 hover:bg-emerald-700  duration-200 text-xl font-semibold w-full"
              }
              onClick={() => {
                setIsAdded(true);
                setTimeout(() => {
                  setIsAdded(false);
                }, 9000);
                cart.addOneToCart(id);
              }}
            >
              Add To Cart
            </button>
          </div>
          <div className="flex flex-col py-8">
            <h1 className="text-xl md:text-2xl font-semibold">Features:</h1>
            <p className="py-6 md:text-xl">{itemData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
