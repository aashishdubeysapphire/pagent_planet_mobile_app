import {View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import AdvertisePlanSlider from '../advertiseplanslider';
import {PlanData} from '../../../../../../../services/models/planData';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  isPreviewModalVisible: boolean;
  pageantPlanDetail?: PlanData;
  setIsPreviewModalVisible: (arg0: boolean) => void;
  pageantId?: number;
}
const ViewPlanModal = ({
  pageantPlanDetail,
  isPreviewModalVisible,
  setIsPreviewModalVisible,
  pageantId,
}: Props) => {
  return (
    <Modal animationType="slide" visible={isPreviewModalVisible} transparent>
      <SafeAreaView style={styles.container}>
        <View>
          {/* <TouchableOpacity
            onPress={() => {
              setIsPreviewModalVisible(false);
            }}
            style={styles.touchStyle}> */}
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsPreviewModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
          {/* </TouchableOpacity> */}
          <View style={styles.sliderContainer}>
            <AdvertisePlanSlider
              whiteInactiveDot
              setIsPreviewModalVisible={setIsPreviewModalVisible}
              pageantPlanDetail={pageantPlanDetail}
              pageantId={pageantId}
            />
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              setIsPreviewModalVisible(false);
            }}
            style={styles.touchStyle}
          /> */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ViewPlanModal;
