import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import translations from '../../../../assets/translations';
import {toast, toastType} from '../../../common/commonalert';
import {styles, stylesR} from './styles';
import HTMLView from 'react-native-htmlview';
import Header from '../../../common/header';
import {
  GiftedChat,
  Composer,
  Send,
  Bubble,
  Day,
  Time,
  InputToolbar,
} from 'react-native-gifted-chat';
import {color} from '../../../../assets/colorConstant';
import AppImages from '../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import moment from 'moment';
import {TIME_FORMAT} from '../../../utils/datetimemanger';
import {
  checkIsConnected,
  createFormData,
  getFileExtension,
  isIosDevice,
  isOnlyExpert,
} from '../../../utils/helperFunction';
import {font} from '../../../../assets/fonts/fontsConstant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePickerModal from '../../../common/imagepickermodal';
import {MethodTypes, Param} from '../../../../services/constants';
import {
  BLOCK_USER,
  COMPOSE_MESSAGE,
  GET_CART_COUNT,
  GET_CHAT_LIST,
} from '../../../../services/endpoints';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {UserContext} from '../../../../store/userStore';
import Loader from '../../../common/customloader';
import useCgMutation from '../../../../services/api/useCgMutation';
import {androidCameraPermission} from '../../../utils/permissions';
import {
  FILE_EXT,
  FILE_TYPE,
  MESSAGE_MENU,
  ROLES,
  USER_DESHBOARD_TAB,
} from '../../../utils/enum';
import {downloadImage} from '../../../utils/downloadImage';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../root/screenname';
import FilterModal from '../components/filtermodal';
import WarningModel from '../../../common/warningmodel';
import {Base} from '../../../../services/models/base';
import KeyboardManager from 'react-native-keyboard-manager';
import {User} from '../../../../services/models/user/user';
import {RootContext} from '../../../../store/rootStore';
import CustomComposer from './customComposer';
import {SafeAreaView} from 'react-native-safe-area-context';

const chatDraftStore: Record<string, string> = {};

type ChatComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  giftedTextInputProps?: any;
  onSend: () => void;
  onAttach: () => void;
  loading: boolean;
  canReply: boolean;
  isBlocked: boolean;
  placeholder: string;
};

const ChatComposer: React.FC<ChatComposerProps> = ({
  value,
  onChangeText,
  giftedTextInputProps,
  onSend,
  onAttach,
  loading,
  canReply,
  isBlocked,
  placeholder,
}) => {
  if (!canReply) return null;

  return (
    <View style={styles.composerRoot}>
      {/* Attachment */}
      {!loading && !isBlocked && (
        <TouchableOpacity style={styles.attachIcon} onPress={onAttach}>
          <AppImages.Common.attachmentIcon1 />
        </TouchableOpacity>
      )}

      {/* Input */}
      <View style={styles.inputWrapper}>
        <Composer
          text={value}
          textInputProps={{
            ...giftedTextInputProps,
            placeholder,
            onChangeText,
            editable: !loading && !isBlocked,
            placeholderTextColor: color.S_GRAY_3,
            style: styles.textInput,
            multiline: true,
          }}
        />
      </View>

      {/* Send / Loader */}
      {loading ? (
        <View style={styles.renderLoaderView}>
          <ActivityIndicator size="small" color={color.P_PINK} />
        </View>
      ) : !isBlocked ? (
        <TouchableOpacity
          style={[
            styles.renderSendView,
            value.trim().length === 0 && styles.renderSendDisabled,
          ]}
          onPress={onSend}
          disabled={value.trim().length === 0}>
          <AppImages.Common.sendIcon width={20} height={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

type ChatComposerSlotProps = {
  canReply: boolean;
  isBlocked: boolean;
  isOnlyExpertUser: boolean;
  giftedTextInputProps?: any;
  onPurchaseClick: () => void;
  onUnblockPress: () => void;
  value: string;
  onChangeText: (text: string) => void;
  onAttach: () => void;
  onSend: () => void;
  loading: boolean;
  placeholder: string;
};

const ChatComposerSlot: React.FC<ChatComposerSlotProps> = ({
  canReply,
  isBlocked,
  isOnlyExpertUser,
  giftedTextInputProps,
  onPurchaseClick,
  onUnblockPress,
  value,
  onChangeText,
  onAttach,
  onSend,
  loading,
  placeholder,
}) => {
  return (
    <View style={styles.composerView}>
      {!canReply && isOnlyExpertUser ? (
        <Text style={styles.noReplyStyle}>
          {translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE}
        </Text>
      ) : !canReply ? (
        <TouchableOpacity onPress={onPurchaseClick}>
          <Text style={styles.noReplyStyle}>
            <Text style={{color: color.P_PINK}}>
              {translations.PURCHASE_PLAN}
            </Text>
            {translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_REPLY}
          </Text>
        </TouchableOpacity>
      ) : isBlocked ? (
        <TouchableOpacity onPress={onUnblockPress}>
          <Text style={styles.noReplyStyle}>
            {translations.TO_UNBLOCK}
            <Text style={{color: color.P_PINK}}>{translations.TAP_HERE}</Text>
            {translations.TO_UNBLOCK1}
          </Text>
        </TouchableOpacity>
      ) : (
        <ChatComposer
          value={value}
          giftedTextInputProps={giftedTextInputProps}
          loading={loading}
          canReply={true}
          isBlocked={false}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onAttach={onAttach}
          onSend={onSend}
        />
      )}
    </View>
  );
};

type LastUpdatedFooterProps = {
  showRefresh: boolean;
  minutes: number;
  onRefreshPress: () => void;
};

const LastUpdatedFooter: React.FC<LastUpdatedFooterProps> = ({
  showRefresh,
  minutes,
  onRefreshPress,
}) => {
  return (
    <View
      style={{
        ...styles.footer,
        paddingBottom: moderateScaleVertical(60),
      }}>
      {showRefresh ? (
        <>
          <AppImages.Common.refresh />
          <Text style={styles.footerText}>
            Last Updated: {minutes} min ago
            <Text
              style={{...styles.footerText, color: color.P_PINK}}
              onPress={onRefreshPress}>
              {translations.TAP_HERE}{' '}
            </Text>
            <Text
              style={{
                ...styles.footerText,
                color: color.P_GRAY_BLACK_1,
                fontFamily: font.RobotoRegular,
              }}>
              To Refresh
            </Text>
          </Text>
        </>
      ) : null}
    </View>
  );
};

export const ChatScreen = props => {
  const draftKey = String(props?.route?.params ?? '');
  const [textMessage, setTextMessage] = useState(
    () => chatDraftStore[draftKey] ?? '',
  );
  const [fileDetails, setFileDetails] = useState(null);
  const navigation = useNavigation();
  const [threeDotMenuClicked, setThreeDotMenuClicked] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lastRefreshAtRef = React.useRef(moment());
  const {storeData} = useContext(UserContext);
  const {setCounter} = useContext(RootContext);
  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    offSuccessToast: true,
  });

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery({
    key: GET_CHAT_LIST + props?.route?.params,
    url: GET_CHAT_LIST + props?.route?.params,
    page: Param.PAGE_,
    getDataArray: page => page?.viewMessages?.data?.length,
    disableLoader: true,
  });

  useEffect(() => {
    setTextMessage(chatDraftStore[draftKey] ?? '');
  }, [draftKey]);

  const setDraftMessage = React.useCallback(
    (value: string) => {
      chatDraftStore[draftKey] = value;
      setTextMessage(value);
    },
    [draftKey],
  );

  const getComposeMsgbody = () => {
    return {
      message_id: props?.route?.params,
      message: textMessage,
      record_images: fileDetails ? fileDetails : '',
    };
  };
  const {mutateAsync: composeMsg} = useCgMutation({
    key: COMPOSE_MESSAGE,
    url: COMPOSE_MESSAGE,
    body: createFormData(getComposeMsgbody()),
    method: MethodTypes.Post,
    disableLoader: true,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
  });

  const {mutateAsync: hitBlockUserApi} = useCgMutation<Base>({
    key: BLOCK_USER,
    url: BLOCK_USER,
    body: {
      user_id: paginatedData?.pages[0]?.data?.otherUserId,
      unblock: paginatedData?.pages[0]?.data?.has_blocked,
    },
    offSuccessToast: false,
    disableLoader: true,
  });
  const checkFileTypeFromName = fileName => {
    return (
      getFileExtension(fileName) === FILE_EXT.png ||
      getFileExtension(fileName) === FILE_EXT.gif ||
      getFileExtension(fileName) === FILE_EXT.jpeg ||
      getFileExtension(fileName) === FILE_EXT.zip ||
      getFileExtension(fileName) === FILE_EXT.rar ||
      getFileExtension(fileName) === FILE_EXT.doc ||
      getFileExtension(fileName) === FILE_EXT.pdf ||
      getFileExtension(fileName) === FILE_EXT.docx
    );
  };
  const MessageThreeDotMenu = [
    {
      id: MESSAGE_MENU.DELETE,
      label: paginatedData?.pages[0]?.data?.has_blocked
        ? translations.UNBLOCK
        : translations.BLOCK_CONTACT,
      icon: paginatedData?.pages[0]?.data?.has_blocked ? (
        <AppImages.Common.Unblock />
      ) : (
        <AppImages.Common.Block />
      ),
    },
  ];
  const onImageFound = data => {
    if (
      data.type === FILE_TYPE.png ||
      data.type === FILE_TYPE.gif ||
      data.type === FILE_TYPE.jpeg ||
      data.type === FILE_TYPE.zip ||
      data.type === FILE_TYPE.rar ||
      data.type === FILE_TYPE.doc ||
      data.type === FILE_TYPE.pdf ||
      data.type === FILE_TYPE.docx ||
      checkFileTypeFromName(data.name)
    ) {
      setFileDetails(data);
      onSend();
    } else {
      toast(translations.UPLOAD_FILE_COMPOSE_MSG_ERR, toastType.ERROR_TOAST);
    }
  };

  const reload = React.useCallback(async () => {
    await refetch();
  }, [refetch]);

  const onFooterRefresh = React.useCallback(async () => {
    if (!checkIsConnected()) {
      return;
    }
    await reload();
    lastRefreshAtRef.current = moment();
  }, [reload]);

  const chatData =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.viewMessages?.data !== null &&
          page?.data?.viewMessages?.data !== undefined
        ) {
          return page?.data?.viewMessages?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  useEffect(() => {
    if (isIosDevice()) {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(true);
    }
    getCartCountApi();
  }, []);

  const onPurchaseClick = React.useCallback(() => {
    navigation?.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
        },
      ],
    });
    if (storeData?.data?.user?.primary_profile_type !== ROLES.PAGEANT) {
      toast(
        translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
        toastType.ERROR_TOAST,
      );
    } else {
      toast(
        translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
        toastType.SUCESS_TOAST,
      );
    }
    navigation.reset({
      index: 0,
      routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
    });
    setTimeout(() => {
      navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
        openPrimaryDashbord: true,
      });
    }, 100);
  }, [navigation, storeData?.data?.user?.primary_profile_type]);
  const callBlockUserAPi = async () => {
    if (checkIsConnected()) {
      const res = await hitBlockUserApi();
      if (res.success) {
        refetch();
      }
    }
  };

  const getCartCountApi = async () => {
    if (checkIsConnected()) {
      const productAllDetail = await viewProducts();
      if (productAllDetail?.success && productAllDetail?.data !== undefined) {
        setCounter(productAllDetail?.data);
      }
    }
  };

  const isOtherUsernameAdmin = otherUserName =>
    otherUserName !== translations.ADMIN && otherUserName !== '';

  const showRefreshFooter =
    isOtherUsernameAdmin(paginatedData?.pages[0]?.data?.otherUserName) &&
    paginatedData?.pages[0]?.data?.can_reply !== 0;
  const renderFooter = React.useCallback(() => {
    return (
      <LastUpdatedFooter
        showRefresh={showRefreshFooter}
        minutes={moment().diff(lastRefreshAtRef.current, 'minutes')}
        onRefreshPress={onFooterRefresh}
      />
    );
  }, [onFooterRefresh, showRefreshFooter]);
  const renderAvatarImg = item => {
    return (
      <View style={styles.avatarImgView}>
        <Image
          source={{
            uri:
              item?.currentMessage?.user?._id === storeData?.data?.user.id
                ? item?.currentMessage?.receiver_name?.imagePath
                : item?.currentMessage?.sender_name?.imagePath,
          }}
          style={styles.renderAvatarImg}
        />
      </View>
    );
  };

  const canReply =
    isOtherUsernameAdmin(paginatedData?.pages[0]?.data?.otherUserName) &&
    paginatedData?.pages[0]?.data?.can_reply !== 0;
  const isBlocked = paginatedData?.pages[0]?.data?.has_blocked;
  const latestMessage = chatData?.[0];
  const replyName =
    latestMessage?.user?._id === storeData?.data?.user.id
      ? latestMessage?.receiver_name?.first_name
      : latestMessage?.sender_name?.first_name;
  const composerPlaceholder =
    translations.REPLY_TO + (replyName || 'Write a message');

  const renderSend = style => {
    return (
      <>
        {textMessage.length > 0 && !isLoading1 ? (
          <View style={styles.renderSendView}>
            <Send {...style} containerStyle={styles.renderContainerStyle}>
              <AppImages.Common.sendIcon />
            </Send>
          </View>
        ) : isLoading1 ? (
          <View style={styles.renderLoaderView}>
            <ActivityIndicator size={'small'} color={color.P_PINK} />
          </View>
        ) : null}
      </>
    );
  };
  const renderDay = item => {
    let day = 'Today';
    let today = new Date();
    var newToday = moment(today).format(TIME_FORMAT.DDmilnusMMmilusYYYY);
    var newDate = moment(item.currentMessage?.createdAt).format(
      TIME_FORMAT.DDmilnusMMmilusYYYY,
    );
    var previousDate = item.previousMessage?.createdAt
      ? moment(item.previousMessage?.createdAt).format(
          TIME_FORMAT.DDmilnusMMmilusYYYY,
        )
      : null;
    return (
      <View>
        {(newDate === newToday && previousDate === null) ||
        (newDate === newToday &&
          previousDate !== null &&
          newDate !== previousDate) ? (
          <View
            style={{
              ...styles.renderDayView,
              marginBottom: moderateScaleVertical(12),
            }}>
            <Text maxFontSizeMultiplier={1} style={styles.headingText}>
              {day}
            </Text>
          </View>
        ) : (
          <View>
            <Day
              currentMessage={item?.currentMessage}
              previousMessage={item?.previousMessage}
              nextMessage={item?.nextMessage}
              textStyle={styles.headingText}
              wrapperStyle={styles.renderDayView}
            />
          </View>
        )}
      </View>
    );
  };

  const renderBubble = msg => {
    return (
      <View style={styles.renderBubbleView}>
        <Bubble
          {...msg}
          wrapperStyle={{left: styles.leftBubble, right: styles.rightBubble}}
        />
      </View>
    );
  };
  const renderTime = item => {
    return (
      <View>
        <Time
          {...item}
          timeTextStyle={{left: styles.timeText, right: styles.timeTextR}}
        />
      </View>
    );
  };

  const renderMessageText = msg => {
    return (
      <>
        {msg?.currentMessage?.text !== '' ? (
          <HTMLView
            value={msg?.currentMessage?.text}
            stylesheet={
              msg?.currentMessage?.user?._id === storeData?.data?.user.id
                ? stylesR
                : styles
            }
          />
        ) : null}
        {msg?.currentMessage?.attachedImages?.length > 0
          ? msg?.currentMessage?.attachedImages.map((item, index) => {
              return (
                <View style={styles.clickable}>
                  {msg?.currentMessage?.user?._id ===
                  storeData?.data?.user.id ? (
                    <AppImages.Common.ImageIcon />
                  ) : (
                    <AppImages.Common.ImageIcon1 />
                  )}

                  <Text
                    style={{
                      ...styles.audioName,
                      color:
                        msg?.currentMessage?.user?._id ===
                        storeData?.data?.user.id
                          ? color.WHITE
                          : color.BLACK,
                    }}>
                    {translations.IMAGE}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      downloadFile(item?.filepath);
                    }}
                    style={styles.uploadImageInnerVIew}>
                    {msg?.currentMessage?.user?._id ===
                    storeData?.data?.user.id ? (
                      <AppImages.Common.DownloadIcon width={16} height={16} />
                    ) : (
                      <AppImages.Common.DownloadIconPink
                        width={16}
                        height={16}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
        {msg?.currentMessage?.attachedFiles?.length > 0
          ? msg?.currentMessage?.attachedFiles.map((item, index) => {
              return (
                <View style={styles.clickable}>
                  <AppImages.COMPOSE.tpp_document_icon />

                  <Text
                    style={{
                      ...styles.audioName,
                      color:
                        msg?.currentMessage?.user?._id ===
                        storeData?.data?.user.id
                          ? color.WHITE
                          : color.BLACK,
                    }}>
                    {translations.FILE}
                  </Text>

                  <TouchableOpacity
                    style={styles.uploadImageInnerVIew}
                    onPress={() => {
                      downloadFile(item?.filepath);
                    }}>
                    {msg?.currentMessage?.user?._id ===
                    storeData?.data?.user.id ? (
                      <AppImages.Common.DownloadIcon width={16} height={16} />
                    ) : (
                      <AppImages.Common.DownloadIconPink
                        width={16}
                        height={16}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </>
    );
  };
  const renderScrolltoBottom = () => {
    return <AppImages.Common.PinkDropdown />;
  };

  const onPageUp = async () => {
    if (chatData?.length > 9) {
      if (checkIsConnected()) {
        fetchNextPage();
      }
    }
  };

  const onSend = React.useCallback(async () => {
    if (checkIsConnected()) {
      setIsModalVisible(false);
      setIsLoading1(true);
      const res = await composeMsg();
      if (res.success) {
        setFileDetails(null);
        await reload();
        setIsLoading1(false);
        setDraftMessage('');
      } else {
        setFileDetails(null);
        setIsLoading1(false);
      }
      Keyboard.dismiss();
      setIsLoading1(false);
    }
  }, [composeMsg, reload, setDraftMessage]);
  const downloadFile = async (downloadPath: string) => {
    const response = await androidCameraPermission();
    if (response) {
      downloadImage(downloadPath);
    } else {
      toast(translations.STORAGE_PERMISION_NOT_GRANTED, toastType.ERROR_TOAST);
    }
  };

  const renderCustomComposer = React.useCallback(
    (composerProps: any) => {
      return (
        <ChatComposerSlot
          {...composerProps}
          canReply={canReply}
          isBlocked={isBlocked}
          isOnlyExpertUser={isOnlyExpert(storeData?.data?.user)}
          giftedTextInputProps={composerProps?.textInputProps}
          onPurchaseClick={onPurchaseClick}
          onUnblockPress={() => setWarningModal(true)}
          value={textMessage}
          onChangeText={setDraftMessage}
          onAttach={() => setIsModalVisible(true)}
          onSend={onSend}
          loading={isLoading1}
          placeholder={composerPlaceholder}
        />
      );
    },
    [
      canReply,
      isBlocked,
      isLoading1,
      composerPlaceholder,
      onPurchaseClick,
      textMessage,
      onSend,
      storeData?.data?.user,
    ],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        lable={
          paginatedData?.pages[0]?.data?.otherUserName !== ''
            ? paginatedData?.pages[0]?.data?.otherUserName
            : paginatedData?.pages[0]?.data?.isOtherUserNameNA !== ''
            ? paginatedData?.pages[0]?.data?.isOtherUserNameNA
            : translations.CONSOLIDATED_NOTIFICATION
        }
        isUnderLineRequired
        leftIcon={paginatedData?.pages[0]?.data?.otherUserImgPath}
        rightIcon1={
          paginatedData?.pages[0]?.data?.otherUserId !==
            storeData?.data?.user?.id &&
          paginatedData?.pages[0]?.data?.otherUserName !== translations.ADMIN &&
          paginatedData?.pages[0]?.data?.otherUserName !== '' ? (
            <AppImages.Common.Menu />
          ) : null
        }
        onPressRightIcon1={() => setThreeDotMenuClicked(true)}
      />
      <Loader
        isLoading={
          (isLoading && !isLoading1) ||
          (isRefetching && !isLoading1 && !isFetchingNextPage)
        }
      />
      {/* <KeyboardAvoidingView behavior={isIosDevice() ? 'padding' : 'position'}> */}
      <View style={styles.giftedChatView}>
        {paginatedData?.pages[0]?.data?.title ? (
          <View style={styles.orderIdView}>
            <Text style={styles.orderId}>
              Order Id: {paginatedData?.pages[0]?.data?.title} (
              {paginatedData?.pages[0]?.data?.profile_type})
            </Text>
          </View>
        ) : null}
        {(chatData.length > 0 && !isLoading) ||
        (chatData.length > 0 && isFetchingNextPage && isRefetching) ||
        (chatData.length > 0 && !isRefetching) ? (
          <>
            <GiftedChat
              loadEarlier={chatData?.length > 79 ? true : false}
              isLoadingEarlier={isFetchingNextPage}
              onLoadEarlier={onPageUp}
              scrollToBottomComponent={renderScrolltoBottom}
              renderDay={renderDay}
              renderComposer={renderCustomComposer}
              renderInputToolbar={toolbarProps => (
                <InputToolbar
                  {...toolbarProps}
                  containerStyle={styles.inputToolbarContainer}
                  primaryStyle={styles.inputToolbarPrimary}
                />
              )}
              minInputToolbarHeight={moderateScaleVertical(60)}
              minComposerHeight={moderateScaleVertical(40)}
              maxComposerHeight={moderateScaleVertical(120)}
              renderBubble={renderBubble}
              renderMessageText={renderMessageText}
              renderFooter={renderFooter}
              onLongPress={() => console.log('copy disabled')}
              disableComposer={isLoading1 ? true : false}
              renderAvatarOnTop={true}
              text={textMessage}
              renderAvatar={renderAvatarImg}
              renderSend={() => null}
              // renderActions={renderAction}
              renderTime={renderTime}
              onSend={() => onSend()}
              user={{
                _id: storeData?.data?.user?.id ? storeData?.data?.user?.id : '',
              }}
              messages={chatData}
              // alwaysShowSend={true}
              bottomOffset={isIosDevice() ? 20 : 0}
              scrollToBottom={true}
              scrollToBottomStyle={{position: 'absolute', bottom: 70}}
            />
            <View />
          </>
        ) : null}
        <FilterModal
          modalVisible={threeDotMenuClicked}
          setModalVisible={setThreeDotMenuClicked}
          type={translations.THREEDOT_MENU}
          menuList={MessageThreeDotMenu}
          // selectedFilterItem={selectedFilterItem}
          // // setSelectedFilterItem={setSelectedFilterItem}
          setDeleteClicked={() => setWarningModal(true)}
        />
        <WarningModel
          msg={
            paginatedData?.pages[0]?.data?.has_blocked
              ? translations.ARE_YOU_SURE_YOU_WANT_TO_UNBLOCK_THIS_USER
              : translations.ARE_YOU_SURE_YOU_WANT_TO_BLOCK_THIS_USER
          }
          isModalVisible={warningModal}
          setConfirm={callBlockUserAPi}
          setIsModalVisible={setWarningModal}
          headingStyle={styles.modalHeading}
        />
        <ImagePickerModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          documentUpload={true}
          cropping={true}
          showNote={true}
          note={translations.DOC_ERROR}
          note2={`${translations.VALID_FORMAT_COMPOSE_MSG}`}
          onImageFound={onImageFound}
        />
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default ChatScreen;
