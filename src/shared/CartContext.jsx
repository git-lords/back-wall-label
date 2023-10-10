import { createContext, useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('getAllProducts')
                setProductData(response.data)
            } catch (error) {
                console.error('Error getting products:', error)
            }
        };

        fetchData();
    }, [])

    // [{ id, quantity }]

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        // console.log('Quantity Context:', quantity)
        if (quantity === undefined) {
            return 0;
        }
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

        cartProducts.map((cartItem) => {
            const productInCart = productData.productId;
            totalCost += (productInCart.price * cartItem.quantity)
        })
        return totalCost
    }

    const contextValue = {
        items: cartProducts,
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
//Code for get products


//Context ( cart, addToCart, removeCart )
//Provider - gives your React app access to all things in your context