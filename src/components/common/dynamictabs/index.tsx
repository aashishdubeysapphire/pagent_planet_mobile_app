import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {styles} from './styles';
import {
  TabView,
  TabBar,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import {color} from '../../../assets/colorConstant';
import {AgeDivision} from '../../../services/models/pageantdetails/ageDivision';
import translations from '../../../assets/translations';

interface Props {
  ageDivisionList: AgeDivision[] | undefined;
  isAllTabRequired?: boolean;
  tabScreen: (props: any, index: number) => React.ReactNode;
  setAgeDivisionIndex?: any;
  tabSwitched?: boolean;
  selectedTab?: string;
  customStyles?: {};
  customStylesForContainer?: {};
  onlyAllTabRequired?: boolean;
  indexChanged: any;
}

export enum TAB_KEYS {
  ALL = '-1',
}

/* A React component that is using the React Hooks API. */
const DynamicTabs = ({
  ageDivisionList,
  isAllTabRequired = true,
  tabScreen,
  setAgeDivisionIndex,
  tabSwitched = false,
  customStyles,
  selectedTab,
  customStylesForContainer,
  onlyAllTabRequired = false,
  indexChanged,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([
    {key: TAB_KEYS.ALL, title: ''},
  ]);

  const initialLayout = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  useEffect(() => {
    ageDivisionList?.map((item, position) => {
      if (selectedTab !== undefined && selectedTab === item?.profile_type) {
        setTimeout(() => {
          handleIndex(position);
        }, 100);
      }
    });
  }, [selectedTab]);

  /* A React Hook that is used for performing side effects in function components. */
  useEffect(() => {
    if (routes.length === 1) {
      if (isAllTabRequired) {
        routes[0].title = translations.ALL;
      } else {
        routes.pop();
      }
      if (ageDivisionList !== undefined && ageDivisionList?.length > 1) {
        routes.splice(0, ageDivisionList.length);
        if (isAllTabRequired) {
          routes.push({key: TAB_KEYS.ALL, title: translations.ALL});
        }
      }
      if (!onlyAllTabRequired) {
        ageDivisionList?.map((item, index) => {
          if (item?.name !== undefined) {
            routes.push({key: '' + index, title: item?.name});
          } else {
            routes.push({
              key: '' + index,
              title: item?.profile_type,
            });
            if (
              selectedTab !== undefined &&
              selectedTab === item?.profile_type
            ) {
              setTimeout(() => {
                handleIndex(index);
              }, 100);
            }
          }
        });
      }
    }

    setRoutes(routes);
  }, [ageDivisionList]);

  /**
   * It returns a function that takes a route and returns a component
   * @param  - `tabScreen` is the function that returns the component to be rendered.
   * @returns A function that takes in a route and returns a tabScreen function that takes in a route
   * and index.
   */
  useEffect(() => {
    if (tabSwitched) {
      handleIndex(0);
    }
  }, [tabSwitched]);

  const renderScene = ({route}) => {
    return tabScreen(route, index);
  };

  const handleIndex = (index: number) => {
    setIndex(index);
    if (indexChanged !== undefined) {
      indexChanged(index);
    }
    if (setAgeDivisionIndex !== undefined) {
      setAgeDivisionIndex(index);
    }
  };

  /**
   * It renders the tab bar.
   * @param {SceneRendererProps} props - SceneRendererProps
   */
  const renderTabBar = (props: SceneRendererProps) => (
    <TabBar
      {...props}
      scrollEnabled
      activeColor={color.BLACK}
      inactiveColor={color.S_GRAY_3}
      style={[styles.tabTopAreaStyles, customStyles]}
      indicatorStyle={styles.indicator}
      labelStyle={styles.labelStyle}
      tabStyle={styles.tabStyle}
      indicatorContainerStyle={{paddingHorizontal: 2}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={handleIndex}
      style={[styles.tabContainer, customStylesForContainer]}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      swipeEnabled={true}
    />
  );
};

export default DynamicTabs;
