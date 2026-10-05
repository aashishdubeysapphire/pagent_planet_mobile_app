import {TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './styles';
interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  children: any;
  customStyles: any;
}
/* The code is defining a functional component called `BottomModal` that takes in four props:
`isModalVisible`, `setIsModalVisible`, `children`, and `customStyles`. These props are defined in
the `Props` interface. The component returns a `Modal` component from the `react-native-modal`
library, which is used to display a modal overlay. The `Modal` component is configured with various
props such as `isVisible`, `backdropOpacity`, `animationIn`, `animationOut`, `onBackButtonPress`,
and `keyboardShouldPersistTaps`. Inside the `Modal` component, there is a `TouchableOpacity`
component that covers the entire screen and is used to close the modal when tapped. Inside the
`KeyboardAvoidingView` component, the `children` prop is rendered. The `BottomModal` component is
exported as the default export of the module. */
const BottomModal = ({
  isModalVisible,
  setIsModalVisible = () => console.log(false),
  children,
  customStyles,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={() => setIsModalVisible(false)}
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1, marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          setIsModalVisible(false);
        }}
        activeOpacity={1}></TouchableOpacity>
      <KeyboardAvoidingView
        style={{...styles.modalContainer , ...customStyles}}
        keyboardShouldPersistTaps={'always'}>
        <>{children}</>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomModal;

