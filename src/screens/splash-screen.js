import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <Image source={require("../assets/images/splash_logo.png")} />

        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: " #EBEBEB"
    }
})