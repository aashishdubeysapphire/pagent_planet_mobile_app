import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import translations from '../../../../../../../assets/translations';
import AppImages from '../../../../../../../assets/images/AppImages';
import FastImage from '@d11/react-native-fast-image';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
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
import {emptyFunction} from '../../../../../../utils/helperFunction';

// New carousel import
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  pcaEventList?: ActivePcaEvent[];
  nominationList?: ActiveNominationsList[];
  publicProfileType: string;
  businessId?: number;
  refetchAPI: any;
  voteNowButtonClicked: any;
  entryFeeList?: any[];
  ticketList?: any[];
  onPressClickToComplete?: (item: any) => void;
  onPressGetYourTicket?: (item: any) => void;
}

interface Info {
  header?: string;
  buttonText: string;
  image: any;
  [key: string]: any; // for extra event data like id, title
}

const Banners = ({
  pcaEventList = [],
  nominationList = [],
  publicProfileType,
  businessId,
  refetchAPI,
  voteNowButtonClicked,
  entryFeeList = [],
  ticketList = [],
  onPressClickToComplete = emptyFunction,
  onPressGetYourTicket = emptyFunction,
}: Props) => {
  const [bannerInfo, setBannerInfo] = useState<Info[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [nominatedBody, setNominatedBody] = useState<any>();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();

  const width = Dimensions.get('window').width;

  //API NOMINATE PROFILE ------------------------------------------------------ START
  const {mutateAsync: callNominateProfileAPI} = useCgMutation({
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
      business_id: businessId,
      profile_type: publicProfileType,
    };
    setNominatedBody(body);

    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected ?? false);
      setLoader(false);
      return;
    }

    setTimeout(() => {
      callNominateProfileAPI()
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
    }, 800);
  };

  useEffect(() => {
    setBannerInfo([]); // Clear previous data to avoid duplicates

    // Entry Fee Banners
    entryFeeList.forEach(i => {
      setBannerInfo(old => [
        ...old,
        {
          header:
            translations.COMPLETE_FOR_THE_TITLE_OF + i?.product?.event?.title,
          buttonText: translations.CLICK_TO_COMPLETE,
          image: AppImages.PUBLIC_PROFILE.entryFeeBanner,
          ...i?.product?.event,
        },
      ]);
    });

    // Ticket Banners
    ticketList.forEach(i => {
      setBannerInfo(old => [
        ...old,
        {
          header:
            translations.GET_YOUR_TICKET_TO_ATTEND + i?.product?.event?.title,
          buttonText: translations.GET_YOUR_TICKETS,
          image: AppImages.PUBLIC_PROFILE.ticketsBanner,
          ...i?.product?.event,
        },
      ]);
    });

    // PCA (Vote Now) Banners
    pcaEventList.forEach(i => {
      setBannerInfo(old => [
        ...old,
        {
          header: translations.VOTING_FOR + i.title + translations.IS_ACTIVE,
          buttonText: translations.VOTE_NOW,
          image: AppImages.PUBLIC_PROFILE.PcaBanner,
          id: i?.id,
          title: i?.title,
        },
      ]);
    });

    // Nomination Banners
    nominationList.forEach(i => {
      setBannerInfo(old => [
        ...old,
        {
          header: i.title,
          buttonText:
            i.already_nominated === 0
              ? translations.NOMINATE
              : translations.NOMINATION_RECEIVED,
          image: AppImages.PUBLIC_PROFILE.NominateBanner,
        },
      ]);
    });
  }, [pcaEventList, nominationList, entryFeeList, ticketList]);

  const onPressPCAButton = (item: any) => {
    voteNowButtonClicked(item);
  };

  const onButtonClick = (item: Info) => {
    if (item?.buttonText === translations.NOMINATE) {
      // Find the correct nomination item
      const nominationStartIndex =
        entryFeeList.length + ticketList.length + pcaEventList.length;
      const nominationItem =
        nominationList[activeSlideIndex - nominationStartIndex];
      onPressNominateButton(
        nominationItem,
        activeSlideIndex - nominationStartIndex,
      );
    } else if (item?.buttonText === translations.CLICK_TO_COMPLETE) {
      onPressClickToComplete(item);
    } else if (item?.buttonText === translations.GET_YOUR_TICKETS) {
      onPressGetYourTicket(item);
    } else {
      // VOTE_NOW - pass the current banner info (which includes id/title)
      onPressPCAButton(bannerInfo[activeSlideIndex]);
    }
  };

  const areMultipleBanners = bannerInfo.length > 1;

  const _renderItem = ({item}: {item: Info}) => {
    return (
      <View style={styles.carouselContainer}>
        <FastImage
          style={{
            width: areMultipleBanners ? moderateScale(320) : moderateScale(340),
            height: moderateScaleVertical(134),
          }}
          source={item?.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.headerSection}>
          <View style={styles.header2}>
            <Text style={styles.headerTitle} numberOfLines={3}>
              {item?.buttonText === translations.NOMINATE ||
              item?.buttonText === translations.NOMINATION_RECEIVED
                ? translations.NOMINATE_FOR + item.header
                : item.header}
            </Text>
            {item?.buttonText === translations.NOMINATION_RECEIVED ? (
              <Text style={styles.messageLabel} numberOfLines={1}>
                {item?.buttonText}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => onButtonClick(item)}
                style={styles.buttonAreaStyles}>
                <Text style={styles.borderButtonText} numberOfLines={1}>
                  {item?.buttonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {bannerInfo.length > 0 && (
        <Carousel
          width={width}
          height={moderateScaleVertical(150)} // Adjust to fit your banner + overlay
          data={bannerInfo}
          renderItem={_renderItem}
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
          enabled={areMultipleBanners}
          autoPlay={false} // Your original had autoplay={false}
        />
      )}

      {/* Custom Pagination Dots - matches your original styles */}
      {areMultipleBanners && (
        <View style={styles.dotContainerStyle}>
          {bannerInfo.map((_, index) => (
            <View
              key={index}
              style={[
                styles.activeDotBanner,
                index !== activeSlideIndex && styles.inactiveDotBanner,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Banners;
