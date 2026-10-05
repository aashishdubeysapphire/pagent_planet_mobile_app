import React, {useState, useEffect} from 'react';
import { View} from 'react-native';
import translations from '../../../../../../assets/translations';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../../../services/constants';
import {
  GET_LOGEDIN_USER_ROLES_LIST,
  GET_UPCOMING_EVENT_LIST,
} from '../../../../../../services/endpoints';
import {Base} from '../../../../../../services/models/base';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {SellAttributes} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {RoleList} from '../../../../../../services/models/sellitems/stepOne/roleList';
import {toastError} from '../../../../../common/commonalert';
import CustomBottomModal from '../../../../../common/custombottommodal';
import Loader from '../../../../../common/customloader';
import FloatingDropdown from '../../../../../common/floatingdropown';
import FloatingInput from '../../../../../common/floatinginput';
import {SELL_PRODUCT, SUB_CATEGORY_VALUES} from '../../../../../utils/enum';
import {
  checkIsConnected,
  ConTwoDecDigit,
  isIosDevice,
} from '../../../../../utils/helperFunction';
import {moderateScale, moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {
  checkIsNull,
  isValueNull,
  removeEmojis,
} from '../../../../../utils/validations';
import CustomBottomModalWithApi from '../../../../dashboard/createcontestentprofile/components/custombottommodalwithApi';
import {SELL_TABS} from '../stepview';
import {styles} from './styles';
import {isValid} from './validation';
import FloatingHtmlInput from '../../../../../common/floatinghtmlinput';
interface Props {
  addEditRequest: ProductsData;
  category: Category | undefined;
  isNextClick: boolean;
  completedStep: number;
  onStepComplete?: () => void;
  setCompletedStep: (tabId: number) => void;
  sellAttributeData: SellAttributes | undefined;
  setProductDetail: Function;
  isEditProduct: boolean;
}

export const StepOne = ({
  addEditRequest,
  category,
  isNextClick,
  completedStep,
  onStepComplete,
  setCompletedStep,
  setProductDetail,
  sellAttributeData,
  isEditProduct,
}: Props) => {

  const [isFanUser, setIsFanUser] = useState(false);
  const [priceRef, setPriceRef] = useState();
  const [salePriceRef, setsalePriceRef] = useState();
  const [inStockRef, setInStockRef] = useState();
  const [minStockRef, setMinStockRef] = useState();
  const [descriptionRef] = useState();
  const [roleList, setRoleList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [namesList, setNamesList] = useState({});
  const [eventNameList, setEventNameList] = useState([]);
  const categoryList = checkIsNull(sellAttributeData?.subcategory?.[0]?.values)
    ? sellAttributeData?.subcategory[0]?.values
    : {};
  const [dropDownModalVisible, setDropDownModalVisible] = useState({
    selectProfileModal: false,
    selectProfilename: false,
    pagentWhereThisItemWasWorn: false,
    selectCategory: false,
    event: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    profileType: '',
    profileName: '',
    productTitle: '',
    price: '',
    salePrice: '',
    inStock: '',
    minStock: '',
    pagentWhereThisItemWasWorn: '',
    videoLink: '',
    description: '',
    selectCategory: '',
    event: '',
  });
  const OnChangeErr = val => {
    setErrorMsg({...errorMsg, ...val});
  };
  useEffect(() => {
    hitGetRolesListAPi();
  }, []);

  useEffect(() => {
    if (
      !!addEditRequest.profile_name &&
      (addEditRequest?.subcategory?.values?.name ==
        SUB_CATEGORY_VALUES.ENTRY_FEE ||
        addEditRequest?.subcategory?.values?.name == SUB_CATEGORY_VALUES.EVENT)
    ) {
      getEventsList(false);
    }
  }, [addEditRequest.profile_name]);
  useEffect(() => {
    getProfilenameList();
  }, [roleList]);

  const isAllFieldCompleted = () => {
    if (isValid(addEditRequest, OnChangeErr, category, isFanUser)) {
      return true;
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  useEffect(() => {
    if (
      onStepComplete !== undefined &&
      completedStep === SELL_TABS.STEP_ONE &&
      isAllFieldCompleted()
    ) {
      onStepComplete();
    } else {
      setCompletedStep(SELL_TABS.STEP_ONE);
    }
  }, [isNextClick]);

  const {mutateAsync: getRolesList} = useCgMutation<RoleList>({
    key: GET_LOGEDIN_USER_ROLES_LIST,
    method: MethodTypes.GET,
    url: GET_LOGEDIN_USER_ROLES_LIST,
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: getEventList} = useCgMutation<Base>({
    key: GET_UPCOMING_EVENT_LIST + addEditRequest?.profile_id,
    method: MethodTypes.Post,
    url: GET_UPCOMING_EVENT_LIST + addEditRequest?.profile_id,
    disableLoader: true,
    offSuccessToast: true,
  });

  const hitGetRolesListAPi = async () => {
    setIsLoading(true);
    const response = await getRolesList();

    if (response.success) {
      if (
        isEditProduct &&
        addEditRequest.price == addEditRequest.selling_price
      ) {
        setProductDetail({
          ...addEditRequest,
          selling_price: null,
        });
      }
      setRoleList(response.data.roles);
      if (!checkIsNull(response.data.roles[0])) {
        setIsFanUser(true);
      }
    }
    setIsLoading(false);
  };
  const getProfilenameList = () => {
    for (let index = 0; index < roleList.length; index++) {
      const element = roleList[index];
      if (element.id === addEditRequest?.role_id) {
        setNamesList(element.profiles);
      }
    }
  };
  const onChangeProfileType = selectedText => {
    if (addEditRequest?.role_id != selectedText?.id) {
      addEditRequest.profile_id = '';
      addEditRequest.profile_name = '';
    }
    addEditRequest.role_id = selectedText?.id;
    addEditRequest.role_name = selectedText.name;
    if (selectedText.profiles.length == 1) {
      addEditRequest.profile_id = selectedText.profiles[0]?.id;
      addEditRequest.profile_name = selectedText.profiles[0]?.title;
    }
    getProfilenameList();
  };

  const shouldShowCategoryField = () => {
    if (
      category?.id == SELL_PRODUCT.BEAUTY ||
      category?.id == SELL_PRODUCT.DIGITAL_PAINT ||
      category?.id == SELL_PRODUCT.HIRE ||
      category?.id == SELL_PRODUCT.TICKETS_ENTRY
    ) {
      return true;
    } else {
      return false;
    }
  };
  const onFocusProfilename = () => {
    if (!!addEditRequest.role_name) {
      setDropDownModalVisible({
        ...dropDownModalVisible,
        selectProfilename: true,
      });
    } else {
      OnChangeErr({
        profileType: translations.THIS_FIELD_REQUIRED,
      });
    }
  };
  const onFocusEventname = async () => {
    if (!!addEditRequest?.profile_name) {
      getEventsList(true);
    } else {
      OnChangeErr({
        profileName: translations.THIS_FIELD_REQUIRED,
      });
    }
  };

  const getEventsList = async (val = true) => {
    setIsLoading(true);
    if (checkIsConnected()) {
      const res = await getEventList();
      if (res.success) {
        setEventNameList(res?.data?.result);

        if (res?.data?.result.length == 1 && !!!addEditRequest.event_id) {
          setProductDetail({
            ...addEditRequest,
            event_id: res?.data?.result[0].id,
            event_name: res?.data?.result[0].title,
            unique_style_number:
              res?.data?.result[0].title + ' ' + translations.TICKETS,
          });
        } else {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            event: val,
          });
        }
      }
      setIsLoading(false);
    }
  };

  const onSelectCategory = (selectedText: {name: string; id: any}) => {
    if (
      category?.id == SELL_PRODUCT.TICKETS_ENTRY &&
      (selectedText.name == SUB_CATEGORY_VALUES.ENTRY_FEE ||
        selectedText.name == SUB_CATEGORY_VALUES.EVENT)
    ) {
      let pagentObject = roleList.filter(data => data.name == 'Pageant');
      checkIsNull(pagentObject) && onChangeProfileType(pagentObject[0]);

      setProductDetail({
        ...addEditRequest,
        subcategory: {
          id: sellAttributeData?.subcategory?.[0]?.id,
          name: sellAttributeData?.subcategory?.[0]?.name,
          label: sellAttributeData?.subcategory?.[0]?.label,
          values: {
            id: selectedText.id,
            name: selectedText.name,
          },
        },
      });
    } else {
      setProductDetail({
        ...addEditRequest,
        subcategory: {
          id: sellAttributeData?.subcategory?.[0]?.id,
          name: sellAttributeData?.subcategory?.[0]?.name,
          label: sellAttributeData?.subcategory?.[0]?.label,
          values: {
            id: selectedText.id,
            name: selectedText.name,
          },
        },
      });
    }
  };

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setProductDetail({
        ...addEditRequest,
        description: descriptionText,
      });
    } else {
      setProductDetail({
        ...addEditRequest,
        description: '',
      });
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <View style={{marginHorizontal: moderateScale(16)}}>
        {shouldShowCategoryField() && (
          <FloatingDropdown
            floatingText={translations.SELECT_CATEGORY}
            value={addEditRequest?.subcategory?.values?.name}
            isMandatory={true}
            onFieldFocus={
              isEditProduct
                ? () => {}
                : () => {
                    setDropDownModalVisible({
                      ...dropDownModalVisible,
                      selectCategory: true,
                    });
                  }
            }
            errorMsg={errorMsg.selectCategory}
            opacity={isEditProduct ? 0.5 : 1}
          />
        )}
        {isFanUser ? null : (
          <>
            {!(
              addEditRequest?.subcategory?.values?.name ==
                SUB_CATEGORY_VALUES.ENTRY_FEE ||
              addEditRequest?.subcategory?.values?.name ==
                SUB_CATEGORY_VALUES.EVENT
            ) ? (
              <FloatingDropdown
                floatingText={translations.SELECT_PROFILE_TYPE}
                value={addEditRequest?.role_name}
                isMandatory={true}
                onFieldFocus={
                  isEditProduct
                    ? () => {}
                    : () => {
                        setDropDownModalVisible({
                          ...dropDownModalVisible,
                          selectProfileModal: true,
                        });
                      }
                }
                errorMsg={errorMsg.profileType}
                opacity={isEditProduct ? 0.5 : 1}
              />
            ) : (
              <FloatingInput
                floatingText={translations.SELECT_PROFILE_TYPE}
                value={addEditRequest?.role_name}
                setText={val => {}}
                isMandatory={true}
                errorMsg={errorMsg.profileType}
                editable={isEditProduct !== true}
                // isEditable={false}
                customStyles={isEditProduct === true ? styles.opacity : null}
              />
            )}

            {namesList?.length === 1 ? (
              <FloatingInput
                floatingText={translations.PROFILE_NAME}
                value={addEditRequest?.profile_name}
                isMandatory={true}
                errorMsg={errorMsg.profileName}
                // isEditable={false}
                editable={isEditProduct !== true}
                customStyles={isEditProduct === true ? styles.opacity : null}
              />
            ) : (
              <FloatingDropdown
                floatingText={translations.PROFILE_NAME}
                value={addEditRequest?.profile_name}
                isMandatory={true}
                onFieldFocus={
                  isEditProduct
                    ? () => {}
                    : () => {
                        onFocusProfilename();
                      }
                }
                errorMsg={errorMsg.profileName}
                opacity={isEditProduct ? 0.5 : 1}
              />
            )}
            {(addEditRequest?.subcategory?.values?.name ==
              SUB_CATEGORY_VALUES.ENTRY_FEE ||
              addEditRequest?.subcategory?.values?.name ==
                SUB_CATEGORY_VALUES.EVENT) && (
              <FloatingDropdown
                floatingText={translations.EVENT}
                value={addEditRequest?.event_name}
                isMandatory={true}
                onFieldFocus={
                  isEditProduct
                    ? () => {}
                    : () => {
                        onFocusEventname();
                      }
                }
                errorMsg={errorMsg.event}
                opacity={isEditProduct ? 0.5 : 1}
              />
            )}
          </>
        )}

        <FloatingInput
          floatingText={translations.PRODUCT_TITLE}
          value={isValueNull(addEditRequest?.unique_style_number)}
          setText={val =>
            setProductDetail({
              ...addEditRequest,
              unique_style_number: removeEmojis(val),
            })
          }
          returnKeyType={'next'}
          isMandatory={true}
          nextField={priceRef}
          errorMsg={errorMsg.productTitle}
        />

        <View style={{flexDirection: 'row'}}>
          <FloatingInput
            floatingText={translations.PRICE}
            returnKeyType={'next'}
            setRef={ref => setPriceRef(ref)}
            value={isValueNull(addEditRequest?.price)}
            nextField={salePriceRef}
            setText={val =>
              setProductDetail({
                ...addEditRequest,
                price: ConTwoDecDigit(val.trim()),
              })
            }
            isMandatory
            keyboardType="numeric"
            customStyles={styles.dynamicWidth}
            errorMsg={errorMsg.price}
          />
          <FloatingInput
            floatingText={translations.SALE_PRICE}
            returnKeyType={'next'}
            setRef={ref => setsalePriceRef(ref)}
            nextField={inStockRef}
            value={isValueNull(addEditRequest?.selling_price)}
            setText={val =>
              setProductDetail({
                ...addEditRequest,
                selling_price: ConTwoDecDigit(val.trim()),
              })
            }
            keyboardType="numeric"
            customStyles={styles.dynamicWidth2}
            errorMsg={errorMsg.salePrice}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <FloatingInput
            floatingText={translations.IN_STOCK}
            returnKeyType={'next'}
            setRef={ref => setInStockRef(ref)}
            nextField={minStockRef}
            value={isValueNull(addEditRequest?.inventory)}
            setText={val =>
              setProductDetail({
                ...addEditRequest,
                inventory: val.replace(/[^\d]/g, ''),
              })
            }
            keyboardType="numeric"
            customStyles={styles.dynamicWidth}
            errorMsg={errorMsg.inStock}
          />
          <FloatingInput
            floatingText={translations.MIN_STOCK}
            setRef={ref => setMinStockRef(ref)}
            nextField={minStockRef}
            returnKeyType={'done'}
            value={isValueNull(addEditRequest?.inventory_alert)}
            setText={val =>
              setProductDetail({
                ...addEditRequest,
                inventory_alert: val.replace(/[^\d]/g, ''),
              })
            }
            keyboardType="numeric"
            customStyles={styles.dynamicWidth2}
            errorMsg={errorMsg.minStock}
          />
        </View>
        {!shouldShowCategoryField() && (
          <FloatingDropdown
            floatingText={translations.WHERE_THIS_ITEM_WAS_WORN}
            value={addEditRequest?.worn_at_pageant_name}
            onFieldFocus={() =>
              setDropDownModalVisible({
                ...dropDownModalVisible,
                pagentWhereThisItemWasWorn: true,
              })
            }
            errorMsg={errorMsg.pagentWhereThisItemWasWorn}
          />
        )}
        <FloatingInput
          floatingText={translations.YOUTUBE_VIDEO_LINK}
          returnKeyType={'next'}
          nextField={descriptionRef}
          value={addEditRequest?.video_link}
          setText={val =>
            setProductDetail({
              ...addEditRequest,
              video_link: removeEmojis(val.trim()),
            })
          }
          errorMsg={errorMsg.videoLink}
        />
        <FloatingHtmlInput
          floatingText={translations.DESCRIPTION}
          value={isValueNull(addEditRequest?.description)}
          returnKeyType={'done'}
          multiline={true}
          textAlignVertical={'top'}
          setText={val => richTextHandle(val)}
          forMultiline={true}
          autoCapitalize={'sentences'}
          errorMsg={errorMsg.description}
          showLength={false}
        />
        <View style={{height: isIosDevice()?moderateScaleVertical(300): 200}} />
      </View>
      <CustomBottomModal
        isModalVisible={dropDownModalVisible.selectCategory}
        setIsModalVisible={(val: boolean) => {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            selectCategory: val,
          });
        }}
        data={categoryList}
        parentCallback={selectedText => {
          onSelectCategory(selectedText);
        }}
        preSelectedValue={addEditRequest?.subcategory?.values?.id}
        heading={translations.SELECT_CATEGORY}
      />
      <CustomBottomModal
        isModalVisible={dropDownModalVisible.selectProfileModal}
        setIsModalVisible={(val: boolean) => {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            selectProfileModal: val,
          });
        }}
        data={roleList}
        parentCallback={selectedText => {
          onChangeProfileType(selectedText);
        }}
        preSelectedValue={addEditRequest?.role_id}
        heading={translations.SELECT_PROFILE_TYPE}
      />
      <CustomBottomModal
        isModalVisible={dropDownModalVisible.selectProfilename}
        setIsModalVisible={(val: boolean) => {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            selectProfilename: val,
          });
        }}
        data={namesList}
        parentCallback={selectedText => {
          if (addEditRequest.profile_id !== selectedText.id) {
            setProductDetail({
              ...addEditRequest,
              profile_id: selectedText.id,
              profile_name: selectedText.title,
              event_id: '',
              event_name: '',
            });
          }
        }}
        preSelectedValue={addEditRequest?.profile_id}
        searchKey={'title'}
        heading={translations.SELECT + translations.PROFILE_NAME}
        enableSearch={namesList?.length > 15 ? true : false}
      />

      <CustomBottomModal
        isModalVisible={dropDownModalVisible.event}
        setIsModalVisible={(val: boolean) => {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            event: val,
          });
        }}
        data={eventNameList}
        parentCallback={selectedText => {
          addEditRequest?.subcategory?.values?.name ==
            SUB_CATEGORY_VALUES.ENTRY_FEE ||
          addEditRequest?.subcategory?.values?.name == SUB_CATEGORY_VALUES.EVENT
            ? setProductDetail({
                ...addEditRequest,
                event_id: selectedText.id,
                event_name: selectedText.title,
                unique_style_number:
                  selectedText.title + ' ' + translations.TICKETS,
              })
            : setProductDetail({
                ...addEditRequest,
                event_id: selectedText.id,
                event_name: selectedText.title,
              });
        }}
        preSelectedValue={addEditRequest?.event_id}
        searchKey={'title'}
        heading={translations.SELECT + translations.EVENT}
        enableSearch={eventNameList?.length > 15 ? true : false}
      />
      <CustomBottomModalWithApi
        isModalVisible={dropDownModalVisible.pagentWhereThisItemWasWorn}
        setIsModalVisible={val => {
          setDropDownModalVisible({
            ...dropDownModalVisible,
            pagentWhereThisItemWasWorn: val,
          });
        }}
        preSelectedValue={addEditRequest?.worn_at_pageant_id}
        parentCallback={selectedText => {
          addEditRequest.worn_at_pageant_id = selectedText.id;
          addEditRequest.worn_at_pageant_name = selectedText.title;
        }}
        heading={translations.WHERE_THIS_ITEM_WAS_WORN}
        enableSearch={true}
      />
    </>
  );
};

export default StepOne;
