import { StyleSheet } from 'react-native';
import { moderateScaleVertical, moderateScale, textScale } from '../../../../../../../utils/responsiveSize';
import { font } from '../../../../../../../../assets/fonts/fontsConstant'
import { color } from '../../../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../../../assets/commonStyles';
export const styles = StyleSheet.create({
    ticketContainer: {
        borderRadius: moderateScale(20),
        borderColor: "#D7D7D7",
        borderWidth: 1,
        flex: 1,
        padding: moderateScale(16),
        backgroundColor: color.WHITE,
    },
    ticketRow: {
        flexDirection: 'row',
    },
    ticketImage: {
        width: moderateScale(78),
        height: moderateScale(78),
        borderRadius: moderateScale(12),
        borderColor: color.S_GRAY_2,
        borderWidth: 1,
        overflow: "hidden",
    },
    textContainer: {
        flex: 1,
        marginLeft: moderateScale(8),
    },
    textStyle: {
        color: "#000",
        fontFamily: font.RobotoMedium,
        fontSize: textScale(14),
        fontStyle: 'normal',
        lineHeight: moderateScaleVertical(20),
        textTransform: 'capitalize',
    },
    textRow: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    feeText: {
        color: '#E6427A',
        fontFamily: font.RobotoMedium,
        fontSize: textScale(14),
        fontStyle: 'normal',
        lineHeight: moderateScaleVertical(20),
        textTransform: 'capitalize',
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#E6427A",
        borderWidth: 1,
        width: moderateScale(78),
        height: moderateScaleVertical(26),
        borderRadius: moderateScale(13),
    },
    addText: {
        color: "#000",
        fontFamily: font.RobotoMedium,
        fontSize: textScale(12),
        fontStyle: 'normal',
        lineHeight: moderateScaleVertical(16)
    },
    cartButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: color.S_GRAY_2,
    },
    errorMsgRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateScaleVertical(8)
    },
    errorMsg: {
        flexDirection: 'row'
    },
    unavailableTxt: {
        ...CommonStyles.tpp_s2,
        color: color.RED,
        marginStart: moderateScale(8),
        lineHeight: moderateScaleVertical(16)
    },
    inventoryTxt: {
        ...CommonStyles.tpp_s1,
        color: color.UPCOMING,
        marginStart: moderateScale(8),
    }
});