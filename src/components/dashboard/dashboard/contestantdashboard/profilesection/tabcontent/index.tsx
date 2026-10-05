import React from 'react';
import {FlatList, Text, View, TouchableOpacity, Linking} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../../../../utils/responsiveSize';
import {styles} from './styles';
import {checkDownloadPermission} from '../../../../../utils/permissions';
import {downloadImage} from '../../../../../utils/downloadImage';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../../../../../root/screenname';
import FastImageView from '../../../../../common/fastimageview';
import {onUnderDevlopment} from '../../../../../utils/helperFunction';

const TabContent = ({data, name, edit = true}) => {
  const navigation = useNavigation();

  const downloadTrophy = async (path: string) => {
    const response = await checkDownloadPermission();
    if (response) {
      downloadImage(path);
    }
  };

  const navigateToEditScreen = (item: number) => {
    if (item?.id?.toString().length < 6) {
      navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
        id: item?.pageant_contestant_id,
      });
    } else {
      navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
        id: item?.id,
      });
    }
  };

  const handleOnPress = (screenName: string, downloadImagePath: string) => {
    if (screenName === translations.AWARDS) {
      downloadTrophy(downloadImagePath);
    } else {
      onUnderDevlopment();
    }
  };

  const moveToPageantPublicPage = item => {
    if (name === translations.PAGEANT_WON) {
      navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
        eventId: item?.pageant_id,
        name: item?.pageant?.title,
      });
    } else if (name === translations.AWARDS && item?.image_url) {
      Linking.openURL(item?.image_url);
    }
  };

  return (
    <View
      style={
        name === translations.PAGEANT_WON
          ? {
              ...styles.wrapperPageant,
              marginTop: edit
                ? moderateScaleVertical(13)
                : moderateScaleVertical(25),
            }
          : name === translations.AWARDS
          ? styles.wrapperAwards
          : null
      }>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        initialNumToRender={5}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.bottomArea}
            // activeOpacity={name === translations.PAGEANT_WON ? 1 : 1}
            onPress={() => moveToPageantPublicPage(item)}>
            {name !== translations.PAGEANT_WON && (
              <TouchableOpacity
                style={{
                  ...styles.bottomSection,
                  top:
                    name === translations.AWARDS
                      ? moderateScale(154) + moderateScaleVertical(40)
                      : moderateScale(154) + moderateScaleVertical(56),
                }}
                onPress={() => {
                  handleOnPress(name, item?.trophy_original_image_path);
                }}>
                {name === translations.AWARDS ? (
                  <AppImages.Dashboard.download_ICON />
                ) : (
                  <AppImages.Dashboard.email_ICON />
                )}
                <Text style={styles.options}>
                  {name === translations.AWARDS
                    ? translations.DOWNLOAD
                    : translations.MESSAGE}
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={[
                styles.container,
                {
                  backgroundColor:
                    name === translations.AWARDS
                      ? color.MAROON
                      : color.S_GRAY_1,
                  marginTop:
                    name !== translations.PAGEANT_WON
                      ? -moderateScaleVertical(40)
                      : 0,
                },
              ]}>
              <View style={styles.imageSection}>
                <FastImageView
                  width={moderateScale(154)}
                  height={moderateScale(154)}
                  borderRadius={moderateScale(25)}
                  imageUrl={
                    name === translations.AWARDS
                      ? item?.trophy_original_image_path
                      : name === translations.ASSOCIATE_BUSINESS
                      ? item?.from_business?.image
                      : item?.pageant?.main_image
                  }
                />
                {name === translations.PAGEANT_WON && edit ? (
                  <TouchableOpacity
                    style={styles.editCircleIcon}
                    onPress={() => navigateToEditScreen(item)}>
                    <AppImages.Common.editCircle_ICON />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View>
                <View
                  style={{
                    ...styles.titleSection,
                    height:
                      name === translations.AWARDS
                        ? moderateScaleVertical(50)
                        : name === translations.PAGEANT_WON
                        ? moderateScaleVertical(64)
                        : moderateScaleVertical(66),
                  }}>
                  <Text
                    numberOfLines={
                      name === translations.ASSOCIATE_BUSINESS ? 2 : 3
                    }
                    style={[
                      styles.title,
                      {
                        color:
                          name === translations.AWARDS
                            ? color.WHITE
                            : color.INPUT_TEXT,
                      },
                    ]}>
                    {name === translations.PAGEANT_WON
                      ? item?.pageant?.title
                      : name === translations.ASSOCIATE_BUSINESS
                      ? item?.from_business?.business_title
                      : item?.image_title}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TabContent;
