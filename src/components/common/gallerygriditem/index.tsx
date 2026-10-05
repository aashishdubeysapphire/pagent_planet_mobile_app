import React from 'react';
import {TouchableOpacity, Text, View, Linking} from 'react-native';
import useStyle from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import FastImageView from '../../../components/common/fastimageview';
import {SCREEN} from '../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {PROFILE_STATUS} from '../../utils/enum';
import translations from '../../../assets/translations';
import {color} from '../../../assets/colorConstant';
import {emptyFunction} from '../../utils/helperFunction';

interface Props {
  position?: number;
  label?: string;
  imageUrl: string;
  isList?: boolean;
  maxLines?: number;
  editIcon?: boolean;
  isFeaturedImage?: boolean;
  size?: number;
  borderRadius?: number;
  contestant_id?: number;
  onItemClickListener?: (param1: number) => void;
  onTextClickListener?: (index: number) => void;
  onLongPressItem?: (param1: number) => void;
  itemSelectable?: boolean;
  selectedItemIndexes?: any;
  imageId?: string;
  customStyles?: any;
  isMinor?: string;
  status?: string;
  imageCount: number;
  ticket: number | null;
  url: string| null;
  block: boolean;
  isNameClickAble: boolean;
}

/* A function that returns a view. */
const GalleryGridItem = ({
  position = -1,
  label,
  maxLines = 1,
  imageUrl,
  isList,
  borderRadius = 20,
  editIcon = false,
  size,
  isFeaturedImage,
  contestant_id,
  onItemClickListener,
  onLongPressItem,
  onTextClickListener,
  itemSelectable,
  selectedItemIndexes,
  imageId,
  customStyles,
  isMinor,
  status,
  imageCount,
  url = null,
  ticket = null,
  block = false,
  isNameClickAble = true,
}: Props) => {
  const styles = useStyle();
  const navigation = useNavigation();

  /**
   * If the onItemClickListener is not null, then call the onItemClickListener function with the
   * position as the argument.
   */
  const onItemClick = () => {
    if (onItemClickListener !== undefined && onItemClickListener !== null) {
      onItemClickListener(position);
    } else if (url) {
      Linking.openURL(url);
    }
  };
  const onNameClick = () => {
    if (onTextClickListener !== undefined) {
      onTextClickListener(position);
    }
  };

  const isLabelActive = () => {
    return (
      isNameClickAble &&
      status === PROFILE_STATUS.ACTIVE &&
      isMinor === translations.NO_SMALL
    );
  };
  const _onPress = () => {
    if (block) {
      return 
    } else {
      onItemClick();
    }
  };
  return (
    <View
      style={{
        ...styles.gridStyle,
        marginStart: customStyles ? moderateScale(12) : moderateScale(16),
        marginBottom: block ? 0 : moderateScaleVertical(16),
      }}>
      {isList ? (
        <TouchableOpacity
          onPress={_onPress}
          activeOpacity={block ? 1 : 0.5}
          onLongPress={onLongPressItem}
          style={{
            ...styles.listContainer,
            alignItems: ticket ? 'flex-start' : 'center',
            borderWidth: block ? 0 : 1,
            paddingVertical: block
              ? moderateScaleVertical(8)
              : moderateScaleVertical(16),
            paddingHorizontal: block ? 0 : moderateScaleVertical(16),
          }}>
          <View
            style={{
              ...styles.circleContainer,
              height: block
                ? moderateScaleVertical(48)
                : moderateScaleVertical(60),
              width: block
                ? moderateScaleVertical(48)
                : moderateScaleVertical(60),
            }}>
            <FastImageView
              width={
                block ? moderateScaleVertical(48) : moderateScaleVertical(60)
              }
              height={
                block ? moderateScaleVertical(48) : moderateScaleVertical(60)
              }
              borderRadius={moderateScaleVertical(60)}
              imageUrl={imageUrl}
              isCircle
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                ...styles.listBox,
                width: block
                  ? width - moderateScale(207)
                  : width - moderateScale(120),
              }}>
              <Text
                numberOfLines={maxLines}
                ellipsizeMode="tail"
                style={styles.editTitle}>
                {label}
              </Text>
              <View style={styles.countContainer}>
                {itemSelectable && (
                  <View style={[{marginBottom: moderateScaleVertical(24)}]}>
                    {selectedItemIndexes.includes(imageId) ? (
                      <AppImages.Common.selectedIcon_ICON />
                    ) : (
                      <View style={styles.selctableContainer} />
                    )}
                  </View>
                )}
                {imageCount >= 0 && (
                  <Text
                    numberOfLines={maxLines}
                    ellipsizeMode="tail"
                    style={styles.imageCountLargeStyle}>
                    {imageCount}
                  </Text>
                )}
              </View>
            </View>
            {ticket !== null && (
              <View style={styles.listBox1}>
                <AppImages.Common.TicketPurchasedIcon />
                <Text
                  numberOfLines={maxLines}
                  ellipsizeMode="tail"
                  style={styles.editTitle1}>
                  {ticket + ' Ticket Purchased'}
                </Text>
              </View>
            )}
          </View>
          {block && ( 
            <TouchableOpacity style={styles.btnStyle} onPress={onItemClick}>
              <Text style={styles.btnText}>{translations.UNBLOCK_}</Text>
            </TouchableOpacity>
          )}
          {editIcon && (
            <TouchableOpacity
              style={{
                top: -moderateScaleVertical(20),
                right: moderateScale(38),
              }}
              onPress={() =>
                navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
                  id: contestant_id,
                  fromViewAll: true,
                })
              }>
              <AppImages.Common.editCircle_ICON />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onItemClick}
          onLongPress={onLongPressItem}
          activeOpacity={imageCount > 0 ? 0.2 : 0.5}
          style={[
            styles.gridContainer,
            {width: size, borderRadius: moderateScaleVertical(borderRadius)},
          ]}>
          <FastImageView
            width={size}
            height={size}
            borderRadius={moderateScaleVertical(borderRadius)}
            imageUrl={imageUrl}
          />

          {isFeaturedImage && (
            <View style={styles.featuredImageLogo}>
              <AppImages.Gallery.FeaturedImageTag_ICON
                width={moderateScaleVertical(20)}
                height={moderateScaleVertical(20)}
              />
            </View>
          )}

          {itemSelectable && (
            <TouchableOpacity style={styles.editLogo} onPress={onItemClick}>
              {selectedItemIndexes.includes(imageId) ? (
                <AppImages.Common.selectedIcon_ICON />
              ) : (
                <AppImages.Common.circle_ICON />
              )}
            </TouchableOpacity>
          )}

          {label !== undefined && label?.length > 0 && (
            <View
              style={{
                ...styles.titleContainer,
                height:
                  maxLines > 1
                    ? moderateScaleVertical(48)
                    : moderateScaleVertical(32),
              }}>
              {imageCount >= 0 ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.imageCountStyle}>
                  {imageCount + ' '}
                  {imageCount > 1
                    ? translations.IMAGE + 's'
                    : translations.IMAGE}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={isLabelActive() ? onNameClick : emptyFunction}
                activeOpacity={isLabelActive() ? 0 : 1}>
                <Text
                  numberOfLines={maxLines}
                  ellipsizeMode="tail"
                  style={{
                    ...styles.gridTitle,
                    color: isLabelActive() ? color.P_PINK : color.BLACK,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GalleryGridItem;
