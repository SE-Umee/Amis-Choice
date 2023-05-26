import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Animated
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fetchPost } from '../utils/fetch-api';
import { CartStore } from '../store/cart-store';
import BestSellingCard from '../components/best-selling-card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCart from '../components/header-cart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const HomeScreen = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState();
    const cartStore = CartStore.useContainer();
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, hp("20%"))
    const translateY = diffClamp.interpolate({
        inputRange: [0, hp("20%")],
        outputRange: [0, -hp("20%")],
    })

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


    const getCartData = async () => {
        try {
            const cart = await AsyncStorage.getItem('@cart');
            const user = await AsyncStorage.getItem("@user")
            cartStore.setCart(JSON.parse(cart))
            cartStore.setUser(JSON.parse(user))
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <Animated.View style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    zIndex: 100,
                    elevation: 5,
                }}>
                    <View style={styles.topView}>
                        <View style={styles.topIcon}>
                            <View style={styles.topLeftView}>
                                <View style={styles.topLeftImageView}>
                                    <Image source={require("../components/icons/profileIcon.png")} />
                                </View>
                                <Text style={styles.topName}>Ami’s Choice</Text>
                            </View>
                            <HeaderCart />
                        </View>

                        <View style={styles.searchView}>
                            <AntDesign name="search1" size={24} />
                            <TextInput
                                value={search}
                                placeholder='search'
                                style={styles.searchText}
                                onChangeText={setSearch}
                            />
                        </View>
                    </View>
                </Animated.View>
                <View>
                    <ScrollView
                        onScroll={(e) => {
                            scrollY.setValue(e.nativeEvent.contentOffset.y)
                        }}
                        style={{
                            height: hp("100%"),
                            paddingTop: hp("20%"),
                        }}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.carousel}>
                            <Carousel
                                data={CarouselData}
                                renderItem={({ item }) =>
                                    <View style={styles.carouselCard}>
                                        <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{
                                        }} imageStyle={{ borderRadius: 16 }}>
                                            <View style={styles.rightCarouselView}>
                                                <Text style={styles.offerName}>Ramadan Offers</Text>
                                                <Text style={styles.offer}>Get 25%</Text>
                                                <TouchableOpacity style={styles.getOffer}>
                                                    <Text style={{ color: Colors.greenColor }}>Grab Offer</Text>
                                                </TouchableOpacity>
                                            </View>


                                        </ImageBackground>
                                    </View>
                                }
                                sliderWidth={350}
                                itemWidth={320}
                            />
                        </View>
                        <View style={styles.categories}>
                            <View style={[styles.categoriesTopView, { justifyContent: "space-between" }]}>
                                <View style={styles.categoriesTopLeftView}>
                                    <Text style={styles.categoriesText}>Categories </Text>
                                    <Image source={require("../components/icons/CategoriesIcon.png")} />
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("AllCategory", { category })}>
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
                            <View style={[styles.categoriesTopView, {
                                marginVertical: hp("2%")
                            }]}>
                                <View style={styles.categoriesTopLeftView}>
                                    <Text style={styles.categoriesText}>Best selling </Text>
                                    <Image source={require("../components/icons/Fire.png")} />
                                </View>

                            </View>
                            <View style={{
                                marginBottom: hp("30%"),
                                marginHorizontal: wp("3%")
                            }}>
                                {searchData?.result?.rows.length > 0 ?
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
                                    :
                                    <Text style={{ alignSelf: 'center', marginTop: hp("10%") }}>No Item Found</Text>
                                }
                            </View>
                        </View>
                    </ScrollView>
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
        height: hp("20%"),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.background
    },
    topIcon: {
        padding: '4%',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topName: {
        fontSize: hp('3%'),
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
        width: wp('11%'),
        height: hp('6%'),
        paddingHorizontal: "2%",
        backgroundColor: "#6A8071",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomStartRadius: 27,
        borderBottomEndRadius: 27,
        alignItems: "center",
        justifyContent: "center"
    },
    searchView: {
        width: wp('90%'),
        height: hp('7%'),
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '4%',
        paddingHorizontal: '2%',
        borderRadius: 100,
        alignSelf: 'center'
    },
    searchText: {
        width: wp('90%'),
        // height: hp('7%'),
    },
    carousel: {
        // flex: 0.2,
        alignItems: 'center',
    },
    carouselCard: {
        backgroundColor: '#fff',
        // flex: 1,
        marginVertical: hp(2),
        borderRadius: 16
    },
    rightCarouselView: {
        backgroundColor: Colors.greenColor,
        width: wp('45%'),
        height: hp('18.1%'),
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
        fontSize: hp('2%'),
    },
    offer: {
        color: '#fff',
        fontWeight: '500',
        fontSize: hp('4.5%'),
    },
    getOffer: {
        backgroundColor: '#fff',
        paddingHorizontal: '8%',
        paddingVertical: '3%',
        borderRadius: 100
    },
    categories: {
        marginVertical: hp("2%"),
        paddingHorizontal: '5%'
    },
    categoriesTopLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: hp("2%")
    },
    categoriesText: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: hp('2.5%'),
        lineHeight: 23.44
    },
    categoriesTopView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        color: "#23AA49",
        fontWeight: '700',
        fontSize: hp('2%'),
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
        width: wp('90%'),
        marginTop: hp("2%")
    },
    categoriesName: {
        color: Colors.contentText,
        fontWeight: '500',
        fontSize: hp('2%'),
        lineHeight: 18.23,
        marginTop: hp("1.5%")
    },
    bestSelling: {
        // flex: 0.4,
        paddingHorizontal: '5%',
    },
})