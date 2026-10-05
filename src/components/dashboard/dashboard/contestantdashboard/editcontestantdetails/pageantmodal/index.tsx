import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import CustomButton from '../../../../../common/button';
import translations from '../../../../../../assets/translations';
import {useShowStartModal} from '../../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/native';
import Shimmer from '../../../../../common/shimmer';
import ImagePlaceHolder from '../../../../../common/imageplaceholder';
import {SCREEN} from '../../../../../../root/screenname';

interface Props {
  label: string;
  inactive?: boolean;
  isModalVisible: boolean;
  awardList: Array;
  pageantTitle: string;
  onPressDelete: any;
  gotTitle: String;
  icon ?: any;
  maxLines ?: number;
  contestantId ?: any;
  closeModal ?: any;
}

const PageantModal = ({
  label,
  maxLines = 1,
  icon,
  isModalVisible,
  closeModal,
  awardList,
  pageantTitle,
  contestantId,
  gotTitle,
  onPressDelete,
}: Props) => {
  const [isImageFound, setImageFound] = useState(true);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const setShowModal = useShowStartModal();

  const onLodingStart = () => {};
  const onLoadEnd = () => {
    setImageLoaded(true);
  };
  const onLoadError = () => {
    setImageFound(false);
  };

  const navigation = useNavigation();
  const closeOpenModal = () => {
    closeModal(false);
    setShowModal(false);
  };
  const ListHeaderData = () => {
    return (
      <View style={styles.titlerow}>
        <View style={styles.bullet}>
          <AppImages.Common.BulletsIcon />
        </View>
        <Text
          numberOfLines={maxLines}
          ellipsizeMode="tail"
          style={[styles.titlename]}>
          {gotTitle}
        </Text>
      </View>
    );
  };

  return (
    <Modal isVisible={isModalVisible} backdropOpacity={0.45}>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.crossIcon} onPress={closeOpenModal}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
          <View style={[styles.listContainer]}>
            {icon === null || !isImageFound ? (
              <View style={styles.circleContainer}>
                <ImagePlaceHolder
                  updateSize
                  width={moderateScaleVertical(30)}
                  height={moderateScaleVertical(30)}
                />
              </View>
            ) : (
              <>
                <FastImage
                  style={styles.circleContainer}
                  source={{
                    uri: icon,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.center}
                  onLoadStart={onLodingStart}
                  onLoadEnd={onLoadEnd}
                  onError={onLoadError}
                  onProgress={e => {}}
                  onLoad={e => {}}
                />
                {!isImageLoaded ? (
                  <View style={styles.shimmer}>
                    <Shimmer
                      size={moderateScaleVertical(60)}
                      borderRadius={moderateScaleVertical(60)}
                      leftBottomSpace={moderateScaleVertical(16)}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </>
            )}
            <View>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[
                  styles.title,
                  {
                    marginEnd: moderateScale(48),
                    textAlign: 'left',
                  },
                ]}>
                {label}
              </Text>
            </View>
          </View>
          {pageantTitle ? (
            <>
              <Text
                numberOfLines={maxLines}
                ellipsizeMode="tail"
                style={[styles.subtitle]}>
                {translations.CONTESTANT_TITLE}
              </Text>

              <View style={styles.titlerow}>
                <View style={styles.bullet}>
                  <AppImages.Common.BulletsIcon />
                </View>
                <Text
                  numberOfLines={maxLines}
                  ellipsizeMode="tail"
                  style={[styles.titlename]}>
                  {pageantTitle}
                </Text>
              </View>
            </>
          ) : null}
          {awardList ? (
            <>
              <Text
                numberOfLines={maxLines}
                ellipsizeMode="tail"
                style={[styles.subtitle]}>
                {translations.AWARD_TITLE}
              </Text>
              <View style={styles.awardView}>
                <FlatList
                  data={awardList}
                  keyExtractor={item => item.id.toString()}
                  persistentScrollbar={true}
                  ListHeaderComponent={gotTitle ? <ListHeaderData /> : null}
                  renderItem={item => (
                    <View style={styles.titlerow}>
                      <View style={styles.bullet}>
                        <AppImages.Common.BulletsIcon />
                      </View>
                      <Text
                        numberOfLines={maxLines}
                        ellipsizeMode="tail"
                        style={[styles.titlename]}>
                        {item?.item?.award?.name}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </>
          ) : gotTitle ? (
            <>
              <Text
                numberOfLines={maxLines}
                ellipsizeMode="tail"
                style={[styles.subtitle]}>
                {translations.AWARD_TITLE}
              </Text>
              <View style={styles.awardView}>
                <View style={styles.titlerow}>
                  <View style={styles.bullet}>
                    <AppImages.Common.BulletsIcon />
                  </View>
                  <Text
                    numberOfLines={maxLines}
                    ellipsizeMode="tail"
                    style={[styles.titlename]}>
                    {gotTitle}
                  </Text>
                </View>
              </View>
            </>
          ) : null}

          <View style={styles.bottomContainer}>
            <View style={styles.containerDelete}>
              <CustomButton
                inactive
                label={translations.DELETE}
                border={true}
                inActiveBorder
                deleteModal
                onPress={onPressDelete}
              />
            </View>

            <View style={styles.containerConfirm}>
              <CustomButton
                inactive
                label={translations.EDIT}
                border={true}
                deleteModal
                onPress={() => (
                  closeOpenModal(),
                  navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
                    id: contestantId,
                  })
                )}
                textStyle={styles.borderButtonText}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PageantModal;
