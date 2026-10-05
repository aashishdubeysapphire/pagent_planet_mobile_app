import {
  View,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../../../../assets/colorConstant';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
const width = Dimensions.get('window').width;
import ImageViewer from 'react-native-image-zoom-viewer';
import {isIosDevice} from '../../../../utils/helperFunction';
const ImagePreview = ({
  isModalVisible,
  setIsModalVisible,
  data,
  currentSlide,
}) => {
  const [selectedImage, setSelectedImage] = useState(-1);
  const [dynamicScale, setDynamicScale] = useState(1);
  useEffect(() => {
    setSelectedImage(currentSlide);
  }, [currentSlide]);

  const getImagesInFormat = () => {
    let arr = [];
    data.forEach(element => {
      arr.push({
        url: element,
      });
    });
  

    return arr;
  };
  const getFooterList = () => {
    return dynamicScale == 1 ? (
      <FlatList
        data={data}
        horizontal
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedImage(index)}
              style={{
                borderRadius: 4,
                marginVertical: moderateScale(16),
                marginHorizontal: moderateScale(4),
                borderWidth: 2,
                width: moderateScaleVertical(46),
                height: moderateScaleVertical(46),
                borderColor:
                  selectedImage == index ? color.P_PINK : color.S_GRAY_3,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: selectedImage == index ? 0.5 : 1,
                }}
                source={{
                  uri: item,
                }}
              />
              <View
                style={{
                  position: 'relative',
                  bottom:
                    selectedImage == index
                      ? moderateScaleVertical(4)
                      : moderateScaleVertical(0),
                  backgroundColor: color.P_PINK,
                  height:
                    selectedImage == index
                      ? moderateScaleVertical(4)
                      : moderateScaleVertical(0),
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    ) : null;
  };
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={() => setIsModalVisible(false)}>
      <SafeAreaView style={{flex: 1}}>
        <ImageViewer
          imageUrls={getImagesInFormat()}
          renderHeader={() => (
            <Header
              lable={translations.IMAGE_PREVIEW}
              isUnderLineRequired
              crossIcon
              onCrossIconClick={() => setIsModalVisible(false)}
            />
          )}
          index={selectedImage}
          doubleClickInterval={300}
          minScale={1}
          maxScale={4}
          saveToLocalByLongPress={false}
          backgroundColor={color.WHITE}
          renderIndicator={() => {}}
          renderImage={props => {
            return (
              <Image
                {...props}
                style={{...props.style, marginTop: isIosDevice() ? '-15%' : 0}}
              />
            );
          }}
          onChange={i => {
            setSelectedImage(i);
            setDynamicScale(1);
          }}
          onMove={idx => setDynamicScale(idx?.scale)}
        />
        <View>{getFooterList()}</View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImagePreview;
