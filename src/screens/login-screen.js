import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import { TextInput } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { fetchPost } from '../utils/fetch-api';
import { CartStore } from '../store/cart-store';
import BackButton from '../components/back-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = () => {
    const cartStore = CartStore.useContainer();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [showPassword, setshowPassword] = useState(true);




    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
    };

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


    const fetchUser = async () => {
        const data = await fetchPost("/client/login", JSON.stringify({
            email: email,
            password: password
        }))
        if (data.statusCode === 200) {
            cartStore.setUser(data)
            navigation.navigate("CheckOut")
        }
        else {
            Alert.alert("Email or Password are incorrect ")
        }

    };


    const forgetPassword = async () => {
        const data = await fetchPost("/client/forget-password", JSON.stringify({
            email: email,
        }))
        if (data.statusCode === 200) {
            navigation.navigate("ForgotPassword", { email })
        }
        else {
            Alert.alert("User Dose't exist")
        }

    };


    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.headingView} >
                    <BackButton />
                    <Image source={require("../assets/images/heading_logo.png")} style={styles.logoImage} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.headingText}> Sign In</Text>
                    <Text style={styles.text}>Stay signed with your account to make{'\n'}seaching easior</Text>
                </View>
                <View style={styles.textInputView}>
                    <View style={{
                        width: wp("80%"),
                        alignItems: 'center',
                    }}>
                        <TextInput
                            label="Your Email"
                            value={email}
                            onChangeText={text => {

                                setEmail(text)
                            }}
                            onFocus={() => emailValidation()}
                            mode="outlined"
                            style={styles.textInput}
                            activeOutlineColor={Colors.greenColor}
                            left={<TextInput.Icon icon="email-outline" />}
                        />
                        <View style={{
                            alignSelf: 'flex-start',
                            marginTop: hp(-1.2)
                        }}>
                            {
                                emailValidated ?
                                    <Text style={{ color: "red" }}>Invalid Email</Text>
                                    : <></>
                            }
                        </View>

                    </View>
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mode="outlined"
                        secureTextEntry={showPassword}
                        style={styles.textInput}
                        activeOutlineColor={Colors.greenColor}
                        right={<TextInput.Icon icon={showPassword ? "eye" : 'eye-off'} color={Colors.gray} onPress={togglePasswordVisibility} />}
                        left={<TextInput.Icon icon="lock" />}
                    />
                    <TouchableOpacity style={styles.forget} onPress={() => { forgetPassword() }}>
                        <Text style={styles.forgetText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>

                    <TouchableOpacity style={styles.login} onPress={() => {
                        fetchUser()
                    }}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dontAcc}>
                        <Text style={styles.forgetText}>{"Don’t have account?"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.login, { backgroundColor: Colors.redButton }]} onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.loginText}>Create An Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    headingView: {
        marginTop: "3%",
        marginLeft: "3%",
    },
    logoImage: {
        alignSelf: 'center',
        marginTop: "3%"
    },
    headingText: {
        fontSize: 25,
        fontWeight: '700',
        color: Colors.contentText,
        lineHeight: 36.46,
        paddingVertical: "5%"
    },
    textView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%'
    },
    textInput: {
        width: wp('80%'),
        marginVertical: '2%',

        borderRadius: 8,
        shadowColor: "#575C55",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    textInputView: {
        width: '78%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "space-between",

    },
    text: {
        textAlign: 'center',
        color: Colors.gray,
        marginBottom: '3%',
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20.83
    },
    forget: {

        alignSelf: 'flex-end',
        marginTop: '7%'
    },
    forgetText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20.83,
        color: Colors.gray,
    },
    buttonView: {
        width: '100%',
        alignItems: 'center',
        marginTop: '8%',

    },
    login: {
        height: "19%",
        width: "60%",
        paddingHorizontal: '2%',
        backgroundColor: Colors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    loginText: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '700'
    },
    dontAcc: {
        paddingVertical: '6%'
    },

})