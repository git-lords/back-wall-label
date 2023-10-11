import { createContext, useState, useEffect } from "react";
import axios from "axios";

//Context ( cart, addToCart, removeCart )
//Provider - gives app access to all things in your context

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { }
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([])
    const [productData, setProductData] = useState([])

    //Code for get products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('getAllProducts')
                setProductData(response.data)
                // localStorage.setItem('cart', JSON.stringify(productData))
            } catch (error) {
                console.error('Error getting products:', error)
            }
        };

        fetchData();
    }, [])

    // [{ id, quantity }]

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id)
        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id ? { ...product, quantity: product.quantity + 1 } : product
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
            deleteFromCart(id)
        } else {
            setCartProducts(
                setCartProducts(
                    cartProducts.map(
                        product => product.id === id ? { ...product, quantity: product.quantity - 1 } : product
                    )
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        if (productData) {
            cartProducts.forEach((cartItem) => {
                const productInCart = productData.find((product) => product.productId === cartItem.id);
                if (productInCart) {
                    totalCost += productInCart.price * cartItem.quantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(productData))
        }
        // cartProducts.map((cartItem) => {
        //     const productInCart = productData.productId;
        //     totalCost += (productInCart.price * cartItem.quantity)
        // })
        return totalCost
    }

    const contextValue = {
        items: cartProducts,
        productData,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
