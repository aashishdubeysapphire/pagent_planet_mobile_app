import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../../assets/images/AppImages';
import FastImageView from '../../../../../../../common/fastimageview';
import translations from '../../../../../../../../assets/translations';
import {ROLES} from '../../../../../../../utils/enum';
import { styles } from './styles';

interface Props {
  position?: number;
  label?: string;
  title: string | undefined;
  totalVotes: number | undefined;
  imageUrl: string | undefined;
  maxLines?: number;
  size: number;
  borderRadius?: number;
  ownerId: number | undefined;
  onItemClickListener?: (param1: number) => void;
  onBottomTextClickListener?: (param1: number) => void;
  onTextClickListener?: (index: number) => void;
  onClaimButtonPress?: (index: number) => void;
  isMinor: boolean;
  isActive: boolean;
  isHideReceivedVotes: boolean;
}

/* A function that returns a view. */
const ContestantVoteItem = ({
  position = -1,
  label,
  title,
  totalVotes = 0,
  maxLines = 1,
  imageUrl,
  ownerId,
  borderRadius = 22,
  size,
  isMinor,
  isActive,
  onItemClickListener,
  onBottomTextClickListener,
  onTextClickListener,
  onClaimButtonPress,
  isHideReceivedVotes = false,
}: Props) => {
  /**
   * If the onItemClickListener is not null, then call the onItemClickListener function with the
   * position as the argument.
   */
  const onItemClick = () => {
    if (onItemClickListener !== undefined && onItemClickListener !== null) {
      onItemClickListener(position);
    }
  };

  const onBottomClickListener = () => {
    if (
      onBottomTextClickListener !== undefined &&
      onBottomTextClickListener !== null
    ) {
      onBottomTextClickListener(position);
    }
  };

  const onNameClick = () => {
    if (onTextClickListener !== undefined) {
      onTextClickListener(position);
    }
  };

  const onClaimProfileClick = () => {
    if (onClaimButtonPress !== undefined) {
      onClaimButtonPress(position);
    }
  };

  return (
    <View
      style={[
        styles.gridContainer,
        {
          width: size,
          height: size + moderateScaleVertical(72 + 34),
          borderRadius: moderateScaleVertical(borderRadius),
        },
      ]}>
      <TouchableOpacity
        onPress={onBottomClickListener}
        style={[
          styles.bottomTitlContainer,
          {
            width: size - moderateScaleVertical(12),
            height: moderateScaleVertical(75),
            borderRadius: moderateScaleVertical(borderRadius),
          },
        ]}>
        <AppImages.PCA.VOTES />
        <Text style={styles.voteNow}>{translations.VOTE_NOW}</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.titleContainer,
          {
            width: size,
            height: size + moderateScaleVertical(72),
            borderRadius: moderateScaleVertical(borderRadius),
          },
        ]}>
        <View style={[styles.subTitlContainer, {top: size}]}>
          <TouchableOpacity onPress={onNameClick}>
            <Text style={styles.title} numberOfLines={maxLines}>
              {label}
            </Text>
          </TouchableOpacity>
          <>
            {title !== undefined && title !== null && title?.length > 0 && (
              <Text numberOfLines={maxLines} style={styles.titleName}>
                {title}
              </Text>
            )}
          </>
          {isHideReceivedVotes && (
            <View style={[styles.voteRecivedTitlContainer]}>
              <AppImages.PCA.VOTES_RECEIVED />
              <Text numberOfLines={maxLines} style={styles.voteReceived}>
                {totalVotes !== undefined && totalVotes !== null
                  ? totalVotes + translations.VOTES_RECEIVED
                  : translations.NO_VOTES}
              </Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={onItemClick}>
        <FastImageView
          width={size}
          height={size}
          borderRadius={moderateScaleVertical(borderRadius)}
          imageUrl={imageUrl}
        />
        {ownerId === ROLES.ADMIN_ID && (
          <TouchableOpacity
            onPress={onClaimProfileClick}
            style={{
              ...styles.claimSection,
              top: size - moderateScaleVertical(31),
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
        ) : null
        }
      </TouchableOpacity>
    </View>
  );
};

export default ContestantVoteItem;
