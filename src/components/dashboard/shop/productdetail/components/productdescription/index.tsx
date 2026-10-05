import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../productdetails/styles';
import { styles as stylesDes } from './styles';

import translations from '../../../../../../assets/translations';
import { color } from '../../../../../../assets/colorConstant';
import CommonHtmlViewer from '../../../../../common/commonhtmlviewer';


const ProductDescription = ({ description }) => {
  // const [descriptionLines, setdescriptionLines] = useState(0);
  const [isViewMorePressed, setIsViewMorePressed] = useState(false);
  // const onTextLayout = useCallback(e => {
  //   setdescriptionLines(e.nativeEvent.lines.length);

  // }, []);

  // Function to count words in a string
  const countWords = (text) => {
    return text?.length;
  };

  // Count words in the description
  const wordCount = countWords(description);

  // Function to truncate description to 500 words
  const truncateDescription = (text, maxWords) => {
    return text?.slice(0, maxWords);
  };

  // Truncate the description to 500 words if not pressed
  const truncatedDescription = truncateDescription(description, 500);
 


  return !!description ? (
    <View style={{ ...styles.continer, backgroundColor: color.S_GRAY_1 }}>
      <Text style={styles.heading}>{translations.PRODUCT_DESCRIPTION}</Text>
      {!isViewMorePressed ? (
        // <Text
        //   style={stylesDes.descriptionText}
        //   onTextLayout={onTextLayout}
        //   numberOfLines={8}>
        //   {description}
        // </Text>
        // <HTMLView
        //   value={truncatedDescription}
        //   style={stylesDes.descriptionText}
        // />
        <CommonHtmlViewer
          value={truncatedDescription}
          outerHtmlStyle={stylesDes.descriptionText}
        />
      ) : (
        // <Text style={stylesDes.descriptionText} onTextLayout={onTextLayout}>
        //   {description}
        // </Text>
        // <HTMLView
        //   value={description}
        //   style={stylesDes.descriptionText}
        // />
        <CommonHtmlViewer 
         value={description}
         outerHtmlStyle={stylesDes.descriptionText}
        />
      )}

      {/* {descriptionLines >= 8 && !isViewMorePressed && (
        <Text
          style={stylesDes.viewmore}
          onPress={() => {
            setIsViewMorePressed(!isViewMorePressed);
          }}>
          {translations.VIEW_MORE}
        </Text>
      )} */}
      {wordCount > 500 && (
        <Text
          style={stylesDes.viewmore}
          onPress={() => {
            setIsViewMorePressed(!isViewMorePressed);
          }}
        >
          {isViewMorePressed ? translations.VIEW_LESS : translations.VIEW_MORE}
        </Text>
      )}
    </View>
  ) : null;
};

export default ProductDescription;
