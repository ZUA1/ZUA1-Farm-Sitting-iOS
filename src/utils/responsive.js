import {Dimensions, PixelRatio, NativeModules} from 'react-native';
const {width, height} = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
const widthToDp = number => {
  let givenwidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenwidth) / 100);
};
const heightToDp = number => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

export const getHeighInPercentage = num => {
  return (num / 100) * Dimensions.get('window').height;
};
const statusBarHeight = num => {
  let heigth = 0;
  StatusBarManager.getHeight(statusBarHeight => {
    heigth = statusBarHeight;
  });
  return height;
};
export {widthToDp, heightToDp, statusBarHeight};
