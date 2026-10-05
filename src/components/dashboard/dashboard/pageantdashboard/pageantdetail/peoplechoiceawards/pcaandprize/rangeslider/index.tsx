import React, {useCallback, useEffect, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';
import Range from './range';
import RangeSelected from './rangeselected';
import Thumb from './thumb';
import {styles} from './styles';

interface Props {
  unit: string;
  from: number;
  to: number;
  lowInit: number;
  highInit: number;
  onRangeSelecting: (min: number, max: number) => void;
}
const RangeSlider = ({
  unit,
  from,
  to,
  lowInit = 0,
  highInit = 0,
  onRangeSelecting,
}: Props) => {
  const [low, setLow] = useState(lowInit);
  const [high, setHigh] = useState(highInit);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Range />, []);
  const renderRailSelected = useCallback(() => <RangeSelected />, []);
  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh]
  );

  useEffect(() => {
    onRangeSelecting(low, high);
  }, [low]);
  useEffect(() => {
    onRangeSelecting(low, high);
  }, [high]);

  return (
    <View>
      <View>
        <Text style={styles.AgeRangeText}>
          {low + ' - ' + high + ' ' + unit}
        </Text>
      </View>

      <RangeSliderRN
        min={from}
        max={to}
        step={1}
        low={low}
        high={high}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default RangeSlider;
