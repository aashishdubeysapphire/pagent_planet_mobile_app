import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import useStyle from './styles';
import FloatingDropdown from '../floatingdropown';
import {toast, toastType} from '../commonalert';
import {removeMiddleSpaces} from '../../utils/helperFunction';

interface Props {
  floatingText: string;
  value: any;
  isMandatory?: boolean;
  onFieldFocus?: any;
  onDelete: any;
  addMore?: any;
  errorMsg?: string;
  errorWarningMsg?: string;
  opacity: number;
  disableDelete: boolean;
  laoutY: any;
}
/* A function that returns a view. */
const MultiSelectinput = ({
  floatingText = '',
  value = [],
  isMandatory = false,
  onFieldFocus = () => {},
  onDelete = ([]) => {},
  addMore = () => {},
  errorMsg = '',
  errorWarningMsg,
  opacity = 1,
  disableDelete = false,
  laoutY,
}: Props) => {
  const styles = useStyle();
  const getIndex = (obj: {id: any}, arr = value) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].id === obj.id) {
        return index;
      }
    }
  };
  const onPressDelete = item => {
    if (disableDelete) {
      return;
    } else {
      if (errorWarningMsg !== undefined && item?.have_images) {
        toast(errorWarningMsg, toastType.ERROR_TOAST);
      } else {
        const filterArray = value.filter(i => {
          return value.indexOf(i) !== getIndex(item);
        });
        onDelete(filterArray);
      }
    }
  };
  return (
    <View
      style={{opacity: opacity}}
      key={floatingText}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        !!laoutY && laoutY(layout.y, removeMiddleSpaces(floatingText));
      }}>
      {value.length > 0 ? (
        <TouchableOpacity
          style={styles.mainView}
          activeOpacity={0.8}
          onPress={addMore}>
          <View style={styles.selectedAwards}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.awardsText}>
                {value?.length!! > 0 ? floatingText + '' : ''}
                <Text style={styles.red}>
                  {value?.length!! > 0 ? (isMandatory ? '*' : '') : ''}
                </Text>
              </Text>
              <Text style={styles.addMore} onPress={addMore}>
                {disableDelete ? translations.EDIT : translations.ADD_MORE}
              </Text>
            </View>
            <ScrollView
              style={{maxHeight: moderateScaleVertical(130)}}
              nestedScrollEnabled={true}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {value.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.clickable}
                      onPress={() => onPressDelete(item)}
                      activeOpacity={1}>
                      <Text
                        style={[
                          styles.awardName,
                          disableDelete && {marginRight: 0},
                        ]}>
                        {!!item?.name ? item?.name : item?.text}
                      </Text>
                      {!disableDelete && (
                        <View style={styles.uploadImageInnerView}>
                          <AppImages.CreateContestentProfile.tpp_cross_small_icon
                            width={16}
                            height={16}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          {errorMsg !== null && errorMsg?.length > 0 ? (
            <View style={styles.row}>
              <AppImages.Common.Alert_ICON />
              <Text style={styles.error}> {errorMsg} </Text>
            </View>
          ) : (
            <Text style={styles.noError} />
          )}
        </TouchableOpacity>
      ) : (
        <FloatingDropdown
          floatingText={floatingText}
          value={value}
          isMandatory={isMandatory}
          dropdown={true}
          onFieldFocus={onFieldFocus}
          errorMsg={errorMsg}
          opacity={opacity}
        />
      )}
    </View>
  );
};

export default MultiSelectinput;
