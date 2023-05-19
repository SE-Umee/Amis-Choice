import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { CartStore } from '../store/cart-store';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import HeaderCart from '../components/header-cart';

const OrderHistoryScreen = () => {
    const cartStore = CartStore.useContainer();
    const navigation = useNavigation();
    const [orders, setOrders] = useState([])

    const orderHistory = async () => {
        let response = await fetch(`http://192.168.18.86:3002/api/order/history`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cartStore.user.result.tokenInfo}`,
            },
        });
        let jsonResponse = await response.json();

        setOrders(jsonResponse.result.rows)

    };
    const timeConverter = (time) => {
        let date = Moment(time).format('DD MMMM YYYY, h:mm a');
        return (date);
    }



    useEffect(() => {
        orderHistory()
    }, [])


    const orderStatus = (status) => {
        if (status === "delivered") {
            return (
                <View style={styles.orderStatus}>
                    <Text style={styles.cardText}>Delivered</Text>
                </View>
            )
        }
        else if (status === "pending") {
            return (
                <View style={[styles.orderStatus, { backgroundColor: "#faeeca" }]}>
                    <Text style={[styles.cardText, { color: "#FF7800" }]}>Pending</Text>
                </View>
            )
        }
        else {
            return (
                <View style={[styles.orderStatus, { backgroundColor: "#ff66664D" }]}>
                    <Text style={[styles.cardText, { color: "#D80F0F" }]}>Cancelled</Text>
                </View>
            )
        }
    }
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                        <AntDesign name="left" />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>Order History </Text>
                    {/* <TouchableOpacity style={styles.cartIconView} onPress={() => navigation.navigate("Cart")}>
                        <Image source={require("../components/icons/groceryCart.png")} height={20} width={20} />
                        <View style={styles.topQuantity}>
                            <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
                        </View>
                    </TouchableOpacity> */}
                    <HeaderCart />
                </View>
                <View style={styles.wholeItemsView}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.orderCard} onPress={() => { navigation.navigate("MyOrder", { item }) }}>
                                    <View style={styles.innerOrderCard}>
                                        <Text style={styles.orderNumber}>Order#: 999012</Text>
                                        <Text style={styles.orderPrice}>Rs. {item.amount}</Text>
                                    </View>
                                    <View style={styles.innerOrderCard}>
                                        <Text style={styles.orderDate}>{timeConverter(item.dateOrderPlaced)}</Text>
                                        <Text style={styles.orderDate}>{item.productOrder.length} items</Text>
                                    </View>
                                    <View>
                                        {orderStatus(item.status)}
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>

        </View>
    )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topView: {
        flex: 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginTop: '2%'
    },
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
    categoryName: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 24.04,
        marginLeft: '5%',
        color: Colors.contentText
    },
    cartIconView: {
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topQuantity: {
        height: 15,
        width: 15,
        position: "absolute",
        right: -5,
        top: 2,
        backgroundColor: Colors.greenColor,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topQuantityText: {
        color: '#fff',
        padding: '2%',
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 13,
        alignSelf: 'center'
    },
    wholeItemsView: {
        flex: 0.93,
        paddingHorizontal: '5%',
        paddingBottom: '20%'

    },
    orderCard: {
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: '5%',
        marginVertical: '5%'
    },
    innerOrderCard: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%'
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: Colors.textColor,
    },
    orderPrice: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: Colors.redText,
    },
    orderDate: {
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 15.62,
        color: Colors.gray,
    },
    orderStatus: {
        backgroundColor: "#b7f7cc",
        width: '30%',
        borderRadius: 100,
        paddingVertical: "2%",
        alignItems: 'center',
        marginTop: "4%",
    },
})