import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../shared/CartContext";
import BackButton from "../../elements/BackButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Trash } from "../../../icons";

export const Cart = () => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkout = async () => {
    await fetch("http://localhost:4545/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
    cart.clearCart();
  };

  return (
    <div className="page w-full px-2 overflow-y-auto">
      <BackButton />
      <h1 className="text-4xl ml-4 my-6">Shopping Cart</h1>
      {productCount > 0 ? (
        <>
          <div className="w-full border-b-4">
            <div className="flex w-full border-b-4 text-center">
              <h3 className="w-1/5 flex justify-center items-center">
                Product
              </h3>
              <h3 className="w-1/5 flex justify-center items-center">
                Quantity
              </h3>
              <h3 className="w-1/5 flex justify-center items-center">Price</h3>
              <h3 className="w-1/5 flex justify-center items-center">
                Items Total
              </h3>
              <h3 className="w-1/5 flex justify-center items-center"></h3>
            </div>
            <div className="flex w-full flex-wrap ">
              {cart.items.map((currentProduct) => {
                return (
                  <div
                    key={currentProduct.id}
                    className="flex w-full gap-1 odd:bg-zinc-500 odd:bg-opacity-10 py-1"
                  >
                    <div className="w-1/5 flex flex-col justify-center items-center">
                      <img src={currentProduct.image} className="h-20 w-20" />
                      <div className="flex flex-wrap justify-center text-center">
                        <Link to={`/merch/${currentProduct.id}`}>
                          {currentProduct.name}
                        </Link>
                      </div>
                    </div>
                    <div className="w-1/5 self-center text-lg">
                      <div className="flex flex-row-reverse justify-center">
                        <button
                          className="border rounded flex w-6 h-6 text-center self-center justify-center items-center text-lg font-semibold active:bg-zinc-600"
                          onClick={() => cart.addOneToCart(currentProduct.id)}
                        >
                          +
                        </button>
                        <div className="p-2">{currentProduct.quantity}</div>
                        <button
                          className="border rounded flex w-6 h-6 text-center self-center justify-center items-center text-lg font-semibold active:bg-zinc-600"
                          onClick={() =>
                            cart.removeOneFromCart(currentProduct.id)
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="w-1/5 flex justify-center items-center text-lg">
                      ${currentProduct.price}
                    </div>
                    <div className="w-1/5 flex justify-center items-center text-lg">
                      ${currentProduct.price * currentProduct.quantity}
                    </div>
                    <div className="w-1/5 flex justify-center items-center">
                      <button
                        className="hover:text-burntOrange"
                        onClick={() => cart.deleteFromCart(currentProduct.id)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-around my-4 text-lg">
            <h4 className="font-semibold">
              {" "}
              Total: ${cart.getTotalCost().toFixed(2)}{" "}
            </h4>
            <h3 className="self-center">Items in cart: {productCount} </h3>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="border-2 hover:bg-mint text-lg font-semibold py-1 px-2 rounded"
              onClick={checkout}
            >
              Check Out
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full items-center h-full pt-10">
          <h1 className="p-4 text-xl">There are no items in your cart</h1>
          <button
            className="underline text-xl"
            onClick={() => navigate("/merch")}
          >
            Click here to check out our merch!
          </button>
        </div>
      )}
    </div>
  );
};
