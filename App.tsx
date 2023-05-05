import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home-screen';
import CategoryItemsScreen from './src/screens/category-items-screen';
import ItemDetailsScreen from './src/screens/item-details-screen';
import CartScreen from './src/screens/cart-screen';
import { CartStore } from './src/store/cart-store';
import LoginScreen from './src/screens/login-screen';
import SignupScreen from './src/screens/signup-screen';
import CheckOutScreen from './src/screens/check-out-screen';
import ForgotPasswordScreen from './src/screens/forgot-password-screen';
import PlaceOrderSuccessScreen from './src/screens/place-order-success-screen';


const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <PaperProvider>
      <CartStore.Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='CategoryItems' component={CategoryItemsScreen}/>
        <Stack.Screen name='ItemDetails' component={ItemDetailsScreen}/>
        <Stack.Screen name='Cart' component={CartScreen}/>
        <Stack.Screen name='LogIn' component={LoginScreen}/>
        <Stack.Screen name='SignUp' component={SignupScreen}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
        <Stack.Screen name='CheckOut' component={CheckOutScreen}/>
        <Stack.Screen name='OrderSuccess' component={PlaceOrderSuccessScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </CartStore.Provider>
    </PaperProvider>

  )
}

export default App