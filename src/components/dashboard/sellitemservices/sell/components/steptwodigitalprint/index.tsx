import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import appImage from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {AddEitSellRequest} from '../../../../../../services/models/addEditSellRequest';
import FloatingDateTimeInput from '../../../../../common/floatingdatetimeinput';
import HeadShotImage from '../../../../../common/headshotimage';
import MultiSelectinput from '../../../../../common/multiselectinput';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import {SELL_PRODUCT} from '../../../../../utils/enum';
import {pick, types} from '@react-native-documents/picker';
import {LocalImage} from '../../../../../../services/models/localimage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {styles} from './styles';
import {toast, toastError, toastType} from '../../../../../common/commonalert';
import {SELL_TABS} from '../stepview';
import AdditionalImage from '../additionalimages';
import {GET_MASTER_DATA} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import CustomBottomModal from '../../../../../common/custombottommodal';
import Loader from '../../../../../common/customloader';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {SellAttributes} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {isIosDevice} from '../../../../../utils/helperFunction';

interface Props {
  addEditRequest: AddEitSellRequest;
  categoryId: number;
  category: Category | undefined;
  isNextClick: boolean;
  onStepComplete?: () => void;
  completedStep: number;
  setCompletedStep: (tabId: number) => void;
  setProductDetail: any;
  sellAttributeData: SellAttributes | undefined;
  isEditProduct: boolean;
}

export const DigitalPrintStepTwo = ({
  addEditRequest,
  categoryId,
  isNextClick,
  completedStep,
  setCompletedStep,
  onStepComplete,
  setProductDetail,
  isEditProduct,
}: Props) => {
  const [userAggredTanC, setUserAggredTanC] = useState(isEditProduct);
  const [featuredImageErrMsg, setFeaturedImageErrMsg] = useState('');
  const [, setTicketImageErrMsg] = useState('');
  const [sampleAudioErrMsg, setSampleAudioErrMsg] = useState('');
  const [fullAudioErrMsg, setFullAudioErrMsg] = useState('');
  const [countryErrMsg, setCountryErrMsg] = useState('');
  const [lastDateErrMsg, setLastDateErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [dropDownList, setDropDownList] = useState({
    countries: {},
  });
  const [isDropDownVisible, setIsDropDownVisible] = useState({
    countries: false,
  });
  const allCountrySelected = [
    {
      id: 'All Countries',
      isSelected: true,
      name: 'All Countries',
      phone_code: 93,
      sort_name: 'AF',
      status: 1,
    },
  ];
  useEffect(() => {
    hitMasterDetailsAPI();
    setFeaturedImageErrMsg('');
    setCountryErrMsg('');
    setTicketImageErrMsg('');
    setLastDateErrMsg('');
    setSampleAudioErrMsg('');
    setFullAudioErrMsg('');
  }, []);
  const ticketValidation = () => {
    if (categoryId === SELL_PRODUCT.TICKETS_ENTRY) {
      !addEditRequest?.expired_on
        ? setLastDateErrMsg(translations.THIS_FIELD_REQUIRED)
        : setLastDateErrMsg('');

      if (!!addEditRequest?.expired_on) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const audioValidation = () => {
    if (
      categoryId === SELL_PRODUCT.DIGITAL_PAINT &&
      addEditRequest?.subcategory?.values?.name === translations.TRACKS
    ) {
      addEditRequest?.sampleAudio === undefined || !addEditRequest?.sampleAudio
        ? setSampleAudioErrMsg(translations.THIS_FIELD_REQUIRED)
        : setSampleAudioErrMsg('');
      addEditRequest?.fullAudio === undefined || !addEditRequest?.fullAudio
        ? setFullAudioErrMsg(translations.THIS_FIELD_REQUIRED)
        : setFullAudioErrMsg('');

      if (
        addEditRequest?.sampleAudio !== undefined &&
        addEditRequest?.fullAudio !== undefined &&
        !!addEditRequest?.sampleAudio &&
        !!addEditRequest?.fullAudio
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const countryValidation = () => {
    if (addEditRequest?.subcategory?.values?.name !== translations.TRACKS) {
      addEditRequest?.country_id?.length === 0 || !addEditRequest.country_id
        ? setCountryErrMsg(translations.THIS_FIELD_REQUIRED)
        : setCountryErrMsg('');
      if (
        !!addEditRequest.country_id &&
        addEditRequest?.country_id?.length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const onTermConditionPress = () => {
    navigation.navigate(SCREEN.STATIC_PAGE, {
      title: translations.TERMS_OF_SERVIC,
    });
  };
  const validations = () => {
    setFeaturedImageErrMsg('');
    setCountryErrMsg('');
    setTicketImageErrMsg('');
    setLastDateErrMsg('');
    setSampleAudioErrMsg('');
    setFullAudioErrMsg('');
    ticketValidation();
    audioValidation();
    countryValidation();
    !addEditRequest.featured_full_path_image ||
    addEditRequest.featured_full_path_image === undefined
      ? setFeaturedImageErrMsg(translations.THIS_FIELD_REQUIRED)
      : setFeaturedImageErrMsg('');
    !userAggredTanC &&
      toast(translations.PLEASE_ACCEPT_T_AND_C, toastType.ERROR_TOAST);

    if (
      !!addEditRequest.featured_full_path_image &&
      ticketValidation() &&
      audioValidation() &&
      countryValidation() &&
      userAggredTanC
    ) {
      setFeaturedImageErrMsg('');
      setCountryErrMsg('');
      setTicketImageErrMsg('');
      setLastDateErrMsg('');
      setSampleAudioErrMsg('');
      setFullAudioErrMsg('');
      return true;
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: null,
      is_countries: 1,
    },
    offSuccessToast: true,
    disableLoader: true,
  });

  const hitMasterDetailsAPI = async () => {
    setIsLoading(true);
    const res = await getMasterDetails();
    if (res.success) {
      setDropDownList({
        ...dropDownList,
        countries: res.data?.countries,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (
      onStepComplete !== undefined &&
      completedStep === SELL_TABS.STEP_THREE &&
      validations()
    ) {
      onStepComplete();
    } else {
      setCompletedStep(SELL_TABS.STEP_THREE);
    }
  }, [isNextClick]);
  const uploadDocument = async (type: string) => {
    try {
      if (!isIosDevice()) {
        const permission = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permission !== RESULTS.GRANTED) {
          const result = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          if (result !== RESULTS.GRANTED) {
            throw new Error(translations.PLEASE_ALLOW_STORAGE_ACCESS);
          }
        }
      }
      if (type === 'file') {
        const result1 = await pick({
          type: [
            'image/*',
            'application/zip',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'audio/*',
            'video/*',
            '*/*',
          ],
        });
        if (result1[0].size / 1024 / 1024 > 5) {
          toast(translations.FILE_SIZE_ERROR, toastType.ERROR_TOAST);
        } else {
          const dp: LocalImage = {
            name: result1[0].name,
            uri: result1[0].uri,
            type: result1[0].type,
            size: result1[0]?.size!! / 1024 / 1024,
          };
          setProductDetail({
            ...addEditRequest,
            digitalFile: result1[0].name,
            digital_file: dp,
          });
        }
      } else {
        const result = await pick({
          type: [types.audio],
        });
        if (type === 'sample') {
          if (result[0].size / 1024 / 1024 > 30) {
            toast(translations.AUDIO_SIZE_ERROR, toastType.ERROR_TOAST);
          } else {
            const dp: LocalImage = {
              name: result[0].name,
              uri: result[0].uri,
              type: result[0].type,
              size: result[0]?.size!! / 1024 / 1024,
            };

            setProductDetail({
              ...addEditRequest,
              sample_audio: dp,
              sampleAudio: result[0].name,
            });
          }
        } else if (type === 'full') {
          if (result[0].size / 1024 / 1024 > 30) {
            toast(translations.AUDIO_SIZE_ERROR, toastType.ERROR_TOAST);
          } else {
            const dp: LocalImage = {
              name: result[0].name,
              uri: result[0].uri,
              type: result[0].type,
              size: result[0]?.size!! / 1024 / 1024,
            };
            setProductDetail({
              ...addEditRequest,
              full_audio: dp,
              fullAudio: result[0].name,
            });
          }
        }
      }
    } catch (err) {
      //empty
    }
  };
  const onImageFound = img => {
    setProductDetail({
      ...addEditRequest,
      featured_full_path_image: img?.uri,
      localImage: img,
    });
  };
  const onTicketImageFound = img => {
    if (img === undefined) {
      setProductDetail({
        ...addEditRequest,
        ticket_image: img,
        ticketImage: img?.uri,
        delete_ticket_image: 'Yes',
      });
    } else {
      setProductDetail({
        ...addEditRequest,
        ticket_image: img,
        ticketImage: img?.uri,
        delete_ticket_image: translations.NO_SMALL,
      });
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <View
        style={{
          marginHorizontal: moderateScale(16),
          flex: 1,
        }}>
        {categoryId === SELL_PRODUCT.TICKETS_ENTRY && (
          <FloatingDateTimeInput
            floatingText={translations.LAST_DAY}
            onChange={value => {
              setProductDetail({
                ...addEditRequest,
                expired_on: value,
              });
            }}
            setMinDate={() => {
              return new Date();
            }}
            isMandatory
            value={addEditRequest?.expired_on}
            errorMsg={lastDateErrMsg}
            frontEndFormat={TIME_FORMAT.MMslashDDslashYYYY}
            mode={'date'}
            opacity={1}
          />
        )}
        {addEditRequest?.subcategory?.values?.name !== translations.TRACKS ? (
          <MultiSelectinput
            floatingText={
              categoryId === SELL_PRODUCT.HIRE ||
              categoryId === SELL_PRODUCT.TICKETS_ENTRY
                ? translations.WHERE_SERVICE_AVAILABLE
                : translations.WHERE_ARE_YOU_WILLING_TO_SHIP
            }
            isMandatory={true}
            value={
              addEditRequest?.country_id?.length == 248
                ? allCountrySelected
                : addEditRequest?.country_id
            }
            onFieldFocus={() => {
              setIsDropDownVisible({
                ...isDropDownVisible,
                countries: true,
              });
            }}
            onDelete={val => {
              setProductDetail({
                ...addEditRequest,
                country_id: val,
              });
            }}
            addMore={() => {
              setIsDropDownVisible({
                ...isDropDownVisible,
                countries: true,
              });
            }}
            errorMsg={countryErrMsg}
          />
        ) : null}
        {addEditRequest?.subcategory?.values?.name !== translations.TRACKS ? (
          <Text style={styles.note}>
            {translations.NOTE}
            <Text style={styles.noteLine}>
              {translations.SHIPPING_TO_BE_PAID_BY_SELLER}
            </Text>
          </Text>
        ) : null}
        {categoryId === SELL_PRODUCT.DIGITAL_PAINT &&
        addEditRequest?.subcategory?.values?.name !== translations.TRACKS ? (
          <>
            {addEditRequest?.digitalFile === '' ||
            addEditRequest?.digitalFile === undefined ? (
              <>
                <TouchableOpacity
                  onPress={() => uploadDocument('file')}
                  style={styles.uploadView}>
                  <AppImages.Common.UploadIcon
                    height={moderateScaleVertical(36)}
                    width={moderateScale(36)}
                  />
                  <Text style={styles.upload}>
                    {translations.UPLOAD} {translations.FILE}
                  </Text>
                </TouchableOpacity>
                <View style={styles.row} />
              </>
            ) : (
              <View>
                <Text style={styles.audioHeading}>{translations.FILE}</Text>
                <View style={styles.clickable}>
                  <AppImages.Common.File />

                  <Text style={styles.audioName}>
                    {addEditRequest?.digitalFile}
                  </Text>

                  <TouchableOpacity
                    style={styles.uploadImageInnerVIew}
                    onPress={() => {
                      setProductDetail({
                        ...addEditRequest,
                        digitalFile: '',
                      });
                    }}>
                    <AppImages.CreateContestentProfile.tpp_cross_small_icon
                      width={16}
                      height={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : null}
        {categoryId === SELL_PRODUCT.DIGITAL_PAINT &&
        addEditRequest?.subcategory?.values?.name === translations.TRACKS ? (
          <>
            {addEditRequest?.sampleAudio === '' ||
            addEditRequest?.sampleAudio === undefined ? (
              <>
                <TouchableOpacity
                  onPress={() => uploadDocument('sample')}
                  style={styles.uploadView}>
                  <AppImages.Common.UploadIcon
                    height={moderateScaleVertical(36)}
                    width={moderateScale(36)}
                  />
                  <Text style={styles.upload}>
                    {translations.UPLOAD} {translations.SAMPLE_AUDIO}
                  </Text>
                </TouchableOpacity>
                <View style={styles.row}>
                  {sampleAudioErrMsg !== '' ? (
                    <>
                      <AppImages.Common.Alert_ICON />
                      <Text style={styles.error}> {sampleAudioErrMsg} </Text>
                    </>
                  ) : null}
                </View>
              </>
            ) : (
              <View>
                <Text style={styles.audioHeading}>
                  {translations.SAMPLE_AUDIO}
                </Text>
                <View style={styles.clickable}>
                  <AppImages.Common.Music />

                  <Text style={styles.audioName}>
                    {addEditRequest?.sampleAudio}
                  </Text>

                  <TouchableOpacity
                    style={styles.uploadImageInnerVIew}
                    onPress={() => {
                      setProductDetail({
                        ...addEditRequest,
                        sampleAudio: '',
                      });
                    }}>
                    <AppImages.CreateContestentProfile.tpp_cross_small_icon
                      width={16}
                      height={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : null}
        {categoryId === SELL_PRODUCT.DIGITAL_PAINT &&
        addEditRequest?.subcategory?.values?.name === translations.TRACKS ? (
          <>
            {addEditRequest?.fullAudio === '' ||
            addEditRequest?.fullAudio === undefined ? (
              <>
                <TouchableOpacity
                  onPress={() => uploadDocument('full')}
                  style={styles.uploadView}>
                  <AppImages.Common.UploadIcon
                    height={moderateScaleVertical(36)}
                    width={moderateScale(36)}
                  />
                  <Text style={styles.upload}>
                    {translations.UPLOAD} {translations.FULL_AUDIO}
                  </Text>
                </TouchableOpacity>
                <View style={styles.row}>
                  {fullAudioErrMsg !== '' && (
                    <>
                      <AppImages.Common.Alert_ICON />
                      <Text style={styles.error}> {fullAudioErrMsg} </Text>
                    </>
                  )}
                </View>
              </>
            ) : (
              <View>
                <Text style={styles.audioHeading}>
                  {translations.FULL_AUDIO}
                </Text>
                <View style={styles.clickable}>
                  <AppImages.Common.Music />

                  <Text style={styles.audioName}>
                    {addEditRequest?.fullAudio}
                  </Text>

                  <TouchableOpacity
                    style={styles.uploadImageInnerVIew}
                    onPress={() => {
                      setProductDetail({
                        ...addEditRequest,
                        fullAudio: '',
                      });
                    }}>
                    <AppImages.CreateContestentProfile.tpp_cross_small_icon
                      width={16}
                      height={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : null}
        {categoryId === SELL_PRODUCT.TICKETS_ENTRY && (
          <HeadShotImage
            onImageFound={onTicketImageFound}
            url={addEditRequest?.ticketImage}
            label={translations.UPLOAD_TICKET_IMAGE}
            showNote={false}
            heading={translations.TICKET_IMAGE}
            displayHeadUrl={!!addEditRequest?.ticketImage ? true : false}
          />
        )}
        <View>
          <HeadShotImage
            onImageFound={onImageFound}
            url={addEditRequest?.featured_full_path_image}
            label={translations.UPLOAD_FEATURED_IMAGE}
            showNote={false}
            isMandatory={true}
            heading={translations.FEATURED_IMAGE}
            errorMsg={featuredImageErrMsg}
            displayHeadUrl={
              !!addEditRequest?.featured_full_path_image ? true : false
            }
          />
          <AdditionalImage
            addEditRequest={addEditRequest}
            setProductDetail={setProductDetail}
          />
        </View>
        <View style={{...styles.rowView, ...styles.marginTop8}}>
          <TouchableOpacity
            onPress={() => setUserAggredTanC(!userAggredTanC)}
            style={styles.marginTop4}>
            {userAggredTanC ? (
              <appImage.Common.Filled_ICON />
            ) : (
              <appImage.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.textStyle,
              {color: userAggredTanC ? color.BLACK : color.S_GRAY_4},
            ]}>
            {translations.AGREE_PP_CLICK}
            <Text style={{color: color.P_PINK}} onPress={onTermConditionPress}>
              {translations.TERMS_OF_SERVIC}{' '}
            </Text>
            {translations.PERCENTAGE_BREAKDOWN}
          </Text>
        </View>
      </View>
      <CustomBottomModal
        isModalVisible={isDropDownVisible.countries}
        setIsModalVisible={(val: boolean) => {
          setIsDropDownVisible({
            ...isDropDownVisible,
            countries: val,
          });
        }}
        data={dropDownList.countries}
        parentCallback={selectedText => {
          setProductDetail({
            ...addEditRequest,
            country_id: selectedText,
          });
        }}
        preSelectedValue={addEditRequest?.country_id}
        heading={translations.WHERE_ARE_YOU_WILLING_TO_SHIP}
        enableSearch={true}
        showSelectAllSelectNon
        enableMultiselect
      />
    </>
  );
};

export default DigitalPrintStepTwo;
