import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {SCREEN} from '../../../../../../root/screenname';
import FastImageView from '../../../../../common/fastimageview';
import {PLACEMENT} from '../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {styles} from './styles';

const AwardWonView = ({data, edit}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styles.wrapper,
        marginTop: edit ? moderateScaleVertical(13) : moderateScaleVertical(25),
      }}>
      <FlatList
        horizontal={true}
        data={data.slice(0, 5)}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
                eventId: item?.pageant_id,
                name: item?.pageant?.title,
              });
            }}>
            <View style={styles.awardSection}>
              <View style={styles.imageSection}>
                <FastImageView
                  width={moderateScale(154)}
                  height={moderateScaleVertical(154)}
                  borderRadius={moderateScaleVertical(24)}
                  imageUrl={item?.pageant?.main_image}
                />

                {item?.pageant_contestant_id === '' ||
                item?.pageant_contestant_id === null ||
                item?.pageant_contestant_id === undefined ||
                !edit ? null : (
                  <TouchableOpacity
                    style={styles.editCircleIcon}
                    onPress={() =>
                      navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
                        id: item?.pageant_contestant_id,
                      })
                    }>
                    <AppImages.Common.editCircle_ICON />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.labelView}>
                <Text
                  style={styles.awardLabel}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {item?.award?.name !== undefined
                    ? translations.AWARD + ' ' + item?.award?.name
                    : item?.type === 2
                    ? translations.AWARD + ' ' + PLACEMENT.RUNNER_UP1
                    : item?.type === 3
                    ? translations.AWARD + ' ' + PLACEMENT.RUNNER_UP2
                    : item?.type === 4
                    ? translations.AWARD + ' ' + PLACEMENT.RUNNER_UP3
                    : item?.type === 5
                    ? translations.AWARD + ' ' + PLACEMENT.RUNNER_UP4
                    : item?.got_title !== undefined
                    ? translations.AWARD + ' ' + item.got_title
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
                {item?.pageant?.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AwardWonView;
