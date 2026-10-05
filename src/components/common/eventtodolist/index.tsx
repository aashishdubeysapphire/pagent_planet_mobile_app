import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import FastImageView from '../fastimageview';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {FileExtTypes} from '../../../services/constants';

interface Props {
  contestantName?: string;
  imageUrl: string;
  fileName: string;
  onItemClickListener?: (param1: number) => void;
  numberOfLinesForName: number;
  showImage: boolean;
  noOfContestants: number;
  noOfPendingTodos: number;
  onItemClick: any;
  fileType: string;
}

/* A function that returns a view. */
const EventToDosList = ({
  contestantName,
  imageUrl,
  fileName,
  numberOfLinesForName,
  showImage = true,
  noOfContestants,
  noOfPendingTodos,
  onItemClick,
  fileType,
}: Props) => {
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.listContainer} onPress={onItemClick}>
        <View style={styles.showData}>
          {showImage ? (
            <View style={styles.imageSection}>
              <FastImageView
                width={moderateScaleVertical(50)}
                height={moderateScaleVertical(50)}
                borderRadius={moderateScaleVertical(50)}
                imageUrl={imageUrl}
                isCircle
              />
            </View>
          ) : null}

          <View style={{...styles.bottomView, width: showImage ? '80%' : '100%'}}>
            <View style={styles.bottomView}>
              <Text
                style={styles.title}
                numberOfLines={numberOfLinesForName}
                ellipsizeMode="tail">
                {contestantName}
              </Text>
            </View>

            {fileName !== undefined && fileName !== null && fileName !== '' ? (
              <View
                style={{
                  ...styles.showData,
                  marginTop: moderateScaleVertical(6),
                }}>
                {fileType === FileExtTypes.DOC ? (
                  <AppImages.EVENT_TO_DOS.SmallDocIcon />
                ) : fileType === FileExtTypes.PDF ? (
                  <AppImages.EVENT_TO_DOS.SmallPdfIcon />
                ) : fileType === FileExtTypes.PNG ? (
                  <AppImages.EVENT_TO_DOS.SmallPngIcon />
                ) : fileType === FileExtTypes.JPG || fileType === FileExtTypes.JPEG ? (
                  <AppImages.EVENT_TO_DOS.SmallJpgIcon />
                ) : fileType === FileExtTypes.ZIP ? (
                  <AppImages.EVENT_TO_DOS.SmallZipIcon />
                ) : fileType === FileExtTypes.RAR ? (
                  <AppImages.EVENT_TO_DOS.SmallRarIcon />
                ) : fileType === FileExtTypes.MP3 ? (
                  <AppImages.EVENT_TO_DOS.SmallMp3Icon />
                ) : fileType === FileExtTypes.MP4 ? (
                  <AppImages.EVENT_TO_DOS.SmallMp4Icon />
                ) : null}
                <Text
                  style={styles.subTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {fileName}
                </Text>
              </View>
            ) : null}

            {noOfContestants !== undefined &&
            noOfContestants !== null &&
            noOfContestants !== '' ? (
              <View
                style={{
                  ...styles.showData,
                  marginTop: moderateScaleVertical(8),
                }}>
                <AppImages.EVENT_TO_DOS.ContestantsIcon />
                <Text
                  style={styles.contestantTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {noOfContestants + ' ' + translations.TOTAL_CONTESTANT}
                </Text>

                <AppImages.EVENT_TO_DOS.PendingIcon />
                <Text
                  style={styles.contestantTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {noOfPendingTodos + ' ' + translations.PENDING_SUBMISSION}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventToDosList;
