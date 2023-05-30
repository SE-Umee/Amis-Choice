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
    const [searchData, setSearchData] = useState();
    const [sort, setSort] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState()
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
    }, [])

    const isBack = () => {
        if (isSearch) {
            setIsSearch(!isSearch)
        }
        else {
            navigation.goBack()
        }

    }

    const fetchSearch = async () => {
        let response = await fetch('http://192.168.18.86:3002/api/product/view', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: search })
        });
        let jsonResponse = await response.json();
        setSearchData(jsonResponse);
    };

    useEffect(() => {
        fetchSearch();
    }, [search]);

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={isSearch ? styles.topView : [styles.topView, { justifyContent: 'flex-start' }]}>
                    <TouchableOpacity style={styles.BackArrow} onPress={() => isBack()}>
                        <AntDesign name="left" />
                    </TouchableOpacity>
                    {!isSearch ?
                        <>
                            <View style={styles.topLeftView}>
                                <Text style={styles.categoryName}> {itemId ? product?.result?.title : "Categories"}</Text>
                            </View>
                            <View style={styles.topRightView}>
                                <TouchableOpacity style={styles.BackArrow}
                                    onPress={() => {
                                        setIsSearch(!isSearch)
                                        setSort(false)
                                        { }
                                    }}
                                >
                                    <AntDesign name="search1" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.BackArrow, { marginHorizontal: '3%' }]} onPress={() => setSort(!sort)}>
                                    <Image source={require("../components/icons/filterIcon.png")} height={20} width={20} />
                                </TouchableOpacity>
                                <HeaderCart />
                            </View>
                        </>
                        :
                        <View>
                            <TextInput
                                placeholder='Search Product'
                                placeholderTextColor={Colors.gray}
                                value={search}
                                onChangeText={setSearch}
                                style={styles.searchInput} />
                        </View>
                    }
                </View>
                {search ? <View style={styles.wholeItemsView}>
                    {searchData?.result?.rows.length > 0 ?
                        <FlatList
                            numColumns={2}
                            data={searchData.result.rows}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <BestSellingCard item={item} />
                                )
                            }}
                        />
                        :
                        <Text style={{ alignSelf: 'center', marginTop: hp("10%") }}>No Item Found</Text>
                    }
                </View> :
                    <View style={styles.wholeItemsView}>
                        {itemId ?
                            <FlatList
                                numColumns={2}
                                data={product.result?.products}
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
                }
                {sort ?
                    <View style={styles.sort}>
                        <TouchableOpacity style={styles.sortBtn} onPress={() => {
                            setProduct(product.sort((a, b) => a.price - b.price))
                            setSort(!sort)
                        }}>
                            <Text style={styles.sortText}>Low to Height Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sortBtn} onPress={() => {
                            setProduct(product.sort((a, b) => b.price - a.price))
                            setSort(!sort)
                        }}>
                            <Text style={styles.sortText}>Height to Low Price</Text>
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
    sort: {
        position: 'absolute',
        top: hp(8),
        right: wp(7),
        backgroundColor: "#fff",
        paddingVertical: hp(2),
        paddingHorizontal: wp(1),
        borderRadius: 7
    },
    sortBtn: {
        marginTop: hp(1),
    },
    sortText: {
        fontSize: hp(1.5),
        fontWeight: "700",
        color: Colors.contentText
    },
    searchInput: {
        backgroundColor: "#fff",
        width: wp(80),
        height: hp(5.9),
        marginLeft: wp(1.5),
        marginTop: hp(1),
        borderRadius: 100,
        paddingLeft: wp(3),
        alignSelf: 'flex-start'
    },
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