import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { CartStore } from '../store/cart-store'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CheckoutItemCard from '../components/checkout-item-card'
import { useStripe } from '@stripe/stripe-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CheckOutScreen = () => {
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [productNote, setProductNote] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [radioBtn, setRadioBtn] = useState(false);
    const [deliveryType, setDeliveryType] = useState("Urgent");
    const [deliveryCharges, setDeliveryCharges] = useState(200);
    const [subTotal, setSubTotal] = useState(0);
    const [bill, setTotalBill] = useState(0);
    const [product, setProduct] = useState([]);
    const [emailValidated, setEmailValidated] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const radioButton = () => {
        setRadioBtn(!radioBtn)

        if (radioBtn === false) {
            setDeliveryType("Normal")
            setDeliveryCharges(100)
        }
        else {
            setDeliveryType("Urgent")
            setDeliveryCharges(200)
        }

    }


    const emailValidation = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        if (!strongRegex.test(email)) {
            setEmailValidated(true)
        }
        else {
            setEmailValidated(false)
        }
    }

    useEffect(() => {
        emailValidation()
    }, [email])

    const createOrder = async () => {

        let response = await fetch(`http://192.168.18.86:3002/api/order/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cartStore.user.result.tokenInfo}`,
            },
            body: JSON.stringify({
                address: address,
                phone: phone,
                city: "Islamabad",
                items: product,
            })
        });
        let jsonResponse = await response.json();

        if (jsonResponse.statusCode === 200) {
            // navigation.navigate("OrderSuccess", { address, phone })
            openPaymentSheet()
        }
        else {
            Alert.alert("Order can't placed")
        }
    };

    const itemInCart = () => {
        for (var i = 0; i < cartStore.cart.length; ++i) {
            product.push({
                quantity: cartStore.cart[i]?.numberOfItem,
                productId: cartStore.cart[i]?.id,
            })
        }
    }

    const cal_Total = () => {
        let total = cartStore.cart.reduce(

            (a, b) => {
                return a + (b.numberOfItem * b.price)
            }, 0)

        setSubTotal(Math.round(total))
    }

    useEffect(() => {
        cal_Total()
        itemInCart()

    }, [cartStore.cart])

    const totalBill = () => {
        const bill = subTotal + deliveryCharges
        setTotalBill(bill)
    }

    useEffect(() => {
        totalBill()
    }, [subTotal, deliveryCharges])

    // ---------------------- Strip Payment method-----------------


    const fetchPaymentSheetParams = async () => {
        let response = await fetch("http://192.168.18.86:3000/payments/intents", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: Math.floor(bill * 100) })
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };


    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();
        const initPaymentSheets = await initPaymentSheet({
            merchantDisplayName: firstName || "InfinityBits",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (initPaymentSheets.error) {
            console.log('====================================');
            console.log("error", error);
            console.log('====================================');
        }
    };

    const openPaymentSheet = async () => {
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
            console.log('====================================');
            console.log(`Error code: ${error.code}`, error.message);
            console.log('====================================');

        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }

    };

    useEffect(() => {
        initializePaymentSheet();
    }, [bill]);

    // ---------------------- Strip Payment method-----------------

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.topIconView}>
                        <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.navigate("Home")}>
                            <AntDesign name="left" />
                        </TouchableOpacity>
                        <Text style={styles.topHeadingText}>Checkout</Text>
                    </View>
                    <View style={styles.scrollView}>


                        <View style={styles.userDetailsView}>
                            <View style={styles.locationView}>
                                <View style={styles.locationImageView}>
                                    <Image source={require("../assets/images/location_Image.png")} />
                                    <Text style={styles.locationText}>Delivery Location</Text>
                                </View>
                                <Feather name="chevron-down" size={20} color={"#000"} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    label="First Name"
                                    value={firstName}
                                    onChangeText={text => setFirstName(text)}
                                    mode="outlined"
                                    style={styles.textInput}
                                    activeOutlineColor={Colors.textColor}
                                    left={<TextInput.Icon icon={require('../components/icons/card_icon.png')} />}
                                />
                                <TextInput
                                    label="Last Name"
                                    value={lastName}
                                    onChangeText={text => setLastName(text)}
                                    mode="outlined"
                                    style={styles.textInput}
                                    activeOutlineColor={Colors.textColor}
                                    left={<TextInput.Icon icon={require('../components/icons/card_icon.png')} />}
                                />
                            </View>
                            <View>


                                <TextInput
                                    label="Your Email"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    mode="outlined"
                                    style={[styles.textInput, { width: "100%" }]}
                                    activeOutlineColor={Colors.textColor}
                                    left={<TextInput.Icon icon="email-outline" />}
                                />
                                <View style={{
                                    alignSelf: 'flex-start',
                                    marginTop: hp(-0.2)
                                }}>
                                    {
                                        emailValidated ?
                                            <Text style={{ color: "red" }}>Invalid Email</Text>
                                            : <></>
                                    }
                                </View>
                            </View>
                            <TextInput
                                label="Phone number"
                                value={phone}
                                onChangeText={text => setPhone(text)}
                                mode="outlined"
                                style={[styles.textInput, { width: "100%" }]}
                                activeOutlineColor={Colors.textColor}
                                left={<TextInput.Icon icon="phone" />}
                            />
                            <TextInput
                                label="Complete address: House #(For delivery)"
                                value={address}
                                onChangeText={text => setAddress(text)}
                                mode="outlined"
                                style={[styles.textInput, { width: "100%" }]}
                                activeOutlineColor={Colors.textColor}
                                left={<TextInput.Icon icon="map-marker-outline" />}
                            />
                        </View>
                        <View style={styles.userDetailsView}>
                            <View style={styles.productNoteIcon}>
                                <Image source={require("../components/icons/product_note.png")} />
                                <Text style={styles.productNoteText}>Product Notes: (Optional)</Text>
                            </View>
                            <TextInput
                                value={productNote}
                                onChangeText={text => setProductNote(text)}
                                mode="outlined"
                                style={styles.productNote}
                                returnKeyType={"done"}
                                multiline={true}
                                activeOutlineColor={Colors.textColor}
                            />
                        </View>

                        <FlatList
                            data={cartStore.cart}
                            renderItem={({ item }) => {
                                return (
                                    <>
                                        <CheckoutItemCard item={item} />
                                        <View style={styles.line} />
                                    </>
                                )
                            }}

                        />
                        <View style={styles.userDetailsView}>
                            <View style={styles.locationImageView}>
                                <Image source={require("../components/icons/cash_on_delivery.png")} />
                                <View style={{ marginLeft: '2%' }}>
                                    <Text style={styles.productNoteText}>Cash On Delivery</Text>
                                    <Text style={styles.productNoteDis}>Lorem ipsum dolor sit amet, consectetur.</Text>
                                </View>
                            </View>
                            <View style={[styles.line, { backgroundColor: "#575C55" }]} />
                            <View style={styles.radioBtn}>
                                <TouchableOpacity onPress={() => radioButton()}>
                                    {!radioBtn ?
                                        <MaterialCommunityIcons name="checkbox-blank-circle" size={20} />
                                        :
                                        <MaterialIcons name="radio-button-checked" color={Colors.greenColor} size={20} />
                                    }
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.productNoteText}>Normal</Text>
                                    <View style={[styles.locationView, { width: '89%' }]}>
                                        <Text style={styles.productNoteDis}>Lorem ipsum dolor sit amet, consectetur.</Text>
                                        <Text style={styles.productNoteText}>Rs. 100</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.line, { backgroundColor: "#575C55" }]} />
                            <View style={styles.radioBtn}>
                                <TouchableOpacity onPress={() => radioButton()}>
                                    {radioBtn ?
                                        <MaterialCommunityIcons name="checkbox-blank-circle" size={20} />
                                        :
                                        <MaterialIcons name="radio-button-checked" color={Colors.greenColor} size={20} />
                                    }
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.productNoteText}>Urgent</Text>
                                    <View style={[styles.locationView, { width: '89%' }]}>
                                        <Text style={styles.productNoteDis}>Lorem ipsum dolor sit amet, consectetur.</Text>
                                        <Text style={styles.productNoteText}>Rs. 200</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userDetailsView}>
                        <View style={styles.locationImageView}>
                            <Image source={require("../components/icons/promp_code.png")} />
                            <Text style={[styles.productNoteText, { marginLeft: '2%' }]}>Promo Code</Text>
                        </View>
                        <View style={[styles.locationView, { marginTop: '2%' }]}>
                            <TextInput
                                label="Promo Code"
                                value={promoCode}
                                onChangeText={text => setPromoCode(text)}
                                mode="outlined"
                                style={[styles.textInput, { width: "70%", marginTop: 0 }]}
                                activeOutlineColor={Colors.textColor}
                                left={<TextInput.Icon icon={require('../components/icons/promo_code-icon.png')} />}
                            />
                            <TouchableOpacity style={styles.applyPromoCodeBtn}>
                                <Text style={styles.applyText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.userDetailsView}>
                        <View style={styles.subTotal}>
                            <Text style={styles.subTotalText}>Subtotal</Text>
                            <Text style={styles.subTotalAmount}>Rs. {subTotal}</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.discountText}>{deliveryType} Delivery</Text>
                            <Text style={styles.discountText}>Rs. {deliveryCharges}</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.discountText}>Coupon Discount</Text>
                            <Text style={styles.discountText}>Rs. 100</Text>
                        </View>

                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.discountText}>Discount</Text>
                            <Text style={styles.discountText}>Rs. 100</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.subTotal}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalAmount}>Rs. {bill}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.placeOrderBtn} onPress={() => createOrder()}>
                        <Text style={styles.placeOrderBtnText}>Place Order</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topIconView: {
        flex: 0.07,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '2%'
    },
    topHeadingText: {
        color: Colors.contentText,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26.04,
        marginLeft: '25%'
    },
    scrollView: {
        flex: 0.93,
    },
    userDetailsView: {
        backgroundColor: "#fff",
        marginVertical: '2%',
        marginHorizontal: '5%',
        borderRadius: 16,
        padding: '5%'
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationImageView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 15.62,
        color: Colors.textColor,
        marginLeft: '5%'
    },
    textInput: {
        width: '47%',
        // height: 46,
        marginTop: '5%',
        backgroundColor: '#fff'
    },
    productNoteIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productNoteText: {
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 15.62,
        color: Colors.textColor,

    },
    productNote: {
        width: wp(80),
        minHeight: hp(10),
        maxHeight: hp(20),
        // marginTop: '5%',
        backgroundColor: '#fff',
        textAlignVertical: 'top'
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
    productNoteDis: {
        color: "#575C55",
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.83,
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    radioBtnHeading: {
        color: "#575C55",
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 13.83,
    },
    applyPromoCodeBtn: {
        width: 81,
        height: 37,
        backgroundColor: Colors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50
    },
    applyText: {
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 18.23,
        color: "#fff",
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
    placeOrderBtn: {
        backgroundColor: Colors.greenColor,
        marginHorizontal: '5%',
        paddingVertical: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginTop: '2%',
        marginBottom: '10%'
    },
    placeOrderBtnText: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: "#fff"
    },
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: hp("5.5%"),
        width: wp("11%"),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
})