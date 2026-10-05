import {Text, View} from 'react-native';
import React from 'react';
import translations from '../../../../../assets/translations';
import {
  DIRECTORY_ID,
  PROFILE_STATUS,
  ROLES,
  SystemGeneratedPostTypes,
} from '../../../../utils/enum';
import {emptyFunction, getTagTypeLable} from '../../../../utils/helperFunction';
import {styles} from '../postheader/styles';
import {styles as systemGeneratedHeaderStyle} from './style';
import {SCREEN} from '../../../../../root/screenname';
import {
  ConvoListItem,
  ProductProfileData,
} from '../../../../../services/models/convo/convoListing';
import {checkIsNull} from '../../../../utils/validations';

export const systemGeneratedFunctions = (item: ConvoListItem, navigation) => {
  const UiView = () => {
    switch (item.post_category.slug) {
      case SystemGeneratedPostTypes.NAME_Joined_PP:
        return NAME_JOINED_PP();

      case SystemGeneratedPostTypes.CONTESTANT_started_a_GO_CROWN_ME:
        return CONTESTANT_STARTED_GO_CROWN_ME(
          translations.STARTED_A,
          translations.GO_CROWN_ME
        );

      case SystemGeneratedPostTypes.NAME_listed_PRODUCT_NAME_for_sale:
        return NAME_LISTED_ITEM_FOR_SALE();

      case SystemGeneratedPostTypes.CONTESTANT_reserved_an_item_using_STYLE_CHECK:
        return CONTESTANT_STARTED_GO_CROWN_ME(
          translations.RESERVED_AN_ITEM_USING,
          translations.STYLE_CHECK
        );

      case SystemGeneratedPostTypes.CONTESTANT_is_competing_in_EVENT_NAME:
        return CONTESTANT_IS_COMPETING_IN_EVENT(translations.IS_COMPETING_IN);

      case SystemGeneratedPostTypes.CONTESTANT_competed_in_EVENT_NAME:
        return CONTESTANT_IS_COMPETING_IN_EVENT(translations.COMPETED_IN);

      case SystemGeneratedPostTypes.EVENT_NAME_updated_their_result:
        return EVENT_UPDATED_THEIR_RESULT();

      case SystemGeneratedPostTypes.CONTESTANT_won_EVENT_NAME:
        return CONTESTANT_IS_COMPETING_IN_EVENT(translations.WON + ' ');

      case SystemGeneratedPostTypes.CONTESTANT_won_an_award_at_EVENT_NAME:
        return CONTESTANT_WON_AN_AWARD_AT_EVENT();

      case SystemGeneratedPostTypes.EXPERT_worked_with_CONTESTANT:
        return EXPERT_worked_with_CONTESTANT();

      case SystemGeneratedPostTypes.EXPERT_worked_with_EVENT_NAME:
        return EXPERT_WORKED_WITH_EVENT();

      case SystemGeneratedPostTypes.EVENT_won_award_title:
        return EVENT_WON_AWARD_TITLE();

      case SystemGeneratedPostTypes.CONTESTANT_won_award_title:
        return CONTESTANT_WON_AWARD_TITLE();

      case SystemGeneratedPostTypes.EXPERT_won_award_title:
        return EXPERT_WON_AWARD_TITLE();

      default:
        break;
    }
  };

  const onImageClickNav = () => {
    switch (item.post_category.slug) {
      case SystemGeneratedPostTypes.NAME_Joined_PP:
        return goToPrimaryRole();

      case SystemGeneratedPostTypes.NAME_listed_PRODUCT_NAME_for_sale:
        return goToSelectedRole();

      case SystemGeneratedPostTypes.CONTESTANT_started_a_GO_CROWN_ME:
      case SystemGeneratedPostTypes.CONTESTANT_reserved_an_item_using_STYLE_CHECK:
      case SystemGeneratedPostTypes.CONTESTANT_is_competing_in_EVENT_NAME:
      case SystemGeneratedPostTypes.CONTESTANT_competed_in_EVENT_NAME:
      case SystemGeneratedPostTypes.CONTESTANT_won_EVENT_NAME:
        return goToContestant();

      case SystemGeneratedPostTypes.CONTESTANT_won_an_award_at_EVENT_NAME:
      case SystemGeneratedPostTypes.CONTESTANT_won_award_title:
        return goToTaggedContestant();

      case SystemGeneratedPostTypes.EVENT_NAME_updated_their_result:
      case SystemGeneratedPostTypes.EVENT_won_award_title:
        return goToEvent();

      case SystemGeneratedPostTypes.EXPERT_worked_with_CONTESTANT:
      case SystemGeneratedPostTypes.EXPERT_worked_with_EVENT_NAME:
      case SystemGeneratedPostTypes.EXPERT_won_award_title:
        return goToExpertRole();

      default:
        break;
    }
  };

  const checkIsUserActive = () => {
    if (item?.convoUserTabsArr.haveRole == 1) {
      if (item?.contestant?.is_minor == translations.YES) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const getId = (tag: string) => {
    if (item.convoUserTabsArr.profileTabsArr[0].profile_id == 0) {
      return item.convoUserTabsArr.profileTabsArr[1][tag];
    } else {
      return item.convoUserTabsArr.profileTabsArr[0][tag];
    }
  };

  const goToContestant = () => {
    if (item?.crownConvoLinkings?.profileNames?.activeContestantNameLink) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item.user_id, //owner id
        profileId: item?.contestant?.id,
        name: item?.contestant?.name,
        key: new Date().getMilliseconds(),
        category: DIRECTORY_ID.CONTESTANT,
        selectedTab: ROLES.CONTESTANT,
      });
    } else {
      return null;
    }
  };

  const goToTaggedContestant = () => {
    if (item?.crownConvoLinkings?.profileNames?.activeContestantNameLink) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item.tagged_contestant.owner_id, //owner id
        profileId: item.tagged_contestant.id,
        name: item.tagged_contestant?.name,
        key: new Date().getMilliseconds(),
        category: DIRECTORY_ID.CONTESTANT,
        selectedTab: ROLES.CONTESTANT,
      });
    } else {
      return null;
    }
  };

  const getProfileInfo = (productData?: ProductProfileData) => {
    if (
      !checkIsNull(productData) &&
      item?.crownConvoLinkings?.productDetail?.role_id == 0
    ) {
      return item?.crownConvoLinkings?.profileNames?.userName; //fan user
    } else if (checkIsNull(productData?.name)) {
      return productData?.name; //contestant name
    } else if (checkIsNull(productData?.business_title)) {
      return productData?.business_title; //business name
    } else {
      return productData?.title; //pageant name
    }
  };

  const goToExpertRole = () => {
    if (item?.crownConvoLinkings?.profileNames?.activeExpertProfileName) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item?.crownConvoLinkings?.linkingURL?.businessDetail?.owner_id, //owner id
        profileId: item?.crownConvoLinkings?.linkingURL?.businessDetail?.id,
        name: item?.crownConvoLinkings?.linkingURL?.businessDetail
          ?.business_title,
        category:
          item?.crownConvoLinkings?.linkingURL?.businessDetail
            ?.business_role_id,
        key: new Date().getMilliseconds(),
        selectedTab: getTagTypeLable(
          item?.crownConvoLinkings?.linkingURL?.businessDetail
            ?.business_role_id,
        ),
      });
    } else {
      return null;
    }
  };

  const goToSelectedRole = () => {
    if (getActiveState()) {
      if (
        item?.crownConvoLinkings?.productDetail?.role_id == DIRECTORY_ID.PAGEANT
      ) {
        //3 is for Pageant
        if (
          item?.product_profile_data?.status == PROFILE_STATUS.ACTIVE &&
          item?.convoUserTabsArr?.haveRole == 1
        ) {
          navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
            //redirect to pageant public screen
            roleId: item?.product_profile_data?.id,
            profileId: item?.product_profile_data?.id,
            name: item?.product_profile_data?.title,
          });
        } else {
          return null;
        }
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: item?.product_profile_data?.owner_id, //owner id
          profileId: item?.product_profile_data?.id,
          name: getProfileInfo(item?.product_profile_data),
          category: item?.crownConvoLinkings?.productDetail?.role_id,
          key: new Date().getMilliseconds(),
          selectedTab:
            item?.crownConvoLinkings?.productDetail?.role_id == 7
              ? ROLES.COACH
              : getTagTypeLable(
                  item?.crownConvoLinkings?.productDetail?.role_id,
                ),
        });
      }
    }
  };

  const goToEvent = () => {
    if (item?.crownConvoLinkings?.profileNames?.activeEventNameLink) {
      navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
        name: item?.crownConvoLinkings?.profileNames?.eventName,
        eventId: item?.post_event?.id,
      });
    } else {
      return null;
    }
  };

  const goToPrimaryRole = () => {
    if (checkIsUserActive()) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item.user_id, //owner id
        profileId: getId('profile_id'),
        name: item?.owner?.first_name + ' ' + item?.owner?.last_name,
        category: getId('role_id'),
        key: new Date().getMilliseconds(),
        selectedTab: getTagTypeLable(getId('role_id'), ROLES.CONTESTANT),
      });
    } else {
      return null;
    }
  };

  const goToProductDetails = () => {
    let id = item?.crownConvoLinkings?.productDetail?.id;
    navigation.navigate(SCREEN.PRODUCT_DETAIL, {
      productId: id,
    });
  };

  const getActiveState = () => {
    if (
      item?.crownConvoLinkings?.productDetail?.role_id == DIRECTORY_ID.PAGEANT
    ) {
      //3 is for Pageant
      if (
        item?.product_profile_data?.status == PROFILE_STATUS.ACTIVE &&
        item?.convoUserTabsArr?.haveRole == 1
      ) {
        return true;
      } else {
        return false;
      }
    } else if (
      item?.crownConvoLinkings?.productDetail?.role_id ==
      DIRECTORY_ID.CONTESTANT
    ) {
      if (item?.crownConvoLinkings?.profileNames?.activeContestantNameLink) {
        return true;
      } else {
        return false;
      }
    } else {
      if (item?.product_profile_data?.status == PROFILE_STATUS.ACTIVE) {
        //Expert case
        return true;
      } else {
        return false;
      }
    }
  };

  const showPostHeader = (
    isHeadingActive: boolean,
    name: string,
    onPressHeading: Function,
    postStaticText: string,
    lastText: string,
    isHyperLink: boolean,
    onPressSecondHyperlink: Function
  ) => {
    return (
      <>
        <Text
          style={isHeadingActive ? styles.nameStylesActive : styles.nameStyles}
          numberOfLines={2}
          onPress={isHeadingActive ? onPressHeading : null}>
          {name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.typeStyle}
            numberOfLines={3}
            ellipsizeMode={'tail'}>
            {postStaticText}

            {lastText != '' && (
              <Text
                style={
                  isHyperLink
                    ? systemGeneratedHeaderStyle.activeStyle
                    : systemGeneratedHeaderStyle.inactiveStyle
                }
                numberOfLines={2}
                onPress={isHyperLink ? onPressSecondHyperlink : null}>
                {lastText}
              </Text>
            )}
            {postStaticText == translations.LISTED && (
              <Text style={styles.typeStyle} numberOfLines={1}>
                {' ' + translations.FOR_SALE}
              </Text>
            )}
          </Text>
        </View>
      </>
    );
  };

  const NAME_JOINED_PP = () => {
    return (
      <>
        {showPostHeader(
          checkIsUserActive(),
          item?.crownConvoLinkings?.profileNames?.userName,
          goToPrimaryRole,
          translations.JOINED,
          translations.PP,
          false,
          emptyFunction
        )}
      </>
    );
  };

  const EXPERT_worked_with_CONTESTANT = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeExpertProfileName,
          item?.crownConvoLinkings?.profileNames?.expertProfileName,
          goToExpertRole,
          translations.WORKED_WITH,
          item?.crownConvoLinkings?.profileNames?.contestantName,
          item?.crownConvoLinkings?.profileNames?.activeContestantNameLink,
          goToTaggedContestant
        )}
      </>
    );
  };

  const CONTESTANT_STARTED_GO_CROWN_ME = (label1: string, label2: string) => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeContestantNameLink,
          item?.crownConvoLinkings?.profileNames?.contestantName,
          goToContestant,
          label1,
          label2,
          false,
          emptyFunction
        )}
      </>
    );
  };

  const NAME_LISTED_ITEM_FOR_SALE = () => {
    return (
      <>
        {showPostHeader(
          getActiveState(),
          getProfileInfo(item?.product_profile_data),
          goToSelectedRole,
          translations.LISTED,
          item?.crownConvoLinkings?.productDetail?.unique_style_number,
          true,
          goToProductDetails
        )}
      </>
    );
  };

  const CONTESTANT_IS_COMPETING_IN_EVENT = (label: string) => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeContestantNameLink,
          item?.crownConvoLinkings?.profileNames?.contestantName,
          goToContestant,
          label,
          item?.crownConvoLinkings?.profileNames?.eventName,
          item?.crownConvoLinkings?.profileNames?.activeEventNameLink,
          goToEvent
        )}
      </>
    );
  };

  const EVENT_UPDATED_THEIR_RESULT = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeEventNameLink,
          item?.crownConvoLinkings?.profileNames?.eventName,
          goToEvent,
          translations.UPDATED,
          translations.THEIR_PAGEANT_RESULTS,
          false,
          emptyFunction
        )}
      </>
    );
  };

  const EXPERT_WORKED_WITH_EVENT = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeExpertProfileName,
          item?.crownConvoLinkings?.profileNames?.expertProfileName,
          goToExpertRole,
          translations.WORKED_WITH,
          item?.crownConvoLinkings?.profileNames?.eventName,
          item?.crownConvoLinkings?.profileNames?.activeEventNameLink,
          goToEvent
        )}
      </>
    );
  };

  const CONTESTANT_WON_AN_AWARD_AT_EVENT = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeContestantNameLink,
          item?.crownConvoLinkings?.profileNames?.contestantName,
          goToTaggedContestant,
          translations.WON_AN_AWARD_AT,
          item?.crownConvoLinkings?.profileNames?.eventName,
          item?.crownConvoLinkings?.profileNames?.activeEventNameLink,
          goToEvent
        )}
      </>
    );
  };

  const EVENT_WON_AWARD_TITLE = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeEventNameLink,
          item?.crownConvoLinkings?.profileNames?.eventName,
          goToEvent,
          translations.WON_AWARD_TITLE,
          '',
          false,
          emptyFunction
        )}
      </>
    );
  };

  const CONTESTANT_WON_AWARD_TITLE = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeContestantNameLink,
          item?.crownConvoLinkings?.profileNames?.contestantName,
          goToTaggedContestant,
          translations.WON_AWARD_TITLE,
          '',
          false,
          emptyFunction
        )}
      </>
    );
  };

  const EXPERT_WON_AWARD_TITLE = () => {
    return (
      <>
        {showPostHeader(
          item?.crownConvoLinkings?.profileNames?.activeExpertProfileName,
          item?.crownConvoLinkings?.profileNames?.expertProfileName,
          goToExpertRole,
          translations.WON_AWARD_TITLE,
          '',
          false,
          emptyFunction
        )}
      </>
    );
  };

  return {UiView, onImageClickNav};
};
