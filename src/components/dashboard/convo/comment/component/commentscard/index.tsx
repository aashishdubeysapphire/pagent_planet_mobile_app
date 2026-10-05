import {View, Text} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {styles} from './styles';
import FastImageView from '../../../../../common/fastimageview';
import {moderateScale} from '../../../../../utils/responsiveSize';
import translations from '../../../../../../assets/translations';
import {CommentListItem} from '../../../../../../services/models/convo/commentslist';
import {UserContext} from '../../../../../../store/userStore';
import WarningModel from '../../../../../common/warningmodel';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  DELETE_COMMENT,
  DELETE_REPLY,
} from '../../../../../../services/endpoints';
import {Base} from '../../../../../../services/models/base';
import ReplyModal from '../replymodal';
import {COMP_STATE} from '../../localenum';
import {ROLES} from '../../../../../utils/enum';
import Hyperlink from 'react-native-hyperlink';
import {color} from '../../../../../../assets/colorConstant';
interface Props {
  item?: CommentListItem;
}
//id below refer to the type of component ie comment or reply
const CommentsCard = ({item, refetchScreen, onPressEdit, id = 0}: Props) => {
  const {storeData} = useContext(UserContext);
  const textInput = useRef();
  const replyScrollRef = useRef();

  const [deleteWarningModal, setDeleteWarningModal] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const {mutateAsync: deleteComment} = useCgMutation<Base>({
    key: DELETE_COMMENT,
    url: DELETE_COMMENT,
    body: {
      comment_id: item?.id,
      post_id: item?.post_id,
    },
    disableLoader: true,
  });
  const {mutateAsync: deleteReply} = useCgMutation<Base>({
    key: DELETE_REPLY,
    url: DELETE_REPLY,
    body: {
      reply_id: item?.id,
    },
    disableLoader: true,
  });
  const onDeleteCommentclick = async () => {
    setDeleteWarningModal(false);
    setDeleteLoader(true);
    if (id == COMP_STATE.COMMENT) {
      const res = await deleteComment();
      if (res.success) {
        await refetchScreen();
      }
    } else {
      const res = await deleteReply();
      if (res.success) {
        await refetchScreen();
      }
    }
    setDeleteLoader(false);
  };
  const checkIsedited = () => {
    if (
      item?.created_at !== item?.updated_at &&
      item?.owner?.id === storeData.data?.user?.id
    ) {
      return <Text style={styles.editedText}>{translations.EDITED}</Text>;
    }
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      if (replyScrollRef.current) {
        replyScrollRef.current.scrollToEnd({animated: true});
      }
    }, 200);
  };

  const getUserName = () => {
    if (item?.owner?.id === ROLES.ADMIN_ID) {
      return translations.PP;
    } else {
      return item?.owner?.first_name + ' ' + item?.owner?.last_name;
    }
  };
  return (
    <View
      style={{
        ...styles.mainView,
        opacity: deleteLoader ? 0.2 : 1,
      }}>
      <View style={styles.container}>
        <View>
          <FastImageView
            width={
              id == COMP_STATE.REPLY ? moderateScale(24) : moderateScale(38)
            }
            height={
              id == COMP_STATE.REPLY ? moderateScale(24) : moderateScale(38)
            }
            imageUrl={
              id == COMP_STATE.REPLY
                ? item?.owner_image
                : item?.main_comment_owner_image
            }
            borderRadius={100}
            isCircle={true}
            isProfileImage={true}
          />
        </View>
        <View style={styles.textStyles}>
          <View style={styles.headingView}>
            <Text style={styles.userName}>{getUserName()}</Text>
            <Text style={styles.timeText}>
              {id == COMP_STATE.REPLY
                ? item?.comment_reply_output_time_to_show
                : item?.comment_output_time_to_show}
            </Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Hyperlink linkDefault={true} linkStyle={{color: color.P_PINK}}>
              <Text style={styles.description}>
                {item?.body} {checkIsedited()}
              </Text>
            </Hyperlink>
          </View>
        </View>
      </View>
      {id !== COMP_STATE.REPLY_HEADER && (
        <View
          style={{
            ...styles.headingView,
            ...styles.bottmView,

            marginLeft:
              id == COMP_STATE.REPLY ? moderateScale(34) : moderateScale(48),
          }}>
          {id !== COMP_STATE.REPLY && (
            <Text
              style={styles.TouchText}
              onPress={
                deleteLoader
                  ? null
                  : () => {
                      setIsReplyModalVisible(true);
                      setTimeout(() => {
                        textInput?.current?.focus();

                        scrollToEnd();
                      }, 300);
                    }
              }>
              {translations.REPLY}
            </Text>
          )}

          {storeData.data?.user.id === item?.user_id && (
            <>
              <Text
                style={styles.TouchText}
                onPress={
                  deleteLoader
                    ? null
                    : () => {
                        onPressEdit();
                      }
                }>
                {translations.EDIT}
              </Text>
              <Text
                style={styles.TouchText}
                onPress={
                  deleteLoader
                    ? null
                    : () => {
                        setDeleteWarningModal(true);
                      }
                }>
                {translations.DELETE}
              </Text>
            </>
          )}
        </View>
      )}

      {item?.comment_total_replies != null &&
        id !== COMP_STATE.REPLY_HEADER && (
          <Text
            style={[styles.TouchText, styles.bottmView, styles.pinkColor]}
            onPress={
              deleteLoader
                ? null
                : () => {
                    setIsReplyModalVisible(true);
                  }
            }>
            {translations.VIEW} {item?.comment_total_replies}{' '}
            {translations.REPLIES}
          </Text>
        )}
      <WarningModel
        msg={
          id == COMP_STATE.REPLY
            ? translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_REPLY
            : translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_COMMENT
        }
        isModalVisible={deleteWarningModal}
        setConfirm={onDeleteCommentclick}
        setIsModalVisible={setDeleteWarningModal}
        headingStyle={styles.modalHeading}
      />
      {id == COMP_STATE.COMMENT && isReplyModalVisible && (
        <ReplyModal
          item={item}
          refetchScreen={refetchScreen}
          textInput={textInput}
          isReplyModalVisible={isReplyModalVisible}
          setIsReplyModalVisible={setIsReplyModalVisible}
          replyScrollRef={replyScrollRef}
        />
      )}
    </View>
  );
};

export default CommentsCard;
