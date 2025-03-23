
import { StyleSheet } from "react-native";
import { customScale } from "./CustomScale";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    headingText: {
        alignSelf: 'center',
        color: 'black',
        fontFamily: 'Sen',
        fontWeight: '700',
        fontSize: customScale(30),
        paddingTop:customScale(100)
    },
    description: {
        color: 'black',
        alignSelf: 'center',
        fontSize: customScale(16),
        fontFamily: 'Sen',
        fontWeight: '400',
        paddingBottom:customScale(30)
    },
    inputContainer: {
        padding: customScale(20),
    },

    label: {
        fontFamily: 'Sen',
        fontSize: customScale(13),
        fontWeight: '400',
        lineHeight: 15.64,
        opacity: 1,
        color: 'black',
        paddingBottom: customScale(8), letterSpacing: 0.8,
    },
    inputField: {
        width: customScale(320),
        height: customScale(62),
        left: 0,
        fontFamily: 'Sen',
        fontSize: customScale(14),
        fontWeight: '400',
        textAlign: 'left',
        borderRadius: customScale(10),
        borderWidth: customScale(1),
        borderColor: '#d1d1d1',
        padding: customScale(10),
        color: '#000',
        backgroundColor: '#F0F5FA',
    },
    labelContainer: {
        marginBottom: customScale(20),

    },
    errorText: { color: 'red', paddingTop: customScale(5), letterSpacing: 0.8, },
    button: {
        width: customScale(320),
        height: customScale(62),
        backgroundColor: '#489f72',
        borderRadius: customScale(12),
        justifyContent: 'center'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: customScale(14),
        color: 'white',
        fontFamily: 'Sen',
        fontWeight: '700',
    },
    forgotPasswordContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: customScale(30)
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#E3EBF2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedText: {
        fontSize: customScale(13),
        color: '#7E8A97',
    },
    forgotText: {
        fontSize: customScale(14),
        color: '#FF7622',
        fontFamily: 'Sen',
        fontWeight: '400',
    },
    tickMark: {
        color: '#000', // White tick for better contrast
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingLeft: 1,
        paddingBottom: customScale(-2),
    },
    otpScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: customScale(320),
    },
    otpButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    otpTextStyle: {
        backgroundColor: '#F0F5FA',//'#fafafa',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2,
        marginTop: customScale(5),
        fontSize: customScale(17),
        paddingHorizontal: customScale(2),
        textAlign: 'center',
        fontFamily: 'Sen',
        width: customScale(62),
        height: customScale(62),
        color: '#000',
        borderRadius: customScale(10),
    },
});