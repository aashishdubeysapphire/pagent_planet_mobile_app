import React, {useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import {styles} from './styles';
import ProductsView from '../productview';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import SurveySection from '../surveysection';
import {ProductsData} from '../../../../../services/models/shop/shopLandingDetails';
import Shimmer from '../../../../common/shimmer';

interface Props {
  list?: ProductsData[];
  heading: string;
  isHorizontal: boolean;
  bgColor: string;
  isSurvey: boolean;
  isMarginTop: boolean;
}

const CommonProductContainer = ({
  list,
  heading,
  isHorizontal,
  bgColor,
  isSurvey = false,
  isMarginTop = true,
}: Props) => {
  const [surveyData, setSurveyData] = useState(list);
  const [isLoading, setLoading] = useState(false);

  return (
    <View
      style={{
        ...styles.wrapper,
        paddingBottom: isHorizontal
          ? moderateScaleVertical(24)
          : moderateScaleVertical(8),
        marginTop: isMarginTop ? moderateScaleVertical(24) : 0,
        backgroundColor: bgColor,
      }}>
      <Text style={styles.headingStyles}>{heading}</Text>
      <FlatList
        horizontal={isHorizontal}
        data={isSurvey ? surveyData : list}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        numColumns={isHorizontal ? 0 : 2}
        scrollEnabled={isSurvey ? false : true}
        renderItem={({item, index}) => (
          <>
            {isSurvey ? (
              isLoading ? (
                <Shimmer
                  width={width / 2 - moderateScale(24)}
                  borderRadius={moderateScale(24)}
                  height={width / 2 + moderateScaleVertical(2)}
                  leftBottomSpace={moderateScale(8)}
                  numColumns={1}
                />
              ) : (
                <SurveySection
                  imageUrl={item?.featured_image_path}
                  id={item?.id}
                  setSurveyData={setSurveyData}
                  setLoading={setLoading}
                />
              )
            ) : (
              <ProductsView
                title={item?.unique_style_number}
                sellingPrice={item?.selling_price}
                imageUrl={item?.featured_image_path}
                width={
                  isHorizontal
                    ? moderateScale(154)
                    : width / 2 - moderateScale(24)
                }
                marginBottomValue={isHorizontal ? 0 : moderateScaleVertical(16)}
                marginRightValue={
                  isHorizontal ? moderateScale(12) : moderateScale(16)
                }
                showFavIcon={true}
                showMRP={true}
                maxPrice={item?.price}
                id={item?.id}
                isFav={item?.is_favourite?.length > 0}
              />
            )}
          </>
        )}
      />
    </View>
  );
};

export default CommonProductContainer;
