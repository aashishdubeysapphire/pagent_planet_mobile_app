import React from 'react';
import {Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../../../../../../../../root/screenname';
import translations from '../../../../../../../../assets/translations';

interface Props {
  label?: string;
  maxLines?: number;
  noOfDocuments: number;
  info: string;
  todoId: Number;
  eventId: Number;
  allowedSize: Number;
  onItemClickListener?: (param1: number) => void;
}

const MyUploadListView = ({
  label,
  noOfDocuments,
  maxLines = 1,
  info,
  todoId,
  eventId,
  allowedSize,
  onItemClickListener,
}: Props) => {
  const styles = useStyle();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(SCREEN.UPLOADED_FILES, {
          todoId: todoId,
          eventId: eventId,
          allowedSize: allowedSize,
          todoName: label,
        })
      }>
      <View style={styles.showData}>
        <View style={styles.imageSection}>
          <AppImages.Common.myUploadIcon
            width={moderateScaleVertical(50)}
            height={moderateScaleVertical(50)}
          />
        </View>
        <View style={styles.titleView}>
          <Text
            style={styles.title}
            numberOfLines={maxLines}
            ellipsizeMode="tail">
            {label}
          </Text>
          <Text
            style={styles.infoLabel}
            numberOfLines={maxLines}
            ellipsizeMode="tail">
            {translations.DATE_MODIFIED}{info}
          </Text>
          <View style={styles.documentsArea}>
            <AppImages.Common.attachment_Icon />
            <Text style={styles.numbersStyle}>
              {noOfDocuments + ' '}{translations.ATTACHMENTS}
            </Text>
          </View>
        </View>
        <View style={styles.infoArea}>
          <AppImages.Common.rightArrowIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyUploadListView;
