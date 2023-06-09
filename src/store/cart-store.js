import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";

const cartStore = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});


    const saveCartData = async () => {
        try {
            await AsyncStorage.setItem('@cart', JSON.stringify(cart))
            await AsyncStorage.setItem("@user", JSON.stringify(user))
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    useEffect(() => {
        saveCartData();
    }, [cart, user]);

    return {
        cart,
        setCart,
        user,
        setUser
    };
};

export const CartStore = createContainer(cartStore);