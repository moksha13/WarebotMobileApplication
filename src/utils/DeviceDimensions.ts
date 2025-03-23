import { Dimensions } from 'react-native'
export const { height, width } = Dimensions.get('window');
const guidLineBaseWidth = 350;
const guidLineBaseHeigth = 680;
const scale = size => width / guidLineBaseWidth * size;
const verticalScale = size => height / guidLineBaseHeigth * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
export { scale, verticalScale, moderateScale };