import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from './src/assets/styles/colors';
import HomeScreen from './src/screens/home-screen';
import { Provider as PaperProvider } from 'react-native-paper';
import { CartStore } from './src/store/cart-store';
import CategoryItemsScreen from './src/screens/category-items-screen';
import ProfileScreen from './src/screens/profile-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetailsScreen from './src/screens/item-details-screen';
import CartScreen from './src/screens/cart-screen';
import LoginScreen from './src/screens/login-screen';
import SignupScreen from './src/screens/signup-screen';
import ForgotPasswordScreen from './src/screens/forgot-password-screen';
import CheckOutScreen from './src/screens/check-out-screen';
import PlaceOrderSuccessScreen from './src/screens/place-order-success-screen';
import ResetPasswordScreen from './src/screens/reset-password-screen';
import OrderHistoryScreen from './src/screens/order-history-screen';
import MyOrderScreen from './src/screens/my-order-screen';
import UpdateProfileScreen from './src/screens/update-profile-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllCategoryScreen from './src/screens/all-category-screen';

const Stack = createNativeStackNavigator();



const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Bottom' component={BottomBar} />
      <Stack.Screen name='AllCategory' component={AllCategoryScreen} />
      <Stack.Screen name='CategoryItems' component={CategoryItemsScreen} />
      <Stack.Screen name='ItemDetails' component={ItemDetailsScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='LogIn' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='CheckOut' component={CheckOutScreen} />
      <Stack.Screen name='OrderSuccess' component={PlaceOrderSuccessScreen} />
      <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
    ;
};

const Cart = () => {
  return <View style={styles.container} >
    <CartScreen />
  </View>
    ;
};

const _renderIcon = (routeName, selectedTab) => {
  let icon = '';

  switch (routeName) {
    case 'Home':
      icon = require('./src/components/icons/homeIcon.png');
      break;
    case 'Category':
      icon = require('./src/components/icons/category_icon.png');
      break;
    case 'Order':
      icon = require('./src/components/icons/orderIcon.png');
      break;
    case 'Account':
      icon = require('./src/components/icons/profile_icon.png');
      break;
  }

  return (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: routeName === selectedTab ? Colors.greenColor : '#DBDBDB',
      }}
    />
  );
};
const renderTabBar = ({ routeName, selectedTab, navigate }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}
    >
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};



const BottomBar = () => {
  // const cartStore = CartStore.useContainer();
  const [cart, setCart] = useState(0);

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(Cart)}
          >
            <Image source={require("./src/components/icons/cart-icon.png")} />
            {/* <View style={{
              height: 25,
              width: 25,
              backgroundColor: "red",
              borderRadius: 100,
              position: 'absolute',
              top: 8,
              left: 28,
              borderWidth: 2,
              borderColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: '#fff' }}>{cart}</Text>
            </View> */}
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={() => <HomeScreen />}
        options={({ route }) => ({
          tabBarVisible: route.state && route.state.index == 0 ? true : false,
        })}
      />
      <CurvedBottomBar.Screen
        name="Category"
        position="LEFT"
        component={() => <Category />}
      />
      <CurvedBottomBar.Screen
        name="Order"
        component={() => <Order />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="Account"
        component={() => <Profile />}
        position="RIGHT"
      />

    </CurvedBottomBar.Navigator>
  )
}

const Category = () => {
  return <View style={styles.container}>
    <CategoryItemsScreen />
  </View>;
};

const Order = () => {
  return <View style={styles.container}>
    <OrderHistoryScreen />
  </View>
    ;
};

const Profile = () => {
  return <View style={styles.container} >
    <ProfileScreen />
  </View>
    ;
};

export default function App({ navigationRef }) {
  return (
    <PaperProvider>
      <CartStore.Provider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='stack' component={Home} />
            <Stack.Screen name='MyOrder' component={MyOrderScreen} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfileScreen} />
            <Stack.Screen name='Order' component={OrderHistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartStore.Provider>
    </PaperProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    // height: 10,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greenColor,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});
