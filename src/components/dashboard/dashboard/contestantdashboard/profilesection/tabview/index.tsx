import React, {useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import TabContent from '../tabcontent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import AwardWonView from '../awardwonview';
import {TAB_KEYS} from '../../../../../utils/enum';
import {
  GET_AWARDS_WON_LIST,
  GET_CURRENT_PAGEANTS,
  GET_PAGEANT_WON,
  GET_PAST_PAGEANTS,
} from '../../../../../../services/endpoints';
import {PageantDetails} from '../../../../../../services/models/pageantdetails/contestantPublicDetails';

interface Props {
  data?: any;
  tabArray: any;
  showAddFeature: boolean;
  editable: boolean;
  contestantId: number | undefined;
}

const TabViewScreen = ({
  data,
  tabArray,
  showAddFeature,
  editable,
  contestantId,
}: Props) => {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const [menu, setMenu] = React.useState([]);
  const [routes, setRoutes] = React.useState([
    {key: TAB_KEYS.FIRST, title: translations.CURRENT_PAGEANT},
  ]);

  const getMenuForViewAll = (pageantData: PageantDetails) => {
    let array = [];
    if (pageantData?.currentPageants?.data?.length > 0) {
      array.push({id: 1, title: translations.CURRENT_PAGEANT});
    }
    if (pageantData?.pastPageants?.data?.length > 0) {
      array.push({id: 2, title: translations.PAGEANT_COMPETED_IN});
    }
    if (pageantData?.pageantsWon?.data?.length > 0) {
      array.push({id: 3, title: translations.PAGEANT_WON});
    }
    if (pageantData?.awardsWon?.length > 0) {
      array.push({id: 4, title: translations.AWARD_WON});
    }
    setMenu(array);
  };

  useEffect(() => {
    if (tabArray.length !== 0) {
      setRoutes(tabArray);
    }
    getMenuForViewAll(data);
  }, [tabArray]);

  const showAllAwards = (name: string, URL: string) => {
    navigation.navigate(SCREEN.VIEW_ALL, {
      Url: URL,
      screenName: name,
      data: menu,
      contestantId: contestantId,
      edit: editable ? true : false,
    });
  };

  const FirstRoute = () => (
    <View style={styles.containerTab}>
      {data?.currentPageants?.data?.length > 3 && showAddFeature ? (
        <TouchableOpacity
          style={styles.viewStyles}
          onPress={() => {
            showAllAwards(translations.CURRENT_PAGEANT, GET_CURRENT_PAGEANTS);
          }}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      ) : !showAddFeature ? null : (
        <View style={styles.viewStyles} />
      )}
      <TabContent
        data={data?.currentPageants?.data}
        name={translations.PAGEANT_WON}
        edit={editable}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.containerTab}>
      {data?.pastPageants?.data?.length > 3 && showAddFeature ? (
        <TouchableOpacity
          style={styles.viewStyles}
          onPress={() => {
            showAllAwards(translations.PAGEANT_COMPETED_IN, GET_PAST_PAGEANTS);
          }}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      ) : !showAddFeature ? null : (
        <View style={styles.viewStyles} />
      )}
      <TabContent
        data={data?.pastPageants?.data}
        name={translations.PAGEANT_WON}
        edit={editable}
      />
    </View>
  );

  const ThirdRoute = () => (
    <View style={styles.containerTab}>
      {data?.pageantsWon?.data?.length > 3 && showAddFeature ? (
        <TouchableOpacity
          style={styles.viewStyles}
          onPress={() => {
            showAllAwards(translations.PAGEANT_WON, GET_PAGEANT_WON);
          }}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      ) : !showAddFeature ? null : (
        <View style={styles.viewStyles} />
      )}
      <TabContent
        data={data?.pageantsWon?.data}
        name={translations.PAGEANT_WON}
        edit={editable}
      />
    </View>
  );

  const FourthRoute = () => (
    <View style={styles.containerTab}>
      {data?.awardsWon?.length > 3 && showAddFeature ? (
        <TouchableOpacity
          style={styles.viewStyles}
          onPress={() => {
            showAllAwards(translations.AWARD_WON, GET_AWARDS_WON_LIST);
          }}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      ) : !showAddFeature ? null : (
        <View style={styles.viewStyles} />
      )}
      <AwardWonView data={data?.awardsWon} edit={editable} />
    </View>
  );

  const viewButtonClicked = () => {
    if (routes[index].key === TAB_KEYS.FIRST) {
      showAllAwards(translations.CURRENT_PAGEANT, GET_CURRENT_PAGEANTS);
    } else if (routes[index].key === TAB_KEYS.SECOND) {
      showAllAwards(translations.PAGEANT_COMPETED_IN, GET_PAST_PAGEANTS);
    } else if (routes[index].key === TAB_KEYS.THIRD) {
      showAllAwards(translations.PAGEANT_WON, GET_PAGEANT_WON);
    } else if (routes[index].key === TAB_KEYS.FOURTH) {
      showAllAwards(translations.AWARD_WON, GET_AWARDS_WON_LIST);
    }
  };

  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      activeColor={color.BLACK}
      inactiveColor={color.S_GRAY_3}
      style={styles.tabTopAreaStyles}
      indicatorStyle={styles.indicator}
      labelStyle={styles.labelStyle}
      tabStyle={styles.tabStyle}
      indicatorContainerStyle={{paddingHorizontal: 2}}
    />
  );

  return (
    <>
      <View style={styles.pageantDetailsArea}>
        <Text style={styles.name}>{translations.PAGEANT_DETAILS}</Text>
        {showAddFeature ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN.ADD_EVENT_DETAIL)}>
            <AppImages.Dashboard.addPageant_ICON />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.viewStylesForAll}
            onPress={() => viewButtonClicked()}>
            <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
          </TouchableOpacity>
        )}
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={
          showAddFeature
            ? routes[index].key === TAB_KEYS.FOURTH && showAddFeature
              ? styles.bigTabContainer
              : styles.tabContainer
            : routes[index].key === TAB_KEYS.FOURTH && !showAddFeature
            ? styles.viewTabContainer
            : styles.smallTabContainer
        }
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </>
  );
};

export default TabViewScreen;
