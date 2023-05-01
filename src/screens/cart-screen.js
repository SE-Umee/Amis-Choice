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
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors } from '../assets/styles/colors'
import { useNavigation } from '@react-navigation/native'
import Entypo from "react-native-vector-icons/Entypo";

const CartScreen = () => {
    const navigation = useNavigation();


    const Dummy = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
    ]
    return (
        <View style={styles.maiaContainer}>
            <SafeAreaView style={styles.maiaContainer}>
                <View style={styles.topIconView}>
                    <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                        <AntDesign name="left" />
                    </TouchableOpacity>
                    <Text style={styles.topHeadingText}>Cart</Text>
                </View>
                <ScrollView style={styles.cartItems}>
                    <FlatList
                        data={Dummy}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View style={styles.cartItem}>
                                        <AntDesign name="delete" color={Colors.redText} size={24} />
                                        <Image source={require("../assets/images/redChilli.png")} style={{ height: 42, width: 48 }} />
                                        <View>
                                            <Text style={styles.itemName}>Bell Pepper Red</Text>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingTop: '5%' }}>
                                                <Text style={styles.quantity}>1kg</Text>
                                                <Text style={styles.quantity}>Rs.150</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 110, justifyContent: 'space-between' }}>
                                            <TouchableOpacity style={styles.addQuantity} onPress={() => { }}>
                                                <Entypo name="minus" size={24} />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>1</Text>
                                            <TouchableOpacity style={[styles.addQuantity, { backgroundColor: Colors.greenColor }]} onPress={() => { }}>
                                                <Entypo name="plus" size={24} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.line} />
                                </>
                            )
                        }}

                    />
                    <View style={styles.receipt}>
                        <View style={styles.subTotal}>
                            <Text style={styles.subTotalText}>Subtotal</Text>
                            <Text style={styles.subTotalAmount}>Rs. 1150</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.discountText}>Discount</Text>
                            <Text style={styles.discountText}>Rs. 100</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalAmount}>Rs. 1050</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.checkOutButn}>
                    <Text style={styles.checkOutText}>Check out</Text>
                </TouchableOpacity>
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
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
    topHeadingText: {
        color: Colors.contentText,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26.04,
        marginLeft: '35%'
    },
    cartItems: {
        flex: 0.93,
    },
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
    receipt: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: 340,
        height: 140,
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
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: "#fff"
    },
})