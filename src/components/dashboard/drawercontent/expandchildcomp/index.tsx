import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppImages from '../../../../assets/images/AppImages';
import {styles} from './styles';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import OpenChildAnimation from '../../../common/openchildanimation';

interface Props {
  lable: string;
  list: any;
  isViewExpanded: boolean;
  leftActiveImage: React.ReactNode;
  onPressExpnadView: () => void;
  setIsViewExpanded: (param: boolean) => void;
}

const ExpandingView = ({
  lable,
  isViewExpanded,
  onPressExpnadView,
  leftActiveImage,
  list,
  setIsViewExpanded,
}: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.cardTOuch}
        onPress={() => {
          onPressExpnadView();
          setIsViewExpanded(!isViewExpanded);
        }}>
        <View style={styles.staticCadImage}>{leftActiveImage}</View>
        <Text
          style={
            isViewExpanded
              ? styles.staticCardLableExpanded
              : styles.staticCardLable
          }>
          {lable}
        </Text>
        <View style={styles.staticCadImage}>
          <View
            style={
              isViewExpanded ? styles.downImageExpanded : styles.downImage
            }>
            {isViewExpanded ? (
              <AppImages.EditProfile.Tpp_dropdown_pink
                width={moderateScale(15)}
                height={moderateScaleVertical(15)}
              />
            ) : (
              <AppImages.Dashboard.HeaderDropdownIcon
                width={moderateScale(15)}
                height={moderateScaleVertical(15)}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <OpenChildAnimation
        isVisible={isViewExpanded}
        durationHeight={800}
        durationFade={700}
        child={
          <>
            {isViewExpanded && (
              <View style={styles.lightPinkVIew}>
                {list.map(i => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        i.onPress();
                      }}
                      style={styles.lableTOuch}>
                      <Text style={styles.expandViewlable}>{i.lable}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </>
        }
      />
    </View>
  );
};

export default ExpandingView;
