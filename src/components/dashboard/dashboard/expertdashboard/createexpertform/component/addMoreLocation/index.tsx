import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import translations from '../../../../../../../assets/translations';
import {styles as style} from './styles';
import SearchAdress from '../../../../../../common/searchaddress';
import {styles} from '../businesslocation/styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import {toastError} from '../../../../../../common/commonalert';

const AddMoreLocation = ({
  locationRequest,
  setLocationRequest,
  pending_location_request,
  setremovedLocation,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(-1);
  const isLocationPreviouslyAdded = (newRequest: {
    name: any;
    lat: any;
    lng: any;
  }) => {
    let arr = locationRequest.filter(i => {
      return (
        i?.name == newRequest?.name &&
        i.lat == newRequest.lat &&
        i.lng == newRequest.lng
      );
    });
    if (arr.length > 0) {
      toastError(translations.THE_SAME_LOCATION_HAS_BEEN_REQUESTED);
      return true;
    } else {
      return false;
    }
  };
  const onAddress = (add: any, lat: any, lng: any) => {
    if (!!add) {
      let newRequest = {
        name: add,
        lat,
        lng,
      };
      if (!isEditing) {
        if (!isLocationPreviouslyAdded(newRequest)) {
          setLocationRequest([...locationRequest, newRequest]);
          setIsModalVisible(false);
        }
      } else {
        if (!isLocationPreviouslyAdded(newRequest)) {
          let obj = locationRequest;
          obj[index].name = add;
          obj[index].lat = lat;
          obj[index].lng = lng;
          setLocationRequest(obj);
          setIsEditing(false);
          setIsModalVisible(false);
        }
      }
    }
  };
  const onPressCross = (item: {name: string}) => {
    let arr = locationRequest.filter(i => {
      return i.name != item.name;
    });
    setLocationRequest(arr);
    setIsEditing(false);
  };
  const onPressedit = (locationIndex: React.SetStateAction<number>) => {
    setIsModalVisible(true);
    setIndex(locationIndex);
    setIsEditing(true);
  };
  const LocationRequestView = ({item, idx}) => {
    return (
      <View style={styles.continer}>
        <View style={styles.rowView}>
          <Text style={styles.heading}>{translations.LOCATION}</Text>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => onPressedit(idx)}>
            <AppImages.Common.editCircle_ICON />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.crossIcon}
            onPress={() => onPressCross(item)}>
            <AppImages.Common.crossIcon
              width={moderateScaleVertical(18)}
              height={moderateScaleVertical(18)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.whiteLocation}>
          <Text style={styles.whiteLocationText}>{item?.name}</Text>
        </View>
      </View>
    );
  };
  const onClickAddMore = () => {
    if (locationRequest.length == 4) {
      toastError(translations.ERROR_FOR_MORE_THAN);
    } else {
      setIsModalVisible(true);
    }
  };
  return (
    <View>
      {locationRequest.length > 0 && (
        <Text style={[styles.heading, {marginTop: moderateScaleVertical(16)}]}>
          {translations.REQUESTED_LOCATION}
        </Text>
      )}
      {locationRequest.map((i, inx) => {
        return <LocationRequestView key={inx} item={i} index={inx} />;
      })}
      {locationRequest.length < 4 && (
        <Text style={style.clickableText} onPress={onClickAddMore}>
          {translations.CONTACT_TO_ADD_MORE_ADDRESS}
        </Text>
      )}

      <SearchAdress
        isModalVisible={isModalVisible}
        setIsModalVisible={val => {
          setIsModalVisible(val);
          !val && setIsEditing(false);
        }}
        onItemSelect={onAddress}
        autoClose={false}
      />
      {pending_location_request !== translations.NO_SMALL && (
        <Text style={style.requestSharedToAdmin}>
          {translations.REQUEST_FOR_NEW_LOCATION_SHARED_TO_ADMIN}
        </Text>
      )}
    </View>
  );
};

export default AddMoreLocation;
