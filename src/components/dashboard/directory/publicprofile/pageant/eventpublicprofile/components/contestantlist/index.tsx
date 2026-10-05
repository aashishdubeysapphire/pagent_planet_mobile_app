import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AppImages from '../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../assets/translations';
import FastImageView from '../../../../../../../common/fastimageview';
import {ROLES} from '../../../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../../../utils/validations';
import {styles} from './styles';

interface Props {
  position?: number;
  imagePath: string | undefined;
  itemSize: number;
  ownerId: number | undefined;
  contestantName: string | undefined;
  title: string | undefined;
  numberOfLinesForName: number;
  numberOfLinesForTitle: number;
  horizontalView: boolean;
  isMinor: boolean;
  isActive: boolean;
  onItemClickListener?: (param1: number) => void;
  onTextClickListener?: (index: number) => void;
  onClaimButtonPress?: (index: number) => void;
}

const ContestantsList = ({
  position = -1,
  imagePath,
  ownerId,
  itemSize,
  contestantName,
  title,
  numberOfLinesForName,
  numberOfLinesForTitle,
  horizontalView,
  isMinor,
  isActive,
  onItemClickListener,
  onTextClickListener,
  onClaimButtonPress,
}: Props) => {
  const onItemClick = () => {
    if (onItemClickListener !== undefined && onItemClickListener !== null) {
      onItemClickListener(position);
    }
  };
  const onNameClick = () => {
    if (onTextClickListener !== undefined) {
      onTextClickListener(position);
    }
  };

  const onclaimProfileClick = () => {
    if (onClaimButtonPress !== undefined) {
      onClaimButtonPress(position);
    }
  };
  console.log('this is contestant list');
  return (
    <View
      style={{
        ...styles.gridSection,
        width: itemSize,
        marginBottom: horizontalView ? 0 : moderateScaleVertical(16),
      }}>
      <TouchableOpacity onPress={onItemClick} style={[styles.circleContainer]}>
        <FastImageView
          width={itemSize}
          height={itemSize}
          borderRadius={moderateScale(20)}
          imageUrl={imagePath}
        />
        {ownerId === ROLES.ADMIN_ID && (
          <TouchableOpacity
            onPress={onclaimProfileClick}
            style={{
              ...styles.claimSection,
              top: itemSize - moderateScaleVertical(34),
            }}>
            <AppImages.PUBLIC_PROFILE.WhiteClaimProfile />
            <Text style={styles.claimLabel}>
              {translations.CLAIM_PROFILE_SMALL}
            </Text>
          </TouchableOpacity>
        )}
        {isMinor || !isActive ? (
          <View style={styles.noProfileSection}>
            <AppImages.PUBLIC_PROFILE.NoProfileIcon />
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNameClick} style={[styles.textContainer]}>
        <Text style={styles.name} numberOfLines={numberOfLinesForName}>
          {contestantName}
        </Text>
        {checkIsNull(title) && (
          <Text style={styles.title} numberOfLines={numberOfLinesForTitle}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ContestantsList;
