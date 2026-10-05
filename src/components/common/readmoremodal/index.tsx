import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../dashboard/dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal/styles';
import AppImages from '../../../assets/images/AppImages';
import { useShowStartModal } from '../../../store/useAppStore';
import CommonHtmlViewer from '../commonhtmlviewer';
import { color } from '../../../assets/colorConstant';

interface Props {
    bodyText?: string;
    isModalVisible: boolean;
    closeModal: any;
    heading?: string;
}

const ReadMoreModal = ({
    bodyText,
    isModalVisible,
    closeModal,
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

                    <Text style={styles.headingStyles}>{heading}</Text>

                    <TouchableOpacity onPress={closeOpenModal}>
                        <AppImages.ProfileImage.Tpp_cross_icon />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    <CommonHtmlViewer
                    value={bodyText} 
                    innerHtmlContentStyle={{ div: {color:color.BLACK} }}/>
                    {/* <HTMLView
                        value={bodyText}
                        stylesheet={{ div: styles.bodyLabelStyles }}
                    /> */}
                    {/* <Text style={styles.bodyLabelStyles}>{bodyText}</Text> */}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default ReadMoreModal;
