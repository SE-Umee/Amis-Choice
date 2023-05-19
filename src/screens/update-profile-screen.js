import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors } from '../assets/styles/colors'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { CartStore } from '../store/cart-store'

const UpdateProfileScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();


    const updateProfile = async () => {
        let response = await fetch(`http://192.168.18.86:3002/api/client/update`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cartStore.user.result.tokenInfo}`,
            },
            body: JSON.stringify({
                name: firstName + " " + lastName,
                address: address,
                phone: phone
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.statusCode === 200) {

            navigation.goBack()
        }
        else {
            Alert.alert("Error! can't update Profile")
        }
    }
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topIconView}>
                    <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
                        <AntDesign name="left" />
                    </TouchableOpacity>
                    <Text style={styles.topHeadingText}>Account Details</Text>
                </View>
                <View style={styles.wholeItemsView}>
                    <Image source={require("../assets/images/account-inage.png")} style={{ alignSelf: 'center' }} />
                    <View style={styles.userDetailsView}>
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
                    <TouchableOpacity style={styles.checkOutButn} onPress={() => { updateProfile() }}>
                        <Text style={styles.checkOutText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default UpdateProfileScreen

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
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
    topHeadingText: {
        color: Colors.contentText,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26.04,
        marginLeft: '25%'
    },
    wholeItemsView: {
        flex: 0.93,
        marginTop: "3%"
    },
    userDetailsView: {
        marginVertical: '2%',
        marginHorizontal: '5%',
        borderRadius: 16,
        padding: '5%'
    },
    textInput: {
        width: '47%',
        height: 46,
        marginTop: '5%',
        backgroundColor: '#fff'
    },
    checkOutButn: {
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
    checkOutText: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 20.83,
        color: "#fff"
    },

})