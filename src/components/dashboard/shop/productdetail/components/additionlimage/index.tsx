import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import translations from '../../../../../../assets/translations';
import {styles} from '../productdetails/styles';
import FastImageView from '../../../../../common/fastimageview';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../utils/validations';
import VideoComponent from '../../../../../common/videocomponent';
import {color} from '../../../../../../assets/colorConstant';

const AdditionalImage = ({additional_images = [], videoId, video_link}) => {
  return checkIsNull(additional_images) || !!videoId ? (
    <View style={[styles.continer, {backgroundColor: color.S_GRAY_1}]}>
      <Text
        style={{...styles.heading, marginBottom: moderateScaleVertical(24)}}>
        {translations.FROM_THE_SELLER}
      </Text>
      {!!videoId && (
        <>
          <VideoComponent
            videoId={videoId}
            videoType={'youtube'}
            uri={video_link}
          />
          <View style={styles.bottomView} />
        </>
      )}
      {checkIsNull(additional_images) &&
        additional_images.map((i, index) => {
          return (
            <>
              <FastImageView
                width={Dimensions.get('window').width}
                height={moderateScaleVertical(375)}
                imageUrl={i}
              />
              {index == additional_images.length - 1 ? null : (
                <View style={styles.bottomView} />
              )}
            </>
          );
        })}
    </View>
  ) : null;
};

export default AdditionalImage;
