import { StyleSheet } from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '../../../../../../../utils/responsiveSize';
import { color } from '../../../../../../../../assets/colorConstant';
import { font } from '../../../../../../../../assets/fonts/fontsConstant';

export const styles = StyleSheet.create({
    shopSection: {
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(24),
    },
    shopTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScaleVertical(24),
    },
    shopHeading: {
        color: color.BLACK,
        fontFamily: font.LatoBold,
        fontSize: textScale(18),
        lineHeight: moderateScaleVertical(24),
        textTransform: 'capitalize'
    },
    viewAllText: {
        color: color.BLACK,
        fontFamily: font.LatoRegular,
        fontWeight: '600',
        textAlign: 'right',
        fontSize: textScale(12),
        lineHeight: moderateScaleVertical(14),
        textTransform: 'capitalize'
    }
})
