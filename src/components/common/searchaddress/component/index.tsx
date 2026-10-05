import React, {useState} from 'react';
import {Text} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';
import {color} from '../../../../assets/colorConstant';
import {font} from '../../../../assets/fonts/fontsConstant';
import useStyle from './styles';
import translations from '../../../../assets/translations';
import Config from 'react-native-config';
import {onlyAlphabets} from '../../../utils/validations';
import CustomToast from '../../toast';

interface Props {
  setIsModalVisible?: any;
  paceHolderText?: string;
  disableNoRecordFound?: boolean;
  onItemSelect: (
    address: string,
    lat: string,
    long: string,
    // details: GooglePlaceDetail | undefined,
  ) => void;
  autoClose: boolean;
}

const SearchAdressView = ({
  setIsModalVisible,
  onItemSelect,
  disableNoRecordFound = false,
  paceHolderText = translations.SEARCH_PLACE,
  autoClose = true,
}: Props) => {
  const [localText, setLocalText] = useState('');
  const [isFocuss, setFocus] = useState(false);
  const styles = useStyle();
  const onCloseModel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder={paceHolderText}
        fetchDetails={true}
        onPress={(data, details: GooglePlaceDetail) => {
          onItemSelect(
            data.description,
            details.geometry.location.lat + '',
            details.geometry.location.lng + '',
            details,
          );
          autoClose ? onCloseModel() : setLocalText('');
        }}
        preProcess={(text: string) => {
          onItemSelect('', '', '', undefined);
          return text;
        }}
        renderRow={(data: GooglePlaceData, index: number) => {
          return (
            <Text numberOfLines={2} style={styles.itemText}>
              {data.description}
            </Text>
          );
        }}
        keepResultsAfterBlur={true}
        listEmptyComponent={
          localText.length > 0 && !disableNoRecordFound ? (
            <Text style={styles.noRecordFound}>
              {translations.NO_RESULT_FOUND}
            </Text>
          ) : null
        }
        textInputProps={{
          placeholderTextColor: disableNoRecordFound
            ? color.S_GRAY_4
            : color.INPUT_TEXT,
          onFocus: value => {
            setFocus(true);
          },

          style: {
            marginTop: moderateScaleVertical(-1),
            fontSize: disableNoRecordFound ? textScale(12) : textScale(14),
            fontFamily: font.LatoRegular,
            width: '100%',
          },
          value: localText,
          onChangeText: value => {
            setLocalText(onlyAlphabets(value));
          },
        }}
        query={{
          key: Config.GOOGLE_KEY,
          language: 'en',
        }}
        listViewDisplayed={true}
        styles={{
          container: {
            flex: 1,
          },

          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            minHeight: disableNoRecordFound
              ? moderateScale(48)
              : moderateScale(50),
            maxHeight: disableNoRecordFound
              ? moderateScale(48)
              : moderateScale(50),
            paddingStart: moderateScale(17),
            paddingEnd: moderateScale(17),
            borderColor: color.S_GRAY_2,
            backgroundColor: isFocuss ? color.WHITE : color.S_GRAY_1,
            marginTop: moderateScaleVertical(16),
            borderRadius: 30,
          },
          poweredContainer: {
            display: 'none',
          },
          row: {
            height: disableNoRecordFound
              ? moderateScale(30)
              : moderateScale(40),
          },
          separator: {
            height: 1,
            backgroundColor: color.TRANSPARNT,
            marginHorizontal: moderateScale(10),
          },
        }}
      />
      <CustomToast />
    </>
  );
};

export default SearchAdressView;
