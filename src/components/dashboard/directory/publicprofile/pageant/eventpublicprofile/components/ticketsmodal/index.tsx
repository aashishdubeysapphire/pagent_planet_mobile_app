import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomModal from '../../../../../../../common/bottommodal';
import {
  emptyFunction,
  hapticFeedBack,
} from '../../../../../../../utils/helperFunction';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import TicketsShimmer from '../ticketsshimmer';
import TicketListItem from '../ticketslistitem';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {MethodTypes, Param} from '../../../../../../../../services/constants';
import {GET_PAGEANT_TICKET_TYPE_PRODUCTS} from '../../../../../../../../services/endpoints';
import {TICKET_DATA} from '../../../../../../../utils/enum';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';
import CustomToast from '../../../../../../../common/toast';
import {color} from '../../../../../../../../assets/colorConstant';

const TicketsModal = ({
  isModalVisible = true,
  setIsModalVisible = emptyFunction,
  closeModel = emptyFunction,
  isClickToCompleteActive,
  isTicketActive,
  selectedBannerdata,
  profileId,
  isPageant,
}) => {
  const [totalCount, setTotalCount] = useState(0);
  const navigation = useNavigation();
  const [ticketDetail, setTicketDetail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    !isFocused && setTicketDetail('');
    isFocused && getHitTicketDetails();
  }, [isFocused]);

  const getHitTicketDetails = async (loader = true) => {
    loader && setIsLoading(true);
    try {
      let getdata = await getTicketDetails();
      setTicketDetail(getdata.data);
      let getTotalTickets = 0;
      getdata?.data?.forEach(element => {
        getTotalTickets = getTotalTickets + element?.cart_quantity;
      });
      setTotalCount(getTotalTickets);
      loader && setIsLoading(false);
    } catch {
      loader && setIsLoading(false);
    }
  };

  const getUrl = () => {
    let localUrl = '';
    if (isClickToCompleteActive == true) {
      localUrl =
        GET_PAGEANT_TICKET_TYPE_PRODUCTS +
        Param.TICKET_PAGEANT_ID +
        `${selectedBannerdata?.id}` +
        Param.TICKET_ROLE_ID +
        TICKET_DATA.TICKET_ROLE_ID +
        Param.TICKET_TYPE +
        TICKET_DATA.TICKET_TYPE_ENTRY +
        Param.TICKET_CATEGORY +
        TICKET_DATA.TICKET_CATEGORY;
    } else if (isTicketActive == true) {
      localUrl =
        GET_PAGEANT_TICKET_TYPE_PRODUCTS +
        Param.TICKET_PAGEANT_ID +
        `${selectedBannerdata?.id}` +
        Param.TICKET_ROLE_ID +
        TICKET_DATA.TICKET_ROLE_ID +
        Param.TICKET_TYPE +
        TICKET_DATA.TICKET_TYPE +
        Param.TICKET_CATEGORY +
        TICKET_DATA.TICKET_CATEGORY;
    }
    return localUrl;
  };

  const getPageantUrl = () => {
    let localUrl = '';
    if (isClickToCompleteActive == true) {
      localUrl =
        GET_PAGEANT_TICKET_TYPE_PRODUCTS +
        Param.TICKET_PROFILE_ID +
        `${profileId}` +
        Param.TICKET_ROLE_ID +
        TICKET_DATA.TICKET_ROLE_ID +
        Param.TICKET_TYPE +
        TICKET_DATA.TICKET_TYPE_ENTRY +
        Param.TICKET_CATEGORY +
        TICKET_DATA.TICKET_CATEGORY;
    } else if (isTicketActive == true) {
      localUrl =
        GET_PAGEANT_TICKET_TYPE_PRODUCTS +
        Param.TICKET_PROFILE_ID +
        `${profileId}` +
        Param.TICKET_ROLE_ID +
        TICKET_DATA.TICKET_ROLE_ID +
        Param.TICKET_TYPE +
        TICKET_DATA.TICKET_TYPE +
        Param.TICKET_CATEGORY +
        TICKET_DATA.TICKET_CATEGORY;
    }
    return localUrl;
  };

  //api imlementation here
  const {mutateAsync: getTicketDetails} = useCgMutation({
    key: isPageant ? getPageantUrl() : getUrl(),
    method: MethodTypes.GET,
    url: isPageant ? getPageantUrl() : getUrl(),
    offSuccessToast: true,
  });

  const onPressGoTOCart = () => {
    if (totalCount == 0) {
      return;
    }
    hapticFeedBack();
    closeModel();
    setTimeout(() => {
      navigation.navigate(SCREEN.SHOPPING_BAG);
    }, 300);
  };
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}>
      <CustomToast />
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: moderateScaleVertical(16), flex: 1}}>
          <View style={styles.headingView}>
            <Text style={styles.modalHeading}>
              {isTicketActive
                ? translations.EVENT_TICKETS
                : translations.EVENT_ENTRY_FEE}
            </Text>
            <TouchableOpacity style={styles.crossIcon} onPress={closeModel}>
              <AppImages.ProfileImage.Tpp_cross_icon />
            </TouchableOpacity>
          </View>
          <Text style={styles.PrimePageantsText}>
            {selectedBannerdata?.title}
          </Text>
          {isLoading ? (
            <TicketsShimmer />
          ) : (
            <FlatList
              data={ticketDetail}
              renderItem={({item}) => {
                return (
                  <View>
                    <TicketListItem
                      totalCount={totalCount}
                      setTotalCount={setTotalCount}
                      info={item}
                      getHitTicketDetails={getHitTicketDetails}
                      setIsModalVisible={setIsModalVisible}
                    />
                  </View>
                );
              }}
            />
          )}
        </View>

        {!isLoading && (
          <View style={styles.bottomContainer}>
            <View style={styles.addTicketContainer}>
              {totalCount == 0 ? (
                <Text style={styles.addTicketText}>
                  {translations.ADD_YOUR_TICKET}
                </Text>
              ) : (
                <View style={styles.addedTextContainer}>
                  <Text style={styles.ticketText}>
                    {totalCount} {translations.TICKET}
                  </Text>

                  <Text style={styles.addedText}>{translations.ADDED}</Text>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.goToCartButton,
                  {
                    backgroundColor:
                      totalCount == 0 ? color.S_PINK_2 : color.P_PINK,
                  },
                ]}
                activeOpacity={totalCount == 0 ? 1 : 0}
                onPress={onPressGoTOCart}>
                <Text style={styles.goToCartText}>
                  {translations.GO_TO_CART}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </BottomModal>
  );
};

export default TicketsModal;
