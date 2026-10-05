import {View, Text, TouchableOpacity, Keyboard, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import {onShare} from '../../../../utils/helperFunction';
import translations from '../../../../../assets/translations';
import {ConvoListItem} from '../../../../../services/models/convo/convoListing';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {LIKE_DISLIKE_POST} from '../../../../../services/endpoints';
import {Base} from '../../../../../services/models/base';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
interface Props {
  item: ConvoListItem;
}
const LikeShareComment = ({
  item,
  onPressLike,
  isPostLiked = 0,
  textInput,
  refetch,
}: Props) => {
  const likeDislikeBody = {
    post_id: item?.id,
    post_like_status: isPostLiked,
  };
  const [, setSelected] = useState(false);
  const selectedAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const {mutateAsync: likeDislikePost} = useCgMutation<Base>({
    key: LIKE_DISLIKE_POST,
    url: LIKE_DISLIKE_POST,
    body: likeDislikeBody,
    offSuccessToast: true,
    disableLoader: true,
  });

  const animationScaling = () => {
    Animated.sequence([
      Animated.timing(selectedAnim, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(selectedAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSelected(prev => !prev));
  };

  const hitLIkeDislikeApi = async () => {
    animationScaling();
    onPressLike();
    const res = await likeDislikePost();
    if (res.success) {
      refetch();
    }
    Keyboard.dismiss();
  };
  const onPressComments = () => {
    navigation.navigate(SCREEN.CONVO_COMMENTS, {
      id: item?.id,
      refetch: refetch,
      autoSelect: true,
    });
    if (textInput) {
      textInput?.current?.focus();
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.line} />
      <View style={styles.bigRowView}>
        <TouchableOpacity style={styles.row} onPress={hitLIkeDislikeApi}>
          <Animated.View style={[{transform: [{scale: selectedAnim}]}]}>
            {isPostLiked == 1 && <AppImages.CONVO.tpp_favourite_icon />}
          </Animated.View>
          {isPostLiked !== 1 && <AppImages.CONVO.tpp_favourite_icon_empty />}

          <Text style={styles.text}>{translations.LIKE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, styles.extraStyles]}
          onPress={onPressComments}>
          <AppImages.CONVO.tpp_comment_icon />
          <Text style={styles.text}>{translations.COMMENT}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => onShare(item?.dynamic_url, '')}>
          <AppImages.CONVO.tpp_share_icon />
          <Text style={styles.text}>{translations.SHARE}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikeShareComment;
