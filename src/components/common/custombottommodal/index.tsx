import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useRef} from 'react';
import BottomModal from '../bottommodal';
import {color} from '../../../assets/colorConstant';
import useStyle from './styles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import {checkIsNull, onlyAlphabets} from '../../utils/validations';
import {SELL_COLOR} from '../../utils/enum';
import {font} from '../../../assets/fonts/fontsConstant';
import {useKeyboard} from '@react-native-community/hooks';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  data: any;
  heading: string;
  parentCallback: any;
  preSelectedValue: any;
  enableSearch?: boolean;
  isColor?: boolean;
  enableMultiselect?: boolean;
  customStyles?: any;
  showSelectAllSelectNon?: boolean;
  scroolbyIndex?: boolean;
  searchKey?: string;
  showAddCancle?: boolean;
}
const CustomBottomModal = ({
  isModalVisible,
  setIsModalVisible,
  data = [],
  heading,
  parentCallback,
  preSelectedValue = '',
  enableSearch = false,
  enableMultiselect = false,
  customStyles = {},
  showSelectAllSelectNon = false,
  scroolbyIndex = true,
  searchKey = 'name',
  isColor = false,
  showAddCancle = false,
}: Props) => {
  const styles = useStyle();
  const flatlistRef = useRef();
  const [displayData, setDisplayData] = React.useState(data);
  const [isSelected, setIsSelected] = React.useState(preSelectedValue);

  const [searchText, setSearchText] = React.useState('');
  const [multiSelectedArray, setMultiSelectedArray] =
    React.useState(preSelectedValue);
  const [itemHeight, setItemHeight] = React.useState(0);
  const {keyboardShown} = useKeyboard();
  const sendData = (selectedText: any) => {
    parentCallback(selectedText);
  };

  React.useEffect(() => {
    setIsSelected(preSelectedValue);
    setMultiSelectedArray(preSelectedValue);
  }, [preSelectedValue]);
  React.useEffect(() => {
    setDisplayData(data);
  }, [data]);
  React.useEffect(() => {
    setSearchText('');
    if (isModalVisible) {
      setIsSelected(preSelectedValue);
      setTimeout(() => {
        scrollToIndex();
      }, 200);
    }
  }, [isModalVisible, itemHeight]);

  const scrollToIndex = () => {
    if (!!preSelectedValue && !enableMultiselect && scroolbyIndex) {
      const index = getIndex({id: preSelectedValue}, displayData);
      if (index > 10) {
        flatlistRef.current.scrollToIndex({
          index: index,
          animated: false,
        });
      }
    }
  };

  const onLayout = event => {
    if (itemHeight === 0) {
      const {x, y, height, width} = event.nativeEvent.layout;
      setItemHeight(height + moderateScaleVertical(16));
    }
  };
  const searchFilterFunction = text => {
    setSearchText(onlyAlphabets(text));
    if (!!text && checkIsNull(data)) {
      const filteredName = data.filter(item => {
        return String(item[searchKey])
          .toLowerCase()
          .match(onlyAlphabets(text).toLowerCase().trim());
      });

      setDisplayData([...filteredName]);
    } else {
      setDisplayData(data);
    }
  };
  const onSingleSelect = item => {
    Keyboard.dismiss();
    setIsSelected(item.item.id);

    if (!showAddCancle) {
      setIsModalVisible(false);
      setDisplayData(data);
      sendData(item.item);
    } else {
      setMultiSelectedArray(item.item);
    }
  };

  const onMuiltipleSelect = item => {
    Keyboard.dismiss();
    if (!doesArrayIncludesItem(item.item)) {
      setMultiSelectedArray([...multiSelectedArray, item.item]);
    } else if (doesArrayIncludesItem(item.item)) {
      const filterArray = multiSelectedArray.filter(i => {
        return multiSelectedArray.indexOf(i) !== getIndex(item.item);
      });
      setMultiSelectedArray(filterArray);
    }
  };
  const doesArrayIncludesItem = (obj: {id: any}, arry = multiSelectedArray) => {
    if (!!arry) {
      for (let index = 0; index < arry.length; index++) {
        if (arry?.[index]?.id === obj?.id) {
          return true;
        }
      }
    }
    return false;
  };

  const getIndex = (objct: {id: any}, arr = multiSelectedArray) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].id === objct.id) {
        return index;
      }
    }
  };

  const onPressADD = () => {
    sendData(multiSelectedArray);
    setIsModalVisible(false);
    setDisplayData(data);
  };

  const onPressCancle = () => {
    setIsModalVisible(false);
    setMultiSelectedArray(preSelectedValue);
    setDisplayData(data);
  };

  const emptyList = () => {
    return (
      <View style={styles.middleView}>
        <AppImages.Common.NoRecordIcon />
      </View>
    );
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={
        !enableSearch ? {...styles.heightForSearch, ...customStyles} : {}
      }>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>{heading}</Text>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
            setDisplayData(data);
            setMultiSelectedArray(preSelectedValue);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>

      {enableSearch && (
        <>
          <View style={styles.searchBOx}>
            <TextInput
              placeholder={translations.SEARCH_HERE}
              selectionColor={color.P_PINK}
              style={styles.searchTExtinput}
              value={searchText}
              onChangeText={val => {
                searchFilterFunction(onlyAlphabets(val));
              }}
            />
            <View style={styles.searchImage}>
              <AppImages.Common.tpp_search_small_icon
                height={moderateScale(18)}
                width={moderateScale(18)}
              />
            </View>
          </View>
          {enableMultiselect && (
            <Text style={styles.selectedText}>
              {multiSelectedArray?.length} {translations.SELECTED}
            </Text>
          )}
        </>
      )}
      {showSelectAllSelectNon && displayData.length > 0 && (
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableText,
              marginRight: 'auto',
              opacity: multiSelectedArray.length !== 0 ? 1 : 0.2,
            }}
            onPress={() => {
              setMultiSelectedArray([]);
              searchFilterFunction('');
            }}>
            {translations.SELECT_NON}
          </Text>

          <Text
            style={{
              ...styles.touchableText,
              marginLeft: 'auto',
              opacity: multiSelectedArray.length !== data.length ? 1 : 0.2,
            }}
            onPress={() => {
              setMultiSelectedArray(data);
              searchFilterFunction('');
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      )}

      <View
        style={{
          ...styles.bottomContainer2,
        }}>
        <FlatList
          ListEmptyComponent={emptyList}
          data={displayData}
          ref={flatlistRef}
          initialNumToRender={1000}
          keyExtractor={item => item?.id?.toString()}
          keyboardShouldPersistTaps={'handled'}
          ListFooterComponent={() => {
            return <View style={{height: 10}} />;
          }}
          renderItem={item => (
            <TouchableOpacity
              onLayout={onLayout}
              style={styles.textView}
              onPress={() => {
                enableMultiselect
                  ? onMuiltipleSelect(item)
                  : onSingleSelect(item);
                Keyboard.dismiss();
              }}>
              {enableMultiselect ? (
                <>
                  {isColor && (
                    <View>
                      {item?.item?.name === SELL_COLOR.MULTI_COLOR ? (
                        <View style={[styles.colorCircle]}>
                          <AppImages.Dashboard.MultiColorIcon
                            width={24}
                            height={24}
                          />
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.colorCircle,
                            {backgroundColor: item.item.hex_code},
                          ]}
                        />
                      )}
                    </View>
                  )}

                  <Text
                    style={{
                      ...styles.selectiontext,
                      fontFamily: doesArrayIncludesItem(item.item)
                        ? font.RobotoMedium
                        : font.RobotoRegular,
                      color: doesArrayIncludesItem(item.item)
                        ? color.P_PINK
                        : color.BLACK,
                    }}>
                    {String(item.item?.name)}
                  </Text>

                  {doesArrayIncludesItem(item.item) && (
                    <AppImages.Common.PinkTickIcon />
                  )}
                </>
              ) : (
                <>
                  {!!item.item.title ? (
                    <Text
                      style={{
                        ...styles.selectiontext,
                        fontFamily: doesArrayIncludesItem(item.item)
                          ? font.RobotoMedium
                          : font.RobotoRegular,
                        color:
                          isSelected === item?.item?.id
                            ? color.P_PINK
                            : color.BLACK,
                      }}>
                      {item?.item?.title}
                    </Text>
                  ) : !!item.item.text ? (
                    <Text
                      style={{
                        ...styles.selectiontext,
                        fontFamily: doesArrayIncludesItem(item.item)
                          ? font.RobotoMedium
                          : font.RobotoRegular,
                        color:
                          isSelected === item?.item?.id
                            ? color.P_PINK
                            : color.BLACK,
                      }}>
                      {item?.item?.text}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...styles.selectiontext,
                        fontFamily: doesArrayIncludesItem(item.item)
                          ? font.RobotoMedium
                          : font.RobotoRegular,
                        color:
                          isSelected === item.item.id
                            ? color.P_PINK
                            : color.BLACK,
                      }}>
                      {item?.item?.name}
                    </Text>
                  )}
                  <View>
                    {isSelected === item?.item?.id && (
                      <AppImages.Common.PinkTickIcon />
                    )}
                  </View>
                </>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
      {enableMultiselect && displayData.length > 0 && !keyboardShown && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={onPressCancle}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.CANCLE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={onPressADD}>
            <Text style={styles.borderButtonText}>{translations.ADD}</Text>
          </TouchableOpacity>
        </View>
      )}

      {showAddCancle && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={onPressCancle}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.CANCLE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={onPressADD}>
            <Text style={styles.borderButtonText}>
              {showAddCancle ? translations.CONFIRM : translations.ADD}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </BottomModal>
  );
};

export default CustomBottomModal;
