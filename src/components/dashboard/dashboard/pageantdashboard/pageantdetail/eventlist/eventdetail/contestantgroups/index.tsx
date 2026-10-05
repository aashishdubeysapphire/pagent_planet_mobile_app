import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import SwitchButton from '../../../../../../../common/switchbutton';
import translations from '../../../../../../../../assets/translations';
import {AgeDivision} from '../../../../../../../../services/models/pageantdetails/ageDivision';
import Groups from './groups';
import DynamicTabs, {TAB_KEYS} from '../../../../../../../common/dynamictabs';
import ContestantTab from './contestants';
import {
  emptyFunction,
  trackScreenView,
} from '../../../../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../../../../assets/translations/analyticsscreenname';

interface Props {
  eventTitle?: string;
  eventId?: number;
  isFlatListScroolEnable: boolean;
  ageDivisionList: AgeDivision[] | undefined;
  callAgeDivisionAPI: any;
  eventTenseStatus: string;
  setSelectedMenuId: Function;
  setSelectedToDoTab: Function;
}

const ContestantsAndGroups = ({
  eventTitle,
  eventId,
  ageDivisionList,
  callAgeDivisionAPI,
  isFlatListScroolEnable,
  eventTenseStatus,
  setSelectedMenuId,
  setSelectedToDoTab,
}: Props) => {
  const [contestantButtonClicked, setContestantButtonClicked] = useState(true);

  const renderScene = (page: any, index: number) => {
    return (
      <ContestantTab
        eventId={eventId}
        eventTitle={eventTitle}
        isFlatListScroolEnable={isFlatListScroolEnable}
        ageId={
          ageDivisionList !== undefined &&
          ageDivisionList.length > 0 &&
          page.key !== undefined &&
          ageDivisionList[Number(page.key)]?.id !== undefined
            ? page.key === TAB_KEYS.ALL
              ? ''
              : ageDivisionList[Number(page.key)].id + ''
            : ''
        }
        isActive={index}
        callAgeDivisionAPI={callAgeDivisionAPI}
        eventTenseStatus={eventTenseStatus}
        setSelectedMenuId={setSelectedMenuId}
        setSelectedToDoTab={setSelectedToDoTab}
      />
    );
  };
  useEffect(() => {
    if (contestantButtonClicked) {
      trackScreenView(ANALYTICS_SCREEN.CONTESTANT_MANAGEMENT);
    }
  }, [contestantButtonClicked]);

  const onLeftButtonClicked = () => {
    if (!contestantButtonClicked) {
      setContestantButtonClicked(!contestantButtonClicked);
    }
  };

  const onRightButtonClicked = () => {
    if (contestantButtonClicked) {
      setContestantButtonClicked(!contestantButtonClicked);
    }
  };

  return (
    <View style={styles.container}>
      <SwitchButton
        leftLabel={translations.CONTESTANTS}
        rightLabel={translations.GROUPS}
        isLeftButtonActive={contestantButtonClicked}
        onLeftTabClicked={onLeftButtonClicked}
        onRightTabClicked={onRightButtonClicked}
      />

      {contestantButtonClicked ? (
        <View>
          {ageDivisionList !== undefined && ageDivisionList?.length > 0 ? (
            <DynamicTabs
              tabScreen={renderScene}
              ageDivisionList={ageDivisionList}
              isAllTabRequired
              indexChanged={emptyFunction}
            />
          ) : (
            renderScene(-1, -1)
          )}
        </View>
      ) : (
        <Groups
          isFlatListScroolEnable={isFlatListScroolEnable}
          eventId={eventId}
        />
      )}
    </View>
  );
};

export default ContestantsAndGroups;
