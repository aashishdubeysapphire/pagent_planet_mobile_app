import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import FastImageView from '../../../../../../../../common/fastimageview';
import {Image} from '../../../../../../../../../services/models/gallery/image';
import {color} from '../../../../../../../../../assets/colorConstant';
interface Props {
  imageList: Image[];
  itemSize: number;

  setCurrentIndex: (param1: number) => void;
  currentIndex: number;
}

const ImageSlider = ({
  imageList,
  itemSize,

  setCurrentIndex,
  currentIndex,
}: Props) => {
  const swipeRef = useRef();
  const [indexNow, setIndexNow] = useState();
  const [isFirstScrolling, setFristScrooling] = useState(true);
  const changeIndex = index => {
    if (!!swipeRef?.current?.scrollToIndex && index >= 0) {
      const wait = new Promise(resolve => setTimeout(resolve, 500));
      wait.then(() => {
        swipeRef?.current.scrollToIndex({
          animated: true,
          index: index,
        });
        resetIndex(index);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (currentIndex === imageList.length) {
        changeIndex(currentIndex - 1);
      } else {
        changeIndex(currentIndex);
      }
      setTimeout(() => {
        setFristScrooling(false);
      }, 1000);
    }, 700);
  }, []);

  const resetIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const renderItem = (item, key) => {
    return (
      <View key={key} style={styles.imageContainer}>
        <FastImageView
          width={itemSize}
          height={itemSize - moderateScaleVertical(55)}
          imageUrl={
            item.image_full_url !== undefined
              ? item.image_full_url
              : item.imageSrc !== undefined
              ? item.imageSrc
              : item.bigImgSource
          }
          useWidth
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={swipeRef}
        data={imageList}
        pagingEnabled={true}
        onMomentumScrollEnd={event => {
          const indexLocal = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          if (indexNow !== indexLocal) {
            resetIndex(indexLocal);
            setIndexNow(indexLocal);
          }
        }}
        initialNumToRender={40}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, (key = index))}
        horizontal
      />
      {isFirstScrolling && (
        <View style={styles.loadMore}>
          <ActivityIndicator
            size="small"
            color={color.P_PINK}
            style={styles.loadMore}
          />
        </View>
      )}
    </View>
  );
};

export default ImageSlider;
