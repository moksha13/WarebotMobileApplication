
import { Dimensions } from 'react-native';

export const customScale = (size: number) => {
    const { width, height } = Dimensions.get('window');
    let refWidth;
    let refHeight;
    if (width >= height) {
        refWidth = 640;
        refHeight = 360;
    } else {
        refHeight = 640;
        refWidth = 360;
    }

    const scale =
        width * refHeight >= height * refWidth
            ? height / refHeight
            : width / refWidth;
    return size * scale;
};