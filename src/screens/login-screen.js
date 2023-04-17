import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../assets/styles/colors'
import { TextInput } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.headingView} >
                    <TouchableOpacity style={styles.BackArrow}>
                        <AntDesign name="left" />
                    </TouchableOpacity>
                    <Image source={require("../assets/images/heading_logo.png")} style={styles.logoImage} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.headingText}> Sign In</Text>
                    <Text style={styles.text}>Stay signed with your account to make{'\n'}seaching easior</Text>
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        label="Your Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        mode="outlined"
                        style={styles.textInput}
                        activeOutlineColor={Colors.greenColor}
                        left={<TextInput.Icon icon="email-outline" />}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mode="outlined"
                        secureTextEntry
                        style={styles.textInput}
                        activeOutlineColor={Colors.greenColor}
                        right={<TextInput.Icon icon="eye" color={((isTextInputFocused = false) => Colors.gray | undefined) | Colors.greenColor} />} lock
                        left={<TextInput.Icon icon="lock" />}
                    />
                    <TouchableOpacity style={styles.forget}>
                        <Text style={styles.forgetText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.login}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dontAcc}>
                        <Text style={styles.forgetText}>{"Don’t have account?"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.login, { backgroundColor: Colors.redButton }]}>
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
    BackArrow: {
        position: 'absolute',
        borderWidth: 0.1,
        borderRadius: 100,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0
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
        width: '100%',
        height: 46,
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