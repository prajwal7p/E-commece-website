import { useCallback, useState } from "react";
import api from "../services/axios";
import { CartContext } from "./cart-context";

function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const fetchCart = useCallback(async function fetchCart() {
        try {
            const res = await api.get("/cart");

            setCart(res.data.data);
        } catch {
            setCart([]);
        }
    }, []);

    const addToCart = useCallback(async function addToCart(product) {
        const res = await api.post("/cart", {
            productId: product._id
        });

        setCart(res.data.data);
    }, []);

    const removeFromCart = useCallback(async function removeFromCart(id) {
        const res = await api.delete(`/cart/${id}`);

        setCart(res.data.data);
    }, []);

    const increaseQuantity = useCallback(async function increaseQuantity(id) {
        const res = await api.patch(`/cart/${id}`, {
            action: "increase"
        });

        setCart(res.data.data);
    }, []);

    const decreaseQuantity = useCallback(async function decreaseQuantity(id) {
        const res = await api.patch(`/cart/${id}`, {
            action: "decrease"
        });

        setCart(res.data.data);
    }, []);

    return(

<CartContext.Provider

value={{

cart,

addToCart,

removeFromCart,

increaseQuantity,

decreaseQuantity,

fetchCart

}}

>

{children}

</CartContext.Provider>

    )

}

export default CartProvider;
