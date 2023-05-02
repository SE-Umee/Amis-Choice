import { Image, SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { CartStore } from '../store/cart-store';
const ItemDetailsScreen = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [quantity, setQuantity] = useState(0)
    const isCarousel = useRef(null);
    const cartStore = CartStore.useContainer();
    const [itemIsInCart, setItemIsInCart] = useState(false)

    const findDiscount = (originalPrice, discount) => {
        const discountAmount = originalPrice * (discount / 100);
        const discountedPrice = originalPrice - discountAmount;
        return (discountedPrice)
    }

    const isItemInCart = (item) => {
        if (cartStore.cart.find((product) => product?.id == item?.id)) {
            setItemIsInCart(true)
        }
        else {
            cartStore.setCart([...cartStore.cart, item])
            setItemIsInCart(true)
        }
    }



    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={{ flex: 0.5 }}>
                    <ImageBackground source={require("../assets/images/sliderBG.png")} resizeMode="stretch" style={{ flex: 1, }}>
                        <View style={styles.topIconView}>
                            <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                                <AntDesign name="left" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cartIconView} onPress={() => navigation.navigate("Cart")}>
                                <Image source={require("../components/icons/groceryCart.png")} height={20} width={20} />
                                <View style={styles.topQuantity}>
                                    <Text style={styles.topQuantityText}>{cartStore.cart.length}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignSelf: "center", height: "70%", width: '100%', alignItems: 'center', justifyContent: "flex-end" }}>
                            <Carousel
                                ref={isCarousel}
                                data={item.productImages}
                                renderItem={({ item }) =>
                                    <View style={{ alignSelf: "center", height: "100%", width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={{ uri: item.url }} resizeMode="contain" style={{ height: 140, width: "50%", alignSelf: "center" }} />
                                    </View>
                                }
                                sliderWidth={500}
                                itemWidth={500}
                                onSnapToItem={(index) => setIndex(index)}
                            />
                            <Pagination
                                dotsLength={item.productImages.length}
                                activeDotIndex={index}
                                carouselRef={isCarousel}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    backgroundColor: Colors.greenColor
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                tappableDots={true}
                            />
                        </View>
                        {item.quantity > 0 ?
                            <View style={styles.stockView}>
                                <Text style={styles.stockText}>Instock</Text>
                            </View>
                            :
                            <View style={styles.outOfStockView}>
                                <Text style={styles.outOfStockText}>Out of stock</Text>
                            </View>
                        }
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.5 }}>
                    <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: '2%' }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.itemName}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 110, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={styles.addQuantity} onPress={() => setQuantity(quantity - 1)}>
                                    <Entypo name="minus" size={24} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity style={[styles.addQuantity, { backgroundColor: Colors.greenColor }]} onPress={() => setQuantity(quantity + 1)}>
                                    <Entypo name="plus" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.weightPriceView}>
                            <Text style={styles.weight}>{item.quantity}kg</Text>
                            <View style={styles.priceView}>
                                <Text style={styles.discountPrice}>{`Rs.${findDiscount(item.price, item.discount)}`}</Text>
                                <Text style={styles.originalPrice}>Rs.{item.price}</Text>
                            </View>
                        </View>
                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        <View style={styles.review}>
                            <Text style={styles.reviewText}>Rating &  Review</Text>
                        </View>
                        <View style={{ marginTop: "10%" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.reviewText}>John deo - 02 Nov 2022</Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={4}
                                    fullStarColor={"#FDCC0D"}
                                    starSize={20}
                                />
                            </View>
                            <Text style={[styles.description, { paddingRight: "15%" }]}>Very nice packing, Nice products Highly Recommended.</Text>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={!itemIsInCart ? styles.addCartBtn : [styles.addCartBtn, { backgroundColor: Colors.gray }]} onPress={() => { isItemInCart(item) }}>
                    <Text style={styles.addCartText}>Add Cart</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default ItemDetailsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    imageSlider: {
        flex: 0.5,
    },
    topIconView: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    stockView: {
        backgroundColor: "#b7f7cc",
        alignSelf: "center",
        borderRadius: 100,
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        alignItems: 'center',
    },
    stockText: {
        color: Colors.greenColor,
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.44
    },
    outOfStockView: {
        backgroundColor: "#ff66664D",
        alignSelf: "center",
        borderRadius: 100,
        paddingVertical: "2%",
        alignItems: 'center',
        paddingHorizontal: "3%",
    },
    outOfStockText: {
        color: Colors.redButton,
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.44
    },
    itemName: {
        color: Colors.headingText,
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 31.25
    },
    addQuantity: {
        height: 36,
        width: 36,
        borderRadius: 100,
        backgroundColor: '#F3F5F7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addQuantityText: {
        fontSize: 20,
        color: '#979899'
    },
    quantityText: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 23.44,
        paddingHorizontal: '4%'
    },
    weightPriceView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    weight: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 26.04,
        color: Colors.redText
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountPrice: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: Colors.redText,
        paddingRight: '2%'
    },
    originalPrice: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 20.83,
        color: "#575C55",
        textDecorationLine: "line-through"
    },
    descriptionView: {
        paddingRight: '11%',
        marginTop: '2%'
    },
    description: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20.83,
        color: Colors.gray
    },
    review: {
        marginTop: '10%'
    },
    reviewText: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: Colors.contentText
    },
    addCartBtn: {
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
    addCartText: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: "#fff"
    },
})