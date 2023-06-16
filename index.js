/**
 * @format
 */

import { AppRegistry, Platform, UIManager } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import Toast from "react-native-root-toast";
// andoroid 开启布局动画
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}
AppRegistry.registerComponent(appName, () => App);
