import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {reactotronRedux} from 'reactotron-redux';

const tron = Reactotron.configure({host: 'localhost'})
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .connect(); // let's connect!

export default tron;
