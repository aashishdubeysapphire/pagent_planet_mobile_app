import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import {color} from '../../../assets/colorConstant';

interface Props {
  item: any;
  label?: string;
  docType: string;
  onPressEdit: any;
}

const UploadedImages = ({
  item,
  label,
  docType,
  onPressEdit = () => {},
}: Props) => {
  const styles = useStyle();

  const showImage = () => {
    if (docType === 'jpeg' || docType === 'jpg' || docType === 'JPEG') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.Jpg
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'png') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.Png
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'mp3') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.Mp3
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'mp4' || docType === 'MP4') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.Mp4
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'pdf') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.pdf_ICON
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'docx' || docType === 'doc') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.doc_ICON
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'rar') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.rar_ICON
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else if (docType === 'zip') {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.zip_ICON
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.imageStyle}>
          <AppImages.Common.NoImageFound_ICON
            marginTop={'auto'}
            marginBottom={'auto'}
            marginLeft={'auto'}
            marginRight={'auto'}
          />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.gridContainer,
          {
            backgroundColor: color.S_GRAY_1,
            height: moderateScaleVertical(198),
          },
        ]}>
        <View
          style={{
            ...styles.imageSection,
          }}>
          {showImage()}
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: moderateScale(20),
              height: moderateScaleVertical(20),
              top: moderateScaleVertical(12),
              right: moderateScale(12),
            }}
            onPress={() =>
              onPressEdit(item.item.todo_id, item.item.event_id, item.item.id)
            }>
            <AppImages.Common.MyUploadsDelete />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.middleSection,
            height: '25%',
          }}>
          <Text
            style={{
              ...styles.title,
              color: color.INPUT_TEXT,
            }}
            numberOfLines={1}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UploadedImages;
