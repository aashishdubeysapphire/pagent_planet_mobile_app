import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from './styles';
import ImagePickerModal from '../../../../../../common/imagepickermodal';
import Header from '../../../../../../common/header';
import {
  toast,
  toastType,
  internetState,
} from '../../../../../../common/commonalert';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker'; // Updated import
import images from '../../../../../../../assets/images/AppImages';
import {
  ADD_GALLERY_IMAGES,
  EXPERT_UPLOAD_IMAGE_IN_ALBUM,
  GET_ACTIVE_EVENT_BY_PAGEANT,
} from '../../../../../../../services/endpoints';
import { moderateScaleVertical } from '../../../../../../utils/responsiveSize';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import translations from '../../../../../../../assets/translations';
import FastImageView from '../../../../../../common/fastimageview';
import {
  createFormData,
  isIosDevice,
} from '../../../../../../utils/helperFunction';
import { Base } from '../../../../../../../services/models/base';
import { useNetInfo } from '@react-native-community/netinfo';
import { StackActions, useNavigation } from '@react-navigation/native';
import { color } from '../../../../../../../assets/colorConstant';
import uuid from 'react-native-uuid';
import {
  EXPERT_ALBUM_TYPE,
  EXPERT_ALUM_TYPE,
  GALLERY_TYPE,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';
import ProgressLoader from '../../../../../../common/progressloader';
import FloatingDropdown from '../../../../../../common/floatingdropown';
import { MethodTypes, Param } from '../../../../../../../services/constants';
import { Pageant } from '../../../../../../../services/models/pageantdetails/pageant';
import CustomBottomModal from '../../../../../../common/custombottommodal';
import { LocalImage } from '../../../../../../../services/models/localimage';
import { SCREEN } from '../../../../../../../root/screenname';
import { EVENT_DETAIL_MENU_ID } from '../../../../pageantdashboard/pageantdetail/eventlist/eventdetail/components/menu';

// Optional: For image cropping (uncomment if needed)
// import ImageResizer from 'react-native-image-resizer';

const UploadPhoto = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectIndex, setIndex] = useState(0);
  const [imageUploadcounter, setImageUploadCounter] = useState(0);
  const [selectImagesPath, setSelectImagesPath] = useState<LocalImage[]>([]);
  const [itemSize, setItemSize] = useState(Number);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const [isUploaderProgressVisible, setUploaderProgressVisible] =
    useState(false);
  const [isActivePageantEventVisible, setActivePageantEventVisible] =
    useState(false);
  const [uploadingProgress, setUploaderProgress] = useState(0);
  const [eventError, setEventError] = useState('');
  const [activeEvent, setActiveEvent] = useState<Pageant>();
  const [isAddActiveButtonVisible, setAddActiveButtonVisible] = useState(false);
  const setLoader = useSetLoader();

  //Upload GALLERY Images ----------------------------------------- START
  const {
    error,
    isLoading,
    mutateAsync: uploadGalleryImageRequest,
  } = useCgMutation<Base>({
    key:
      route.params.itemType !== undefined &&
      route.params.itemType === SCREEN.EXPERT_ALBUM
        ? EXPERT_UPLOAD_IMAGE_IN_ALBUM
        : ADD_GALLERY_IMAGES,
    url:
      route.params.itemType !== undefined &&
      route.params.itemType === SCREEN.EXPERT_ALBUM
        ? EXPERT_UPLOAD_IMAGE_IN_ALBUM
        : ADD_GALLERY_IMAGES,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: { 'Content-Type': 'multipart/form-data' },
    offSuccessToast: true,
    disableLoader: true,
  });

  //API active pagent event ----------------------------------------- START
  const {
    data: activePagaentEventListData,
    mutateAsync: getActivePageantEventRequest,
    isLoading: activeEventLoader,
  } = useCgMutation<Base<Pageant[]>>({
    key:
      GET_ACTIVE_EVENT_BY_PAGEANT + Param.PAGAENT_ID + route.params.pageantId,
    url:
      GET_ACTIVE_EVENT_BY_PAGEANT +
      Param.PAGAENT_ID +
      route.params.pageantId +
      Param.GALLERY_ID_ +
      route?.params?.albumId,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  //API active pagent event ----------------------------------------- END

  /**
   * It uploads the image to the server.
   */
  const onUploading = async () => {
    if (selectImagesPath.length === 1) {
      setTimeout(() => {
        setUploaderProgress(0.2);
        setTimeout(() => {
          setUploaderProgress(0.5);
          setTimeout(() => {
            setUploaderProgress(0.7);
          }, 500);
        }, 500);
      }, 500);
    }
    const res = await uploadGalleryImageRequest();
    if (selectImagesPath.length > 1) {
      setUploaderProgress(imageUploadcounter / selectImagesPath.length);
    }
    if (imageUploadcounter === selectImagesPath.length && res.success) {
      setUploaderProgressVisible(false);
      refeshAlbumImageScreen();
      setTimeout(() => {
        toast(res.message, toastType.SUCESS_TOAST);
        navigation.goBack();
      }, 200);
    } else if (res.success) {
      setImageUploadCounter(imageUploadcounter + 1);
    } else {
      setImageUploadCounter(0);
      refeshAlbumImageScreen();
      navigation.goBack();
    }
  };

  /**
   * It refreshes the screen.
   */
  const refeshAlbumImageScreen = () => {
    if (route.params.itemType === SCREEN.EXPERT_ALBUM) {
      setScreenRefresh(
        REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE,
      );
    } else {
      setScreenRefresh(REFESH_SCREEN.SUB_GALLERY);
      setScreenRefresh(REFESH_SCREEN.GALLERY);
    }
  };

  /**
   * It checks if the user is connected to the internet, if not it will show a message.
   * If the user is connected to the internet, it will check if the gallery type is a pageant gallery and
   * if the active event is undefined.
   * If the active event is undefined, it will show an error message.
   * If the active event is not undefined, it will set the event error to an empty string and set the
   * uploader progress visible to true.
   * If the selectImagesPath[selectImagesPath.length - 1].uri.length === 0, it will pop the last item in
   * the array.
   * It will then set the image upload counter to the current image upload counter + 1.
   *
   */
  const onUploadClick = async () => {
    if (
      route.params.isImagePicker !== undefined &&
      route.params.isImagePicker
    ) {
      route?.params?.onImageSelected(selectImagesPath);
      navigation.goBack();
    } else if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(false);
      return false;
    } else if (
      route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
      activeEvent === undefined &&
      route?.params?.isExtra !== undefined &&
      !route?.params?.isExtra
    ) {
      setEventError(translations.THIS_FIELD_REQUIRED);
    } else {
      setEventError('');
      setUploaderProgressVisible(true);
      if (selectImagesPath[selectImagesPath.length - 1].uri.length === 0) {
        selectImagesPath.pop();
      }

      setImageUploadCounter(imageUploadcounter + 1);
    }
  };

  useEffect(() => {
    if (!isLoading && error) {
      refeshAlbumImageScreen();
      navigation.goBack();
    }
  }, [error]);

  useEffect(() => {
    if (imageUploadcounter > 0) {
      if (route.params.itemType === SCREEN.EXPERT_ALBUM) {
        if (
          route.params.expertAlbumType === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH
        ) {
          setUpdateImageBody({
            record_images: selectImagesPath[imageUploadcounter - 1],
            gallery_id: route?.params?.albumId,
            album_type: EXPERT_ALBUM_TYPE.PAGEANT_ALBUM,
          });
        } else if (
          route.params.expertAlbumType ===
          EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
        ) {
          setUpdateImageBody({
            record_images: selectImagesPath[imageUploadcounter - 1],
            gallery_id: route?.params?.albumId,
            album_type: EXPERT_ALBUM_TYPE.CONTESTANT_ALBUM,
          });
        }
      } else if (
        route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
        activeEvent !== undefined &&
        route?.params?.isExtra !== undefined &&
        !route?.params?.isExtra
      ) {
        setUpdateImageBody({
          record_image: selectImagesPath[imageUploadcounter - 1],
          iteration: imageUploadcounter,
          gallery_id: route?.params?.albumId,
          event_id: activeEvent?.id,
        });
      } else {
        setUpdateImageBody({
          record_image: selectImagesPath[imageUploadcounter - 1],
          iteration: imageUploadcounter,
          gallery_id: route?.params?.albumId,
        });
      }

      setTimeout(() => {
        onUploading();
      }, 400);
    }
  }, [imageUploadcounter]);

  useEffect(() => {
    setItemSize(Dimensions.get('window').width + moderateScaleVertical(-10));
    setIsModalVisible(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isModalVisible && selectImagesPath.length < 1) {
        navigation.goBack();
      }
    }, 100);
  }, [isModalVisible]);

  /**
   * Handle multiple image selection from gallery
   * @param {ImagePickerResponse} response - Image picker response
   */
  const handleMultipleImageSelection = (response: ImagePickerResponse) => {
    if (response.didCancel || !response.assets || response.assets.length === 0) {
      return;
    }

    if (response.errorCode) {
      toast('Error selecting images', toastType.ERROR_TOAST);
      return;
    }

    // Remove existing plus button if any
    if (selectImagesPath.length > 0 && selectImagesPath[selectImagesPath.length - 1].uri === '') {
      setSelectImagesPath(prev => prev.slice(0, -1));
    }

    const newImages: LocalImage[] = [];
    
    response.assets.forEach((asset: Asset) => {
      if (asset.uri) {
        const uuidValue = uuid.v4();
        newImages.push({
          name: asset.fileName || `${uuidValue}.jpg`,
          uri: isIosDevice() ? asset.uri.replace('file://', '') : asset.uri,
          type: asset.type || 'image/jpeg',
          id: -1, // Default ID
          size: asset.fileSize ? asset.fileSize / (1024 * 1024) : 0,
        });
      }
    });

    // Add new images if total doesn't exceed 5
    if (selectImagesPath.length + newImages.length <= 5) {
      setSelectImagesPath(prev => [...prev, ...newImages]);
      
      // Add plus button if room for more
      if (selectImagesPath.length + newImages.length < 5) {
        addPlusButton();
      }
    } else {
      toast(
        translations.YOU_CAN_NOT_UPLOAD_MORE_THEN_5_IMAGES,
        toastType.ERROR_TOAST,
      );
      // Add plus button if there's still room
      if (selectImagesPath.length < 5) {
        addPlusButton();
      }
    }

    setTimeout(() => {
      setIsModalVisible(false);
    }, 100);

    if (
      route?.params?.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
      route?.params?.pageantId !== undefined &&
      route?.params?.isExtra !== undefined &&
      !route?.params?.isExtra
    ) {
      getAactivePagentEvent();
    }
  };

  /**
   * Handle single image selection
   * @param {ImagePickerResponse} response - Image picker response
   */
  const handleSingleImageSelection = (response: ImagePickerResponse) => {
    if (response.didCancel || !response.assets || response.assets.length === 0) {
      return;
    }

    if (response.errorCode) {
      toast('Error selecting image', toastType.ERROR_TOAST);
      return;
    }

    const asset = response.assets[0];
    if (!asset.uri) return;

    // Remove existing plus button
    if (selectImagesPath.length > 0 && selectImagesPath[selectImagesPath.length - 1].uri === '') {
      setSelectImagesPath(prev => prev.slice(0, -1));
    }

    const newImage: LocalImage = {
      name: asset.fileName || `${uuid.v4()}.jpg`,
      uri: isIosDevice() ? asset.uri.replace('file://', '') : asset.uri,
      type: asset.type || 'image/jpeg',
      id: -1, // Default ID
      size: asset.fileSize ? asset.fileSize / (1024 * 1024) : 0,
    };

    if (selectImagesPath.length < 5) {
      setSelectImagesPath(prev => [...prev, newImage]);
      
      setTimeout(() => {
        if (selectImagesPath.length < 4) {
          addPlusButton();
        }
      }, 200);
    }

    if (
      route?.params?.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
      route?.params?.pageantId !== undefined &&
      route?.params?.isExtra !== undefined &&
      !route?.params?.isExtra
    ) {
      getAactivePagentEvent();
    }
  };

  /**
   * Open gallery for multiple image selection
   */
  const openGallery = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      selectionLimit: 5 - selectImagesPath.filter(img => img.uri !== '').length,
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, handleMultipleImageSelection);
  };

  /**
   * Open camera for single image capture
   */
  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1,
      includeBase64: false,
    };

    launchCamera(options, handleSingleImageSelection);
  };

  /**
   * It gets the active pageant event.
   */
  const getAactivePagentEvent = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(false);
      return false;
    } else {
      setLoader(true);
      const res = await getActivePageantEventRequest();
      if (res?.data?.length === 1) {
        setActiveEvent(res?.data[0]);
      }

      setLoader(false);
    }
  };

  /**
   * If the image at the index is empty, show the modal. Otherwise, set the index to the index
   * @param {number} index - The index of the image that was clicked.
   */
  const onImageTab = (index: number) => {
    if (selectImagesPath[index]?.uri?.length === 0) {
      setIsModalVisible(true);
    } else {
      setIndex(index);
    }
  };

  /**
   * AddPlusButton() adds a plus button to the end of the array of images
   */
  const addPlusButton = () => {
    setSelectImagesPath(oldArray => [
      ...oldArray,
      {
        name: '',
        uri: '',
        type: '',
        size: 0,
        id: -1,
      },
    ]);
  };

  /**
   * It deletes an image from the array of images.
   * @param {number} index - The index of the image to be deleted
   */
  const onDeleteImageClick = (index: number) => {
    if (selectImagesPath.length === 5 && selectImagesPath[4]?.uri.length > 0) {
      setSelectImagesPath(
        selectImagesPath.filter(item => item !== selectImagesPath[index]),
      );
    } else {
      selectImagesPath.pop();
      setSelectImagesPath(
        selectImagesPath.filter(item => item !== selectImagesPath[index]),
      );
    }

    setTimeout(() => {
      if (selectImagesPath.length === 1) {
        navigation.goBack();
      } else {
        try {
          if (selectImagesPath.length > 2 && index === 0) {
            setIndex(index + 1);
          } else if (selectImagesPath.length > 2) {
            setIndex(index - 1);
          } else {
            setIndex(0);
          }
        } catch (error) {
          setIndex(0);
        }
      }
      addPlusButton();
    }, 20);
  };

  /**
   * Simple cropping function - resize and maintain aspect ratio
   * @param {number} index - The index of the image to be cropped
   */
  const onCropClick = async (index: number) => {
    const imageUri = selectImagesPath[index]?.uri;
    if (!imageUri) return;

    // Option 1: Using react-native-image-resizer (uncomment if installed)
    /*
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        imageUri,
        600,
        600,
        'JPEG',
        100,
        0,
      );
      
      if (resizedImage.uri) {
        const newArray = selectImagesPath.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              uri: isIosDevice() ? resizedImage.uri.replace('file://', '') : resizedImage.uri,
              size: resizedImage.size / (1024 * 1024),
            };
          }
          return item;
        });
        setSelectImagesPath(newArray);
        toast('Image cropped successfully', toastType.SUCESS_TOAST);
      }
    } catch (error) {
      console.error('Cropping error:', error);
      toast('Error cropping image', toastType.ERROR_TOAST);
    }
    */

    // Option 2: Simple alert for now - implement custom cropper if needed
    Alert.alert(
      'Crop Image',
      'Cropping functionality will be implemented with a custom cropper.',
      [
        { text: 'OK', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={
            route.params.galleryType === GALLERY_TYPE.CONTESTANT_GALLERY
              ? translations.UPLOAD_PHOTO_IN_ALBUM
              : route.params.albumName
          }
          isUnderLineRequired
          rightText={
            route.params.isImagePicker !== undefined &&
            route.params.isImagePicker
              ? translations.DONE
              : translations.SAVE
          }
          onPressRightText={onUploadClick}
        />

        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={styles.container}>
            {route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
              activePagaentEventListData?.data !== undefined &&
              activePagaentEventListData?.data.length === 0 &&
              selectImagesPath.length > 0 &&
              !activeEventLoader &&
              route?.params?.isExtra !== undefined &&
              !route?.params?.isExtra && (
                <View style={styles.inactiveMessageStyle}>
                  <Text style={styles.inactiveMessageLabel}>
                    {
                      translations.YOU_NEED_TO_HAVE_AN_ACTIVE_EVENT_TO_ADD_IMAGES_INTO_THE_ALBUM
                    }
                  </Text>
                </View>
              )}
            {route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
            selectImagesPath.length > 0 &&
            !route.params.isExtra ? (
              <View style={styles.activeEventContainer}>
                <FloatingDropdown
                  floatingText={translations.EVENT + ' ' + translations.NAME}
                  setText={value => setActiveEvent(value)}
                  value={activeEvent?.title}
                  isMandatory={true}
                  onFieldFocus={() => {
                    if (
                      activePagaentEventListData?.data !== undefined &&
                      activePagaentEventListData?.data.length > 0
                    ) {
                      setActivePageantEventVisible(true);
                    }
                  }}
                  errorMsg={eventError}
                />
                {(activePagaentEventListData?.data !== undefined &&
                  activePagaentEventListData?.data.length === 0 &&
                  selectImagesPath.length > 0 &&
                  !activeEventLoader) ||
                isAddActiveButtonVisible ? (
                  <View style={styles.counterTapHereContainer}>
                    <Text
                      style={styles.tapHereColorText}
                      onPress={() => {
                        navigation.dispatch(
                          StackActions.replace(SCREEN.EVENT_DETAIL, {
                            pageantEventDetailId: activeEvent?.id,
                            tab: EVENT_DETAIL_MENU_ID.GALLERY,
                          }),
                        );
                      }}
                    >
                      {translations.CLICK_HERE}
                    </Text>
                    <Text style={styles.tapHereText}>
                      {translations.TO_ADD_AN_EVENT}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
            <View style={styles.listContainer}>
              {selectImagesPath !== undefined &&
                selectImagesPath.length > 0 &&
                selectImagesPath[selectIndex]?.uri &&
                selectImagesPath[selectIndex]?.uri !== '' && (
                  <View>
                    <FastImageView
                      width={moderateScaleVertical(itemSize)}
                      height={moderateScaleVertical(itemSize)}
                      imageUrl={
                        selectImagesPath[selectIndex]?.uri !== undefined
                          ? selectImagesPath[selectIndex]?.uri
                          : ''
                      }
                      borderRadius={moderateScaleVertical(18)}
                    />
                    <TouchableOpacity
                      style={styles.cropContainer}
                      onPress={() => {
                        onCropClick(selectIndex);
                      }}
                    >
                      <images.Gallery.CropImage_ICON />
                    </TouchableOpacity>
                    <View style={styles.counterContainer}>
                      <Text style={styles.counterText}>
                        {selectIndex + 1 + translations.OUT_OF_5}
                      </Text>
                    </View>
                  </View>
                )}

              <View
                style={
                  route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
                  selectImagesPath.length > 0 &&
                  !route.params.isExtra
                    ? styles.pageantGalleryGridListContainer
                    : styles.gridListContainer
                }
              >
                <FlatList
                  horizontal={true}
                  data={selectImagesPath}
                  keyExtractor={(x, i) => i.toString()}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.gridItemContainer}
                      onPress={() => {
                        onImageTab(index);
                      }}
                    >
                      {item?.uri?.length === 0 ? (
                        <View style={styles.addMoreContiner}>
                          <images.Gallery.AddImage_ICON />
                        </View>
                      ) : (
                        <View>
                          <FastImageView
                            width={moderateScaleVertical(86)}
                            height={moderateScaleVertical(86)}
                            borderRadius={moderateScaleVertical(15)}
                            imageUrl={item.uri}
                            borderColor={
                              index === selectIndex ? color.RED : color.S_GRAY_2
                            }
                          />
                          <TouchableOpacity
                            style={styles.headShotDeleteContainer}
                            onPress={() => {
                              onDeleteImageClick(index);
                            }}
                          >
                            <images.Common.DeleteImageIcon />
                          </TouchableOpacity>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Updated ImagePickerModal props */}
        <ImagePickerModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          onMultiplsImageSelection={openGallery} // Now passes the gallery function
          onImageFound={openCamera} // Now passes the camera function
          cropperCircleOverlay={false}
          enableMultipleImage={true}
        />
        
        {activePagaentEventListData?.data !== undefined &&
          activePagaentEventListData?.data.length > 0 && (
            <CustomBottomModal
              isModalVisible={isActivePageantEventVisible}
              setIsModalVisible={setActivePageantEventVisible}
              data={activePagaentEventListData?.data}
              preSelectedValue={activeEvent?.id}
              parentCallback={selectedItem => {
                setActiveEvent(selectedItem);
                if (!selectedItem.is_phase_available) {
                  toast(
                    translations.THE_EVENT_DOES_NOT_THE_SELECTED_PHASE_OF_COMPETITION,
                    toastType.ERROR_TOAST,
                  );
                  setAddActiveButtonVisible(true);
                } else {
                  setAddActiveButtonVisible(false);
                }
              }}
              heading={translations.EVENT + ' ' + translations.NAME}
            />
          )}

        {isUploaderProgressVisible && (
          <ProgressLoader
            imageLoadedCounter={imageUploadcounter}
            progress={uploadingProgress}
            totalToUpload={selectImagesPath.length}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;