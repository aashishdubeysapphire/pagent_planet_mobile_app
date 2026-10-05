import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import AppImages from '../../../assets/images/AppImages';
import NoRecordView from '../noresultsview';
import translations from '../../../assets/translations';
import {color} from '../../../assets/colorConstant';

interface Props {
  label?: string;
  onPress: () => void;
  isListAvallable?: boolean;
  bodyText: string;
  editIcon?: boolean;
  hidePlusIcon?: boolean;
  showTapHereButton: boolean;
  onTapButtonPress: () => void;
}

/* The `AddFirstRecord` that accepts an object as its parameter. The object contains the props that can be passed to the component when
it is used. */
const AddFirstRecord = ({
  label,
  onPress,
  isListAvallable = false,
  bodyText,
  editIcon,
  hidePlusIcon = false,
  showTapHereButton,
  onTapButtonPress,
}: Props) => {
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <View style={styles.eventHeadingArea}>
        {label !== '' && (
          <>
            <Text style={styles.headingLabel}>{label}</Text>
            <TouchableOpacity onPress={onPress}>
              {editIcon ? (
                <AppImages.Dashboard.edit_ICON />
              ) : hidePlusIcon ? null : (
                <AppImages.Dashboard.addPageant_ICON />
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
      {!isListAvallable ? (
        <View style={styles.flatlistView}>
          {showTapHereButton && (
            <TouchableOpacity
              style={styles.showTapButton}
              onPress={onTapButtonPress}>
              <Text style={styles.tapButton}>{translations.TAP_HERE}</Text>
              <Text style={{...styles.tapButton, color: color.BLACK}}>
                {translations.TO_VIEW_CONTETSANT_SCHEDULE}
              </Text>
            </TouchableOpacity>
          )}
          <NoRecordView text={bodyText} />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AddFirstRecord;
