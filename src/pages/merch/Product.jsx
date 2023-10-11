import { CartContext } from "../../shared/CartContext"
import { useContext, useState } from "react"

export const Product = ({ initialDetails }) => {
    const [productName, setProductName] = useState(initialDetails.productName)
    const [price, setPrice] = useState(initialDetails.price)
    const [description, setDescription] = useState(initialDetails.description)
    const [id, setId] = useState(initialDetails.productId)

    const cart = useContext(CartContext)

    const productQuantity = cart.getProductQuantity(id)
    console.log(cart.items)
    // console.log('Quantity 22222:', productQuantity)

    return (
        <>
            <h3> {productName} </h3>
            <span>price: ${price} </span>
            <span> {description} </span>
            {productQuantity > 0 ?
                <>
                    <span>In Cart: {productQuantity} </span>
                    <button onClick={() => cart.addOneToCart(id)}>+</button>
                    <button onClick={() => cart.removeOneFromCart(id)}>-</button>
                    <button onClick={() => cart.deleteFromCart(id)}>Remove</button>
                </>
                :
                <>
                    <button
                        onClick={() => cart.addOneToCart(id)}>
                        Add to Cart
                    </button>
                    {/* <button>Remove</button> */}
                </>
            }
        </>
    )
}
