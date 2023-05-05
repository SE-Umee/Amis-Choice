import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from '../assets/styles/colors';
import { CartStore } from '../store/cart-store';

const CartItemCard = ({ item, setSubTotal, subTotal, setDiscount, discount }) => {

    const [quantity, setQuantity] = useState(1);
    const cartStore = CartStore.useContainer();



    const getTotal = () => {
        let total = cartStore.cart.reduce(

            (a, b) => {
                return a + (b.numberOfItem * b.price)
            }, 0)

        setSubTotal(Math.round(total))
    }



    const getTotalDiscount = () => {
        let total = cartStore.cart.reduce(

            (a, b) => {
                return a + (b.numberOfItem * findDiscount(b.price, b.discount))
            }, 0)

        setDiscount(Math.round(total))
    }

    useEffect(() => {
        getTotal()
        getTotalDiscount()
    }, [item, quantity])

    const increment = (id) => {
        setQuantity(quantity + 1)

        let index = cartStore.cart.findIndex((obj => obj.id == id))

        cartStore.cart[index].numberOfItem += 1

    }
    const decrement = (id) => {

        if (quantity <= 1) {
            setQuantity(1)
            let index = cartStore.cart.findIndex((obj => obj.id == id))

            cartStore.cart[index].numberOfItem = 1
        }
        else {
            setQuantity(quantity - 1)
            let index = cartStore.cart.findIndex((obj => obj.id == id))

            cartStore.cart[index].numberOfItem -= 1
        }

    }

    const deleteItem = (currentItemId) => {
        const filtered = cartStore.cart.filter((item) => item?.id != currentItemId);
        cartStore.setCart(filtered);
        let index = cartStore.cart.findIndex((obj => obj.id == currentItemId))

        setSubTotal(subTotal - (cartStore.cart[index].price * cartStore.cart[index].numberOfItem))
        setDiscount(discount - (findDiscount(cartStore.cart[index].price, cartStore.cart[index].discount) * cartStore.cart[index].numberOfItem))

    }

    const findDiscount = (originalPrice, discount) => {
        const discountAmount = originalPrice * (discount / 100);
        const discountedPrice = originalPrice - discountAmount;
        return (discountedPrice)

    }
    return (
        <View style={styles.cartItem}>
            <AntDesign name="delete" color={Colors.redText} size={24} onPress={() => deleteItem(item.id)} />
            <Image source={{ uri: item.productImages }} style={{ height: 35, width: 40 }} />
            <View style={{ width: 150, maxWidth: 150 }}>
                <Text style={styles.itemName}>{item.title}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingTop: '5%' }}>
                    <Text style={styles.quantity}>{item.quantity}kg</Text>
                    <Text style={styles.quantity}>{findDiscount(item.price, item.discount)}RS</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 100, maxWidth: 100, justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.addQuantity} onPress={() => decrement(item.id)}>
                    <Entypo name="minus" size={24} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.numberOfItem}</Text>
                <TouchableOpacity style={[styles.addQuantity, { backgroundColor: Colors.greenColor }]} onPress={() => increment(item.id)}>
                    <Entypo name="plus" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItemCard

const styles = StyleSheet.create({
    quantityText: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 23.44,
        paddingHorizontal: '4%'
    },
    addQuantity: {
        height: 36,
        width: 36,
        borderRadius: 100,
        backgroundColor: '#F3F5F7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: '5%',
        marginTop: '2%'
    },
    line: {
        backgroundColor: "#F1F1F5",
        height: 2,
        marginTop: '5%',
        marginBottom: '5%'
    },
    itemName: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.83,
    },
    quantity: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.83,
    },
})