import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/screens/home-screen';

const App = () => {
  return (
    <PaperProvider>
     <HomeScreen/>
    </PaperProvider>

  )
}

export default App