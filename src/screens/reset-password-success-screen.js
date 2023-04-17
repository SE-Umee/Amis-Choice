import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import { Colors } from '../assets/styles/colors';

const ResetPasswordSuccess = () => {
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
          <Text style={styles.headingText}>Reset Password</Text>
        </View>
        <View style={styles.circle}>
          <Entypo name="check" color="#fff" size={70} />
        </View>
        <Text style={styles.text}>Password successfully reset.{"\n"}Login in to your account.</Text>
        <TouchableOpacity style={styles.login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default ResetPasswordSuccess

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
    paddingVertical: "3%"
  },
  textView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '7%'
  },
  circle: {
    backgroundColor: Colors.greenColor,
    padding: '5%',
    alignSelf: 'center',
    borderRadius: 100
  },
  text: {
    textAlign: 'center',
    color: Colors.gray,
    marginBottom: '3%',
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20.83,
    marginTop: '7%'
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