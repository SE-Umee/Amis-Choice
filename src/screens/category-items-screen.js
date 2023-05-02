import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CartStore } from '../store/cart-store';
import BestSellingCard from '../components/best-selling-card';

const CategoryItemsScreen = ({ route }) => {
    const { itemId } = route.params;
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [product, setProduct] = useState([]);
    const [itemIsInCart, setItemIsInCart] = useState(false)


    const fetchProduct = async (id) => {
        let response = await fetch(`http://192.168.18.86:3002/api/product/category/view/${id}`);
        let data = await response.json();
        setProduct(data);
    };

    useEffect(() => {
        fetchProduct(itemId)
    }, [itemId])


    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <View style={styles.topLeftView}>
                        <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                            <AntDesign name="left" />
                        </TouchableOpacity>
                        <Text style={styles.categoryName}>{product?.result?.title}</Text>
                    </View>
                    <View style={styles.topRightView}>
                        <TouchableOpacity style={styles.BackArrow}>
                            <AntDesign name="search1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.BackArrow, { marginHorizontal: '3%' }]}>
                            <Image source={require("../components/icons/filterIcon.png")} height={20} width={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartIconView} onPress={() => navigation.navigate("Cart")}>
                            <Image source={require("../components/icons/groceryCart.png")} height={20} width={20} />
                            <View style={styles.topQuantity}>
                                <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.wholeItemsView}>
                    <FlatList
                        numColumns={2}
                        data={product?.result?.products}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <BestSellingCard item={item} />
                            )
                        }}
                    />
                </View>
            </SafeAreaView>

        </View>
    )
}

export default CategoryItemsScreen

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
    },
    topLeftView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
    topRightView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
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
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    bestSellingCard: {
        backgroundColor: '#F3F5F7',
        width: 163,
        height: 236,
        borderRadius: 16,
        // marginTop: '1%',
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