import {useNetInfo} from '@react-native-community/netinfo';
import moment from 'moment';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import translations from '../../../../../../../assets/translations';
import {SCREEN} from '../../../../../../../root/screenname';
import {postsData} from '../../../../../../../services/models/pageantdetails/pageantPublicProfile';
import {internetState} from '../../../../../../common/commonalert';
import FastImageView from '../../../../../../common/fastimageview';
import {TIME_FORMAT} from '../../../../../../utils/datetimemanger';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  crownConvoData: postsData[] | undefined;
  navigation: any;
  pageantId: number;
  profileType: string;
}

const CrownConvo = ({
  crownConvoData,
  navigation,
  pageantId,
  profileType,
}: Props) => {
  const netInfo = useNetInfo();

  const onViewAllClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO, {
        pageantId: pageantId,

        profileType: profileType,
      });
    }
  };

  const onItemClick = (index: number) => {
    if (crownConvoData !== undefined) {
      navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO, {
        pageantId: pageantId,

        profileType: profileType,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowSection}>
        <Text style={styles.heading}>{translations.CROWN_CONVO}</Text>
        <TouchableOpacity style={styles.viewStyles} onPress={onViewAllClick}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={crownConvoData}
          numColumns={1}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => onItemClick(index)}>
              <View style={styles.gridSection}>
                <View style={styles.rowSection}>
                  <View style={styles.circleContainer}>
                    <FastImageView
                      width={moderateScaleVertical(48)}
                      height={moderateScaleVertical(48)}
                      borderRadius={moderateScaleVertical(60)}
                      imageUrl={item?.thread_owner_image}
                      isCircle
                    />
                  </View>
                  <Text style={styles.postDateLabel}>
                    {moment(item?.created_at).format(TIME_FORMAT.MM_DD_YYYY)}
                  </Text>
                </View>
                <Text style={styles.userName} numberOfLines={1}>
                  {item?.owner?.first_name + ' ' + item?.owner?.last_name}
                </Text>
                <Text style={styles.info} numberOfLines={6}>
                  {item?.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default CrownConvo;
