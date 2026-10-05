import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  votesArea: {
    marginTop: moderateScaleVertical(24),
    width: '100%',
  },
  contestantList: {
    width: '100%',
    paddingVertical: moderateScaleVertical(12),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
  },
  staticHeight: {
    height: moderateScaleVertical(100),
  },
  container: {
    flex: 1,
  },
  totalVotesLabel: {
    ...CommonStyles.tpp_s1,
    justifyContent: 'center',
    lineHeight: moderateScaleVertical(12),
    color: color.S_GRAY_4,
  },
  emptyState: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(24),
  },
  voteSection: {
    borderWidth: 1,
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2 - moderateScale(24),
    marginRight: moderateScale(16),
  },
  totalCountLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(4),
  },
  awardWinnerArea: {
    width: '100%',
    height: moderateScaleVertical(107),
  },
  awardWinnerLabel: {
    position: 'absolute',
    marginLeft: moderateScale(16),
    justifyContent: 'center',
    height: moderateScaleVertical(107),
  },
  promotionVotesArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(24),
  },
  promotionalLabel: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
  },
  votesValueLabel: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    fontWeight: '400',
  },
  flatListView: {
    marginTop: moderateScale(24),
    flex: 1,
  },
  contestantNameLabel: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(15),
    width: '28%',
    paddingRight: moderateScale(24),
  },
  voteListContainer: {
    flexDirection: 'row',
  },
  marginForVotes: {
    marginLeft: moderateScale(8),
    paddingRight: moderateScale(24),
  },
});
