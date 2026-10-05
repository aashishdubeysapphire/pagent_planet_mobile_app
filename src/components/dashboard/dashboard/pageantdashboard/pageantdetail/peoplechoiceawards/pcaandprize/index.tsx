import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {AgeDivision} from '../../../../../../../services/models/pageantdetails/ageDivision';
import SwitchButton from '../../../../../../common/switchbutton';
import translations from '../../../../../../../assets/translations';
import DynamicTabs, {TAB_KEYS} from '../../../../../../common/dynamictabs';
import {color} from '../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../assets/images/AppImages';
import EventPCA from './eventpca';
import EventPrizes from './eventprizes';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KNOW_MORE_LINK} from '../../../../../../../services/staticWebUrl';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {
  emptyFunction,
  openWebLink,
} from '../../../../../../utils/helperFunction';

interface Props {
  eventTitle?: string;
  eventId?: number;
  ageDivisionList: AgeDivision[];
  callAgeDivisionAPI: any;
  isPlanActive: boolean;
}

const PeopleChoiceAndPrize = ({
  eventTitle,
  eventId,
  ageDivisionList,
  isPlanActive,
}: Props) => {
  const [ageDivisionIndex, setAgeDivisionIndex] = useState(0);
  const [PCAButtonClicked, setPCAButtonClicked] = useState(true);
  const [perVotePrice, setPerVotePrice] = useState(0);
  const [pcaState, setPCAState] = useState(translations.INACTIVE);
  const [isPromotionApplied, setPromotionApply] = useState(false);
  const [oneWinnerForAll, setOneWinnerForAll] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const navigation = useNavigation();

  const renderScenePCA = (route: any, index: number) => {
    return (
      <EventPCA
        eventId={eventId}
        ageId={
          ageDivisionList !== undefined &&
          ageDivisionList.length > 0 &&
          route.key !== undefined &&
          ageDivisionList[Number(route.key)]?.id !== undefined
            ? route.key === TAB_KEYS.ALL
              ? ''
              : ageDivisionList[Number(route.key)].id + ''
            : ''
        }
        setPerVotePrice={setPerVotePrice}
        setPCAState={setPCAState}
        setPromotionApply={setPromotionApply}
        setOneWinnerForAll={setOneWinnerForAll}
        setTotalVotes={setTotalVotes}
      />
    );
  };

  const onLeftButtonClicked = () => {
    if (!PCAButtonClicked) {
      setAgeDivisionIndex(0);
      setPCAButtonClicked(!PCAButtonClicked);
    }
  };

  const onRightButtonClicked = () => {
    if (PCAButtonClicked) {
      setAgeDivisionIndex(0);
      setPCAButtonClicked(!PCAButtonClicked);
    }
  };

  const knowMoreButtonClicked = () => {
    openWebLink(KNOW_MORE_LINK);
  };

  return (
    <View
      style={{
        ...styles.container,
        marginTop: isPlanActive ? 0 : moderateScaleVertical(-28),
      }}>
      <View style={styles.pcaSetupSection}>
        <FastImage
          style={styles.bgImage}
          source={AppImages.PCA.PCA_BG_Icon}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.setupArea}>
          <Text style={styles.eventLabel}>{translations.SETUP_PCA}</Text>
          <TouchableOpacity
            style={styles.knowMoreButton}
            onPress={() => knowMoreButtonClicked()}>
            <Text style={styles.knowMoreLabel}>{translations.KNOW_MORE}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SwitchButton
        leftLabel={translations.PCA}
        rightLabel={translations.PRIZES}
        isLeftButtonActive={PCAButtonClicked}
        onLeftTabClicked={()=> onLeftButtonClicked()}
        onRightTabClicked={()=> onRightButtonClicked()}
      />
      {PCAButtonClicked ? (
        <>
          <View style={styles.subContainer}>
            {pcaState !== '' && (
              <View style={styles.activeArea}>
                <View
                  style={{
                    ...styles.activeView,
                    borderColor:
                      pcaState === translations.ACTIVE
                        ? color.UPCOMING
                        : color.S_GRAY_3,
                  }}>
                  <Text
                    style={{
                      ...styles.activeLabel,
                      color:
                        pcaState === translations.ACTIVE
                          ? color.UPCOMING
                          : color.S_GRAY_3,
                    }}>
                    {pcaState}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(SCREEN.PCA_FORM, {eventId: eventId})
                  }>
                  <AppImages.Dashboard.edit_ICON />
                </TouchableOpacity>
              </View>
            )}
            <Text style={{...styles.eventLabel, color: color.P_PINK}}>
              {eventTitle}
            </Text>
            <View style={styles.voteSection}>
              <Text style={{...styles.eventLabel, color: color.BLACK}}>
                {translations.VOTE_LIST}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.perVotePriceLabel}>
                  {translations.PER_VOTE_PRICE}
                </Text>
                {isPromotionApplied && (
                  <Text
                    style={{
                      ...styles.perVotePriceLabel,
                      textDecorationLine: 'line-through',
                    }}>
                    {' $' + perVotePrice?.toFixed(2)}
                  </Text>
                )}
                <Text style={styles.perVotePriceLabel}>
                  {perVotePrice === null
                    ? ' $0.00'
                    : isPromotionApplied
                    ? ' $' + (perVotePrice / 2)?.toFixed(2)
                    : ' $' + perVotePrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          {ageDivisionList !== undefined &&
          ageDivisionList?.length > 0 && 
          pcaState !== '' ? (
            <DynamicTabs
              tabScreen={renderScenePCA}
              ageDivisionList={ageDivisionList}
              isAllTabRequired
              onlyAllTabRequired={oneWinnerForAll}
              customStyles={{marginLeft: moderateScale(16)}}
              customStylesForContainer={{
                marginLeft: moderateScale(0),
                height:
                  totalVotes > 0
                    ? height
                    : height / 2.2,
              }}
              indexChanged={emptyFunction}
            />
          ) : (
            renderScenePCA(-1, -1)
          )}
        </>
      ) : (
        <EventPrizes eventId={eventId} />
      )}
    </View>
  );
};

export default PeopleChoiceAndPrize;
