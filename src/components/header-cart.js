import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles/colors'
import { CartStore } from '../store/cart-store';
import { useNavigation } from '@react-navigation/native';

const HeaderCart = () => {
    const cartStore = CartStore.useContainer();
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.cartIconView} onPress={() => navigation.navigate("Cart")}>
            <Image source={require("./icons/groceryCart.png")} height={20} width={20} />
            <View style={styles.topQuantity}>
                <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HeaderCart

const styles = StyleSheet.create({
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
})