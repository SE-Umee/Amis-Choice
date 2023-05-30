/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();


AppRegistry.registerComponent(appName, () => App);
