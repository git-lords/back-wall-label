import { CartContext } from "../shared/CartContext"
import { useContext } from "react"

export const Product = ({ initialDetails }) => {
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(initialDetails.productId)
    console.log(cart.items)

    return (
        <>
            <h3> {initialDetails.productName} </h3>
            <span>price: ${initialDetails.price} </span>
            <span> {initialDetails.description} </span>
            {productQuantity > 0 ?
                <>
                    <button>Remove</button>
                    <span>In Cart: {productQuantity} </span>
                </>
                :
                <>
                    <button
                        onClick={() => cart.addOneToCart(initialDetails.productId)}>
                        Add to Cart
                    </button>
                    {/* <button>Remove</button> */}
                </>
            }
        </>
    )
}
