import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import images from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {SCREEN} from '../../../../../../root/screenname';
import {LocalImage} from '../../../../../../services/models/localimage';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {toast, toastType} from '../../../../../common/commonalert';
import FastImageView from '../../../../../common/fastimageview';
import HeadShotImage from '../../../../../common/headshotimage';
import {emptyFunction} from '../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  addEditRequest: ProductsData;
  setProductDetail: any;
  title?: any;
  subTitle?: any;
  headerTitle?: any;
}

export const AdditionalImage = ({
  addEditRequest,
  setProductDetail,
  title = translations.UPLOAD_ADITIONAL_IMAGES,
  subTitle = translations.UPLOAD_FEATURED_IMAGE,
  headerTitle = translations.ADITIONAL_IMAGES,
}: Props) => {
  const navigation = useNavigation();

  const [isRefresh, setRefresh] = useState(true);

  const onImageSelected = (data: LocalImage[]) => {
    var newCount = 0;
    if (data[data.length - 1].uri?.length === 0) {
      newCount = data.length - 1;
    }
    if (
      addEditRequest?.additional_images !== undefined &&
      addEditRequest?.additional_images?.length - 1 + newCount > 5
    ) {
      toast(
        translations.YOU_CAN_NOT_UPLOAD_MORE_THEN_5_IMAGES,
        toastType.ERROR_TOAST,
      );
      return;
    }
    addEditRequest?.additionalImage?.pop();
    addEditRequest?.additional_images?.pop();

    data.forEach(element => {
      if (
        element.uri !== undefined &&
        addEditRequest?.additional_images !== undefined &&
        addEditRequest?.additional_images?.length < 5
      ) {
        addEditRequest?.additionalImage?.push(element);
        addEditRequest?.additional_images?.push(element.uri);
      }
    });

    setRefresh(false);
    setTimeout(() => {
      setRefresh(true);
    }, 100);
  };

  const onAddClick = () => {
    navigation.navigate(SCREEN.UPLOAD_PHOTOH_IN_ALBUM, {
      onImageSelected: onImageSelected,
      albumName: translations.UPLOAD_PHOTO_IN_ALBUM,
      isImagePicker: true,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        addEditRequest?.additional_images !== undefined &&
        addEditRequest?.additional_images.length > 0 &&
        addEditRequest?.additional_images.length < 5 &&
        !isPlusButtonAddedd()
      ) {
        addEditRequest?.additional_images?.push('');
      }
    }, 500);
    if (addEditRequest?.delete_additional_images === undefined) {
      setProductDetail({
        ...addEditRequest,
        delete_additional_images: [],
      });
    }
    if (addEditRequest?.additionalImage === undefined) {
      setProductDetail({
        ...addEditRequest,
        additionalImage: [],
      });
    }
  }, []);

  const isPlusButtonAddedd = () => {
    var count = 0;
    addEditRequest?.additional_images?.forEach(element => {
      if (element !== undefined && element?.length === 0) {
        count = count + 1;
      }
    });
    return count === 1;
  };

  /**
   * If the image at the index is empty, show the modal. Otherwise, set the index to the index
   * @param {number} index - The index of the image that was clicked.
   */
  const onImageTab = (index: number) => {
    onAddClick();
  };

  /**
   * It deletes an image from the array of images.
   * @param {number} index - The index of the image to be deleted
   */
  const onDeleteImageClick = (index: number) => {
    var isAddPlusButton = 0;
    if (
      addEditRequest?.additional_images !== undefined &&
      addEditRequest?.additional_images?.length === 5 &&
      addEditRequest?.additional_images[4] !== undefined &&
      addEditRequest?.additional_images[4].length > 0
    ) {
      isAddPlusButton = isAddPlusButton + 1;
    }
    if (
      addEditRequest?.additional_images !== undefined &&
      addEditRequest?.additional_images?.length > 0 &&
      addEditRequest?.additional_images[index].includes('http')
    ) {
      if (addEditRequest?.delete_additional_images === undefined) {
        setProductDetail({
          ...addEditRequest,
          delete_additional_images: [addEditRequest?.additional_images[index]],
        });
      } else {
        addEditRequest?.delete_additional_images?.push(
          addEditRequest?.additional_images[index],
        );
      }
    } else if (
      addEditRequest?.additional_images !== undefined &&
      addEditRequest?.additionalImage !== undefined &&
      addEditRequest?.additionalImage?.length > 0
    ) {
      var foundIndexOfDeletedImage = 0;
      for (
        let deleteIndex = 0;
        deleteIndex < addEditRequest?.additionalImage.length;
        deleteIndex++
      ) {
        if (
          addEditRequest?.additionalImage[deleteIndex].uri ===
          addEditRequest?.additional_images[index]
        ) {
          foundIndexOfDeletedImage = deleteIndex;
        }
      }
      addEditRequest?.additionalImage?.splice(foundIndexOfDeletedImage, 1);
    }
    addEditRequest?.additional_images?.splice(index, 1);

    setTimeout(() => {
      if (isAddPlusButton > 0) {
        addEditRequest.additional_images?.push('');
      }
    }, 20);
    setRefresh(false);
    setTimeout(() => {
      setRefresh(true);
    }, 1);
  };

  return (
    <View>
      {addEditRequest?.additional_images !== undefined &&
      addEditRequest?.additional_images.length >= 1 &&
      isRefresh ? (
        <View>
          <Text style={styles.headShotImageText}>{headerTitle}</Text>

          <View style={styles.removehorizontalPading}>
            <FlatList
              horizontal={true}
              data={addEditRequest?.additional_images}
              keyExtractor={(x, i) => i.toString()}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      ...styles.gridItemContainer,
                      marginRight:
                        addEditRequest?.additional_images?.length == index + 1
                          ? moderateScale(12)
                          : 0,
                    }}
                    onPress={() => {
                      onImageTab(index);
                    }}>
                    {item?.length === 0 ? (
                      <View style={styles.addMoreContiner}>
                        <images.Gallery.AddImage_ICON />
                      </View>
                    ) : (
                      <View>
                        <FastImageView
                          width={moderateScaleVertical(86)}
                          height={moderateScaleVertical(86)}
                          borderRadius={moderateScaleVertical(15)}
                          imageUrl={item}
                        />
                        <TouchableOpacity
                          style={styles.headShotDeleteContainer}
                          onPress={() => {
                            onDeleteImageClick(index);
                          }}>
                          <images.Common.DeleteImageIcon />
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      ) : (
        <HeadShotImage
          onImageFound={emptyFunction}
          url={''}
          label={title}
          showNote={false}
          onCustomClick={onAddClick}
          heading={subTitle}
          errorMsg={''}
          displayHeadUrl={false}
        />
      )}
    </View>
  );
};

export default AdditionalImage;
