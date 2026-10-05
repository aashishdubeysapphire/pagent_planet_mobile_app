import React, {useState} from 'react';
import {View, Animated, Text} from 'react-native';
import {styles} from './styles';
import {Tag} from '../../../services/models/gallery/tag';

import Chip from './chip';
import WarningModel from '../warningmodel';
import translations from '../../../assets/translations';
import useCgMutation from '../../../services/api/useCgMutation';
import {Base} from '../../../services/models/base';
import {DELETE_TAGS} from '../../../services/endpoints';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../commonalert';
import {useSetLoader, useSetScreenRefresh} from '../../../store/useAppStore';
import {REFESH_SCREEN} from '../../utils/enum';

interface Props {
  tags?: Tag[];
  title?: string;
  enableDelteTag?: boolean;
  isPublicProfileView?: boolean;
}

/* A function that takes in a parameter of type Props. */
const TagsChip = ({
  tags,
  title = '',
  enableDelteTag,
  isPublicProfileView,
}: Props) => {
  const [selectTags, setTagsForDelete] = useState([]);
  const [tagsList, setUpdatedTags] = useState<Tag[]>(tags);
  const netInfo = useNetInfo();

  const [fadeAnim] = useState(new Animated.Value(1));
  const [isVisible, setDeleteVisible] = useState(false);
  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  //----------------------------------- API
  const makeFeatureImageBody = {
    tag_ids: selectTags,
  };

  const {mutateAsync: deleteTagsRequest} = useCgMutation<Base>({
    key: DELETE_TAGS,
    body: makeFeatureImageBody,
    url: DELETE_TAGS,
    disableLoader: true,
    offSuccessToast: false,
  });
  //----------------------------------- End

  const onSaveConfirmClick = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const res = await deleteTagsRequest();
      setLoader(false);
      if (res.success) {
        setUpdatedTags(tagsList.filter(item => item.tagId !== selectTags[0]));
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 0,
        }).start(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
          }).start();
        });
        setScreenRefresh(REFESH_SCREEN.UPDATE_IMAGE_TAG);
        setTimeout(() => {
          setScreenRefresh(REFESH_SCREEN.SUB_GALLERY);
        }, 300);
      }
    }
  };
  const onDeleteActive = (id: number | undefined, index: number) => {
    setTagsForDelete([]);
    setTagsForDelete(oldArray => [...oldArray, id]);
    setDeleteVisible(true);
  };

  return (
    <View
      style={
        tagsList !== undefined && tagsList.length > 0
          ? styles.container
          : styles.emptyContainer
      }>
      {tagsList !== undefined && tagsList.length > 0 && (
        <View>
          {title.length > 0 ? (
            <Text style={styles.headerTitle}>{title}</Text>
          ) : null}

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {tagsList.map((item, index) => {
              return (
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                  }}>
                  <Chip
                    item={item}
                    enableDelteTag={enableDelteTag}
                    isPublicProfileView={isPublicProfileView}
                    onDeleteActive={onDeleteActive}
                    index={index}
                  />
                </Animated.View>
              );
            })}
          </View>
        </View>
      )}
      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_TAG}
        isModalVisible={isVisible}
        setConfirm={onSaveConfirmClick}
        setIsModalVisible={setDeleteVisible}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default TagsChip;
