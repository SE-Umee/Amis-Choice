/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainerRef } from '@react-navigation/native';

LogBox.ignoreAllLogs();

let navigationRef;

const setNavigationReference = (ref) => {
    navigationRef = ref;
}

const navigateToScreen = (id) => {
    {
        id == undefined ?
            navigationRef?.navigate("Home")
            :
            navigationRef?.navigate("CategoryItems", { itemId: id })
    };
}
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    const id = remoteMessage.data.id;
    navigateToScreen(id);
});


AppRegistry.registerComponent(appName, () => () => (
    <App navigationRef={setNavigationReference} />
));
