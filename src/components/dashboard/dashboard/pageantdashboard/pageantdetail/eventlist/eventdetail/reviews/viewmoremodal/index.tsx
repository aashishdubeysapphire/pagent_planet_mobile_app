import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import {useShowStartModal} from '../../../../../../../../../store/useAppStore';
import FastImageView from '../../../../../../../../common/fastimageview';
import CustomRatings from '../../../../../../../../common/customratings';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  bodyText?: string;
  isModalVisible: boolean;
  reviewerName: string;
  reviewerImage: any;
  closeModal: any;
  averageRating: number;
  isReview: boolean;
  heading?: string;
}

const ViewMoreModal = ({
  bodyText,
  isModalVisible,
  reviewerName,
  reviewerImage,
  closeModal,
  averageRating,
  isReview,
  heading
}: Props) => {
  const setShowModal = useShowStartModal();

  const closeOpenModal = () => {
    closeModal(false);
    setShowModal(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      onBackdropPress={closeOpenModal}>
      <View style={styles.topContainer}>
        <View style={styles.headerArea}>
         {isReview ?
          <View style={styles.detailsSection}>
            <View style={styles.imageSection}>
              <FastImageView
                width={moderateScaleVertical(50)}
                height={moderateScaleVertical(50)}
                borderRadius={moderateScaleVertical(50)}
                imageUrl={reviewerImage}
                isCircle
              />
            </View>
            <View style={styles.nameAndReview}>
              <Text style={styles.reviewerNameStyles}>{reviewerName}</Text>
              {averageRating !== null ? (
                <CustomRatings
                  size={14}
                  fontSize={10}
                  showRatingsReviewsCount={false}
                  ratingsValue={averageRating}
                />
              ) : null}
            </View>
          </View>
        : 
            <Text style={styles.headingStyles}>{heading}</Text>
        }
          <TouchableOpacity onPress={closeOpenModal}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.bodyLabelStyles}>{bodyText}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ViewMoreModal;
