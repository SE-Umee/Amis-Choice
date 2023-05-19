import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const CheckoutItemCard = ({ item }) => {

    const totalAmount = (quantity, price) => {

        const total = quantity * price;
        return (Math.round(total))
    }
    return (
        <View style={styles.cartItem}>
            <Image source={{ uri: item?.productImages }} style={{ height: 42, width: 48 }} />
            <View style={{ width: 150, maxWidth: 150 }}>
                <Text style={styles.itemName}>{item?.title}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingTop: '5%' }}>
                    <Text style={styles.quantity}>{item?.quantity}kg</Text>
                    <Text style={styles.quantity}>Qty: {item?.numberOfItem}</Text>
                </View>
            </View>
            <Text style={styles.itemName}>Rs: {totalAmount(item.numberOfItem, item.price)}</Text>
        </View>
    )
}

export default CheckoutItemCard

const styles = StyleSheet.create({
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
})