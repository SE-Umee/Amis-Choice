import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { fetchPost } from '../utils/fetch-api';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/back-button';

const ForgotPasswordScreen = ({ route }) => {
    const { email } = route.params;
    const navigation = useNavigation();
    const [firstDigit, setFirstDigit] = useState("");
    const [secondDigit, setSecondDigit] = useState("");
    const [thirdDigit, setThirdDigit] = useState("");
    const [fourthDigit, setFourthDigit] = useState("");
    const [fifthDigit, setFifthDigit] = useState("");
    const [sixthDigit, setSixthDigit] = useState("");
    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();

    const handleInputChange = (value, inputRef) => {
        if (value.length === 1 && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const fetchOTP = async () => {
        var OTP = firstDigit.concat("", secondDigit, thirdDigit, fourthDigit, fifthDigit, sixthDigit)
        const data = await fetchPost("/client/verify-forget-password", JSON.stringify({
            email: email,
            otp: OTP
        }))
        if (data.statusCode === 200) {
            fetchUser(email, OTP)
        }
        else {
            Alert.alert("Hello")
        }

    };


    const fetchUser = async (email, otp) => {
        const data = await fetchPost("/client/verify-forget-password", JSON.stringify({
            email: email,
            otp: otp
        }))

        navigation.navigate("ResetPassword", { otp, data })
    };



    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.headingView} >
                    <BackButton />
                    <Image source={require("../assets/images/heading_logo.png")} style={styles.logoImage} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.headingText}>Forgot Password</Text>
                    <Text style={styles.text}>Please enter the 4 digital code {"\n"} <Text style={styles.signInText}>I didn’t receive a code (0:09) </Text></Text>
                </View>
                <View style={styles.otpInputView}>
                    <TextInput
                        style={styles.input}
                        value={firstDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={input1Ref}
                        onChangeText={(value) => {
                            setFirstDigit(value)
                            handleInputChange(value, input2Ref)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        value={secondDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={input2Ref}
                        onChangeText={(value) => {
                            setSecondDigit(value)
                            handleInputChange(value, input3Ref)
                        }}

                    />
                    <TextInput
                        style={styles.input}
                        value={thirdDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={input3Ref}
                        onChangeText={(value) => {
                            setThirdDigit(value)
                            handleInputChange(value, input4Ref)
                        }}

                    />
                    <TextInput
                        style={styles.input}
                        value={fourthDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(value) => {
                            setFourthDigit(value)
                            handleInputChange(value, input5Ref)
                        }}
                        ref={input4Ref}
                    />
                    <TextInput
                        style={styles.input}
                        value={fifthDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={input5Ref}
                        onChangeText={(value) => {
                            setFifthDigit(value)
                            handleInputChange(value, input6Ref)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSixthDigit}
                        value={sixthDigit}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={input6Ref}
                    />
                </View>
                <TouchableOpacity style={styles.resendOpt}>
                    <Text style={[styles.text, styles.resendText]}>Resend Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login} onPress={() => fetchOTP()}>
                    <Text style={styles.loginText}>verify</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default ForgotPasswordScreen

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
        paddingVertical: "3%"
    },
    textView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '7%'
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
        marginVertical: '4%',
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
    signInText: {
        textDecorationLine: "underline",
        lineHeight: 21.79
    },
    otpInputView: {
        width: "100%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignSelf: 'center'
    },
    input: {
        width: "10%",
        borderBottomWidth: 2,
        textAlign: "center",
        fontSize: 20
    },
    resendOpt: {
        marginTop: "8%",
        width: '28%',
        height: '4%',
        alignSelf: 'center'
    },
    resendText: {
        textDecorationLine: "underline",
    },
})