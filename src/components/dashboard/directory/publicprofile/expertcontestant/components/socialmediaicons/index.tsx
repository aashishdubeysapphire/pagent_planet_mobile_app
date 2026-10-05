import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';

import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../../utils/validations';
import {styles} from '../../../../../../common/socialmedialinks/styles';
import {openWebLink} from '../../../../../../utils/helperFunction';
import {LinkedAccounts} from '../../../../../../../services/models/user/personalDetails';

interface Props {
  dataList?: LinkedAccounts;
}

const SocialMediaIcons = ({dataList}: Props) => {
  const socialMediaList = [
    {
      image: <AppImages.Drawer.FB />,
      show: checkIsNull(dataList?.facebook_page),
      onPress: () => {
        openWebLink(dataList?.facebook_page!!);
      },
    },
    {
      image: (
        <AppImages.Drawer.Insta
          width={moderateScale(27)}
          height={moderateScaleVertical(27)}
        />
      ),
      show: checkIsNull(dataList?.instagram_page),
      onPress: () => {
        openWebLink(dataList?.instagram_page!!);
      },
    },
    {
      image: <AppImages.Drawer.Youtube />,
      show: checkIsNull(dataList?.youtube_page),
      onPress: () => {
        openWebLink(dataList?.youtube_page!!);
      },
    },
    {
      image: <AppImages.Drawer.Twitter />,
      show: checkIsNull(dataList?.twitter_page),
      onPress: () => {
        openWebLink(dataList?.twitter_page!!);
      },
    },
    {
      image: <AppImages.Drawer.Pintrest />,
      show: checkIsNull(dataList?.pintrest_page),
      onPress: () => {
        openWebLink(dataList?.pintrest_page!!);
      },
    },
    {
      image: <AppImages.Drawer.LinkedIn />,
      show: checkIsNull(dataList?.linkedin_page),
      onPress: () => {
        openWebLink(dataList?.linkedin_page!!);
      },
    },
    {
      image: <AppImages.Drawer.TicTok />,
      show: checkIsNull(dataList?.tiktok_page),
      onPress: () => {
        openWebLink(dataList?.tiktok_page!!);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.socialLinks}>
        {socialMediaList.map(item => {
          return (
            item.show && (
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.socialLinksTOuch}>
                {item.image}
              </TouchableOpacity>
            )
          );
        })}
      </View>
    </View>
  );
};

export default SocialMediaIcons;
