import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign"
import { CartStore } from '../store/cart-store'
import { useNavigation } from '@react-navigation/native'
import OrderHistoryScreen from './order-history-screen'
import BackButton from '../components/back-button'

const ProfileScreen = () => {
    const cartStore = CartStore.useContainer();
    const navigation = useNavigation();
    const [user, setUser] = useState("");

    const userProfile = async () => {
        let response = await fetch(`http://192.168.18.86:3002/api/client/profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cartStore.user.result.tokenInfo}`,
            },
        });
        let jsonResponse = await response.json();

        setUser(jsonResponse)

    }

    useEffect(() => {
        userProfile()
    }, [cartStore.user, navigation])



    const logOut = () => {
        cartStore.setUser({})
        setUser("")
        navigation.navigate("LogIn")
    }
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topIconView}>
                    <BackButton />
                    <Text style={styles.topHeadingText}>Account Details</Text>
                </View>
                <View style={styles.wholeItemsView}>
                    {Object.keys(cartStore.user).length > 0 ?
                        <View style={styles.userProfile}>
                            <Image source={{ uri: user?.result?.photoURL }} />
                        </View>
                        :
                        <Image source={require("../assets/images/account-inage.png")} />
                    }

                    {Object.keys(cartStore.user).length ?
                        <Text style={styles.userName}>{user?.result?.name}</Text>
                        :
                        <></>
                    }
                    <View style={{ marginTop: '4%' }}>
                        {Object.keys(cartStore.user).length ?
                            <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")}>
                                <Text style={[styles.userName, { color: Colors.greenColor, textDecorationLine: 'underline' }]}>Edit</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                                <Text style={[styles.userName, { color: Colors.greenColor, textDecorationLine: 'underline' }]}>Login</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={{ alignSelf: 'flex-start' }}>

                        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Order")}>
                            <Image source={require("../components/icons/shopping-bag.png")} />
                            <Text style={styles.buttonsText}>My Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} >
                            <Image source={require("../components/icons/help.png")} />
                            <Text style={styles.buttonsText}>Help and Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => logOut()}>
                            <Image source={require("../components/icons/logout.png")} />
                            <Text style={styles.buttonsText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ProfileScreen

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
    wholeItemsView: {
        flex: 0.93,
        alignItems: 'center',
        paddingTop: '8%'
    },
    userName: {
        color: Colors.contentText,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26.04,
        marginTop: '4%'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
        marginLeft: '5%'
    },
    buttonsText: {
        color: Colors.contentText,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20.83,
        color: Colors.contentText,
        marginLeft: '5%'
    },
    userProfile: {
        height: 91,
        width: 91,
        borderRadius: 100,
        backgroundColor: Colors.gray
    },
})