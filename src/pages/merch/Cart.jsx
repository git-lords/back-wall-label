import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../shared/CartContext";

export const Cart = () => {

    const cart = useContext(CartContext);
    const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);


    return (
        <>
            {productCount > 0 ? (
                <>
                    <h3>Items in cart {productCount} </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((currentProduct, idx) => (
                                <tr key={currentProduct.id}>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>${currentProduct.price}</td>
                                    <td>${currentProduct.price * currentProduct.quantity}</td>
                                    <td><button onClick={() => cart.deleteFromCart(currentProduct.id)}>Remove items</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4> Total: ${cart.getTotalCost().toFixed(2)} </h4>
                    <button>Check Out</button>
                </>
            ) : (
                <h1>There are no items in the cart</h1>
            )}
        </>
    );
}
