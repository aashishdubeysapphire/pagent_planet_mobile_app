import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {AgeDivision} from '../../../../../../../../services/models/pageantdetails/ageDivision';
import SwitchButton from '../../../../../../../common/switchbutton';
import translations from '../../../../../../../../assets/translations';
import DynamicTabs from '../../../../../../../common/dynamictabs';
import EventAwardsTab from './awardsview';
import EventResultsTab from './resultview';
import {emptyFunction, trackScreenView} from '../../../../../../../utils/helperFunction';
import {EVENT_STATUS} from '../../../../../../../utils/enum';
import { ANALYTICS_SCREEN } from '../../../../../../../../assets/translations/analyticsscreenname';

interface Props {
  eventTitle?: string;
  eventId?: number;
  addedResultCount: number;
  ageDivisionList: AgeDivision[];
  eventTenseStatus: string | undefined;
  activeTabState: boolean;
  isFlatListScroolEnable: boolean;
  tabSetter: any;
  setIsModalAddResultVisible: any;
  isModalAddResultVisible: boolean;
}

const ResultsAwards = ({
  eventTitle,
  eventId,
  addedResultCount,
  ageDivisionList,
  eventTenseStatus,
  activeTabState,
  tabSetter,
  setIsModalAddResultVisible,
  isModalAddResultVisible,
  isFlatListScroolEnable,
}: Props) => {
  const [ageDivisionIndex, setAgeDivisionIndex] = useState(0);
  const [iModalAddResultVisible, setModalAddResultVisible] = useState(false);
  const renderSceneAward = (page: any, index: number) => {
    return (
      <EventAwardsTab
        eventId={eventId}
        eventTitle={eventTitle}
        eventTenseStatus={eventTenseStatus}
        isFlatListScroolEnable={isFlatListScroolEnable}
        ageId={
          ageDivisionList !== undefined && ageDivisionList.length > 0
            ? ageDivisionList[ageDivisionIndex]?.id + ''
            : ''
        }
        isActive={index + '' === page.key}
        ageName={
          ageDivisionList !== undefined && ageDivisionList.length > 0
            ? ageDivisionList[ageDivisionIndex]?.name
            : ''
        }
      />
    );
  };

  const renderSceneResult = (route: any, index: number) => {
    return (
      <EventResultsTab
        eventId={eventId}
        eventTitle={eventTitle}
        isFlatListScroolEnable={isFlatListScroolEnable}
        isModalAddResultVisible={isModalAddResultVisible}
        setIsModalAddResultVisible={setIsModalAddResultVisible}
        eventTenseStatus={eventTenseStatus}
        addedResultCount={addedResultCount}
        iModalAddResultVisible={iModalAddResultVisible}
        setModalAddResultVisible={setModalAddResultVisible}
        ageId={
          ageDivisionList !== undefined && ageDivisionList.length > 0
            ? ageDivisionList[ageDivisionIndex]?.id + ''
            : ''
        }
        isActive={route.key}
        ageName={
          ageDivisionList !== undefined && ageDivisionList.length > 0
            ? ageDivisionList[ageDivisionIndex]?.name
            : ''
        }
      />
    );
  };

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.EVENT_RESULT_AWARDS)
    if (
      activeTabState &&
      ageDivisionList !== undefined &&
      ageDivisionList?.length === 0 &&
      !isModalAddResultVisible &&
      eventTenseStatus !== EVENT_STATUS.ON_GOING
    ) {
      setModalAddResultVisible(true);
    }
  }, [activeTabState]);

  const onLeftButtonClicked = () => {
    if (!activeTabState) {
      setAgeDivisionIndex(0);
      tabSetter(true);
    }
  };

  const onRightButtonClicked = () => {
    if (activeTabState) {
      setAgeDivisionIndex(0);
      tabSetter(false);
    }
  };

  return (
    <View style={styles.container}>
      <SwitchButton
        leftLabel={translations.RESULTS}
        rightLabel={translations.AWARDS}
        isLeftButtonActive={activeTabState}
        onLeftTabClicked={onLeftButtonClicked}
        onRightTabClicked={onRightButtonClicked}
      />
      {activeTabState ? (
        <View>
          {ageDivisionList !== undefined && ageDivisionList?.length > 0 ? (
            <DynamicTabs
              tabScreen={renderSceneResult}
              ageDivisionList={ageDivisionList}
              isAllTabRequired={false}
              setAgeDivisionIndex={setAgeDivisionIndex}
              tabSwitched={ageDivisionIndex === 0 ? true : false}
              indexChanged={emptyFunction}
            />
          ) : (
            renderSceneResult(-1, -1)
          )}
        </View>
      ) : (
        <View>
          {ageDivisionList !== undefined && ageDivisionList?.length > 0 ? (
            <DynamicTabs
              tabScreen={renderSceneAward}
              ageDivisionList={ageDivisionList}
              isAllTabRequired={false}
              setAgeDivisionIndex={setAgeDivisionIndex}
              tabSwitched={ageDivisionIndex === 0 ? true : false}
              indexChanged={emptyFunction}
            />
          ) : (
            renderSceneAward(-1, -1)
          )}
        </View>
      )}
    </View>
  );
};

export default ResultsAwards;
