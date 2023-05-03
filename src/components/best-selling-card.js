import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../assets/styles/colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CartStore } from '../store/cart-store';
import { useNavigation } from '@react-navigation/native';

const BestSellingCard = ({ item }) => {
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [itemIsInCart, setItemIsInCart] = useState(false)

    const findDiscount = (originalPrice, discount) => {
        const discountAmount = originalPrice * (discount / 100);
        const discountedPrice = originalPrice - discountAmount;
        return (discountedPrice)

    }


    const isItemInCart = (item) => {
        console.log('====================================');
        console.log(item);
        console.log('====================================');
        if (cartStore.cart.find((product) => product?.id == item?.id)) {
            setItemIsInCart(true)
        }
        else {
            cartStore.setCart([...cartStore.cart, {
                id: item?.id,
                title: item?.title,
                discount: item?.discount,
                price: item?.price,
                productImages: item?.productImages[0]?.url,
                quantity: item?.quantity,
                numberOfItem: 1,
            }])
            setItemIsInCart(true);
        }
    }


    const isItemInCartCheck = (itemId) => {
        if (cartStore.cart.find((product) => product?.id == itemId)) {
            setItemIsInCart(true)
        }
        else {
            setItemIsInCart(false)
        }
    }


    useEffect(() => {
        isItemInCartCheck(item.id)
    }, [cartStore.cart])


    return (
        <TouchableOpacity style={styles.bestSellingCard} onPress={() => navigation.navigate("ItemDetails", { item })}>
            {item.quantity > 0 ?
                <View style={styles.stockView}>
                    <Text style={styles.stockText}>Instock</Text>
                </View>
                :
                <View style={styles.outOfStockView}>
                    <Text style={styles.outOfStockText}>Out of stock</Text>
                </View>
            }
            <Image source={{ uri: item?.productImages[0]?.url }} style={{ alignSelf: 'center', height: "50%", width: 93 }} resizeMode="contain" />
            <Text style={styles.bestSellingName}>{item.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', paddingVertical: '4%' }}>
                <Text style={styles.quantity}>{item.quantity}kg</Text>
                <View style={styles.percentage}>
                    <Text style={styles.percentageNo}>{item.discount}% of Off</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
                <Text style={styles.percentagePrice}>{`Rs.${findDiscount(item.price, item.discount)}`}</Text>
                <Text style={styles.originalPrice}>Rs.{item.price}</Text>
            </View>
            <TouchableOpacity style={item.quantity > 0 && !itemIsInCart ? styles.addButton : [styles.addButton, { backgroundColor: Colors.gray }]} onPress={() => {
                isItemInCart(item)

            }}>
                <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default BestSellingCard

const styles = StyleSheet.create({
    bestSellingCard: {
        backgroundColor: '#F3F5F7',
        width: 163,
        height: 236,
        borderRadius: 16,
        marginRight: '5%',
        marginBottom: '10%',
    },
    stockView: {
        backgroundColor: "#b7f7cc",
        width: '45%',
        alignSelf: 'flex-end',
        borderRadius: 100,
        paddingVertical: "2%",
        alignItems: 'center',
        marginTop: "6%",
        marginRight: '6%'
    },
    stockText: {
        color: Colors.greenColor,
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.44
    },
    outOfStockView: {
        backgroundColor: "#ff66664D",
        width: '45%',
        alignSelf: 'flex-end',
        borderRadius: 100,
        paddingVertical: "2%",
        alignItems: 'center',
        marginTop: "6%",
        marginRight: '6%'
    },
    outOfStockText: {
        color: Colors.redButton,
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.44
    },
    bestSellingName: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18.23,
        marginLeft: "5%",
        marginTop: '2%'
    },
    quantity: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.23,
    },
    percentage: {
        borderRadius: 15,
        borderColor: "#FF324B",
        borderWidth: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        paddingVertical: 0
    },
    percentageNo: {
        color: "#FF324B",
        fontWeight: '700',
        fontSize: 8,
        lineHeight: 10.42,
    },
    percentagePrice: {
        color: "#FF324B",
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.23,
    },
    originalPrice: {
        color: Colors.contentText,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20.83,
        textDecorationLine: "line-through"
    },
    addButton: {
        width: 30,
        height: 30,
        backgroundColor: Colors.greenColor,
        position: 'absolute',
        bottom: -10,
        right: "40%",
        alignItems: 'center',
        borderRadius: 100,
        justifyContent: 'center'
    },
    addIcon: {
        color: "#FF324B",
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 20.23,
    },
})