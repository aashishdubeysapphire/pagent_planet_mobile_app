import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './styles';
import {moderateScale} from '../../../../../utils/responsiveSize';
import translations from '../../../../../../assets/translations';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import FastImageView from '../../../../../common/fastimageview';
import {UserContext} from '../../../../../../store/userStore';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {ConvoListItem} from '../../../../../../services/models/convo/convoListing';
import {Base} from '../../../../../../services/models/base';
import {
  ADD_NEW_COMMENT,
  ADD_NEW_REPLY,
  EDIT_COMMENT,
  EDIT_REPLY,
} from '../../../../../../services/endpoints';
import {COMP_STATE} from '../../localenum';
import {isIosDevice} from '../../../../../utils/helperFunction';
import {useKeyboard} from '../../../../../utils/useGetKeyboardHeight';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const WriteCommentReply = ({
  textInput,
  type,
  id,
  refetchScreen,
  isEditing,
  setIsEditing,
  editItemId,
  itemText,
  scrollToheightFunc,
  name,
  commentId,
  scrollToEnd,
}) => {
  const {storeData} = useContext(UserContext);
  const getPlaceholder = () => {
    if (type == COMP_STATE.COMMENT) {
      return isEditing
        ? translations.EDIT_YOUR_COMMENT
        : translations.WRITE_A_COMMENT;
    } else {
      return isEditing
        ? translations.EDIT_YOUR_REPLY
        : translations.WRITE_A_REPLY + name;
    }
  };
  const keyboardHeight = useKeyboard();
  useEffect(() => {
    keyBoardCondition();
  }, [keyboardHeight]);
  const keyBoardCondition = () => {
    if (keyboardHeight == 0) {
      textInput?.current?.blur();
    }
  };
  const [placeholder, setplaceholder] = useState(getPlaceholder());
  useEffect(() => {
    if (isEditing) {
      setText(itemText + '');
    } else {
      setText('');
    }
    setplaceholder(getPlaceholder());
  }, [isEditing, itemText]);

  const [text, setText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const {mutateAsync: addNewComment} = useCgMutation<Base<ConvoListItem>>({
    key: ADD_NEW_COMMENT,
    url: ADD_NEW_COMMENT,
    body: {
      post_id: id,
      body: text,
    },
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: addNewReply} = useCgMutation<Base<ConvoListItem>>({
    key: ADD_NEW_REPLY,
    url: ADD_NEW_REPLY,
    body: {
      post_id: id,
      comment_id: commentId,
      body: text,
    },
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: editComment} = useCgMutation<Base>({
    key: EDIT_COMMENT,
    url: EDIT_COMMENT,
    body: {
      comment_id: editItemId,
      comment_data: text,
    },
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: editReply} = useCgMutation<Base>({
    key: EDIT_REPLY,
    url: EDIT_REPLY,
    body: {
      reply_id: editItemId,
      reply_data: text,
    },
    disableLoader: true,
    offSuccessToast: true,
  });

  const onPressSend = async () => {
    setisLoading(true);
    if (type == COMP_STATE.COMMENT) {
      if (isEditing) {
        const commentRes = await editComment();
        if (commentRes.success) {
          await refetchScreen();
          setText('');
          setIsEditing(false);
        }
      } else {
        const res = await addNewComment();
        if (res.success) {
          await refetchScreen(type, isEditing, res.data?.comment_detail);
          setText('');
          scrollToheightFunc();
        }
      }
    } else {
      if (type == COMP_STATE.REPLY) {
        if (isEditing) {
          const replyRes = await editReply();
          if (replyRes.success) {
            await refetchScreen();
            setText('');
            setIsEditing(false);
          }
        } else {
          const res = await addNewReply();
          if (res.success) {
            await refetchScreen();
            setText('');
            scrollToEnd();
          }
        }
      }
    }

    setisLoading(false);
    Keyboard.dismiss();
  };
  const renderingView = () => {
    return (
      <View>
        <View
          style={{
            ...styles.container,
            bottom: isIosDevice()
              ? type == COMP_STATE.COMMENT
                ? 0
                : keyboardHeight == 0
                ? getStatusBarHeight()
                : keyboardHeight
              : 0,
          }}>
          {isEditing && (
            <View style={styles.isEditing}>
              <Text style={styles.editReplyText}>
                {type == COMP_STATE.COMMENT
                  ? translations.EDIT_YOUR_COMMENT
                  : translations.EDIT_YOUR_REPLY}
              </Text>
              <TouchableOpacity
                style={styles.crossIcon}
                onPress={
                  isLoading
                    ? null
                    : () => {
                        setIsEditing(false);
                      }
                }>
                <AppImages.Common.greyCrossSmall />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.writeCommentView}>
            <View style={styles.dpView}>
              <FastImageView
                width={moderateScale(46)}
                height={moderateScale(46)}
                imageUrl={
                  storeData.data?.user.personal_details.profile_image_url
                }
                borderRadius={100}
                isCircle
                isProfileImage={true}
              />
            </View>
            <View
              style={{
                ...styles.textInputStyle,
                backgroundColor: !!text ? color.WHITE : color.S_GRAY_1,
              }}>
              <TextInput
                ref={textInput}
                placeholder={placeholder}
                selectionColor={color.P_PINK}
                style={styles.textinput}
                value={text}
                editable={!isLoading}
                onChangeText={val => {
                  setText(val);
                }}
                maxLength={5000}
                multiline={true}
              />
              {!!text &&
                (isLoading ? (
                  <ActivityIndicator size={'small'} color={color.P_PINK} />
                ) : (
                  <TouchableOpacity
                    style={styles.hitapiButton}
                    onPress={onPressSend}>
                    <AppImages.CONVO.tpp_send_icon
                      width={moderateScale(20)}
                      height={moderateScale(20)}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return isIosDevice() ? (
    <KeyboardAvoidingView
      behavior={
        isIosDevice() ? (type == COMP_STATE.COMMENT ? 'position' : '') : ''
      }>
      {renderingView()}
    </KeyboardAvoidingView>
  ) : (
    <>{renderingView()}</>
  );
};

export default WriteCommentReply;
