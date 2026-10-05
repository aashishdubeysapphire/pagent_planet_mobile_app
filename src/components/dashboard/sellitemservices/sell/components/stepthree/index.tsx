import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import appImage from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {SCREEN} from '../../../../../../root/screenname';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {GET_MASTER_DATA} from '../../../../../../services/endpoints';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {SellAttributes} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {toastError} from '../../../../../common/commonalert';
import CustomBottomModal from '../../../../../common/custombottommodal';
import Loader from '../../../../../common/customloader';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import FloatingDropdown from '../../../../../common/floatingdropown';
import HeadShotImage from '../../../../../common/headshotimage';
import MultiSelectinput from '../../../../../common/multiselectinput';
import {moderateScale} from '../../../../../utils/responsiveSize';
import {isValueNull, removeEmojis} from '../../../../../utils/validations';
import AdditionalImage from '../additionalimages';
import {SELL_TABS} from '../stepview';
import {productConditonDropDownList} from './locallist';
import {styles} from './styles';
import {isValid} from './validation';

interface Props {
  addEditRequest: ProductsData;
  category: Category | undefined;
  isNextClick: boolean;
  onStepComplete?: () => void;
  completedStep: number;
  setCompletedStep: (tabId: number) => void;
  setProductDetail: any;
  sellAttributeData: SellAttributes | undefined;
  isEditProduct: boolean;
  visitingStepThreeFirstTime: boolean;
  setVisitingStepThreeFirstTime: (val: boolean) => void;
  userAggredTanC: boolean;
  setUserAggredTanC: (val: boolean) => void;
}

export const StepThree = ({
  addEditRequest,
  category,
  isNextClick,
  completedStep,
  setCompletedStep,
  onStepComplete,
  setProductDetail,
  sellAttributeData,
  isEditProduct,
  visitingStepThreeFirstTime,
  setVisitingStepThreeFirstTime,
  userAggredTanC,
  setUserAggredTanC,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nonVariableFeildDropDownLable, setNonVariableFeildDropDownLable] =
    useState('');
  const [selectedindex, setSelectedindex] = useState();
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [canMoveToNextStep, setcanMoveToNextStep] = useState(false);
  const [dropDownList, setDropDownList] = useState({
    countries: {},
    brand: {},
    productCondition: productConditonDropDownList,
    nonvariableFeild: {},
  });
  const [isDropDownVisible, setIsDropDownVisible] = useState({
    countries: false,
    brand: false,
    productCondition: false,
    nonvariableFeild: false,
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
  const [errMsg, seterrMsg] = useState({});

  useEffect(() => {
    hitMasterDetailsAPI();
    checktoShowExtraInfo();

    if (visitingStepThreeFirstTime) {
      !isEditProduct && putInitialData();
      setVisitingStepThreeFirstTime(false);
    }
  }, []);
  const navigator = useNavigation();

  const isAllFieldCompleted = () => {
    if (isValid(addEditRequest, seterrMsg, userAggredTanC)) {
      return true;
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      return false;
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

  useEffect(() => {
    if (
      onStepComplete !== undefined &&
      completedStep === SELL_TABS.STEP_THREE &&
      isAllFieldCompleted()
    ) {
      changeNonVarFeildsFormat();
    } else {
      setCompletedStep(SELL_TABS.STEP_THREE);
    }
  }, [isNextClick]);

  useEffect(() => {
    if (canMoveToNextStep) {
      onStepComplete();
      setcanMoveToNextStep(false);
    }
  }, [canMoveToNextStep]);

  const changeNonVarFeildsFormat = () => {
    setProductDetail({
      ...addEditRequest,
      result: {
        ...addEditRequest.result,
        non_variable_fields: Object.values(
          addEditRequest?.result?.non_variable_fields,
        ),
      },
    });
    setcanMoveToNextStep(true);
  };
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
  const getValue = index => {
    return isValueNull(
      addEditRequest?.result?.non_variable_fields?.[index]?.values?.name,
    );
  };
  const getNonVariableFeilds = () => {
    let renderView = [];
    for (
      let index = 0;
      index < sellAttributeData?.non_variable_fields.length;
      index++
    ) {
      const element = sellAttributeData?.non_variable_fields?.[index];
      let lable = element.label;
      let values = element?.values;
      if (element.is_extra == 0) {
        renderView.push(
          <View>
            <FloatingDropdown
              floatingText={lable}
              value={getValue(index)}
              onFieldFocus={() => {
                setNonVariableFeildDropDownLable(lable);
                setSelectedindex(index);
                setIsDropDownVisible({
                  ...isDropDownVisible,
                  nonvariableFeild: true,
                });
                setDropDownList({
                  ...dropDownList,
                  nonvariableFeild: values,
                });
              }}
            />
          </View>,
        );
      }
    }
    return renderView;
  };

  const putInitialData = () => {
    let localNon_variable_fields = [];

    for (
      let index = 0;
      index < sellAttributeData?.non_variable_fields.length;
      index++
    ) {
      const element = sellAttributeData?.non_variable_fields[index];

      localNon_variable_fields.push({
        id: element?.id,
        name: element?.name,
        label: element?.label,
        values: [
          {
            id: null,
            name: null,
          },
        ],
      });
    }

    setProductDetail({
      ...addEditRequest,
      result: {
        ...addEditRequest.result,
        non_variable_fields: localNon_variable_fields,
      },
    });
  };
  const onPressExtraItem = index => {
    let finsdIndex =
      addEditRequest?.result?.non_variable_fields?.[index]?.values?.name ==
      'Yes'
        ? 1
        : 0;

    setProductDetail({
      ...addEditRequest,
      result: {
        ...addEditRequest.result,
        non_variable_fields: {
          ...addEditRequest.result.non_variable_fields,
          [index]: {
            ...addEditRequest.result.non_variable_fields[index],
            values: {
              id: sellAttributeData?.non_variable_fields?.[index]?.values?.[
                finsdIndex
              ]?.id,
              name: sellAttributeData?.non_variable_fields?.[index]?.values?.[
                finsdIndex
              ]?.name,
            },
          },
        },
      },
    });
  };

  const getExtraInforFeilds = () => {
    let extraInfoView = [];
    for (
      let index = 0;
      index < sellAttributeData?.non_variable_fields.length;
      index++
    ) {
      const element = sellAttributeData?.non_variable_fields?.[index];

      if (element?.is_extra == 1) {
        extraInfoView.push(
          <>
            <TouchableOpacity
              style={
                addEditRequest?.result?.non_variable_fields?.[index]?.values
                  ?.name == 'Yes'
                  ? styles.extraInfoView
                  : {...styles.extraInfoView, backgroundColor: color.S_GRAY_1}
              }
              onPress={() => {
                onPressExtraItem(index);
              }}>
              <View style={styles.image}>
                {addEditRequest?.result?.non_variable_fields?.[index]?.values
                  ?.name == 'Yes' ? (
                  <appImage.SELL_ITEMS.Tick />
                ) : (
                  <appImage.SELL_ITEMS.Tpp_add_info_icon />
                )}
              </View>
              <Text
                style={
                  addEditRequest?.result?.non_variable_fields?.[index]?.values
                    ?.name == 'Yes'
                    ? styles.extraInfolable
                    : {...styles.extraInfolable, color: color.S_GRAY_4}
                }>
                {element?.label}
              </Text>
            </TouchableOpacity>
          </>,
        );
      }
    }
    return extraInfoView;
  };
  const checktoShowExtraInfo = () => {
    let isExtraAvailable = 0;
    for (
      let index = 0;
      index < sellAttributeData?.non_variable_fields.length;
      index++
    ) {
      const element = sellAttributeData?.non_variable_fields?.[index];

      if (element?.is_extra == 1) {
        isExtraAvailable++;
      }
    }

    setShowExtraInfo(isExtraAvailable == 0 ? false : true);
  };
  const onTermConditionPress = () => {
    navigator.navigate(SCREEN.STATIC_PAGE, {
      title: translations.TERMS_OF_SERVIC,
    });
  };

  const onImageFound = img => {
    seterrMsg({featuredImage: ''});
    setProductDetail({
      ...addEditRequest,
      featured_full_path_image: img?.uri,
      localImage: img,
    });
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <View
        style={{
          marginHorizontal: moderateScale(16),
        }}>
        <FloatingDropdown
          floatingText={translations.PRODUCT_CONDITION}
          value={addEditRequest?.worn_status?.title}
          isMandatory={true}
          onFieldFocus={() => {
            setIsDropDownVisible({
              ...isDropDownVisible,
              productCondition: true,
            });
          }}
          errorMsg={errMsg?.productCondition}
        />
        {addEditRequest?.worn_status?.id == 2 && ( //MINOR USED
          <FloatingBigInput
            floatingText={translations.FLAW_DETAILS}
            value={isValueNull(addEditRequest?.flaw_detail)}
            returnKeyType={'done'}
            multiline={true}
            textAlignVertical={'top'}
            setText={value =>
              setProductDetail({
                ...addEditRequest,
                flaw_detail: removeEmojis(value),
              })
            }
            forMultiline={true}
            autoCapitalize={'sentences'}
            errorMsg={errMsg?.minorFlaws}
            isMandatory={true}
            showLength={false}
          />
        )}

        <MultiSelectinput
          floatingText={translations.WHERE_ARE_YOU_WILLING_TO_SHIP}
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
          errorMsg={errMsg?.country}
        />
        <Text style={styles.note}>
          {translations.NOTE}
          <Text style={styles.noteLine}>
            {translations.SHIPPING_TO_BE_PAID_BY_SELLER}
          </Text>
        </Text>
        {getNonVariableFeilds()}
        {showExtraInfo && (
          <>
            <Text style={styles.extraInfoText}>{translations.EXRA_INFO}</Text>
            <View style={{...styles.exraInfoView}}>
              {getExtraInforFeilds()}
            </View>
          </>
        )}

        <HeadShotImage
          onImageFound={onImageFound}
          url={addEditRequest?.featured_full_path_image}
          label={translations.UPLOAD_FEATURED_IMAGE}
          showNote={false}
          isMandatory={true}
          heading={translations.FEATURED_IMAGE}
          errorMsg={errMsg?.featuredImage}
          msg={translations.DELETE_FEATURED_IMAGE}
          displayHeadUrl={
            !!addEditRequest?.featured_full_path_image ? true : false
          }
        />
        {/* AdditionalImage View  */}
        <AdditionalImage
          addEditRequest={addEditRequest}
          setProductDetail={setProductDetail}
        />
        {/* T&C view  */}
        <View style={{...styles.rowView, ...styles.marginTop8}}>
          {/* touchView that conditionaly renders tic icon  */}
          <TouchableOpacity
            onPress={() => setUserAggredTanC(!userAggredTanC)}
            style={styles.marginTop4}>
            {userAggredTanC ? (
              <appImage.Common.Filled_ICON />
            ) : (
              <appImage.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          {/* test as a child of text element */}
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
        {!!errMsg?.userAgree ? (
          <View style={styles.row}>
            <appImage.Common.Alert_ICON />
            <Text style={styles.error}> {errMsg?.userAgree} </Text>
          </View>
        ) : (
          <View style={styles.extraSpace} />
        )}
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
      <CustomBottomModal
        isModalVisible={isDropDownVisible.productCondition}
        setIsModalVisible={(val: boolean) => {
          setIsDropDownVisible({
            ...isDropDownVisible,
            productCondition: val,
          });
        }}
        data={dropDownList.productCondition}
        parentCallback={selectedText => {
          setProductDetail({
            ...addEditRequest,
            worn_status: selectedText,
            flaw_detail: '',
          });
        }}
        preSelectedValue={addEditRequest?.worn_status?.id}
        heading={translations.PRODUCT_CONDITION}
      />
      <CustomBottomModal
        isModalVisible={isDropDownVisible.nonvariableFeild}
        setIsModalVisible={(val: boolean) => {
          setIsDropDownVisible({
            ...isDropDownVisible,
            nonvariableFeild: val,
          });
        }}
        data={dropDownList.nonvariableFeild}
        parentCallback={selectedText => {
          setProductDetail({
            ...addEditRequest,
            result: {
              ...addEditRequest.result,
              non_variable_fields: {
                ...addEditRequest.result.non_variable_fields,
                [selectedindex]: {
                  ...addEditRequest.result.non_variable_fields[selectedindex],
                  values: {
                    id: selectedText.id,
                    name: selectedText.name,
                  },
                },
              },
            },
          });
        }}
        enableSearch={dropDownList.nonvariableFeild.length > 10}
        preSelectedValue={
          addEditRequest?.result?.non_variable_fields?.[selectedindex]?.values
            ?.id
        }
        heading={nonVariableFeildDropDownLable}
      />
    </>
  );
};

export default StepThree;
