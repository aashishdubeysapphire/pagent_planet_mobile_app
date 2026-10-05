import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {internetState} from '../../../../../../common/commonalert';
import translations from '../../../../../../../assets/translations';
import Header from '../../../../../../common/header';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../assets/images/AppImages';
import TagsChip from '../../../../../../common/tagchip';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  DELETE_ALBUM_IMAGE,
  SAVE_FEATURED_IMAGE,
  GET_TAG_OF_IMAGE,
} from '../../../../../../../services/endpoints';
import {
  EXPERT_ALUM_TYPE,
  GALLERY_TYPE,
  PARAM_VALUE,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';
import {Base} from '../../../../../../../services/models/base';
import {TagsResponse} from '../../../../../../../services/models/gallery/tagsResponse';
import WarningModel from '../../../../../../common/warningmodel';
import {Image} from '../../../../../../../services/models/gallery/image';
import {MethodTypes} from '../../../../../../../services/constants';
import {useNetInfo} from '@react-native-community/netinfo';
import ImageSlider from './components/imageslider';
import {EVENT_DETAIL_MENU_ID} from '../../../../pageantdashboard/pageantdetail/eventlist/eventdetail/components/menu';
import {
  CONTESTANT_WORK_WITH_IMAGE_DETAIL,
  IMAGE_DETAIL,
} from '../../../../pageantdashboard/addpageant/addpagentrules/loccalArray';

const AlbumDetail = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);
  const setLoader = useSetLoader();
  const [index, setIndex] = useState(0);
  const [newFeaturedImageId, setMakeFeaturedImageId] = useState('');
  const [isTagsUpdated, setTagUpdate] = useState(false);
  const [isCurrentImageFeatured, setCurrentImageFeatured] = useState(0);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [galleryImageList, setGalleryImagesList] = useState<Image[]>(
    route?.params?.albumList,
  );
  const {
    storeData: {refresh},
  } = useAppStore();
  const [currentImageId, setCurrentImage] = useState('');
  const [deleteImageWarning, setDeleteImageWarning] = useState(false);
  const [isImageFeaturedModel, setImageFeaturedModel] = useState(false);
  const [isPublicProfileView] = useState(route?.params?.isPublicProfileView);
  const [refeshList, setRefeshList] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();

  //----------------------------------- API
  const {mutateAsync: imageDeleteRequest} = useCgMutation<Base>({
    key: DELETE_ALBUM_IMAGE,
    isJson: false,
    method: MethodTypes.GET,
    url: DELETE_ALBUM_IMAGE + currentImageId,
  });

  const makeFeatureImageBody = {
    image_id: newFeaturedImageId,
    gallery_id: route?.params?.albumId,
  };
  const {mutateAsync: makeImageAsFeaturedRequest} = useCgMutation<Base>({
    key: SAVE_FEATURED_IMAGE,
    body: makeFeatureImageBody,
    url: SAVE_FEATURED_IMAGE,
    disableLoader: true,
  });

  const {mutateAsync: getTagOfImageRequest, isLoading} =
    useCgMutation<TagsResponse>({
      key: GET_TAG_OF_IMAGE,
      url: GET_TAG_OF_IMAGE + currentImageId,
      method: MethodTypes.GET,
      offSuccessToast: true,
      disableLoader: true,
    });
  //----------------------------------- End

  /**
   * `moveToAddTagScreen` is a function that navigates to the `AddTag` screen, passing in the
   * `galleryImageList[index]` as the `albumImage`, the `index` as the `index`, the
   * `route?.params?.album` as the `album`, and the `route.params.galleryParam` as the `galleryParam`
   */
  const moveToAddTagScreen = () => {
    navigation.navigate(SCREEN.ADD_TAG, {
      albumImage: galleryImageList[index],
      index: index,
      imageId: galleryImageList[index].id,
      tag: new Date().getMilliseconds(),
      album: route?.params?.album,
      galleryParam: route.params.galleryParam,
      itemType: route?.params?.itemType,
      expertAlbumType: route?.params?.expertAlbumType,
      isPublicProfileView: route?.params?.isPublicProfileView,
    });
  };

  useEffect(() => {
    setItemSize(Dimensions.get('window').width);
    if (galleryImageList !== undefined && galleryImageList.length > 0) {
      if (route?.params?.isFeatured === undefined) {
        galleryImageList[0].isFeaturedImage = true;
      }
    }

    setCurrentIndex(route?.params?.index);
    setCurrentImage(galleryImageList[route?.params?.index]?.id + '');
    setRefeshList(true);
    setTimeout(() => {
      setRefeshList(false);
    }, 500);
  }, []);

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  useEffect(() => {
    const hardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardwareBack.remove();
  }, [onPressBack]);

  const backButtonHandled = () => {
    navigation.goBack();
  };

  useEffect(() => {
    checkTagRefresh();
  }, [refresh]);

  /**
   * If the refresh screen is set to update the image tags, then set the refresh screen to none, update
   * the image tags, and then update the image tags again after a second
   */
  const checkTagRefresh = async () => {
    if (REFESH_SCREEN.UPDATE_IMAGE_TAG === refresh) {
      updateImageTags();
      setScreenRefresh(REFESH_SCREEN.NONE);

      setTimeout(() => {
        updateImageTags();
      }, 1000);
    }
  };

  /**
   * It updates the tags of an image.
   */
  const updateImageTags = async () => {
    const response = await getTagOfImageRequest();
    if (response.success) {
      setScreenRefresh(
        REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE,
      );
      if (
        route.params.isPublicProfileAlbumImage !== undefined &&
        route.params.isPublicProfileAlbumImage &&
        response?.data?.is_my_profile_tagged !== undefined &&
        !response?.data?.is_my_profile_tagged
      ) {
        resetSlider();
      }

      galleryImageList[index].tags = [];
      galleryImageList[index].tags = response.data?.tags;
    }
  };

  /**
   * It sets the makeFeaturedImageId to the id of the image that is clicked on.
   */
  const onSetAsFeatruredImageClick = async () => {
    if (isImageFeaturedModel) {
      setMakeFeaturedImageId(galleryImageList[index].id + '');
      setTimeout(() => {
        setLoader(true);
        onMakeFeatruredImage();
      }, 100);
    } else {
      setImageFeaturedModel(true);
    }
  };

  /**
   * It sets the current index to the new index if the new index is within the bounds of the gallery
   * image list
   * @param {number} newIndex - The index of the image you want to set as the current image.
   */
  const setCurrentIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < galleryImageList.length) {
      setIndex(newIndex);
      setCurrentImage(galleryImageList[newIndex].id + '');
    }
    setTimeout(() => {
      setTagUpdate(true);
      setTimeout(() => {
        setTagUpdate(false);
      }, 200);
    }, 100);
  };

  /**
   * It makes the image as featured image.
   */
  const onMakeFeatruredImage = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(false);
      return false;
    } else {
      const response = await makeImageAsFeaturedRequest();
      if (response.success) {
        if (route?.params?.itemType === SCREEN.EXPERT_ALBUM) {
          setScreenRefresh(
            REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE,
          );
        } else {
          setScreenRefresh(REFESH_SCREEN.SUB_GALLERY);
        }

        for (const entry of galleryImageList) {
          entry.isFeaturedImage = false;
        }
        galleryImageList[index].isFeaturedImage = true;
        setCurrentImageFeatured(index);
        setLoader(false);
        setTimeout(() => {
          setScreenRefresh(REFESH_SCREEN.GALLERY);
        }, 300);
      }
    }
  };

  /**
   * "When the user clicks the 'refresh' button, the gallery screen will refresh, and then the
   * sub-gallery screen will refresh."
   *
   * The reason for this is that the gallery screen is the parent of the sub-gallery screen
   */
  const refreshAlbumGallery = async () => {
    if (route?.params?.itemType === SCREEN.EXPERT_ALBUM) {
      if (route?.params?.album?.album_name !== translations.EXTRA) {
        setScreenRefresh(REFESH_SCREEN.EXPERT_ALBUM_VIEW);
        setTimeout(() => {
          setScreenRefresh(
            REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE,
          );
        }, 500);
      } else {
        setScreenRefresh(
          REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE,
        );
      }
    } else {
      setScreenRefresh(REFESH_SCREEN.SUB_GALLERY);
      setTimeout(() => {
        setScreenRefresh(REFESH_SCREEN.GALLERY);
      }, 200);
    }
  };

  /**
   * It deletes the item from the local list
   */
  const deleteItemFromLocalList = async () => {
    setGalleryImagesList(
      galleryImageList.filter(item => item.id !== galleryImageList[index].id),
    );
  };

  /**
   * If the image being deleted is the featured image, then set the first image in the gallery to be the
   * featured image
   */
  const resetFeaturedImage = async () => {
    if (isCurrentImageFeatured === index) {
      try {
        if (index === 0) {
          galleryImageList[1].isFeaturedImage = true;
        } else {
          galleryImageList[0].isFeaturedImage = true;
        }

        setCurrentImageFeatured(0);
      } catch (error) {
        //empty
      }
    }
  };

  /**
   * If the index is less than the length of the galleryImageList, then set the current image to the
   * next image in the list. Otherwise, set the current image to the previous image in the list.
   */
  const activeNextImage = async () => {
    setTimeout(() => {
      if (index + 1 < galleryImageList.length) {
        setCurrentImage(galleryImageList[index + 1].id + '');
      } else if (index - 1 >= 0) {
        setCurrentImage(galleryImageList[index - 1].id + '');
      } else {
        setCurrentImage(galleryImageList[0].id + '');
      }
    }, 400);
  };

  /**
   * If the user deletes the last image in the gallery, the gallery will close
   */
  const checkImageListSize = async () => {
    setTimeout(() => {
      if (galleryImageList.length === 1) {
        navigation.goBack();
      }
    }, 600);
  };

  /**
   * When the user clicks the delete image button, the delete image warning is set to true
   */
  const onDeleteImageClick = async () => {
    setDeleteImageWarning(true);
  };

  /**
   * It deletes an image from the gallery.
   * @returns the value of the variable `refeshList`.
   */
  const onDeleteImage = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(false);
      return false;
    } else {
      setDeleteImageWarning(false);
      setLoader(true);
      const response = await imageDeleteRequest();
      if (response.success) {
        refreshAlbumGallery();
        resetSlider();
      }
    }
  };
  const resetSlider = async () => {
    deleteItemFromLocalList();
    activeNextImage();
    checkImageListSize();
    setRefeshList(true);
    setTimeout(() => {
      setRefeshList(false);
      resetFeaturedImage();
    }, 500);
  };

  const getInfoList = () => {
    if (
      route?.params?.expertAlbumType === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
    ) {
      return [IMAGE_DETAIL[0], CONTESTANT_WORK_WITH_IMAGE_DETAIL[0]];
    } else {
      return IMAGE_DETAIL;
    }
  };

  const isTagAvailable = () => {
    if (
      galleryImageList[index]?.tags !== undefined &&
      galleryImageList[index]?.tags !== null
    ) {
      for (const rootTags of galleryImageList[index]?.tags) {
        if (rootTags?.tags?.length > 0) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={
            route?.params?.album?.album_name !== undefined
              ? route?.params?.album?.album_name === PARAM_VALUE.GENERAL
                ? translations.EXTRA
                : route?.params?.album?.album_name
              : translations.EXTRA
          }
          infoIcon
          infoDataArray={getInfoList()}
          isUnderLineRequired
        />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <View
              style={{
                marginBottom: moderateScaleVertical(16),
                width: itemSize,
                height: itemSize - moderateScaleVertical(60),
              }}>
              {!refeshList && (
                <ImageSlider
                  imageList={galleryImageList}
                  itemSize={itemSize}
                  currentIndex={index}
                  setCurrentIndex={setCurrentIndex}
                />
              )}
              {!refeshList &&
                route?.params?.album?.album_name !== undefined &&
                galleryImageList[index]?.isFeaturedImage && (
                  <View style={styles.makeFeatrueContainer}>
                    <AppImages.Gallery.FeaturedImageTag_ICON />
                  </View>
                )}
              {route?.params?.album?.album_name !== undefined &&
                !galleryImageList[index]?.isFeaturedImage &&
                isPublicProfileView === undefined && (
                  <TouchableOpacity
                    style={[styles.makeFeatrueContainer]}
                    onPress={onSetAsFeatruredImageClick}>
                    <AppImages.Gallery.MakeFeaturImageIcon />
                  </TouchableOpacity>
                )}

              <View style={styles.countStyle}>
                <Text style={styles.indexCount}>{index + 1}</Text>
                <Text style={styles.totalCountStyle}>
                  {'/' + galleryImageList?.length}
                </Text>
              </View>

              {isPublicProfileView === undefined && (
                <TouchableOpacity
                  style={styles.deleteImageLogo}
                  onPress={onDeleteImageClick}>
                  <AppImages.Gallery.DeleteCircleWhite_ICON />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.container}>
              {route.params.galleryType === GALLERY_TYPE.PAGEANT_GALLERY &&
              route.params.pageantId !== galleryImageList[index]?.event_id ? (
                <Text style={styles.clickHereLine}>
                  {translations.TO_ADD_EDIT_THE_IMAGE_TAGS_GO_TO_EVENT_PAGE_OR}
                  <Text
                    style={styles.colorText}
                    onPress={() => {
                      try {
                        navigation.navigate(SCREEN.EVENT_DETAIL, {
                          pageantEventDetailId:
                            galleryImageList[index].event_id,
                          plan: route.params.plan,
                          parentImageUrl: route.params.parentImageUrl,
                          parentBannerImageUrl:
                            route.params.parentBannerImageUrl,
                          isComingFromPageantAlbum: true,
                          tab: EVENT_DETAIL_MENU_ID.GALLERY,
                          parentWebsiteUrl: route.params.parentWebsiteUrl,
                          parentTitle: route.params.parentTitle,
                          activeTabId: route.params.galleryType,
                        });
                      } catch (error) {
                        //
                      }
                    }}>
                    {translations.CLICK_HERE}
                  </Text>
                </Text>
              ) : (
                <View>
                  {(!isLoading &&
                    !isTagsUpdated &&
                    isPublicProfileView === undefined) ||
                  (!isLoading &&
                    !isTagsUpdated &&
                    isPublicProfileView !== undefined &&
                    isPublicProfileView &&
                    galleryImageList[index]?.is_my_profile_tagged !==
                      undefined &&
                    galleryImageList[index]?.is_my_profile_tagged &&
                    isTagAvailable()) ? (
                    <View style={styles.bottomContainer}>
                      <Text style={styles.managetagheaader}>
                        {galleryImageList[index]?.tags?.length > 0
                          ? translations.MANAGE_TAGS
                          : translations.ADD_A_NEW_TAG}
                      </Text>
                      <TouchableOpacity onPress={moveToAddTagScreen}>
                        {galleryImageList[index]?.tags?.length > 0 ? (
                          <AppImages.Dashboard.edit_ICON />
                        ) : (
                          <AppImages.Dashboard.addPageant_ICON />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              )}

              {galleryImageList[index]?.tags?.length > 0 &&
              !isLoading &&
              !isTagsUpdated ? (
                galleryImageList[index]?.tags?.map(item => {
                  return (
                    <TagsChip
                      title={item.title}
                      tags={item.tags}
                      isPublicProfileView={route?.params?.isPublicProfileView}
                    />
                  );
                })
              ) : (
                <View style={styles.emptyContainer}>
                  {(!isLoading &&
                    galleryImageList[index]?.tags?.length === 0) ||
                  (!isTagsUpdated &&
                    galleryImageList[index]?.tags?.length === 0) ? (
                    <Text style={styles.newTags}>
                      {isPublicProfileView !== undefined && isPublicProfileView
                        ? translations.NO_TAGS_ADDED
                        : translations.NEW_TAGS_WILL_APPEAR_HERE}
                    </Text>
                  ) : null}
                </View>
              )}
            </View>

            <WarningModel
              msg={translations.DO_YOU_WANT_TO_DELETE_THIS_IMAGE}
              isModalVisible={deleteImageWarning}
              setConfirm={onDeleteImage}
              setIsModalVisible={setDeleteImageWarning}
              headingStyle={styles.modalHeading}
            />
            <WarningModel
              msg={
                translations.ARE_YOU_SURE_YOU_WANT_TO_MAKE_TO_MAKE_THIS_IMAGE_YOUR_FEATURED_ALBUM_IMAGE
              }
              isModalVisible={isImageFeaturedModel}
              setConfirm={onSetAsFeatruredImageClick}
              setIsModalVisible={setImageFeaturedModel}
              headingStyle={styles.modalHeading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AlbumDetail;
