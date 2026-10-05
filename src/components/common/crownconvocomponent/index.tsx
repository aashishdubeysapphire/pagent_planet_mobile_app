import React, {Ref, memo, useContext, useEffect} from 'react';
import {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Postheader from '../../dashboard/convo/component/postheader';
import translations from '../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import YoutubePlayer from 'react-native-youtube-iframe';

import {Vimeo} from 'react-native-vimeo-iframe';
import LikeShareComment from '../../dashboard/convo/component/likesharecomment';
import {ConvoListItem} from '../../../services/models/convo/convoListing';
import {UserContext} from '../../../store/userStore';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../root/screenname';
import FastImageView from '../fastimageview';
import Pinchable from 'react-native-pinchable';
import {font} from '../../../assets/fonts/fontsConstant';
import {PARAM_VALUE} from '../../utils/enum';
import {color} from '../../../assets/colorConstant';
import SystemGeneratedPostHeader from '../../dashboard/convo/component/systemgeneratedpostheader';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import Hyperlink from 'react-native-hyperlink';
import { isIosDevice } from '../../utils/helperFunction';
interface Props {
  item: ConvoListItem;
  text?: string;
  noComments: number;
  noLikes: number;
  name: string;
  uri: string;
  imageUri: string;
  videoId: string;
  videoType: string;
  eventTitle: string;
  imageName: string;
  textInput?: Ref;
}

const ConvoDescription = ({
  item,
  text,
  noComments,
  name,
  noLikes,
  imageUri,
  uri,
  videoId,
  videoType,
  eventTitle,
  imageName,
  refetch,
  prvScreen,
  textInput,
}: Props) => {
  const {storeData} = useContext(UserContext);

  const [viewMore, setViewMore] = useState(false);
  const [expand, setExpand] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [noOflikes, setNoOflikes] = useState(noLikes);
  const [likeName, setLikeName] = useState(name);
  const [isPostLiked, setisPostLiked] = useState(
    item?.post_likes_by_logged_in_user?.status,
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    setNoOflikes(noLikes);
    setLikeName(name);
    setisPostLiked(item?.post_likes_by_logged_in_user?.status);
  }, [noLikes, name, item?.post_likes_by_logged_in_user?.status, isFocused]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const onViewMoreClick = () => {
    setExpand(true);
  };

  const onTextLayout = useCallback(e => {
    if (uri || imageName) {
      if (e.nativeEvent.lines.length > 4) {
        setViewMore(true);
      } else {
        setViewMore(false);
      }
    } else {
      if (e.nativeEvent.lines.length > 6) {
        setViewMore(true);
      } else {
        setViewMore(false);
      }
    }
  }, []);
  const onTextLayoutIos = useCallback(e => {
    if (uri || imageName) {
      if (e.nativeEvent.lines.length >= 4) {
        setViewMore(true);
      } else {
        setViewMore(false);
      }
    } else {
      if (e.nativeEvent.lines.length >= 6) {
        setViewMore(true);
      } else {
        setViewMore(false);
      }
    }
  }, []);
  const videoCallbacks = {
    play: (data: any) => console.warn('play: ', data),
    pause: (data: any) => console.warn('pause: ', data),
    fullscreenchange: (data: any) => console.warn('fullscreenchange: ', data),
    ended: (data: any) => console.warn('ended: ', data),
    controlschange: (data: any) => console.warn('controlschange: ', data),
  };

  const onPressLike = () => {
    if (isPostLiked != 1) {
      setisPostLiked(1);
      if (item?.post_total_likes < 1) {
        setNoOflikes(Number(noOflikes) + 1);
        setLikeName(
          storeData.data?.user.personal_details.first_name +
            ' ' +
            storeData.data?.user.personal_details.last_name,
        );
      } else {
        setNoOflikes(Number(noOflikes) + 1);
      }
    } else {
      if (noOflikes > 1) {
        setNoOflikes(Number(noOflikes) - 1);
      } else {
        setNoOflikes(null);
      }
      setisPostLiked(0);
    }
  };
  const navigation = useNavigation();
  const onPressLikeText = () => {
    navigation.navigate(SCREEN.LIKE_LISTING, {id: item?.id});
  };
  const onPressName = () => {
    if (item?.post_event?.status === PARAM_VALUE.ACTIVE) {
      navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
        eventId: item?.event_id,
        name: item?.post_event?.title,
      });
    } else {
      return null;
    }
  };

  const getCustomHeight = useCallback(
    ({height, width}) => {
      let aspectRatio = height / width;
      let calculatedHeight = Dimensions.get('window').width * aspectRatio;
      setCustomHeight(calculatedHeight);
    },
    [item?.id],
  );

  const [customHeight, setCustomHeight] = useState(290);
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(SCREEN.CONVO_COMMENTS, {
              id: item?.id,
              refetch: refetch,
            });
          }}>
          {item?.post_category?.is_system_generated == 1 ? (
            <SystemGeneratedPostHeader
              item={item}
              refetch={refetch}
              prvScreen={prvScreen}
            />
          ) : (
            <Postheader item={item} refetch={refetch} prvScreen={prvScreen} />
          )}
        </TouchableOpacity>
        {videoId !== '' && videoType === 'youtube' ? (
          <View style={styles.imageContainer}>
            <YoutubePlayer
              height={220}
              width={Dimensions.get('window').width}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          </View>
        ) : videoId !== '' && videoType !== 'youtube' ? (
          <View style={styles.imageContainer}>
            <Vimeo
              videoId={videoId}
              params={'api=1&autoplay=0'}
              style={{
                height: moderateScaleVertical(220),
                width: Dimensions.get('window').width,
              }}
              handlers={videoCallbacks}
            />
          </View>
        ) : uri && videoId === '' ? (
          <View style={styles.errorView}>
            <AppImages.Common.AlertIcon />
            <Text style={styles.errorText}>
              {translations.URL_NOT_SUPPORTED}
            </Text>
          </View>
        ) : null}
        {imageName && (
          <View style={styles.imageContainer}>
            <Pinchable>
              <FastImageView
                width={Dimensions.get('window').width}
                height={customHeight}
                imageUrl={imageUri}
                getCustomHeight={getCustomHeight}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </Pinchable>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(SCREEN.CONVO_COMMENTS, {
              id: item?.id,
              refetch: refetch,
            });
          }}>
          <View style={styles.container}>
            {eventTitle && (
              <TouchableOpacity
                style={styles.pageantTitleRow}
                onPress={() => onPressName()}>
                <AppImages.Common.TagIcon />
                <Text
                  style={{
                    ...styles.headerTitle,
                    color:
                      item?.post_event?.status === PARAM_VALUE.ACTIVE
                        ? color.P_PINK
                        : color.INPUT_TEXT,
                  }}>
                  {eventTitle}
                </Text>
              </TouchableOpacity>
            )}

            {text ? (
              <View>
                {expand ? (
                  <Hyperlink
                    linkDefault={true}
                    linkStyle={{color: color.P_PINK}}>
                    <Text
                      onTextLayout={
                       !isIosDevice() 
                          ? onTextLayout
                          : onTextLayoutIos
                      }
                      style={styles.subHeaderTitle}>
                      {text}
                    </Text>
                  </Hyperlink>
                ) : (
                  <Hyperlink
                    linkDefault={true}
                    linkStyle={{color: color.P_PINK}}>
                    <Text
                      onTextLayout={
                        !isIosDevice() 
                          ? onTextLayout
                          : onTextLayoutIos
                      }
                      style={styles.subHeaderTitle}
                      numberOfLines={uri || imageName ? 4 : 6}>
                      {text}
                    </Text>
                  </Hyperlink>
                )}
              </View>
            ) : null}

            {viewMore && !expand && (
              <TouchableOpacity onPress={() => onViewMoreClick()}>
                <Text style={styles.viewMore}>{translations.VIEW_MORE}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.row}>
              <TouchableOpacity onPress={onPressLikeText}>
                {noOflikes && (
                  <Text style={styles.like}>
                    {translations.LIKED_BY}{' '}
                    <Text
                      style={{...styles.like, fontFamily: font.RobotoMedium}}>
                      {likeName}{' '}
                    </Text>
                    {noOflikes > 1 && (
                      <>
                        <Text>{translations.AND} </Text>
                        <Text
                          style={{
                            ...styles.like,
                            fontFamily: font.RobotoMedium,
                          }}>
                          {noOflikes - 1} {translations.OTHERS}
                        </Text>
                      </>
                    )}
                  </Text>
                )}
              </TouchableOpacity>
              {noComments > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(SCREEN.CONVO_COMMENTS, {
                      id: item?.id,
                      refetch: refetch,
                    });
                  }}>
                  <Text style={{...styles.like, fontFamily: font.RobotoMedium}}>
                    {noComments}{' '}
                    {noComments > 1
                      ? translations.COMMENTS
                      : translations.COMMENT}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <LikeShareComment
        item={item}
        onPressLike={onPressLike}
        isPostLiked={isPostLiked}
        refetch={refetch}
        textInput={textInput}
      />
      <View style={styles.seperatorStyle} />
    </>
  );
};

export default memo(ConvoDescription);
