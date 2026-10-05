import {View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {emptyFunction, trackScreenView} from '../../utils/helperFunction';
import DashboardHeader from '../../common/dashboardheader';
import translations from '../../../assets/translations';
import {useSetLoader} from '../../../store/useAppStore';
import ShimmerFeed from '../../common/shimmer/feedshimmer';
import Convo from '../convo/component/convo';
import {ANALYTICS_SCREEN} from '../../../assets/translations/analyticsscreenname';
const index = props => {
  const setLoader = useSetLoader();
  const [dontLetStuck, setDontLetStuck] = React.useState(false);
  React.useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.CROWN_CONVO);
    setTimeout(() => {
      setLoader(false);
    }, 500);
    setTimeout(() => {
      setDontLetStuck(true);
    }, 200);
  }, []);
  return dontLetStuck ? (
    <Convo
      clearConvoNotification={props?.route?.params?.clearConvoNotification}
      dependency={props?.route}
    />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <DashboardHeader
          label={translations.CROWN_CONVO}
          showMessageIcon
          onPressSearchIcon={emptyFunction}
          isUnderLineRequired={true}
          isLeftTextClicked={false}
        />
        <ShimmerFeed />
      </View>
    </SafeAreaView>
  );
};

export default index;
