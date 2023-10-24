import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Stripe from "stripe";

//Context ( cart, addToCart, removeCart, deleteCart, getTotal, getQuantity )
//Provider - gives app access to all things in context

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const stripe = Stripe(
    "sk_test_51IRnJgK0mJ6IuZSRS1BZnXo3qpugm5CjPSZ6TULycYHtkBElg38SOGsPNrLf9Lg7o3S2ucxtANTVl0JGcftJxPM300GAjhhSIq"
  );

  useEffect(() => {
    stripe.products.list().then((res) => {
      setProductData(res.data);
    });
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  const addOneToCart = async (id) => {
    const quantity = getProductQuantity(id);
    if (quantity > 0) {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      const response = await stripe.products.retrieve(id);
      const amount = await stripe.prices.retrieve(response.default_price);

      const newProduct = {
        id: id,
        priceId: response.default_price,
        quantity: 1,
        name: response.name,
        price: amount.unit_amount / 100,
        description: response.description,
        category: response.features[0].name,
        image: response.images[0],
      };
      setCartProducts([...cartProducts, newProduct]);
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  function removeOneFromCart(id) {
    console.log("remove from cart");
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  function deleteFromCart(id) {
    console.log("delete from cart");
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  function getTotalCost() {
    if (cartProducts) {
      return cartProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    } else return 0;
  }

  function clearCart() {
    setCartProducts([]);
    localStorage.clear();
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
