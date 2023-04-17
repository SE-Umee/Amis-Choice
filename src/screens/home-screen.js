import { Image, SafeAreaView, StyleSheet, Text, TextInput, View, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Carousel from 'react-native-snap-carousel';

const HomeScreen = () => {
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
                        <View style={styles.topRightView}>
                            <Image source={require("../components/icons/groceryCart.png")} />
                            <View style={styles.topQuantity}>
                                <Text style={styles.topQuantityText}>0</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.searchView}>
                        <AntDesign name="search1" size={24} />
                        <TextInput
                            placeholder='search'
                            style={styles.searchText}
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
                            horizontal
                            data={CarouselData}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingRight: 10 }}>
                                        <View style={styles.itemImageView}>
                                            <Image source={require("../components/icons/apple.png")} height={30} width={100} />
                                        </View>
                                        <Text style={styles.categoriesName}>Fruits</Text>
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
                            data={CarouselData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.bestSellingCard}>
                                        <View style={styles.stockView}>
                                            <Text style={styles.stockText}>Instock</Text>
                                        </View>
                                        <Image source={require("../assets/images/redChilli.png")} style={{ alignSelf: 'center' }} />
                                        <Text style={styles.bestSellingName}>Bell Pepper Red</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', paddingVertical: '4%' }}>
                                            <Text style={styles.quantity}>1kg</Text>
                                            <View style={styles.percentage}>
                                                <Text style={styles.percentageNo}>5% Off</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
                                            <Text style={styles.percentagePrice}>Rs.100</Text>
                                            <Text style={styles.originalPrice}>Rs.450</Text>
                                        </View>
                                        <View style={styles.addButton}>
                                            <MaterialIcons name="add" size={24} color="#fff" />
                                        </View>
                                    </View>
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
        width: "45%",
        height: "90%",
        borderRadius: 16,
        marginTop: '3%',
        marginRight: '5%',
        marginBottom: '5%'
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