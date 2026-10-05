import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import translations from '../../../../../../../assets/translations';
import AppImages from '../../../../../../../assets/images/AppImages';
import FastImage from '@d11/react-native-fast-image';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../utils/responsiveSize';
import {ActiveNominationsList} from '../../../../../../../services/models/pageantdetails/contestantPublicDetails';
import {ActivePcaEvent} from '../../../../../../../services/models/pca/activePcaEvent';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {NOMINATE_PROFILE} from '../../../../../../../services/endpoints';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../services/constants';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../../common/commonalert';
import {PageantPrize} from '../../../../../../../services/models/pageantdetails/pageantPublicProfile';
import {checkIsNull} from '../../../../../../utils/validations';

// New carousel import
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  pcaEventList: ActivePcaEvent[] | undefined;
  nominationList: ActiveNominationsList[] | undefined;
  prizeList: PageantPrize[] | undefined;
  publicProfileType: string;
  businessId: number | undefined;
  refetchAPI: any;
  showPrizes: boolean;
  voteMeButtonClicked: any;
}

interface Info {
  header?: string;
  buttonText: string;
  image: any;
}

interface PrizeInfo {
  title?: string;
  bgImage: any;
  prizeImage: any;
}

const BannerSlider = ({
  pcaEventList,
  nominationList,
  publicProfileType,
  businessId,
  refetchAPI,
  prizeList,
  showPrizes = false,
  voteMeButtonClicked,
}: Props) => {
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [bannerInfo, setBannerInfo] = useState<Info[]>([]);
  const [prizeInfo, setPrizeInfo] = useState<PrizeInfo[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [nominatedBody, setNominatedBody] = useState<any>();

  //API NOMINATE PROFILE ------------------------------------------------------ START
  const {mutateAsync: nominateProfileAPI} = useCgMutation({
    key: NOMINATE_PROFILE,
    url: NOMINATE_PROFILE,
    method: MethodTypes.Post,
    offSuccessToast: false,
    disableLoader: false,
    body: nominatedBody,
  });
  //API NOMINATE PROFILE ------------------------------------------------------- END

  const onPressNominateButton = (
    item: ActiveNominationsList,
    index: number,
  ) => {
    setLoader(true);
    const body = {
      nomination_id: item?.id,
      profile_type: publicProfileType,
      business_id: businessId,
    };
    setNominatedBody(body);

    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected ?? false);
      setLoader(false);
      return;
    }

    setTimeout(() => {
      nominateProfileAPI()
        .then(response => {
          if (
            response?.success &&
            response?.status_code === ApiStatusType.Success
          ) {
            return refetchAPI();
          }
        })
        .then(res => {
          if (res?.isSuccess) {
            setNominatedBody({});
          }
        })
        .finally(() => {
          setLoader(false);
        });
    }, 900);
  };

  useEffect(() => {
    if (pcaEventList?.length > 0) {
      for (let i = 0; i < pcaEventList.length; i++) {
        setBannerInfo(oldArray => [
          ...oldArray,
          {
            header: pcaEventList[i].people_award_name,
            buttonText: translations.VOTE_FOR_ME,
            image: AppImages.PUBLIC_PROFILE.VoteMeBanner,
          },
        ]);
      }
    }
    if (nominationList?.length > 0) {
      for (let i = 0; i < nominationList.length; i++) {
        setBannerInfo(oldArray => [
          ...oldArray,
          {
            header: nominationList[i].title,
            buttonText:
              nominationList[i].already_nominated === 0
                ? translations.NOMINATE
                : translations.NOMINATION_RECEIVED,
            image: AppImages.PUBLIC_PROFILE.BipBanner,
          },
        ]);
      }
    }
    if (prizeList?.length > 0) {
      for (let i = 0; i < prizeList.length; i++) {
        setPrizeInfo(oldArray => [
          ...oldArray,
          {
            title: prizeList[i].message,
            bgImage: AppImages.PUBLIC_PROFILE.PrizeBanner,
            prizeImage: prizeList[i].prize_thumb_image_path,
          },
        ]);
      }
    }
  }, [pcaEventList, nominationList, prizeList]);

  const onPressPCAButton = item => {
    voteMeButtonClicked(item);
  };

  const onButtonClick = (item: Info) => {
    let nominationIndex = 0;
    if (pcaEventList?.length > 0) {
      nominationIndex = activeSlideIndex - pcaEventList.length;
    } else {
      nominationIndex = activeSlideIndex;
    }
    if (item?.buttonText === translations.NOMINATE) {
      onPressNominateButton(nominationList![nominationIndex], nominationIndex);
    } else {
      onPressPCAButton(pcaEventList![activeSlideIndex]);
    }
  };

  const renderPrizeItem = ({item}) => {
    return (
      <View style={styles.carouselContainer}>
        <FastImage
          style={{
            width: prizeList?.length > 1 ? moderateScale(320) : width * 0.9,
            height: moderateScaleVertical(140),
          }}
          source={item?.bgImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.headerSection2}>
          <Text
            style={{
              ...styles.headerTitle,
              marginTop: moderateScaleVertical(2),
              width: prizeList?.length > 1 ? '64%' : '70%',
            }}
            numberOfLines={3}>
            {item.title}
          </Text>
          {checkIsNull(item?.prizeImage) ? (
            <Image
              style={{
                ...styles.prizeImage,
                marginRight: prizeList?.length === 1 ? moderateScale(-20) : 0,
              }}
              source={{uri: item?.prizeImage}}
            />
          ) : (
            <AppImages.PUBLIC_PROFILE.PrizeLogo
              style={styles.defaultPrizeImage}
              width={moderateScale(84)}
              aspectRatio={1}
            />
          )}
        </View>
      </View>
    );
  };

  const renderItemBIP = ({item}) => {
    return (
      <View style={styles.carouselContainer}>
        <FastImage
          style={{
            width:
              (pcaEventList?.length > 0 && nominationList?.length > 0) ||
              pcaEventList?.length > 1 ||
              nominationList?.length > 1
                ? moderateScale(320)
                : width * 0.9,
            height: moderateScaleVertical(140),
          }}
          source={item?.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.headerSection}>
          <View style={styles.header2}>
            <Text style={styles.headerTitle} numberOfLines={2}>
              {item?.buttonText === translations.NOMINATE ||
              item?.buttonText === translations.NOMINATION_RECEIVED
                ? translations.NOMINATE_FOR + item.header
                : item.header}
            </Text>
            {item?.buttonText === translations.NOMINATION_RECEIVED ? (
              <Text style={styles.messageText} numberOfLines={1}>
                {item?.buttonText}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => onButtonClick(item)}
                style={{
                  ...styles.actionButtonAreaStyles,
                  width:
                    item?.buttonText === translations.NOMINATE
                      ? moderateScale(110)
                      : moderateScale(122),
                }}>
                <Text style={styles.borderActionButton} numberOfLines={1}>
                  {item?.buttonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const data = showPrizes ? prizeInfo : bannerInfo;
  const hasMultipleItems = data.length > 1;

  return (
    <View style={styles.container}>
      {data.length > 0 && (
        <Carousel
          width={Dimensions.get('window').width}
          height={moderateScaleVertical(160)} // Adjust to fit your banner height
          data={data}
          renderItem={showPrizes ? renderPrizeItem : renderItemBIP}
          onSnapToItem={index => setActiveSlideIndex(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.92,
            parallaxScrollingOffset: 60,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          enabled={hasMultipleItems}
          // Auto-play approximation (reanimated-carousel doesn't have built-in autoplay)
          // You can add a useEffect + animateTo if you really need it
        />
      )}

      {/* Custom Pagination Dots - matches your original design */}
      {hasMultipleItems && (
        <View style={styles.paginationContainerStyle}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.activeDotStyle,
                index !== activeSlideIndex && styles.inactiveDotStyle,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default BannerSlider;