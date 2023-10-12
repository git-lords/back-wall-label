import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../shared/CartContext";

export const Cart = () => {

    const cart = useContext(CartContext);
    const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    const checkout = async () => {
        await fetch('http://localhost:4545/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart.items })
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url)
            }
        })
    }

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
                                <th>Items Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((currentProduct) => (
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
                    <button onClick={checkout}>Check Out</button>
                </>
            ) : (
                <h1>There are no items in the cart</h1>
            )}
        </>
    );
}
