import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import BottomModal from '../../../../../common/bottommodal';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import CustomButton from '../../../../../common/button';
import FastImageView from '../../../../../common/fastimageview';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {color} from '../../../../../../assets/colorConstant';
import {PROFILE_STATUS} from '../../../../../utils/enum';
interface Props {
  unclaimedProfileModalVisible: boolean;
  setUnclaimedProfileModalVisible: any;
}
const UnclaimedProfileModal = ({
  unclaimedProfileModalVisible,
  setUnclaimedProfileModalVisible,
  inactiveClaimedProfileList = [],
  setCurrentStep,
}: Props) => {
  const navigation = useNavigation();

  const ListRenderView = item => {
    return (
      <View style={styles.listView}>
        <View style={styles.dpImage}>
          <FastImageView
            width={moderateScaleVertical(40)}
            height={moderateScaleVertical(40)}
            borderRadius={moderateScaleVertical(100)}
            imageUrl={item?.image_full_url}
            isCircle
          />
        </View>
        <View style={styles.nameAddressView}>
          <Text style={styles.nameText}>{item?.name}</Text>

          {!!item?.event_title && (
            <Text style={styles.addressText} numberOfLines={1}>
              {item?.event_title}
            </Text>
          )}
          <Text
            style={[
              styles.addressText,
              {
                color:
                  item?.status == PROFILE_STATUS.ACTIVE
                    ? color.UPCOMING
                    : color.RED,
              },
            ]}
            numberOfLines={1}>
            {item?.status}
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => {
              navigation.navigate(SCREEN.CLAIM_PROFILE, {
                profileType: translations.SMALL_CONTESTANT,
                slug: item.slug,
              });
              setUnclaimedProfileModalVisible(false);
              setCurrentStep(1);
            }}>
            <Text style={styles.claimText}>{translations.CLAIM_PROFILE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <BottomModal
      isModalVisible={unclaimedProfileModalVisible}
      setIsModalVisible={setUnclaimedProfileModalVisible}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <View>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setCurrentStep(1);
            setUnclaimedProfileModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <Text style={styles.heading}>
          {translations.UNCLAIMED_PROFILE_EXISTS}
        </Text>
        <Image
          source={
            AppImages.CreateContestentProfile.tpp_claim_profile_illustartion
          }
          style={styles.tpp_claim_profile_illustartion}
        />
        <Text style={styles.isThisYouText}>{translations.IS_THIS_YOU}</Text>
        <FlatList
          data={inactiveClaimedProfileList}
          style={styles.listStyle}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeperator}></View>;
          }}
          renderItem={item => ListRenderView(item.item)}
        />
      </View>
      <View style={styles.bottomButton}>
        <CustomButton
          inactive
          label={translations.NO_SKIP_FOR_NOW}
          border={true}
          textStyle={styles.borderButtonText}
          onPress={() => {
            setUnclaimedProfileModalVisible(false);
            setCurrentStep(1);
          }}
        />
      </View>
    </BottomModal>
  );
};

export default UnclaimedProfileModal;
