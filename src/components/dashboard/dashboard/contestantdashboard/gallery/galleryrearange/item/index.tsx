import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import FastImageView from '../../../../../../common/fastimageview';
import AppImages from '../../../../../../../assets/images/AppImages';

interface Props {
  position?: number;
  selectedIndex?: number;
  imageUrl: string;
  size: number;
  title: string;
  onItemClickListener?: (param1: number) => void;
}

/* A function that returns a component. */
const ItemRearrange = ({
  position = -1,
  selectedIndex = -1,
  imageUrl,
  size,
  onItemClickListener,
  title,
}: Props) => {
  const styles = useStyle();

  /**
   * If the onItemClickListener is not null, then call the onItemClickListener function with the position
   * as the argument.
   */
  const onItemClick = () => {
    if (onItemClickListener !== null) {
      onItemClickListener(position);
    }
  };
  return (
    <TouchableOpacity onPress={onItemClick} style={styles.gridStyle}>
      <View style={[styles.item, {height: size, width: size}]}>
        <FastImageView
          width={size}
          height={size}
          borderRadius={moderateScaleVertical(20)}
          imageUrl={imageUrl}
        />
        <Image
          source={AppImages.Common.LinearGradientIcon}
          style={{...styles.overlayImage, height: size, width: size}}
        />
        {position !== selectedIndex ? <View style={styles.shadow} /> : null}

        <View style={styles.titleContainer}>
          <Text style={styles.titleLabel} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRearrange;
