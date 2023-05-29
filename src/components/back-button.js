import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const BackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.BackArrow} onPress={() => navigation.goBack()}>
            <AntDesign name="left" />
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: hp("5.9%"),
        width: wp("11%"),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
})