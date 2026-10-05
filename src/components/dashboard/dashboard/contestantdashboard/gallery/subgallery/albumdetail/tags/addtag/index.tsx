import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView, Text, BackHandler} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import Header from '../../../../../../../../common/header';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';
import {
  ADD_TAG_OPTIONS,
  EXPERT_ALUM_TYPE,
  MASTERDATA,
  REFESH_SCREEN,
  SLUG,
} from '../../../../../../../../utils/enum';
import {
  GET_MASTER_DATA,
  GET_PAGEANT_RULES_ASSOCIATED_DATA,
  GET_TAG_OF_IMAGE,
  GET_TAG_TYPE,
  SAVE_TAGS,
} from '../../../../../../../../../services/endpoints';
import FloatingDropdown from '../../../../../../../../common/floatingdropown';
import CustomBottomModal from '../../../../../../../../common/custombottommodal';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';
import SearchTagOptions from './components/searchtagoptions';
import {Base} from '../../../../../../../../../services/models/base';
import {
  useSetScreenRefresh,
  useSetLoader,
} from '../../../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {useNavigation} from '@react-navigation/native';
import TagsChip from '../../../../../../../../common/tagchip';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../../../../services/constants';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {checkIsNull} from '../../../../../../../../utils/validations';
import {TagData} from '../../../../../../../../../services/models/gallery/tagsData';
import CustomButton from '../../../../../../../../common/button';
import {YearName} from '../../../../../../../../../services/models/pageantdetails/yearName';
import TagPageant from '../../../../../../../convo/addcrownconvo/components/tagpageantview';
import {AgeDivision} from '../../../../../../../../../services/models/pageantdetails/ageDivision';
import {PageantRulesAssociatedData} from '../../../../../../../../../services/models/pageantdetails/pageantRulesAssociatedData';
import {SCREEN} from '../../../../../../../../../root/screenname';
import Shimmer from '../../../../../../../../common/shimmer';

const AddTags = ({route}) => {
  const [tagTypeVisible, setTagTypeVisible] = React.useState(false);
  const [tagOptionsVisible, setTagOptionsVisible] = React.useState(false);
  const [tagType, setTagType] = useState('');
  const [isPublicProfileView] = useState(route?.params?.isPublicProfileView);
  const [isAgeDivision, setAgeDivisionVisible] = useState(false);
  const [isPageantTagActive, setPageantTagActive] = useState(false);
  const [isPhaseOfCompition, setPhaseOfCompition] = useState(false);
  const [selectedAgeDivision, setSelectedAgeDivision] = useState<AgeDivision>();
  const [selectedImageCetegory, setSelectedImageCetegory] =
    useState<AgeDivision>();
  const [tagTypeSlug, setTagTypeSlug] = React.useState('');
  const [tagTypeid, setTagTypeId] = React.useState();
  const [tagOption, setTagOption] = React.useState('');
  const [params, setParams] = useState('');
  const [profileTypeId, setProfileTypeId] = useState('');
  const setScreenRefresh = useSetScreenRefresh();
  const [yearId, setYearId] = useState('');
  const setLoader = useSetLoader();
  const [event, setEvent] = useState('');
  const [yearErr, setYearErr] = useState('');
  const [eventErr, setEventErr] = useState('');
  const [tagTypeErr, setTagTypeErr] = useState('');
  const [tagOptionErr, setTagOptionErr] = useState('');
  const netInfo = useNetInfo();
  const [eventId, setEventId] = useState('');
  const navigation = useNavigation();
  const [yearsList, setYearsList] = useState<YearName[]>();
  const [tagTypes, setTagTypes] = useState([]);

  //----------------------------------- API
  const createTagsBody = {
    tag_profile_type: tagTypeSlug,
    tag_profile_id: profileTypeId,
    record_image_id: route?.params?.albumImage.id,
    tag_name: tagType,
    album_id: route.params.album.id,
    event_id: eventId,
    year_id: yearId,
    image_x: 0,
    image_y: 0,
    eventPhaseId: selectedImageCetegory?.id,
    ageDivisionId: selectedAgeDivision?.id,
    contenstantId: '',
  };

  const {
    data: tags,
    isLoading,
    mutateAsync: getTagImageRequest,
  } = useCgMutation<Base<TagData>>({
    key: GET_TAG_OF_IMAGE + route?.params?.albumImage.id,
    url: GET_TAG_OF_IMAGE + route?.params?.albumImage.id,
    offSuccessToast: true,
    method: MethodTypes.GET,
  });

  const {mutateAsync: getTagTypeRequest} = useCgMutation<Base<TagData>>({
    key: GET_TAG_TYPE + route.params.galleryParam,
    url: GET_TAG_TYPE + route.params.galleryParam,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  const {mutateAsync: createTagRequest} = useCgMutation<Base<TagData>>({
    key: SAVE_TAGS,
    body: createTagsBody,
    url: SAVE_TAGS,
  });

  //API GET MASTER DATA----------------------------------------- START
  const {mutateAsync: getMasterDetails} = useCgMutation<YearName[]>({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });

  const {
    data: pagentEventData,
    isLoading: isLoadingEventRulesList,
    mutateAsync: getPageantRulesAssociatedData,
  } = useCgMutation<PageantRulesAssociatedData>({
    key: GET_PAGEANT_RULES_ASSOCIATED_DATA,
    method: MethodTypes.GET,
    url: GET_PAGEANT_RULES_ASSOCIATED_DATA + profileTypeId,
    offSuccessToast: true,
    disableLoader: true,
  });
  // //----------------------------------- End
  const getScreenData = async () => {
    if (isPublicProfileView === undefined) {
      setLoader(true);
      const res = await getTagTypeRequest();
      if (res.status_code == ApiStatusType.BlockedUser) {
        navigation.goBack();
      } else if (res.success) {
        setTagTypes(res?.data?.tag_types ?? []);
      }
      setLoader(false);
    }

    await getTagImageRequest();
  };
  useEffect(() => {
    getScreenData();
  }, []);

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  useEffect(() => {
    const hardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardwareBack.remove();
  }, [onPressBack]);

  useEffect(() => {
    if (
      profileTypeId.length > 0 &&
      route?.params?.itemType === SCREEN.EXPERT_ALBUM &&
      tagType === ADD_TAG_OPTIONS.IMAGE_CATEGORY2
    ) {
      getEventRulesAgeDivision();
    }
  }, [profileTypeId]);

  const getEventRulesAgeDivision = async () => {
    setLoader(true);
    await getPageantRulesAssociatedData();
    setLoader(false);
  };
  const hitMasterDetailsAPI = async () => {
    setLoader(true);
    const res = await getMasterDetails();
    if (res.success) {
      setYearsList(res?.data?.master_records?.years);
    }
    setLoader(false);
  };
  const backButtonHandled = () => {
    navigation.goBack();
  };

  /**
   * It sets the tag type and params based on the selected text
   */
  const setTagTypeAndParams = selectedText => {
    setTagType(selectedText.name);
    setTagTypeSlug(selectedText.slug);
    setTagTypeId(selectedText.id);
    setTagTypeErr('');
    setTagOption('');

    if (selectedText.name === ADD_TAG_OPTIONS.IMAGE_CATEGORY2) {
      if (route?.params?.itemType === SCREEN.EXPERT_ALBUM) {
        setParams(SLUG.PAGEANT + Param.USER_OWNED + 'true');
        hitMasterDetailsAPI();
      } else {
        setParams(
          selectedText.slug + Param.EVENT_ID_ + route.params.album.pageant_id,
        );
      }
    } else {
      setParams(selectedText.slug);
    }
  };

  /**
   * It takes in an id and a title, sets the tagOption to the title, sets the profileTypeId to the id,
   * and then checks if the tagType is in the imageTagList. If it is, it sets the tagOptionList to an
   * empty array. If the tagType is not in the imageTagList, it checks if the tagOption is in the
   * imageTagList. If it is, it displays an error message. If it is not, it sets the tagOptionList to a
   * new array with the tagOption as the first element
   * @param {number} id - number - the id of the selected item
   * @param {string} title - The title of the tag option
   */
  const onItemSelection = (id: number, title: string) => {
    setEvent('');
    setTagOptionErr('');
    setEventId('');
    setYearId('');
    setSelectedAgeDivision(undefined);
    setSelectedImageCetegory(undefined);
    setProfileTypeId(id + '');
    setTagOption(title);
    setPageantTagActive(false);
    setTimeout(() => {
      setPageantTagActive(true);
    }, 100);
  };

  /**
   * If the tagOption and tagType are empty, set the error messages for both. If only tagOption is
   * empty, set the error message for tagOption. If neither are empty, add the tag and clear the error
   * messages
   */
  const onAddTagClick = () => {
    if (tagOption === '' && tagType === '') {
      setTagTypeErr(translations.THIS_FIELD_REQUIRED);
      setTagOptionErr(translations.THIS_FIELD_REQUIRED);
    } else if (tagOption === '') {
      setTagOptionErr(translations.THIS_FIELD_REQUIRED);
    } else {
      addTag();
      setTagTypeErr('');
      setTagOptionErr('');
    }
  };

  /**
   * A function that is called when the user clicks on the "Add Tag" button.
   */
  const addTag = async () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected || state.isInternetReachable) {
        setLoader(true);
        const res = await createTagRequest();
        if (res.success) {
          getTagImageRequest();
          setTagType('');
          setTagOption('');
          setTagTypeId(undefined);
          setEvent('');
          setSelectedAgeDivision(undefined);
          setSelectedImageCetegory(undefined);
          setYearId('');
          setProfileTypeId('');
          setYearsList([]);
          setScreenRefresh(REFESH_SCREEN.UPDATE_IMAGE_TAG);
          setTimeout(() => {
            setScreenRefresh(REFESH_SCREEN.SUB_GALLERY);
            setLoader(false);
          }, 500);
        } else {
          setLoader(false);
          toast(res.message, toastType.ERROR_TOAST);
        }
      } else {
        internetState(netInfo.isConnected!!);
        setLoader(false);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={
          isPublicProfileView
            ? translations.MANAGE_TAGS
            : translations.ADD_A_NEW_TAG
        }
        isUnderLineRequired
        infoIcon={
          route?.params?.expertAlbumType ===
          EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
        }
        infoDataArray={[
          {
            label: translations.TAG_INFO,
            info: translations.TAG_THE_EVENT_ASSOCOATED_WITH_THE_CNTESTANT_YOU_HAVE_WORKED_WITH_TO_GET_NOMIATED_FOR_THE_BEST_IN_PAGEANTRY_AWARD,
          },
        ]}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {isPublicProfileView === undefined && (
            <View style={styles.tagView}>
              <Text style={styles.tagLabel}>
                {translations.WHOM_WOULD_YOU_LIKE_TO_ADD_A_TAG}
              </Text>
              <FloatingDropdown
                floatingText={translations.TYPE_OF_TAG}
                value={tagType}
                setText={value => setTagType(value)}
                errorMsg={tagTypeErr}
                isMandatory
                onFieldFocus={() => {
                  setTagTypeVisible(true);
                }}
              />

              <FloatingDropdown
                floatingText={
                  tagType === ADD_TAG_OPTIONS.IMAGE_CATEGORY2 &&
                  route?.params?.itemType === SCREEN.EXPERT_ALBUM
                    ? translations.PAGEANT
                    : translations.SELECT_PROFILE
                }
                value={!checkIsNull(tagOption) ? tagOption : String(tagOption)}
                errorMsg={tagOptionErr}
                setText={value => setTagOption(value)}
                isMandatory
                onFieldFocus={() => {
                  if (tagType !== '') {
                    setTagOptionsVisible(true);
                  } else {
                    setTagTypeErr(translations.THIS_FIELD_REQUIRED);
                  }
                }}
              />
              {tagType === ADD_TAG_OPTIONS.IMAGE_CATEGORY2 &&
                route?.params?.itemType === SCREEN.EXPERT_ALBUM &&
                isPageantTagActive && (
                  <>
                    <TagPageant
                      yearsList={yearsList}
                      pageantId={profileTypeId}
                      pageantName={tagOption}
                      eventId={eventId}
                      setEventId={setEventId}
                      yearId={yearId}
                      setYearId={setYearId}
                      yearErr={yearErr}
                      setYearErr={setYearErr}
                      eventErr={eventErr}
                      setEventErr={setEventErr}
                      event={event}
                      setEvent={setEvent}
                    />
                  </>
                )}
              {event !== undefined && event.length > 0 && (
                <>
                  <FloatingDropdown
                    floatingText={tagType}
                    value={
                      selectedImageCetegory?.name === undefined
                        ? ''
                        : selectedImageCetegory?.name
                    }
                    setText={value => setTagType(value)}
                    errorMsg={tagTypeErr}
                    onFieldFocus={() => {
                      setPhaseOfCompition(true);
                    }}
                  />
                  <FloatingDropdown
                    floatingText={translations.AGE_DEVISION}
                    value={
                      selectedAgeDivision?.name === undefined
                        ? ''
                        : selectedAgeDivision?.name
                    }
                    setText={value => setTagType(value)}
                    errorMsg={tagTypeErr}
                    onFieldFocus={() => {
                      setAgeDivisionVisible(true);
                    }}
                  />
                </>
              )}
              <View style={styles.containerConfirm}>
                <CustomButton
                  label={translations.ADD_TAG}
                  smallHeight
                  inactive={true}
                  onPress={onAddTagClick}
                />
              </View>
            </View>
          )}
          {isPublicProfileView === undefined && <View style={styles.gap} />}

          <View
            style={{
              paddingVertical: moderateScaleVertical(24),
            }}>
            {isPublicProfileView === undefined && (
              <Text style={styles.tagListing}>{translations.MANAGE_TAGS}</Text>
            )}

            {!isLoading && tags?.data?.tags?.length > 0 ? (
              tags?.data?.tags?.map(item => {
                return (
                  <TagsChip
                    title={item.title}
                    tags={item.tags}
                    enableDelteTag
                    isPublicProfileView={isPublicProfileView}
                  />
                );
              })
            ) : isLoading ? (
              <>
                <View
                  style={{
                    marginRight: moderateScale(12),
                    flexDirection: 'row',
                  }}>
                  <Shimmer
                    width={moderateScale(120)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(16)}
                  />
                  <Shimmer
                    width={moderateScale(100)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(12)}
                  />
                </View>
                <View
                  style={{
                    marginRight: moderateScale(12),
                    flexDirection: 'row',
                    marginTop: moderateScaleVertical(-20),
                  }}>
                  <Shimmer
                    width={moderateScale(120)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(16)}
                  />
                  <Shimmer
                    width={moderateScale(100)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(12)}
                  />
                  <Shimmer
                    width={moderateScale(120)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(16)}
                  />
                </View>
                <View
                  style={{
                    marginRight: moderateScale(12),
                    flexDirection: 'row',
                    marginTop: moderateScaleVertical(-20),
                  }}>
                  <Shimmer
                    width={moderateScale(80)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(16)}
                  />
                  <Shimmer
                    width={moderateScale(100)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(12)}
                  />
                  <Shimmer
                    width={moderateScale(60)}
                    height={moderateScale(20)}
                    borderRadius={moderateScale(40)}
                    bottomSpace={16}
                    leftBottomSpace={moderateScaleVertical(12)}
                  />
                </View>
              </>
            ) : (
              <Text style={styles.newTags}>
                {translations.NEW_TAGS_WILL_APPEAR_HERE}
              </Text>
            )}
          </View>
        </View>
        {isPublicProfileView === undefined && (
          <>
            {isLoadingEventRulesList !== undefined &&
              !isLoadingEventRulesList &&
              pagentEventData?.data?.pageantRulesAssociatedData
                ?.ageDivisionsData !== undefined && (
                <CustomBottomModal
                  isModalVisible={isAgeDivision}
                  setIsModalVisible={setAgeDivisionVisible}
                  data={
                    pagentEventData?.data?.pageantRulesAssociatedData
                      .ageDivisionsData
                  }
                  preSelectedValue={
                    selectedAgeDivision?.id !== undefined
                      ? selectedAgeDivision?.id
                      : 0
                  }
                  parentCallback={selectedText => {
                    setSelectedAgeDivision(selectedText);
                  }}
                  heading={translations.AGE_DEVISION}
                />
              )}
            {
              <CustomBottomModal
                isModalVisible={tagTypeVisible}
                setIsModalVisible={setTagTypeVisible}
                data={tagTypes}
                parentCallback={selectedText =>
                  setTagTypeAndParams(selectedText)
                }
                heading={translations.TYPE_OF_TAG}
                preSelectedValue={tagTypeid}
              />
            }
            {isLoadingEventRulesList !== undefined &&
              !isLoadingEventRulesList &&
              pagentEventData?.data?.pageantRulesAssociatedData
                .pageantPhaseOfCompetitionsData !== undefined && (
                <CustomBottomModal
                  isModalVisible={isPhaseOfCompition}
                  setIsModalVisible={setPhaseOfCompition}
                  data={
                    pagentEventData?.data?.pageantRulesAssociatedData
                      .pageantPhaseOfCompetitionsData
                  }
                  parentCallback={selectedText => {
                    setSelectedImageCetegory(selectedText);
                  }}
                  heading={tagType}
                  preSelectedValue={
                    selectedImageCetegory?.id !== undefined
                      ? selectedImageCetegory?.id
                      : 0
                  }
                />
              )}
            {tagOptionsVisible && (
              <SearchTagOptions
                title={translations.SELECT_OPTION}
                isModalVisible={tagOptionsVisible}
                setIsModalVisible={setTagOptionsVisible}
                params={params}
                preSelectedValue={Number(profileTypeId)}
                onItemSelect={onItemSelection}
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTags;
