import React from 'react';
import {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import translations from '../../../../../../../assets/translations';
import { moderateScaleVertical } from '../../../../../../utils/responsiveSize';
import {styles} from './styles';
import { isIosDevice } from '../../../../../../utils/helperFunction';

interface Props {
  heading?: string;
  text?: string;
  onViewMoreClick: any;
  isAbout: boolean;
  numberOfLines: number;
  customStyles : any;
}

const Bio = ({text, heading, onViewMoreClick, isAbout = false,numberOfLines,customStyles}: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > (numberOfLines)) {
      setViewMore(true);
    } else {
      setViewMore(false);
    }
  }, []);
  const onTextLayoutIos = useCallback(e => {
    if (e.nativeEvent.lines.length >= (numberOfLines)) {
      setViewMore(true);
    } else {
      setViewMore(false);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={ !customStyles ? styles.headerTitle : customStyles}>
         {heading}
      </Text>
      <Text
        onTextLayout={
          !isIosDevice() ? onTextLayout : onTextLayoutIos
        }
        style={{...styles.subHeaderTitle,marginTop : !customStyles ?
                moderateScaleVertical(16) : moderateScaleVertical(8)}}
        numberOfLines={numberOfLines}>
        {text}
      </Text>

      {viewMore && isAbout ? (
        <TouchableOpacity onPress={() => onViewMoreClick()}>
          <Text style={styles.viewMore}>{translations.VIEW_MORE}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Bio;
