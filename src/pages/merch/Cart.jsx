import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../shared/CartContext";
import BackButton from "../../elements/BackButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

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
    <div className="pt-20">
      <BackButton />
      <h1 className="text-4xl">Shopping Cart</h1>
      {productCount > 0 ? (
        <>
          <h3>Items in cart {productCount} </h3>
          <table className="border w-3/4">
            <thead className="w-full">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Items Total</th>
              </tr>
            </thead>
            <tbody className="border ">
              {cart.items.map((currentProduct) => {
                return (
                  <tr key={currentProduct.id}>
                    <td>
                      <img src={currentProduct.image} className="h-40" />
                    </td>
                    <td>
                      <Link to={`/merch/${currentProduct.id}`}>
                        {currentProduct.name}
                      </Link>
                    </td>
                    <td>
                      <div className="">
                        <button
                          className="border p-2 active:bg-neutral-600"
                          onClick={() => cart.addOneToCart(currentProduct.id)}
                        >
                          +
                        </button>
                        <span className="p-2">{currentProduct.quantity}</span>
                        <button
                          className="border p-2 active:bg-neutral-600"
                          onClick={() =>
                            cart.removeOneFromCart(currentProduct.id)
                          }
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>${currentProduct.price}</td>
                    <td>${currentProduct.price * currentProduct.quantity}</td>
                    <td>
                      <button
                        onClick={() => cart.deleteFromCart(currentProduct.id)}
                      >
                        Remove from cart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h4> Total: ${cart.getTotalCost().toFixed(2)} </h4>
          <button onClick={checkout}>Check Out</button>
        </>
      ) : (
        <div
          className="flex flex-col w-full items-center h-screen
        "
        >
          <h1>There are no items in the cart</h1>
          <button onClick={() => navigate("/merch")}>
            Click here to check out our merch!
          </button>
        </div>
      )}
    </div>
  );
};
