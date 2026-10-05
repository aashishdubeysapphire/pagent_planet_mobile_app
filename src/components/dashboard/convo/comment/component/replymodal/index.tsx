import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomModal from '../../../../../common/bottommodal';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {COMP_STATE} from '../../localenum';
import CommentShimmer from '../commentshimmer';
import {GET_COMMENT_REPLIES_LIST} from '../../../../../../services/endpoints';
import {MethodTypes} from '../../../../../../services/constants';
import {FlatList} from 'react-native-gesture-handler';
import WriteCommentReply from '../writecommentreply';
import {
  capitalizeFirstLowercaseRest,
  isIosDevice,
} from '../../../../../utils/helperFunction';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {useIsFocused} from '@react-navigation/core';
import {useKeyboard} from '@react-native-community/hooks';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {ConvoListItem} from '../../../../../../services/models/convo/convoListing';
import CommentsCard from '../commentscard';

const ReplyModal = ({
  item,
  refetchScreen,
  textInput,
  isReplyModalVisible,
  setIsReplyModalVisible,
  replyScrollRef,
}) => {
  const isFocused = useIsFocused();
  const {keyboardHeight, keyboardShown} = useKeyboard();
  const [repliesList, setRepliesList] = useState();
  const [repliesShimmer, setRepliesShimmer] = useState(false);
  const [isEdititngReply, setIsEdititngReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editReplyId, setEditReplyId] = useState();
  const {mutateAsync: getRepliesList} = useCgMutation<ConvoListItem>({
    key: GET_COMMENT_REPLIES_LIST + item.id,
    url: GET_COMMENT_REPLIES_LIST + item.id,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  useEffect(() => {
    isFocused && hitRepliesListAPi();
  }, [isFocused]);

  const hitRepliesListAPi = async () => {
    setRepliesShimmer(true);
    const res1 = await getRepliesList();
    if (res1.success) {
      setRepliesList(res1.data?.repliesList);
    }
    setRepliesShimmer(false);
  };
  const refereshCommentmodule = async () => {
    const res1 = await getRepliesList();
    if (res1.success) {
      await refetchScreen();
      setRepliesList(res1.data?.repliesList);
    }
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      if (replyScrollRef.current) {
        replyScrollRef.current.scrollToEnd({animated: true});
      }
    }, 200);
  };
  const getBottomHeight = () => {
    if (isIosDevice()) {
      if (keyboardShown) {
        return keyboardHeight + moderateScaleVertical(80);
      } else {
        return moderateScaleVertical(80);
      }
    } else {
      return moderateScaleVertical(80);
    }
  };
  return (
    <BottomModal
      isModalVisible={isReplyModalVisible}
      setIsModalVisible={setIsReplyModalVisible}
      customStyles={[
        styles.modalHeight,
        {paddingHorizontal: moderateScaleVertical(16)},
      ]}>
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>{translations.REPLIES}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => setIsReplyModalVisible(false)}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          ref={replyScrollRef}>
          <CommentsCard item={item} id={COMP_STATE.REPLY_HEADER} />

          <View style={styles.replyView}>
            {repliesShimmer ? (
              <CommentShimmer />
            ) : (
              <FlatList
                data={repliesList}
                keyboardShouldPersistTaps={'always'}
                scrollEnabled={false}
                renderItem={props => (
                  <CommentsCard
                    item={props.item}
                    id={COMP_STATE.REPLY}
                    refetchScreen={refereshCommentmodule}
                    onPressEdit={() => {
                      setIsEdititngReply(true);
                      setTimeout(() => {
                        textInput?.current?.focus();
                      }, 300);
                      setReplyText(props.item?.body);
                      setEditReplyId(props.item.id);
                    }}
                  />
                )}
                ListFooterComponent={() => {
                  return <View style={{height: 60}} />;
                }}
              />
            )}
          </View>
          <View
            style={{
              height: getBottomHeight(),
            }}
          />
        </ScrollView>
      </View>

      <WriteCommentReply
        textInput={textInput}
        id={item.post_id}
        type={COMP_STATE.REPLY}
        name={
          capitalizeFirstLowercaseRest(item?.owner?.first_name) +
          ' ' +
          capitalizeFirstLowercaseRest(item?.owner?.last_name)
        }
        commentId={item.id}
        refetchScreen={refereshCommentmodule}
        isEditing={isEdititngReply}
        setIsEditing={setIsEdititngReply}
        editItemId={editReplyId}
        itemText={replyText}
        scrollToEnd={scrollToEnd}
      />
    </BottomModal>
  );
};

export default ReplyModal;
