import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CartStore } from '../store/cart-store';
import BestSellingCard from '../components/best-selling-card';
import { fetchPost } from "../utils/fetch-api"
import HeaderCart from '../components/header-cart';

const CategoryItemsScreen = ({ route }) => {
    const itemId = route?.params?.itemId;
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [product, setProduct] = useState([]);
    const fetchProduct = async (id) => {

        if (!id) {
            let data = await fetchPost("/product/view")
            setProduct(data.result.rows);
        }
        else {
            let response = await fetch(`http://192.168.18.86:3002/api/product/category/view/${id}`);
            let data = await response.json();
            setProduct(data);
        }

    };
    useEffect(() => {
        fetchProduct(itemId)
    }, [navigation])


    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <View style={styles.topLeftView}>
                        <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                            <AntDesign name="left" />
                        </TouchableOpacity>
                        <Text style={styles.categoryName}> {itemId ? product?.result?.title : "Categories"}</Text>
                    </View>
                    <View style={styles.topRightView}>
                        <TouchableOpacity style={styles.BackArrow}>
                            <AntDesign name="search1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.BackArrow, { marginHorizontal: '3%' }]}>
                            <Image source={require("../components/icons/filterIcon.png")} height={20} width={20} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.cartIconView} onPress={() => navigation.navigate("Cart")}>
                            <Image source={require("../components/icons/groceryCart.png")} height={20} width={20} />
                            <View style={styles.topQuantity}>
                                <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
                            </View>
                        </TouchableOpacity> */}
                        <HeaderCart />
                    </View>
                </View>
                <View style={styles.wholeItemsView}>
                    {itemId ?
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
                        :
                        <FlatList
                            numColumns={2}
                            data={product}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <BestSellingCard item={item} />
                                )
                            }}
                        />
                    }
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
        paddingBottom: '20%',
        marginTop: '3%'
        // justifyContent: 'center',
        // alignItems: 'center'
    },


})