import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles/colors'
import BackButton from '../components/back-button'
import HeaderCart from '../components/header-cart'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'




const AllCategoryScreen = ({ route }) => {
    const { category } = route.params;
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <BackButton />
                    <Text style={styles.categoryName}>All Category </Text>
                    <HeaderCart />
                </View>
                <View style={styles.wholeItemsView}>
                    <FlatList
                        numColumns={3}
                        data={category.result.rows}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.bestSellingCard} onPress={() => navigation.navigate("CategoryItems", { itemId: item.id })}>
                                    <Image
                                        source={require("../components/icons/apple.png")}
                                    />
                                    <Text style={styles.bestSellingName}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>

        </View>
    )
}

export default AllCategoryScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topView: {
        flex: 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginTop: '2%'
    },
    categoryName: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 24.04,
        marginLeft: '5%',
        color: Colors.contentText
    },
    wholeItemsView: {
        flex: 0.93,
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    bestSellingCard: {
        backgroundColor: '#F3F5F7',
        height: hp("18%"),
        width: wp("22%"),
        borderRadius: 16,
        marginRight: '5%',
        marginBottom: '10%',
        paddingVertical: '2%',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    bestSellingName: {
        color: Colors.contentText,
        fontWeight: '700',
        fontSize: hp('2%'),
        lineHeight: 18.23,
        marginLeft: "5%",
        marginTop: '2%'
    },

})