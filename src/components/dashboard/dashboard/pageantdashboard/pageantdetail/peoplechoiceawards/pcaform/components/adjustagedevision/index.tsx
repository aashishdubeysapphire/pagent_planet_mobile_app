import {View,  FlatList} from 'react-native';
import React, {useEffect} from 'react';
import OvelContainer from '../../../../../../../../common/ovelcontainer';
import translations from '../../../../../../../../../assets/translations';
import AgeDivisionView from '../agedevisionview';
import {styles} from './styles';

const AdjustAgeDevision = ({
  ageDevisionVisible,
  setAgeDevisionVisible,
  pcaData,
  hideVotes,
  setAgeDivisionData,
  ageDivisionData,
  scroolToBottom,
  oneWinnerAllAge,
  setCount,
  count,
}) => {
  useEffect(() => {
    if (!oneWinnerAllAge) {
      setAgeDevisionVisible(!ageDevisionVisible);
    }
  }, [oneWinnerAllAge]);

  return (
    <View>
      <OvelContainer
        lable={translations.ADJUST_AGE_DEVISION_END_DATE}
        conditionVar={ageDevisionVisible}
        onPress={() => {
          setAgeDevisionVisible(!ageDevisionVisible);
          scroolToBottom();
        }}
      />

      {ageDevisionVisible && (
        <View style={styles.pinkView}>
          <FlatList
            data={pcaData.ageDevisionArray}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <AgeDivisionView
                item={item}
                index={index}
                ageDivisionData={ageDivisionData}
                setAgeDivisionData={setAgeDivisionData}
                hideVotes={hideVotes}
                pcaData={pcaData}
                setCount={setCount}
                count={count}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AdjustAgeDevision;
