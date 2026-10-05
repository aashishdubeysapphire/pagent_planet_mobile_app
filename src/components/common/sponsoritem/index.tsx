import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import FastImageView from '../../../components/common/fastimageview';
import translations from '../../../assets/translations';
import {styles} from './styles';

interface Props {
  position?: number;
  label?: string;
  imageUrl: string;
  maxLines?: number;
  size: number;
  horizontal: boolean;
  onItemClickListener?: (param1: number) => void;
}

/* A function that returns a view. */
const SponsorItem = ({
  position = -1,
  label,
  maxLines,
  imageUrl,
  size,
  horizontal,
  onItemClickListener,
}: Props) => {
  // const styles = useStyle();

  /**
   * If the onItemClickListener is not null, then call the onItemClickListener function with the
   * position as the argument.
   */
  const onItemClick = () => {
    if (onItemClickListener !== undefined && onItemClickListener !== null) {
      onItemClickListener(position);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: size,
        height: moderateScaleVertical(size + 80),
        marginBottom: horizontal ? 0 : moderateScale(15),
        marginRight: horizontal ? moderateScale(12) : moderateScale(16),
      }}>
      <TouchableOpacity
        style={{
          ...styles.bottomSection,
          top: size + moderateScaleVertical(38),
          width: size - moderateScale(16),
        }}
        onPress={onItemClick}>
        <AppImages.PUBLIC_PROFILE.GreyWebsiteIcon />
        <Text style={styles.buttonStyle}>{translations.VIEW_WEBSITE}</Text>
      </TouchableOpacity>

      <View style={{...styles.container, width: size}}>
        <View style={styles.imageSection}>
          <FastImageView
            width={size}
            height={size}
            borderRadius={moderateScale(25)}
            imageUrl={imageUrl}
          />
        </View>
        <View style={styles.titleSection}>
          <Text numberOfLines={maxLines} style={styles.title}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SponsorItem;
