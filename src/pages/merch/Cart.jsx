import React from 'react'

export const Cart = () => {
    return (
        <>
            <h3>Cart</h3>
            <table>
                <thead>
                    <tr>
                        <th> Product Name </th>
                        <th> Quantity </th>
                        <th> Price </th>
                        <th> Total </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> T-shirt </td>
                        <td> 1 </td>
                        <td> $15 </td>
                        <td> $15 </td>
                    </tr>
                </tbody>
            </table>
            <h4> Total: $16.99 </h4>
            <button> Check Out </button>
        </>
    )
}
