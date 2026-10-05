import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import AppImages from '../../../../../../../../assets/images/AppImages';
import DetailsView from '../detailsview';
import {moderateScale} from '../../../../../../../utils/responsiveSize';

interface Props {
  userName: string;
  address: string;
  email: string;
  mobileNo: string;
  showDefault: boolean;
  isActiveAddress: boolean;
  index: number;
  onPress: Function;
  onPressEdit: Function;
  onPressDelete: Function;
}

const SelectAddressView = ({
  userName,
  address,
  email,
  mobileNo,
  showDefault,
  isActiveAddress,
  index,
  onPress,
  onPressEdit,
  onPressDelete,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)} style={styles.container}>
      <View style={styles.radioSection}>
        <TouchableOpacity onPress={() => onPress(index)} style={{opacity: 1}}>
          {isActiveAddress ? (
            <AppImages.Common.RadioButton />
          ) : (
            <View style={styles.circle}></View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.nameSection}>
          <View style={styles.editSection}>
            <Text style={styles.nameStyles} numberOfLines={1}>
              {userName}
            </Text>
            {showDefault && (
              <Text style={styles.defaultStyles}>({translations.DEFAULT})</Text>
            )}
          </View>
          {isActiveAddress && (
            <View style={styles.editSection}>  
              <TouchableOpacity onPress={() => onPressEdit(index)}>
                <AppImages.SELL_ITEMS.EditIcon20px 
                  marginRight={moderateScale(8)}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressDelete(index)}>
                <AppImages.Common.MyUploadsDelete/>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <DetailsView
          image={<AppImages.SHOPING_BAG.Address />}
          body={address}
          noOfLines={2}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.AtTheRate />}
          body={email}
          noOfLines={1}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.MobileNo />}
          body={mobileNo}
          noOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectAddressView;
