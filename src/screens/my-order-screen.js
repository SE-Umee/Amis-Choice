import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles/colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import { CartStore } from '../store/cart-store';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import CheckoutItemCard from '../components/checkout-item-card';
import HeaderCart from '../components/header-cart';

const MyOrderScreen = ({ route }) => {
    const { item } = route.params;
    const cartStore = CartStore.useContainer();
    const navigation = useNavigation();

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
    const timeConverter = (time) => {
        let date = moment(time).format('DD MMMM YYYY, h:mm a');
        return (date);
    }
    const totalAmount = (quantity, price) => {

        const total = quantity * price;
        return (Math.round(total))
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.innerCard}>
                            <View style={styles.orderNumberView}>
                                <Text style={styles.orderNumber}>Order#: 999012</Text>
                                <Text style={styles.orderPrice}>Rs. {item.amount}</Text>
                            </View>
                            <View style={styles.orderNumberView}>
                                <Text style={styles.orderDate}>{timeConverter(item.dateOrderPlaced)}</Text>
                                <Text style={styles.orderDate}>{item.productOrder.length} items</Text>
                            </View>
                            <View>
                                {orderStatus(item.status)}
                            </View>
                            <View style={styles.line} />
                            <View style={styles.clockView}>
                                <View style={styles.clickImage}>
                                    <Image source={require("../assets/images/clock_image.png")} />
                                </View>
                                <View style={{ marginLeft: '2%' }}>
                                    <Text style={styles.deliveryTime}>1:30 mins</Text>
                                    <Text style={styles.deliveryDescription}>Your order will be delivered proximately in  </Text>
                                </View>
                            </View>
                            <View style={styles.line} />
                            <View>
                                <FlatList
                                    data={item.productOrder}
                                    renderItem={({ item }) => {
                                        return (
                                            <>
                                                <View style={styles.cartItem}>
                                                    <Image source={{ uri: item?.product?.productImages[0]?.url }} style={{ height: 42, width: 48 }} />
                                                    <View style={{ width: 150, maxWidth: 150 }}>
                                                        <Text style={styles.itemName}>{item?.product.title}</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingTop: '5%' }}>
                                                            <Text style={styles.quantity}>{item?.product?.quantity}kg</Text>
                                                            <Text style={styles.quantity}>Qty: {2}</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.itemName}>Rs: {totalAmount(2, item.product.price)}</Text>
                                                </View>
                                                <View style={styles.line} />
                                            </>
                                        )
                                    }}
                                />
                            </View>
                            <View style={styles.clockView}>
                                <Image source={require("../assets/images/location_Image.png")} style={styles.clickImage} />
                                <Text style={[styles.deliveryDescription, { marginLeft: '2%' }]}>{item.address}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={{ marginTop: "2%" }}>
                                <View style={styles.subTotal}>
                                    <Text style={styles.subTotalText}>Subtotal</Text>
                                    <Text style={styles.subTotalAmount}>Rs. 1990</Text>
                                </View>
                                <View style={styles.line}></View>
                                <View style={styles.subTotal}>
                                    <Text style={styles.discountText}>Normal Delivery</Text>
                                    <Text style={styles.discountText}>Rs. 100</Text>
                                </View>
                                <View style={styles.line}></View>
                                <View style={styles.subTotal}>
                                    <Text style={styles.discountText}>Coupon Discount</Text>
                                    <Text style={styles.discountText}>Rs. 100</Text>
                                </View>

                                <View style={styles.line}></View>
                                <View style={styles.subTotal}>
                                    <Text style={styles.discountText}>Discount</Text>
                                    <Text style={styles.discountText}>Rs. 100</Text>
                                </View>
                                <View style={styles.line}></View>
                                <View style={styles.subTotal}>
                                    <Text style={styles.totalText}>Total</Text>
                                    <Text style={styles.totalAmount}>Rs. {item.amount}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.chatIcon}>
                    <Image source={require("../components/icons/chat_icon.png")} />
                </TouchableOpacity>
            </SafeAreaView>

        </View>
    )
}

export default MyOrderScreen

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
        paddingBottom: "3%"

    },
    orderNumberView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: '3%'
    },
    innerCard: {
        marginTop: '4%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: '5%',
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
    clickImage: {
        width: 54,
        height: 54,
        backgroundColor: '#F1F1F5',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 6
    },
    line: {
        backgroundColor: "#F1F1F5",
        height: 2,
        marginTop: '5%',
        marginBottom: '5%'
    },
    deliveryTime: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.contentText,
    },
    deliveryDescription: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000000",
        lineHeight: 15.62,
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: '5%',
        marginTop: '2%'
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
    clockView: {
        flexDirection: 'row',
        alignItems: "center"
    },
    subTotal: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    subTotalText: {
        color: Colors.textColor,
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 15.62,
    },
    subTotalAmount: {
        color: Colors.textColor,
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 15.62,
    },
    discountText: {
        color: Colors.textColor,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15.62,
    },
    totalText: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 15.62,
    },
    totalAmount: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.83,
    },
    chatIcon: {
        position: 'absolute',
        bottom: '29%',
        right: "10%",
    },
})