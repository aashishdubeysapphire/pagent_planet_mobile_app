import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import {UserContext} from '../../../store/userStore';
import {openWebLink} from '../../utils/helperFunction';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import {checkIsNull} from '../../utils/validations';
import {styles} from './styles';

const SocailMediaLinks = () => {
  const {storeData} = useContext(UserContext);

  const bottomIconList = [
    {
      image: <AppImages.Drawer.FB />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.facebook_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .facebook_page!!,
        );
      },
    },
    {
      image: (
        <AppImages.Drawer.Insta
          width={moderateScale(27)}
          height={moderateScaleVertical(27)}
        />
      ),
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.instagram_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .instagram_page!!,
        );
      },
    },
    {
      image: <AppImages.Drawer.Youtube />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.youtube_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .youtube_page!!,
        );
      },
    },
    {
      image: <AppImages.Drawer.Twitter />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.twitter_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .twitter_page!!,
        );
      },
    },
    {
      image: <AppImages.Drawer.Pintrest />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.pintrest_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .pintrest_page!!,
        );
      },
    },
    {
      image: <AppImages.Drawer.LinkedIn />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.linkedin_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .linkedin_page!!,
        );
      },
    },
    {
      image: <AppImages.Drawer.TicTok />,
      show: checkIsNull(
        storeData?.data?.user?.personal_details.linked_accounts.tiktok_page,
      ),
      onPress: () => {
        openWebLink(
          storeData?.data?.user?.personal_details?.linked_accounts
            .tiktok_page!!,
        );
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.socialLinks}>
        {bottomIconList.map((i, index) => {
          return (
            i.show && (
              <>
                <TouchableOpacity
                  key={index}
                  onPress={i.onPress}
                  style={styles.socialLinksTOuch}>
                  {i.image}
                </TouchableOpacity>
              </>
            )
          );
        })}
      </View>
    </View>
  );
};

export default SocailMediaLinks;
