import {View, Text, ScrollView, ImageBackground} from 'react-native';
import React, {Ref, useEffect, useState} from 'react';
import FloatingInput from '../../../../../../common/floatinginput';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import MultiSelectinput from '../../../../../../common/multiselectinput';
import FloatingBigInput from '../../../../../../common/floatingbiginput';
import {
  GET_MASTER_DATA,
  GET_MASTER_DATA_BY_NAME,
} from '../../../../../../../services/endpoints';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {ROLES} from '../../../../../../utils/enum';
import Loader from '../../../../../../common/customloader';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import {removeMiddleSpaces} from '../../../../../../utils/helperFunction';
import BusinessLocation from '../businesslocation';
import DynamicradioButton from '../../../../../../common/dynamicradiobutton/dynamicradioButton';
import {TWO_OPTIONS} from '../../../../pageantdashboard/addpageant/addpagentrules/loccalArray';
import CustomBottomModal from '../../../../../../common/custombottommodal';
import SearchTagOptions from '../../../../contestantdashboard/gallery/subgallery/albumdetail/tags/addtag/components/searchtagoptions';
import {Param} from '../../../../../../../services/constants';
import {removeEmojis} from '../../../../../../utils/validations';
import AddMoreLocation from '../addMoreLocation';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../assets/images/AppImages';

interface Props {
  isEdit: boolean;
  selectedProfile: any;
  userSelectedData: any;
  setUserSelectedData: any;
  recivedLeades: any;
  setRecivedLeades: any;
  selectedLocation: any;
  setSelectedLocation: any;
  errorMsg: {
    nameOfCompnay: string;
    isCompAlsoBrand: string;
    designer: never[];
    speciality: never[];
    phone: string;
    website: string;
    tagline: string;
    about: string;
    recivedLeades: string;
    selectedLocation: string;
    locationTime: string;
  };
  loader: boolean;
  setLoader: any;
  selectedStatesIds: [];
  locationRequest: [];
  setLocationRequest: any;
  dataSourceCords: {};
  setDataSourceCords: any;
  scrollRef: Ref;
}
const Form = ({
  isEdit,
  selectedProfile,
  userSelectedData,
  setUserSelectedData,
  recivedLeades,
  setRecivedLeades,
  selectedLocation,
  setSelectedLocation,
  errorMsg,
  loader,
  setLoader,
  selectedStatesIds,
  locationRequest,
  setLocationRequest,
  setremovedLocation,
  dataSourceCords,
  setDataSourceCords,
  scrollRef,
}: Props) => {
  const [listingDataList, setlistingDataList] = useState({
    countries: [],
    speciality: [],
  });

  const [isModalVisible, setIsModalVisible] = useState({
    speciality: false,
    designer: false,
  });

  const navigation = useNavigation();
  useEffect(() => {
    getListDataFromBackend();
  }, []);
  const onChangeData = (data: {
    designer?: any;
    nameOfCompnay?: string;
    isCompAlsoBrand?: any;
    speciality?: any;
    phone?: string;
    website?: string;
    tagline?: string;
    about?: string;
  }) => {
    setUserSelectedData({
      ...userSelectedData,
      ...data,
    });
  };
  //API GET MASTER DATA----------------------------------------- START
  const {mutateAsync: getMasterDetails} = useCgMutation<[]>({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: null,
      is_countries: 1,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET MASTER DATA-------------------------------------------- END
  const {mutateAsync: getMasterDataByName} = useCgMutation<[]>({
    key:
      GET_MASTER_DATA_BY_NAME +
      encodeURIComponent(
        selectedProfile?.display_name + ' ' + translations.SPECIALITY,
      ),
    url:
      GET_MASTER_DATA_BY_NAME +
      encodeURIComponent(
        selectedProfile?.display_name + ' ' + translations.SPECIALITY,
      ),
    offSuccessToast: true,
    disableLoader: true,
  });

  const getListDataFromBackend = async () => {
    setLoader(true);
    const res = await getMasterDetails();
    const dataByName = await getMasterDataByName();
    setlistingDataList({
      countries: res?.data?.countries,
      speciality: dataByName?.data,
    });
    setLoader(false);
  };

  const groupByFirstLetter = (arr: any[]) => {
    const result: {data: any[]}[] = [];
    arr.forEach((item: {name: string}) => {
      const firstLetter = item.name.charAt(0).toUpperCase();
      const groupIndex = result.findIndex(group => group.title === firstLetter);
      if (groupIndex === -1) {
        result.push({title: firstLetter, data: [item]});
      } else {
        result[groupIndex].data.push(item);
      }
    });
    return result;
  };
  const onDesignerSelect = (i: any) => {
    onChangeData({
      designer: i,
    });
  };
  const showAddMoreLocationCondition = () => {
    return (
      isEdit &&
      (selectedProfile?.display_name == ROLES.RETAILER ||
        selectedProfile?.display_name == ROLES.AESTHETICS ||
        selectedProfile?.display_name == ROLES.PERSOANAL_TAINER)
    );
  };
  const EditFormBanner = () => {
    return (
      <View style={styles.upgradeView}>
        <ImageBackground
          source={AppImages.Common.Gradient}
          style={styles.gradientView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginTop: moderateScaleVertical(22)}}>
              <Text style={styles.purchasePlanTxt}>
                {translations.PURCHASE_PLAN_FORM_WEBSITE}
              </Text>
              <Text style={styles.upgradeText}>
                {translations.PAY_$}
                {userSelectedData?.advertisingBannerData?.membership_price}
                {translations.PER_MONTH_AND_WILL}
                {userSelectedData?.advertisingBannerData?.lead_include}{' '}
                {translations.CREDITS}{' '}
                {
                  userSelectedData?.advertisingBannerData
                    ?.position_profile_appeared
                }
                {translations.PLACE}
              </Text>
            </View>
            <View style={{marginVertical: moderateScaleVertical(16)}}>
              <AppImages.Common.Upgrade />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const advertisingConditions = () => {
    return (
      isEdit &&
      userSelectedData.advertisingBannerData?.is_active_advertiser ==
        translations.NO_SMALL
    );
  };
  return (
    <ScrollView style={styles.continer} ref={scrollRef}>
      <Loader isLoading={loader} />
      {advertisingConditions() && <EditFormBanner />}
      <FloatingInput
        floatingText={translations.NAME_OF_COMAPNY}
        value={userSelectedData.nameOfCompnay}
        isMandatory={true}
        maxLength={255}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        setText={val => {
          onChangeData({
            nameOfCompnay: removeEmojis(val),
          });
        }}
        errorMsg={errorMsg.nameOfCompnay}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      {selectedProfile?.display_name == ROLES.RETAILER && (
        <>
          <Text style={styles.heading}>
            {translations.IS_YOUR_COMPANY_ALSO_A_BRAND}
          </Text>
          <DynamicradioButton
            data={TWO_OPTIONS}
            selectedRadio={userSelectedData.isCompAlsoBrand}
            setSelectedRadio={(val: any) =>
              onChangeData({isCompAlsoBrand: val})
            }
            customStyles={styles.marginRight32}
            numColumns={2}
          />
          <MultiSelectinput
            floatingText={translations.DESIGNER}
            value={userSelectedData?.designer}
            onFieldFocus={() => {
              setIsModalVisible({
                ...isModalVisible,
                designer: true,
              });
            }}
            onDelete={(val: any) => {
              onChangeData({designer: val});
            }}
            addMore={() => {
              setIsModalVisible({
                ...isModalVisible,
                designer: true,
              });
            }}
            errorMsg={errorMsg.designer}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        </>
      )}

      <MultiSelectinput
        floatingText={translations.SPECIALTY}
        value={userSelectedData?.speciality}
        isMandatory={true}
        onFieldFocus={() => {
          setIsModalVisible({
            ...isModalVisible,
            speciality: true,
          });
        }}
        onDelete={(val: any) => {
          onChangeData({speciality: val});
        }}
        addMore={() => {
          setIsModalVisible({
            ...isModalVisible,
            speciality: true,
          });
        }}
        errorMsg={errorMsg.speciality}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      <FloatingInput
        floatingText={translations.PHONE_NUMBER}
        value={userSelectedData.phone}
        maxLength={16}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        keyboardType={'numeric'}
        setText={val => {
          onChangeData({
            phone: val.replace(/[^\d]/g, ''),
          });
        }}
        errorMsg={errorMsg.phone}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      {advertisingConditions() && (
        <Text style={styles.upgradeFromWeb}>
          {translations.NOT_VISIBLE_ON_PROFILE_UPGRADE_FROM_WEB}
        </Text>
      )}

      <FloatingInput
        floatingText={translations.WEBSITE}
        value={userSelectedData.website}
        maxLength={250}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        setText={val => {
          onChangeData({
            website: removeEmojis(val),
          });
        }}
        errorMsg={errorMsg.website}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      <FloatingInput
        floatingText={translations.TAGLINE}
        value={userSelectedData.tagline}
        maxLength={200}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        setText={val => {
          onChangeData({
            tagline: removeEmojis(val),
          });
        }}
        errorMsg={errorMsg.tagline}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      <FloatingBigInput
        floatingText={translations.ABOUT}
        value={userSelectedData.about}
        returnKeyType={'done'}
        multiline={true}
        textAlignVertical={'top'}
        lengthCheck={true}
        setText={val => {
          onChangeData({
            about: removeEmojis(val),
          });
        }}
        forMultiline={true}
        numberOfLines={3}
        autoCapitalize={'sentences'}
        showLength={false}
        errorMsg={errorMsg.about}
        isMandatory={true}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      <MultiSelectinput
        floatingText={translations.RECEIVE_LEADS_FROM}
        value={recivedLeades}
        isMandatory={true}
        onFieldFocus={() => {
          navigation.navigate(SCREEN.SELECT_COUNTRIES, {
            data: groupByFirstLetter(listingDataList?.countries),
            onChangeData: setRecivedLeades,
            recivedLeades: recivedLeades,
            selectedProfile: selectedProfile,
            allCountries: listingDataList?.countries,
            isEdit: isEdit,
            userSelectedData,
          });
        }}
        disableDelete={true}
        onDelete={(val: any) => {
          setRecivedLeades(val);
        }}
        addMore={() => {
          navigation.navigate(SCREEN.SELECT_COUNTRIES, {
            data: groupByFirstLetter(listingDataList?.countries),
            onChangeData: setRecivedLeades,
            recivedLeades: recivedLeades,
            selectedProfile: selectedProfile,
            allCountries: listingDataList?.countries,
            selectedStatesIds: selectedStatesIds,
            unselectedIds: userSelectedData?.unselectedIds,
            isEdit: isEdit,
          });
        }}
        errorMsg={errorMsg.recivedLeades}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />
      <View
        onLayout={evt => {
          const layout = evt.nativeEvent.layout;
          let obj = dataSourceCords;
          obj[removeMiddleSpaces(translations.WHERE_IS_YOUR_BUSINESS_LOCATED)] =
            layout.y;
          setDataSourceCords(obj);
        }}>
        <BusinessLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          errorMsg={errorMsg}
          isEdit={isEdit}
          isjudgeOrEmcee={
            selectedProfile?.display_name == ROLES.JUDGE ||
            selectedProfile?.display_name == ROLES.EMCEE
          }
          setremovedLocation={setremovedLocation}
        />
      </View>

      {showAddMoreLocationCondition() && (
        <AddMoreLocation
          locationRequest={locationRequest}
          setLocationRequest={setLocationRequest}
          pending_location_request={userSelectedData?.pending_location_request}
        />
      )}

      <View style={styles.whiteView} />
      <CustomBottomModal
        isModalVisible={isModalVisible.speciality}
        setIsModalVisible={(val: boolean) => {
          setIsModalVisible({
            ...isModalVisible,
            speciality: val,
          });
        }}
        data={listingDataList?.speciality}
        parentCallback={(selectedText: any) => {
          onChangeData({
            speciality: selectedText,
          });
        }}
        preSelectedValue={userSelectedData?.speciality}
        searchKey={'name'}
        heading={translations.SELECT + translations.SPECIALTY}
        enableSearch={true}
        enableMultiselect={true}
        showSelectAllSelectNon={true}
      />
      {isModalVisible.designer && (
        <SearchTagOptions
          title={translations.SELECT + translations.DESIGNER}
          isModalVisible={isModalVisible.designer}
          setIsModalVisible={(val: any) => {
            setIsModalVisible({
              ...isModalVisible,
              designer: val,
            });
          }}
          params={
            'designer' + Param.USER_OWNED + 'true' + Param.SHOW_BRANDS + 'true'
          }
          preSelectedValue={userSelectedData?.designer}
          show_image={1}
          onItemSelect={onDesignerSelect}
          enableMultiSelect={true}
        />
      )}
    </ScrollView>
  );
};

export default Form;
