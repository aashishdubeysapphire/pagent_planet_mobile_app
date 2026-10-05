import React, { useState } from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {SCREEN} from '../../../../../../../root/screenname';
import {GalleryItem} from '../../../../../../../services/models/gallery/galleryItem';
import {AgeDivision} from '../../../../../../../services/models/pageantdetails/ageDivision';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../common/commonalert';
import {
  GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
  GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY,
  PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_ALBUM_IMAGES,
} from '../../../../../../../services/endpoints';
import {Param} from '../../../../../../../services/constants';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {PARAM_VALUE} from '../../../../../../utils/enum';
import {emptyFunction} from '../../../../../../utils/helperFunction';
import {SortedRolesForPublicScreen} from '../../../../../../../services/models/user/user';

interface Props {
  data: any[] | undefined;
  navigation: any;
  profileId?: number;
  title: string;
  role?: AgeDivision;
  itemType?: string;
  albumId?: number;
  isNameClickEnable?: boolean;
  backgroundColor?: string;
  url?: string;
  sortedRolesForPublicScreen: SortedRolesForPublicScreen | undefined;
  subUrl?: string;
  onTextClickListener?: (index: number) => void;
  maxNoOfLines: number;
  isCLickDisable: boolean;
  isNameClickAble: boolean;
  isPublicProfileView: any;
  isPublicProfileAlbumImage: any;
}

const AlbumList = ({
  data,
  navigation,
  profileId,
  title,
  sortedRolesForPublicScreen,
  role,
  itemType,
  url,
  subUrl,
  albumId,
  backgroundColor,
  onTextClickListener,
  maxNoOfLines,
  isCLickDisable = false,
  isNameClickAble = true,
  isPublicProfileView,
  isPublicProfileAlbumImage,
}: Props) => {
  const netInfo = useNetInfo();
  const [isClickDisable, setClickDisable] = useState(true);
  const onViewAllClicked = () => {
    if (isCLickDisable || !isClickDisable) {
      return;
    }
    setClickDisable(false);
    setTimeout(() => {
      setClickDisable(true);
    }, 1000);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (itemType === SCREEN.EXPERT_ALBUM) {
        navigation.navigate(SCREEN.EXPERT_ALBUM, {
          profileId: profileId,
          role: role,
          tag: new Date().getMilliseconds(),
          albumId: albumId,
          isPublicProfileView: isPublicProfileView,
          isPublicProfileAlbumImage: isPublicProfileAlbumImage,
          itemType: SCREEN.EXPERT_ALBUM,
          expert: sortedRolesForPublicScreen,
        });
      } else if (itemType === SCREEN.EXPERT_PEGEANT_WORK_WITH) {
        navigation.navigate(SCREEN.EXPERT_PEGEANT_WORK_WITH, {
          profileId: profileId,
          role: role,
        });
      } else if (itemType === SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH) {
        navigation.navigate(SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH, {
          profileId: profileId,
          role: role,
          tag: new Date().getMilliseconds(),
          isPublicProfileView: isPublicProfileView,
          isPublicProfileAlbumImage: isPublicProfileAlbumImage,
        });
      } else if (
        itemType === SCREEN.PAGEANT_PUBLIC_PROFILE &&
        url === undefined
      ) {
        navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_STAFF, {
          profileId: profileId,
        });
      } else if (
        (itemType === SCREEN.PAGEANT_PUBLIC_PROFILE && url !== undefined) ||
        (itemType === SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE && url !== undefined)
      ) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_GALLERY, {
          url: url,
          subUrl: subUrl,
          profileId: profileId,
        });
      } else {
        navigation.navigate(SCREEN.PUBLIC_PROFILE_GALLERY, {
          profileId: profileId,
          role: role,
        });
      }
    }
  };

  const onAlbumClick = (galleryItem: GalleryItem, index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (itemType === SCREEN.EXPERT_ALBUM) {
        if (galleryItem.gallery_id !== undefined) {
          galleryItem.id = galleryItem.gallery_id;
        }
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES, {
          galleryItem: galleryItem,
          role: role,
          isMoveImageActive: false,
          profileId: profileId,
          expertAlbumType: albumId,
          tag: new Date().getMilliseconds(),
          galleryParam: Param.PROFILE_TYPE + role?.slug,
          itemType: itemType,
          isPublicProfileView: isPublicProfileView,
          isPublicProfileAlbumImage: isPublicProfileAlbumImage,
          expert: sortedRolesForPublicScreen,
        });
      } else if (itemType === SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH) {
        if (galleryItem.imagesCount > 0) {
          navigation.navigate(SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES, {
            galleryItem: galleryItem,
            role: role,
            tag: new Date().getMilliseconds(),
            isPublicProfileView: isPublicProfileView,
            isPublicProfileAlbumImage: isPublicProfileAlbumImage,
            profileId: profileId,
          });
        } else {
          toast(translations.NO_IMAGES_FOUND, toastType.ERROR_TOAST);
        }
      } else if (
        (itemType === SCREEN.EXPERT_PEGEANT_WORK_WITH &&
          galleryItem.inactive_tag === undefined) ||
        (itemType === SCREEN.EXPERT_PEGEANT_WORK_WITH &&
          !galleryItem.inactive_tag) ||
        itemType === SCREEN.EXPERT_ALBUM
      ) {
        if (galleryItem.imagesCount > 0) {
          let path =
            PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_ALBUM_IMAGES +
            Param.GALLERY_ID;

          if (data !== undefined && data[index].gallery_id !== undefined) {
            path =
              path +
              data[index].gallery_id +
              Param.ALBUM_CREATED_BY +
              data[index].record_id +
              Param.PROFILE_ID +
              profileId +
              Param.PROFILE_TYPE_ +
              role?.slug;
          } else if (data !== undefined) {
            path =
              path +
              data[index].id +
              Param.ALBUM_CREATED_BY +
              data[index].record_id +
              Param.PROFILE_ID +
              profileId +
              Param.PROFILE_TYPE_ +
              role?.slug;
          }

          if (galleryItem.imagesCount > 0) {
            navigation.navigate(SCREEN.EXPERT_PEGEANT_WORK_WITH_ALBUM_IMAGES, {
              galleryItem: data[index],
              profile: profileId,
              url: path,
            });
          } else {
            toast(translations.NO_IMAGES_FOUND, toastType.ERROR_TOAST);
          }
        } else {
          toast(translations.NO_PROFILE_DETAIL, toastType.ERROR_TOAST);
        }
      } else if (itemType === SCREEN.PAGEANT_PUBLIC_PROFILE) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_SUB_GALLERY, {
          galleryItem: galleryItem,
          url:
            GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY +
            galleryItem.id +
            Param.PROFILE_ID +
            galleryItem.profile_id,
          subUrl: subUrl,
        });
      } else if (itemType === SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_SUB_GALLERY, {
          galleryItem: galleryItem,
          url:
            GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY +
            galleryItem.id +
            Param.PROFILE_ID +
            galleryItem.profile_id,
          subUrl: subUrl,
        });
      } else {
        navigation.navigate(SCREEN.PUBLIC_PROFILE_SUB_GALLERY, {
          profileId: profileId,
          galleryItem: galleryItem,
        });
      }
    }
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
      }}>
      <View style={styles.headerSection}>
        <Text style={styles.heading}> {title} </Text>
        <TouchableOpacity onPress={onViewAllClicked}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        initialNumToRender={5}
        renderItem={({item, index}) => (
          <GalleryGridItem
            position={index}
            onTextClickListener={onTextClickListener}
            //   imageId={item.id.toString()}
            isNameClickAble={isNameClickAble}
            imageUrl={
              item?.image_full_url !== undefined
                ? item?.image_full_url
                : item?.selectedImage !== undefined
                ? item?.selectedImage
                : item?.headshot_image_full_url !== undefined
                ? item?.headshot_image_full_url
                : item?.image
            }
            maxLines={maxNoOfLines}
            onItemClickListener={() => {
              if (!isCLickDisable) {
                if (item?.imagesCount > 0 || itemType === SCREEN.EXPERT_ALBUM) {
                  onAlbumClick(item, index);
                } else {
                  emptyFunction();
                }
              }
            }}
            editIcon={false}
            isFeaturedImage={false}
            size={moderateScale(154)}
            isMinor={
              itemType === SCREEN.EXPERT_PEGEANT_WORK_WITH ||
              itemType === SCREEN.CONTESTANT_PUBLIC_PROFILE
                ? translations.NO_SMALL
                : item?.contestantDetails?.is_minor
            }
            ownerId={item?.contestantDetails?.owner_id}
            status={
              itemType === SCREEN.EXPERT_PEGEANT_WORK_WITH ||
              itemType === SCREEN.CONTESTANT_PUBLIC_PROFILE
                ? item?.status
                : item?.contestantDetails?.status
            }
            label={
              title === translations.STAFF
                ? item?.first_name + ' ' + item?.last_name
                : item?.album_name === PARAM_VALUE.GENERAL
                ? translations.EXTRA
                : item?.album_name
            }
            imageCount={
              item?.album_name === PARAM_VALUE.GENERAL
                ? undefined
                : item?.imagesCount
            }
          />
        )}
      />
    </View>
  );
};

export default AlbumList;
