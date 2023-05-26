import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../assets/styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { CartStore } from '../store/cart-store';
import BestSellingCard from '../components/best-selling-card';
import { fetchPost } from "../utils/fetch-api"
import HeaderCart from '../components/header-cart';
import BackButton from '../components/back-button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CategoryItemsScreen = ({ route }) => {
    const itemId = route?.params?.itemId;
    const navigation = useNavigation();
    const cartStore = CartStore.useContainer();
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState([])
    const fetchProduct = async (id) => {

        if (!id) {
            let data = await fetchPost("/product/view")
            setProduct(data.result.rows);
        }
        else {
            let response = await fetch(`http://192.168.18.86:3002/api/product/category/view/${id}`);
            let data = await response.json();
            setProduct(data);
        }

    };
    useEffect(() => {
        fetchProduct(itemId)
    }, [navigation])


    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topView}>
                    <View style={styles.topLeftView}>
                        <BackButton />
                        {!isSearch ?
                            <Text style={styles.categoryName}> {itemId ? product?.result?.title : "Categories"}</Text>
                            :
                            <TextInput
                                placeholder='Search Product'
                                placeholderTextColor={Colors.gray}
                                value={search}
                                onChangeText={setSearch}
                                style={styles.searchInput}
                            />
                        }
                    </View>
                    <View style={styles.topRightView}>
                        <TouchableOpacity style={styles.BackArrow} onPress={() => setIsSearch(!isSearch)}>
                            <AntDesign name="search1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.BackArrow, { marginHorizontal: '3%' }]} onPress={() => setFilter(!filter)}>
                            <Image source={require("../components/icons/filterIcon.png")} height={20} width={20} />
                        </TouchableOpacity>
                        <HeaderCart />
                    </View>
                </View>
                <View style={styles.wholeItemsView}>
                    {itemId ?
                        <FlatList
                            numColumns={2}
                            data={product?.result?.products}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <BestSellingCard item={item} />
                                )
                            }}
                        />
                        :
                        <View style={{ marginBottom: '20%', }}>
                            <FlatList
                                numColumns={2}
                                data={product}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <BestSellingCard item={item} />
                                    )
                                }}
                            />
                        </View>
                    }
                </View>
                {filter ?
                    <View style={styles.filters}>
                        <TouchableOpacity style={styles.filtersBtn}>
                            <Text style={styles.filtersText}>Low to Height Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filtersBtn}>
                            <Text style={styles.filtersText}>Height to Low Price</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
                }
            </SafeAreaView>

        </View>
    )
}

export default CategoryItemsScreen

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
        marginTop: hp(1)
    },
    topLeftView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    BackArrow: {
        borderWidth: 0.1,
        borderRadius: 100,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F1F1F5"
    },
    categoryName: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 24.04,
        marginLeft: '5%',
        color: Colors.contentText
    },
    topRightView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    wholeItemsView: {
        flex: 0.93,
        paddingHorizontal: '8%',
        marginTop: '4%'
    },
    filters: {
        position: 'absolute',
        top: hp(7),
        right: wp(7),
        backgroundColor: "#fff",
        paddingVertical: hp(2),
        paddingHorizontal: wp(1),
        borderRadius: 7
    },
    filtersBtn: {
        marginTop: hp(1),
    },
    filtersText: {
        fontSize: hp(1.5),
        fontWeight: "700",
        color: Colors.contentText
    },
    searchInput: {
        backgroundColor: "#fff",
        width: wp(44),
        marginLeft: wp(1.5),
        marginTop: hp(1),
        borderRadius: 100,
        paddingLeft: wp(3),
    },

})