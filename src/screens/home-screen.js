import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fetchGet, fetchPost } from '../utils/fetch-api';
import { CartStore } from '../store/cart-store';
import BestSellingCard from '../components/best-selling-card';
const HomeScreen = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState();
    const cartStore = CartStore.useContainer();
    const fetchCategory = async () => {
        const data = await fetchPost("/product/category/view")
        setCategory(data);
    };

    const fetchSearch = async () => {
        let response = await fetch('http://192.168.18.86:3002/api/product/view', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: search })
        });
        let jsonResponse = await response.json();
        setSearchData(jsonResponse);
    };


    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchSearch();
    }, [search]);


    const CarouselData = [
        {
            id: 1,
            image: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"
        },
        {
            id: 2,
            image: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"
        },
        {
            id: 3,
            image: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"
        },
        {
            id: 4,
            image: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"
        },
    ]


    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <View style={styles.topIcon}>
                        <View style={styles.topLeftView}>
                            <View style={styles.topLeftImageView}>
                                <Image source={require("../components/icons/profileIcon.png")} />
                            </View>
                            <Text style={styles.topName}>Ami’s Choice</Text>
                        </View>
                        <TouchableOpacity style={styles.topRightView} onPress={() => navigation.navigate("Cart")}>
                            <Image source={require("../components/icons/groceryCart.png")} />
                            <View style={styles.topQuantity}>
                                <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchView}>
                        <AntDesign name="search1" size={24} />
                        <TextInput
                            value={search}
                            placeholder='search'
                            style={styles.searchText}
                            showSoftInputOnFocus={false}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
                <View style={styles.carousel}>
                    <Carousel
                        data={CarouselData}
                        renderItem={({ item }) =>
                            <View style={styles.carouselCard}>
                                <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{ flex: 1 }} imageStyle={{ borderRadius: 16 }}>
                                    <View style={styles.rightCarouselView}>
                                        <Text style={styles.offerName}>Ramadan Offers</Text>
                                        <Text style={styles.offer}>Get 25%</Text>
                                        <TouchableOpacity style={styles.getOffer}>
                                            <Text>Grab Offer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        }
                        sliderWidth={380}
                        itemWidth={360}
                    />
                </View>
                <View style={styles.categories}>
                    <View style={styles.categoriesTopView}>
                        <View style={styles.categoriesTopLeftView}>
                            <Text style={styles.categoriesText}>Categories </Text>
                            <Image source={require("../components/icons/CategoriesIcon.png")} />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapView}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={category?.result?.rows}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={
                                            {
                                                flex: 1,
                                                alignItems: 'center',
                                                paddingRight: 10
                                            }
                                        }
                                        onPress={() => {
                                            navigation.navigate("CategoryItems", { itemId: item.id })
                                        }
                                        }>
                                        <View style={styles.itemImageView}>
                                            <Image source={require("../components/icons/apple.png")} height={30} width={100} />
                                        </View>
                                        <Text style={styles.categoriesName}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>
                <View style={styles.bestSelling}>
                    <View style={[styles.categoriesTopView, { flex: 0.1 }]}>
                        <View style={styles.categoriesTopLeftView}>
                            <Text style={styles.categoriesText}>Best selling </Text>
                            <Image source={require("../components/icons/Fire.png")} />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <FlatList
                            numColumns={2}
                            data={searchData?.result?.rows}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <BestSellingCard item={item} />
                                )
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topView: {
        flex: 0.2,
    },
    topIcon: {
        padding: '4%',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topName: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.contentText,
        marginRight: '3%'
    },
    topLeftView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    topLeftImageView: {
        width: 45,
        height: 47,
        paddingHorizontal: "2%",
        backgroundColor: "#6A8071",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomStartRadius: 27,
        borderBottomEndRadius: 27,
        alignItems: "center",
        justifyContent: "center"
    },
    topRightView: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        padding: '3%',
        borderRadius: 100
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
    searchView: {
        width: "90%",
        height: 50,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '4%',
        paddingHorizontal: '2%',
        borderRadius: 100,
        alignSelf: 'center'
    },
    searchText: {
        width: "100%",
        height: '100%'
    },
    carousel: {
        flex: 0.2,
        alignItems: 'center'
    },
    carouselCard: {
        backgroundColor: '#fff',
        flex: 1,
        marginVertical: "2%",
        borderRadius: 16
    },
    rightCarouselView: {
        backgroundColor: Colors.greenColor,
        width: '60%',
        height: "100%",
        alignSelf: "flex-end",
        justifyContent: "space-evenly",
        alignItems: 'center',
        borderRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
    },
    offerName: {
        color: '#fff',
        opacity: 80,
        fontWeight: '500',
        fontSize: 12
    },
    offer: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 32
    },
    getOffer: {
        backgroundColor: '#fff',
        paddingHorizontal: '8%',
        paddingVertical: '3%',
        borderRadius: 100
    },
    categories: {
        flex: 0.2,
        paddingHorizontal: '5%'
    },
    categoriesTopLeftView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoriesText: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 23.44
    },
    categoriesTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    seeAllText: {
        color: "#23AA49",
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18.23
    },
    itemImageView: {
        backgroundColor: '#F3F5F7',
        height: 73,
        width: 73,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    mapView: {
        flexDirection: 'row',
        width: "100%",
        marginTop: "3%"
    },
    categoriesName: {
        color: Colors.contentText,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.23
    },
    bestSelling: {
        flex: 0.4,
        paddingHorizontal: '5%'
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