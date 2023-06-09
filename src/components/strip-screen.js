import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';
import { Colors } from '../assets/styles/colors';
import BackButton from './back-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const StripScreen = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);


    const fetchPaymentSheetParams = async () => {
        let response = await fetch("http://192.168.18.86:3000/payments/intents", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 2000 })
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
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!initPaymentSheets.error) {
            setLoading(true);
            console.log('====================================');
            console.log("not error");
            console.log('====================================');
        }
        else {
            console.log('====================================');
            console.log("error", error);
            console.log('====================================');
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            console.log('====================================');
            console.log(`Error code: ${error.code}`, error.message);
            console.log('====================================');

        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topIconView}>
                    <BackButton />
                    <Text style={styles.topHeadingText}>Checkout</Text>
                </View>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => { openPaymentSheet() }}>
                        <Text>Click </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    )
}

export default StripScreen

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
    contentContainer: {
        flex: 0.93,
        justifyContent: "center",
        alignItems: 'center'
    },
    name: {
        width: wp(65),
        fontSize: wp(5),
        padding: "2%",
        borderWidth: 1,
    },
})




 // <CardField
        //     postalCodeEnabled={true}
        //     placeholders={{
        //         number: '4242 4242 4242 4242',
        //     }}
        //     cardStyle={{
        //         backgroundColor: '#FFFFFF',
        //         textColor: '#000000',
        //     }}
        //     style={{
        //         width: '100%',
        //         height: 50,
        //         marginVertical: 30,
        //     }}
        //     onCardChange={(cardDetails) => {
        //         console.log('cardDetails', cardDetails);
        //     }}
        //     onFocus={(focusedField) => {
        //         console.log('focusField', focusedField);
        //     }}
        // />