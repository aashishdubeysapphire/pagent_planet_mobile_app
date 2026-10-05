import {View, Text} from 'react-native';
import React  from 'react';
import { styles } from './styles';

interface Props{
  image: any;
  body: string;
  noOfLines: number;
}

const DetailsView = ({
  image,
  body,
  noOfLines
}:Props) => {

  return (
    <View style={styles.detailSection}>
      <View style={styles.imageSection}> 
        {image}
      </View>
      <Text style={styles.textStyles}
            numberOfLines={noOfLines}>
        {body} 
      </Text>
    </View>
    
  );
};

export default DetailsView;
