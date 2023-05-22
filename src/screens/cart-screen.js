import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../assets/styles/colors'
import { useNavigation } from '@react-navigation/native'
import { CartStore } from '../store/cart-store'
import CartItemCard from '../components/cart-item-card'
import BackButton from '../components/back-button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CartScreen = () => {
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);


    const dis = () => {
        let totalDiscount = subTotal - discount;
        return (Math.round(totalDiscount))
    }

    return (
        <View style={styles.maiaContainer}>
            <SafeAreaView style={styles.maiaContainer}>
                <View style={styles.topIconView}>
                    <BackButton />
                    <Text style={styles.topHeadingText}>Cart</Text>
                </View>
                <View style={styles.cartItems}>
                    <FlatList
                        data={cartStore.cart}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <CartItemCard
                                        item={item}
                                        subTotal={subTotal}
                                        setSubTotal={setSubTotal}
                                        discount={discount}
                                        setDiscount={setDiscount}

                                    />
                                    <View style={styles.line} />
                                </>
                            )
                        }}

                    />
                    <View style={styles.receipt}>
                        <View style={styles.subTotal}>
                            <Text style={styles.subTotalText}>Subtotal</Text>
                            <Text style={styles.subTotalAmount}>Rs. {subTotal}</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.discountText}>Discount</Text>
                            <Text style={styles.discountText}>{`Rs. ${dis()}`}</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalAmount}>Rs. {discount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.checkOutButn} onPress={() => { Object.keys(cartStore.user).length ? navigation.navigate("CheckOut") : navigation.navigate("LogIn") }}>
                        <Text style={styles.checkOutText}>Check out</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    maiaContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topIconView: {
        flex: 0.07,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        marginTop: '2%',
        alignItems: 'center',
    },
    topHeadingText: {
        color: Colors.contentText,
        fontSize: hp('3%'),
        fontWeight: '700',
        lineHeight: 26.04,
        marginLeft: '35%'
    },
    cartItems: {
        flex: 0.93,
    },
    addQuantity: {
        height: hp("5%"),
        width: wp("9%"),
        borderRadius: 100,
        backgroundColor: '#F3F5F7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantityText: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: hp('2.5%'),
        lineHeight: 23.44,
        paddingHorizontal: '4%'
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
        height: hp('0.2%'),
        marginTop: '5%',
        marginBottom: '5%'
    },
    itemName: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: hp('2.3%'),
        lineHeight: 20.83,
    },
    quantity: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: hp('2.3%'),
        lineHeight: 20.83,
    },
    receipt: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        height: hp("20%"),
        width: wp("90%"),
        borderRadius: 16,
        paddingHorizontal: '5%',
        marginTop: "5%",
        justifyContent: 'space-between',
        paddingVertical: '2%',
        marginBottom: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.01,
        shadowRadius: 2,
        elevation: 10,
    },
    subTotal: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    subTotalText: {
        color: Colors.textColor,
        fontWeight: '500',
        fontSize: hp('1.7%'),
        lineHeight: 15.62,
    },
    subTotalAmount: {
        color: Colors.textColor,
        fontWeight: '700',
        fontSize: hp('1.7%'),
        lineHeight: 15.62,
    },
    discountText: {
        color: Colors.textColor,
        fontWeight: '400',
        fontSize: hp('1.7%'),
        lineHeight: 15.62,
    },
    totalText: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: hp('1.7%'),
        lineHeight: 15.62,
    },
    totalAmount: {
        color: Colors.redText,
        fontWeight: '700',
        fontSize: hp('2.3%'),
        lineHeight: 20.83,
    },
    checkOutButn: {
        backgroundColor: Colors.greenColor,
        marginHorizontal: '5%',
        paddingVertical: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        borderRadius: 100
    },
    checkOutText: {
        fontSize: hp('2.3%'),
        fontWeight: "700",
        lineHeight: 20.83,
        color: "#fff"
    },
})