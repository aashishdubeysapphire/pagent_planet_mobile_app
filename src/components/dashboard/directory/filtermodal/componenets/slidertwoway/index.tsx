import {View, Text} from 'react-native';
import {styles} from './styles';
import React, {useEffect, useState} from 'react';
import RangeSlider from '../../../../dashboard/pageantdashboard/pageantdetail/peoplechoiceawards/pcaandprize/rangeslider';
import {Filter} from '../../../../../../services/models/filterData';
import UpgradePlan from '../upgradeplan';
import {ITEM_KEY} from '../..';
import translations from '../../../../../../assets/translations';

interface Props {
  onRangeSelecting: (min: number, max: number) => void;
  isLock: boolean;
  parantFilter: Filter;
  upgradePlan: () => void;
  setIsPreviewModalVisible: any;
  setModelVisible?: any;
}

const SliderTwoWay = ({
  onRangeSelecting,
  upgradePlan,
  isLock,
  parantFilter,
  setIsPreviewModalVisible,
  setModelVisible,
}: Props) => {
  const [low, setLow] = useState(parantFilter.min);
  const [high, setHigh] = useState(parantFilter.max);
  const [isSliderRangeUpdated, setSliderRangeUpdated] = useState(false);
  const [isSliderActive, setSliderActive] = useState(false);

  useEffect(() => {
    if (parantFilter?.query !== undefined && parantFilter?.query?.length > 0) {
      if (parantFilter?.query?.length > 0) {
        const minValue = parantFilter.query[0].split('=');
        setLow(Number(minValue[1]));
      }
      if (parantFilter?.query?.length > 1) {
        const maxValue = parantFilter.query[1].split('=');
        setHigh(Number(maxValue[1]));
      }
    }

    setTimeout(() => {
      setSliderRangeUpdated(true);
    }, 10);

    setTimeout(() => {
      setSliderActive(true);
    }, 500);
  }, []);

  const onSliderRangeChange = (min: number, max: number) => {
    if (isSliderActive) {
      onRangeSelecting(min, max);
    }
  };

  return (
    <View>
      <Text style={styles.filterOptionValueTextContainer}>
        {parantFilter?.title +
          (parantFilter?.title.includes(ITEM_KEY.PRICE) ? '($)' : '')}
      </Text>
      {isLock !== undefined && !isLock ? (
        <UpgradePlan upgradePlan={upgradePlan} />
      ) : (
        isSliderRangeUpdated && (
          <RangeSlider
            unit={
              parantFilter?.title.includes(ITEM_KEY.AGE)
                ? translations.YEARS
                : parantFilter?.title.includes(ITEM_KEY.PRICE)
                ? ''
                : 'ft'
            }
            from={parantFilter.min}
            to={parantFilter.max}
            lowInit={low}
            highInit={high}
            onRangeSelecting={onSliderRangeChange}
          />
        )
      )}
    </View>
  );
};

export default SliderTwoWay;
