import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../assets/styles/colors'
import { TextInput } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/back-button';

const ResetPasswordScreen = ({ route }) => {
    const { otp, data } = route.params;
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {
        if (confirmPassword === password) {
            let response = await fetch('http://192.168.18.86:3002/api/client/change-forget-password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.result.tokenInfo}`,
                },
                body: JSON.stringify({
                    otp: otp,
                    password: password
                }),
            });
            let jsonResponse = await response.json();

            if (jsonResponse.statusCode === 200) {
                Alert.alert("Password Reset")
                navigation.navigate("LogIn")
            }
            else {
                Alert.alert("Try Again")
            }
        }
        else {
            Alert.alert("HELOO")
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
                    <Text style={styles.headingText}>Reset Password</Text>
                    <Text style={styles.text}>You can now set a new password</Text>
                </View>
                <View style={styles.textInputView}>
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
                    <TextInput
                        label="Conform Password"
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        mode="outlined"
                        secureTextEntry
                        style={styles.textInput}
                        activeOutlineColor={Colors.greenColor}
                        right={<TextInput.Icon icon="eye" color={((isTextInputFocused = false) => Colors.gray | undefined) | Colors.greenColor} />} lock
                        left={<TextInput.Icon icon="lock" />}
                    />
                </View>
                <TouchableOpacity style={styles.login} onPress={() => changePassword()}>
                    <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default ResetPasswordScreen

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
        width: '100%',
        // height: 46,
        marginVertical: '2%',
        borderRadius: 8,
        shadowColor: "#575C55",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        justifyContent: 'center',
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
    login: {
        marginHorizontal: '4%',
        marginVertical: '10%',
        paddingVertical: '3%',
        backgroundColor: Colors.greenColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    loginText: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '700'
    },

})