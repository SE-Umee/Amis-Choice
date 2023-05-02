import { useState } from "react";
import { createContainer } from "unstated-next";

const cartStore = () => {
    const [cart, setCart] = useState([]);


    return {
        cart,
        setCart
    };
};

export const CartStore = createContainer(cartStore);