import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import translations from '../../../../../../../../../../../assets/translations';
import {styles} from './styles';
import {DESCRIPTION} from '../../../../../../../../../../utils/enum';
import AppImages from '../../../../../../../../../../../assets/images/AppImages';
import FloatingDropdown from '../../../../../../../../../../common/floatingdropown';
import SearchEventContestantModal from '../searcheventwinnermodal';
import {AddEventRequest} from '../../../../../../../../../../../services/models/event/addeventrequest';
import CustomBottomModal from '../../../../../../../../../../common/custombottommodal';
import {
  description,
  descriptionWithAppointed,
} from '../../../../../../../../../../utils/localarray';
import FloatingInput from '../../../../../../../../../../common/floatinginput';
import {moderateScaleVertical} from '../../../../../../../../../../utils/responsiveSize';
import {Contestant} from '../../../../../../../../../../../services/models/pageantdetails/contestant';
import {Award} from '../../../../../../../../../../../services/models/pageantdetails/award';
import WarningModel from '../../../../../../../../../../common/warningmodel';
import {
  toast,
  toastType,
  internetState,
} from '../../../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {removeEmojis} from '../../../../../../../../../../utils/validations';

interface Props {
  index: number;
  eventId: number;
  ageDivisionId: number | undefined;
  onAddMoreClick: (isDelete: boolean, index: number) => void;
  isDisplayAddMore: boolean;
  isAward?: boolean;
  isWinner?: boolean;
  isDescriptionAppointed?: boolean;
  items: AddEventRequest[];
  itemsaward: Award[] | undefined;
  setRenderWinnerItem?: any;
  udpateRequestBundle?: () => void;
  isDescriptionAppointedAded?: () => void;
}
const EventAddResultItem = ({
  onAddMoreClick,
  udpateRequestBundle,
  isDescriptionAppointedAded,
  index,
  isDisplayAddMore,
  items,
  isAward,
  eventId,
  ageDivisionId,
  isDescriptionAppointed = false,
  itemsaward,
  setRenderWinnerItem,
  isWinner = false,
}: Props) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState({
    name: '',
    id: 0,
  });
  const [nameOfTitleValue, setNameOfTitleValue] = useState('');
  const [nameOfTheTitleError, setNameOfTheTitleError] = useState('');
  const [contestantDuplicateError, setContestantError] = useState('');
  const [
    isSearchEventContestatntModalVisible,
    setSearchEventContestatntModalVisible,
  ] = useState(false);
  const netInfo = useNetInfo();
  const [competitor, setCompetitor] = useState<Contestant | undefined>();
  const [selectedAward, setSelectedAward] = useState<Award | undefined>();
  const onAddMoreInternalClick = () => {
    onAddMoreClick(false, index);
  };
  const [isAppointedWarmingModelVisible, setAppointedWarmingModelVisible] =
    useState(false);
  const [
    beforeAppointedSelectionHolderTemp,
    setBeforeAppointedSelectionHolderTemp,
  ] = useState();
  const [isAwardModalVisible, setAwardModalVisible] = useState(false);
  const [filteredDescriptionArray, setFilteredDescriptionArray] = useState([]);

  useEffect(() => {
    items[index].index = index;

    if (
      isWinner &&
      filteredDescriptionArray.length === 0 &&
      !isDescriptionAppointed
    ) {
      setFilteredDescriptionArray(descriptionWithAppointed);
    } else if (filteredDescriptionArray.length === 0) {
      setFilteredDescriptionArray(description);
    }
    if (
      items[index]?.descriptionTitleAwardValueError !== undefined &&
      items[index]?.descriptionTitleAwardValueError
    ) {
      setNameOfTheTitleError(translations.THIS_FIELD_REQUIRED);
    } else {
      if (items[index]?.descriptionTitleAwardValue !== undefined) {
        setNameOfTitleValue(items[index].descriptionTitleAwardValue + '');
      }

      setNameOfTheTitleError('');
    }

    if (
      items[index]?.contestantEmptyError !== undefined &&
      items[index]?.contestantEmptyError
    ) {
      setContestantError(translations.THIS_FIELD_REQUIRED);
    } else if (
      items[index]?.contestantDuplicateError !== undefined &&
      items[index]?.contestantDuplicateError
    ) {
      if (
        items[index]?.error !== undefined &&
        items[index]?.error?.length!! > 0
      ) {
        setContestantError(items[index]?.error!!);
        toast(items[index]?.error!!, toastType.ERROR_TOAST);
      }
    } else {
      setContestantError('');
    }

    if (items[index]?.contestant !== undefined) {
      setCompetitor(items[index].contestant);
    }
    if (items[index]?.descriptionId !== undefined) {
      let descriptionLabel = '';
      for (const entry of descriptionWithAppointed) {
        if (entry.id === items[index]?.descriptionId) {
          descriptionLabel = entry.name;
        }
      }

      setDescriptionValue({
        name: descriptionLabel,
        id: items[index]?.descriptionId,
      });
    }

    if (items[index].award !== undefined && itemsaward !== undefined) {
      for (const entry of itemsaward) {
        if (entry.id === items[index].award?.id) {
          setSelectedAward(entry);
        }
      }
    }
  }, []);

  const onItemSelection = (contestant: Contestant | undefined) => {
    items[index].contestant = contestant;
    setCompetitor(contestant);
    if (udpateRequestBundle !== undefined) {
      udpateRequestBundle();
    }
  };

  const onAwrdSelection = (item: any) => {
    items[index].award = item;
    setSelectedAward(item);
    if (udpateRequestBundle !== undefined) {
      udpateRequestBundle();
    }
  };

  /**
   * When the user clicks the confirm button, go back to the previous screen.
   */
  const onAppointedConfirmWarning = () => {
    if (items[index]?.descriptionId === DESCRIPTION.APPOINTED) {
      setTimeout(() => {
        setDescriptionVisible(true);
      }, 500);
    } else if (beforeAppointedSelectionHolderTemp !== undefined) {
      items[index].winner = beforeAppointedSelectionHolderTemp?.name;
      items[index].descriptionId = beforeAppointedSelectionHolderTemp.id;
      setDescriptionValue(beforeAppointedSelectionHolderTemp);
      resetAllItem();
    }
    if (udpateRequestBundle !== undefined) {
      udpateRequestBundle();
    }
  };
  const resetAllItem = () => {
    setTimeout(() => {
      if (isDescriptionAppointedAded !== undefined) {
        isDescriptionAppointedAded();
      }
      setRenderWinnerItem(false);
      setTimeout(() => {
        setRenderWinnerItem(true);
      }, 5);
    }, 5);
  };
  return (
    <View>
      <View style={styles.addItemContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              onAddMoreClick(true, index);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <FloatingDropdown
          floatingText={isAward ? translations.TITLE : translations.WINNNER}
          value={
            isAward
              ? selectedAward !== undefined
                ? selectedAward.name
                : ''
              : competitor?.name !== undefined
              ? competitor?.name
              : ''
          }
          errorMsg={isAward ? nameOfTheTitleError : contestantDuplicateError}
          onFieldFocus={() => {
            if (!netInfo.isConnected && !netInfo.isInternetReachable) {
              internetState(netInfo.isConnected!!);
              return false;
            } else {
              if (isAward) {
                setAwardModalVisible(true);
              } else {
                setSearchEventContestatntModalVisible(true);
              }
            }
          }}
        />
        <FloatingDropdown
          floatingText={
            isAward ? translations.CONTESTANT : translations.DESCRIPTION
          }
          isMandatory={isAward}
          value={
            isAward
              ? competitor !== undefined
                ? competitor.name
                : ''
              : descriptionValue?.name === undefined
              ? items[index].winner !== undefined
                ? items[index].winner
                : ''
              : descriptionValue?.name
          }
          errorMsg={isAward ? contestantDuplicateError : ''}
          onFieldFocus={() => {
            if (isAward) {
              setSearchEventContestatntModalVisible(true);
            } else if (items[index]?.descriptionId === DESCRIPTION.APPOINTED) {
              setAppointedWarmingModelVisible(true);
            } else {
              if (
                beforeAppointedSelectionHolderTemp?.id ===
                  DESCRIPTION.APPOINTED &&
                items[index].descriptionId === undefined
              ) {
                setBeforeAppointedSelectionHolderTemp(
                  beforeAppointedSelectionHolderTemp?.id,
                );
              }

              setDescriptionVisible(true);
            }
          }}
        />
        <CustomBottomModal
          isModalVisible={isDescriptionVisible}
          setIsModalVisible={setDescriptionVisible}
          data={filteredDescriptionArray}
          preSelectedValue={beforeAppointedSelectionHolderTemp?.id}
          parentCallback={selectedItem => {
            setBeforeAppointedSelectionHolderTemp(selectedItem);
            if (selectedItem.id === DESCRIPTION.APPOINTED) {
              setTimeout(() => {
                setAppointedWarmingModelVisible(true);
              }, 500);
            } else {
              var oldState = items[index].descriptionId;
              items[index].winner = selectedItem.name;
              items[index].descriptionId = selectedItem.id;
              setDescriptionValue(selectedItem);

              if (udpateRequestBundle !== undefined) {
                udpateRequestBundle();
              }
              if (isWinner && oldState === DESCRIPTION.APPOINTED) {
                resetAllItem();
              }
            }
          }}
          heading={translations.ADD_DESCRIPTION}
        />

        {items[index]?.descriptionId !== undefined &&
        items[index]?.descriptionId === DESCRIPTION.TITLE_AWARDED ? (
          <FloatingInput
            floatingText={translations.NAME_OF_THE_TITLE}
            setText={(value: string) => {
              setNameOfTitleValue(removeEmojis(value));
              items[index].descriptionTitleAwardValue = value;
              if (udpateRequestBundle !== undefined) {
                udpateRequestBundle();
              }
            }}
            value={nameOfTitleValue}
            returnKeyType={'done'}
            autoCapitalize={'words'}
            isMandatory={true}
            errorMsg={nameOfTheTitleError}
          />
        ) : null}

        {isDisplayAddMore ? (
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                onAddMoreInternalClick();
              }}>
              <Text style={styles.addMoreWinners}>
                {isAward
                  ? translations.ADD_MORE_AWARD
                  : translations.ADD_MORE_WINNER}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gap} />
        )}
        <SearchEventContestantModal
          isModalVisible={isSearchEventContestatntModalVisible}
          eventId={eventId}
          ageDivisionId={ageDivisionId}
          setIsModalVisible={setSearchEventContestatntModalVisible}
          preSelectedValue={competitor?.contestant_id}
          onContestantClick={onItemSelection}
        />

        {itemsaward !== undefined && (
          <CustomBottomModal
            isModalVisible={isAwardModalVisible}
            setIsModalVisible={setAwardModalVisible}
            data={itemsaward}
            parentCallback={onAwrdSelection}
            heading={translations.AWARDS}
            enableSearch={true}
            preSelectedValue={selectedAward?.id}
          />
        )}
        <WarningModel
          msg={
            items[index].descriptionId !== undefined &&
            items[index].descriptionId === DESCRIPTION.APPOINTED
              ? translations.UNSELECTING_APPOINTED_WILL_SHOW_THE_OTHER_INFORMATION_RELATED_TO_THE_RESULT_AGAIN_DO_YOU_TO_PROCEDD
              : translations.SELECTING_APPOINTED_WILL_HIDE_THE_OTHER_INFORMATION_RELATED_TO_RESULT_DO_YOU_WANT_TO_PROCEED
          }
          isModalVisible={isAppointedWarmingModelVisible}
          setConfirm={onAppointedConfirmWarning}
          setIsModalVisible={setAppointedWarmingModelVisible}
          headingStyle={styles.modalHeading}
        />
      </View>
      {isDisplayAddMore ? (
        <View style={[{marginBottom: moderateScaleVertical(16)}]} />
      ) : null}
    </View>
  );
};

export default EventAddResultItem;
