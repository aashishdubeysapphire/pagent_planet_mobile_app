// Import necessary dependencies and components from React Native
// Import custom mutations and endpoints
import {
  View,
  ScrollView,
  FlatList,
  LayoutChangeEvent,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../../common/header';
import CommentSimmer from './component/commentshimmer';
import ConvoDescription from '../../../common/crownconvocomponent';
import WriteCommentReply from './component/writecommentreply';
import CommentsCard from './component/commentscard';
import useCgMutation from '../../../../services/api/useCgMutation';
import {
  GET_POST_COMMENT_LIST,
  GET_POST_DETAILS_FOR_COMMENT,
} from '../../../../services/endpoints';
import {ConvoListItem} from '../../../../services/models/convo/convoListing';
import {Base} from '../../../../services/models/base';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../services/constants';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {CommentsListData} from '../../../../services/models/convo/commentslist';
import {COMP_STATE} from './localenum';
import KeyboardManager from 'react-native-keyboard-manager';
import {isIosDevice} from '../../../utils/helperFunction';
import {useKeyboard} from '@react-native-community/hooks';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {USER_DESHBOARD_TAB} from '../../../utils/enum';

// Define the Props interface for the component
interface Props {
  id: number;
  refetch: Function;
  autoSelect: boolean;
}

const Comment = props => {
  // Destructure props to access parameters from the route
  const {id, refetch, autoSelect = false}: Props = props.route.params;

  // Get navigation object for navigation between screens
  const navigation = useNavigation();
  const {keyboardHeight, keyboardShown} = useKeyboard();

  // Create refs and state variables
  const scrollRef = useRef();
  const textInput = useRef();

  // Perform initial actions when the component mounts
  useEffect(() => {
    // Fetch post details and handle keyboard for iOS devices
    hitGetPostDetails();
    if (isIosDevice()) {
      KeyboardManager.setEnable(false);
    }
  }, []);

  const [postShmmer, setPostShmmer] = useState(false);
  const [isnewCommentAdded, setIsnewCommentAdded] = useState(false);
  const [newCommentUplateList, setNewCommentUplateList] = useState([]);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState('');
  const [commentText, setcommentText] = useState('');
  const [item, setItem] = useState();
  const [scrollToheight, setScrollToheight] = useState(0);
  const [isAutoSelecting, setIsAutoSelecting] = useState(autoSelect);

  // Function to handle the layout change event
  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setScrollToheight(height);

    if (scrollToheight === 0) {
      setTimeout(() => {
        scrollRef?.current?.scrollTo({
          y: height,
          animated: true,
        });
        autoSelectCondition();
        setIsAutoSelecting(false);
      }, 300);
    }
  };

  // Function to auto-select the text input
  const autoSelectCondition = () => {
    if (isAutoSelecting === true) {
      textInput?.current?.focus();
    }
  };

  // Custom mutation to get post details
  const {mutateAsync: getPostDetails} = useCgMutation<Base<ConvoListItem>>({
    key: GET_POST_DETAILS_FOR_COMMENT + id,
    url: GET_POST_DETAILS_FOR_COMMENT + id,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });

  // Custom query to get comments for the post
  const {
    data: commentsData,
    fetchNextPage,
    isLoading: commentShimmer,
    refetch: paginationRefetch,
  } = useInfiniteHtQuery<CommentsListData>({
    key: GET_POST_COMMENT_LIST + id,
    url: GET_POST_COMMENT_LIST + id,
    page: Param.PAGE_,
    getDataArray: page => page?.commentList?.data?.length,
    disableLoader: true,
  });

  // Extract comment list data from the commentsData
  var commentsListData =
    commentsData?.pages
      ?.map(page => {
        if (
          page?.data?.commentList?.data !== null &&
          page?.data?.commentList?.data !== undefined
        ) {
          return page?.data?.commentList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  // Function to fetch post details
  const hitGetPostDetails = async () => {
    setPostShmmer(true);
    const res = await getPostDetails();
    if (res.status_code == ApiStatusType.BlockedUser) {
      navigation.goBack();
    } else if (res.success) {
      setItem(res.data);
    } else if (res.status_code === ApiStatusType.NOT_FOUND) {
      navigation.navigate(USER_DESHBOARD_TAB.CONVO, {
        clearConvoNotification: true,
      });
    } else if (res.status_code === ApiStatusType.ERROR) {
      navigation.navigate(USER_DESHBOARD_TAB.CONVO, {
        clearConvoNotification: true,
      });
    }
    setPostShmmer(false);
  };

  // Function to handle end of the comment list
  const onEndReached = async () => {
    if (commentsListData?.length > 4) {
      fetchNextPage();
    }
  };

  // Function to refetch the screen data
  const refetchScreen = async (
    type: COMP_STATE,
    isEditing: any,
    comment_detail: any,
  ) => {
    if (type == COMP_STATE.COMMENT && !isEditing) {
      addNewCommentsList(comment_detail);
    } else {
      await paginationRefetch();
      setIsnewCommentAdded(false);
    }
    !!refetch && refetch();

    const itemRes = await getPostDetails();
    if (itemRes.status_code == ApiStatusType.BlockedUser) {
      navigation.goBack();
      return;
    } else if (itemRes.success) {
      setItem(itemRes.data);
    }
  };

  // Function to add new comments to the list
  const addNewCommentsList = (comment_detail: any) => {
    commentsListData = isnewCommentAdded
      ? [comment_detail, ...newCommentUplateList]
      : [comment_detail, ...commentsListData];
    setNewCommentUplateList(commentsListData);
    setIsnewCommentAdded(true);
  };

  // Function to scroll to a specific height
  const scrollToheightFunc = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({
        y: scrollToheight,
        animated: true,
      });
    }, 300);
  };

  // Function to calculate the height of the bottom area
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
    <>
      <SafeAreaView style={styles.container}>
        <Header lable={'Post'} isUnderLineRequired fallbackToDashboardOnBack />
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="true"
          overScrollMode="never">
          {postShmmer ? (
            <>
              <CommentSimmer postShimmerOnly />
              <View style={styles.seperatorStyle} />
            </>
          ) : (
            !!item && (
              <View onLayout={event => onLayout(event)}>
                <ConvoDescription
                  item={item}
                  pageantTitle={item?.pageantSystemDetail?.title}
                  text={item?.body}
                  videoId={item?.video_id}
                  uri={item?.video_url}
                  noComments={item?.post_main_comment_count}
                  noLikes={item?.post_total_likes}
                  videoType={item?.video_type}
                  eventTitle={item?.post_event?.title}
                  imageUri={item?.post_image_url}
                  imageName={item?.image_name}
                  name={item?.postUsersWholikedList?.owner?.first_name}
                  refetch={refetchScreen}
                  textInput={textInput}
                />
                <View style={styles.seperatorStyle} />
              </View>
            )
          )}

          {commentShimmer ? (
            <CommentSimmer />
          ) : (
            <View style={styles.commentView}>
              <FlatList
                data={
                  isnewCommentAdded ? newCommentUplateList : commentsListData
                }
                onEndReached={onEndReached}
                keyboardShouldPersistTaps={'always'}
                initialNumToRender={100}
                renderItem={commentItem => (
                  <CommentsCard
                    item={commentItem.item}
                    refetchScreen={refetchScreen}
                    id={COMP_STATE.COMMENT}
                    onPressEdit={() => {
                      setIsEditingComment(true);
                      textInput?.current?.focus();
                      setcommentText(commentItem.item?.body);
                      setEditCommentId(commentItem.item.id);
                    }}
                  />
                )}
              />
              <View
                style={{
                  height: getBottomHeight(),
                }}
              />
            </View>
          )}
        </ScrollView>
        <WriteCommentReply
          textInput={textInput}
          id={id}
          type={COMP_STATE.COMMENT}
          refetchScreen={refetchScreen}
          isEditing={isEditingComment}
          setIsEditing={setIsEditingComment}
          editItemId={editCommentId}
          itemText={commentText}
          scrollToheightFunc={scrollToheightFunc}
        />
      </SafeAreaView>
    </>
  );
};

export default Comment;
