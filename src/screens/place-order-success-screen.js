import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles/colors'
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/back-button';

const PlaceOrderSuccessScreen = ({ route }) => {
  const { address, phone } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{
          marginHorizontal: '5%',
          marginTop: '2%'
        }}>
          <BackButton />
        </View>
        <View style={styles.innerMainContainer}>
          <View style={styles.circle}>
            <Entypo name="check" color="#fff" size={70} />
          </View>
          <Text style={styles.successText}>Success</Text>
          <Text style={styles.descriptionText}>Your order has been places successfully{`\n`}and you will recieve it soon.</Text>
          <View style={styles.orderCard}>
            <View style={styles.innerOrderCard}>
              <Text style={styles.cardText}>Order number # :</Text>
              <Text style={styles.cardText}>12432576</Text>
            </View>
            <View style={styles.innerOrderCard}>
              <Text style={styles.cardText}>Address :</Text>
              <Text style={styles.cardText}>{address}</Text>
            </View>
            <View style={styles.innerOrderCard}>
              <Text style={styles.cardText}>Phone: :</Text>
              <Text style={styles.cardText}>{phone}</Text>
            </View>
          </View>

          <Text style={styles.descriptionText}>If u have any query please feel free to  </Text>
          <TouchableOpacity>
            <Text style={styles.contactUsText}>
              contact us
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.BackToHomeBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.BackToHomeBtnText}> Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default PlaceOrderSuccessScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,

  },
  innerMainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '7%',
    marginTop: '10%'
  },
  circle: {
    height: 95,
    width: 95,
    backgroundColor: Colors.greenColor,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  successText: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26.04,
    color: Colors.greenColor,
    marginVertical: '4%'
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18.23,
    color: "#575C55",
    textAlign: 'center'
  },
  orderCard: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: '5%',
    marginVertical: '5%'
  },
  innerOrderCard: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18.23,
    color: Colors.textColor,
    marginTop: '4%'
  },
  contactUsText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18.23,
    color: Colors.greenColor,
    textDecorationLine: "underline"
  },
  BackToHomeBtn: {
    backgroundColor: Colors.greenColor,
    paddingVertical: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    borderRadius: 100,
    marginHorizontal: '5%'
  },
  BackToHomeBtnText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20.83,
    color: "#fff"
  },
})