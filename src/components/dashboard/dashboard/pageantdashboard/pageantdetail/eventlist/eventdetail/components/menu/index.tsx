import React from 'react';
import {Text, ScrollView, View, TouchableOpacity, Modal} from 'react-native';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import FloatingButton from '../../../../../../../../common/floatingbutton';
import {EVENT_STATUS, FLOATING_ICON} from '../../../../../../../../utils/enum';
import OpenChildAnimation from '../../../../../../../../common/openchildanimation';

/* Defining the enum. */
export enum EVENT_DETAIL_MENU_ID {
  VIEW_PUBLIC_PAGE = 1,
  EVENT_MANAGER = 2,
  CONTESTANTS = 3,
  PEOPLE_CHOICE_AWARD = 4,
  VOTE_LIST = 5,
  SELL_TICKETS_ENTRY_FEE = 6,
  GALLERY = 7,
  RESULTS_AND_AWARDS = 8,
  JUDGES_EMCEES = 9,
  SPONSORS = 10,
  MANAGES_ADS = 11,
  REVIEWS = 12,
  STATISTICS = 13,
  PRICE_PACKAGE = 14,
  AWARD = 15,
}

/* Defining the props that the component will receive. */
interface Props {
  isMenuModalVisible: boolean;
  isActivePageant: boolean;
  selectedMenuId: number;
  setMenuModalVisible: any;
  isIncomingEvent?: boolean;
  isPastEvent?: boolean;
  isOnGoingEvent?: boolean;
  isAwardAvailable?: boolean;
  tense?: string;
  onMenuClick: (event: string, id: number) => void;
}
/* A function that returns a JSX element. */
const EventDetailMenu = ({
  isMenuModalVisible,
  setMenuModalVisible,
  selectedMenuId,
  isActivePageant,
  onMenuClick,
  tense,
  isAwardAvailable = false,
}: Props) => {
  const popupMenuData = [
    {
      id: EVENT_DETAIL_MENU_ID.VIEW_PUBLIC_PAGE,
      title: translations.VIEW_PUBLIC_PAGE,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_VIEW_PUBLIC_PAGE_ICON />,
      showOnScreen: true,
    },
    {
      id: EVENT_DETAIL_MENU_ID.EVENT_MANAGER,
      title: translations.DIRECTOR_TIMELINE,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_EVENT_ICON />,
      showOnScreen: tense !== EVENT_STATUS.PAST,
    },
    {
      id: EVENT_DETAIL_MENU_ID.CONTESTANTS,
      title: translations.CONTESTANTS_MANAGEMENT,
      cover: <AppImages.Drawer.ProfileIcon width={16} height={16} />,
      showOnScreen: true,
    },
    {
      id: EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD,
      title: translations.PEOPLE_CHOICE_AWARD,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_PCA_ICON />,
      showOnScreen: true,
    },
    {
      id: EVENT_DETAIL_MENU_ID.SELL_TICKETS_ENTRY_FEE,
      title: translations.SELL_TICKETS_ENTRY_FEES,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_SELL_TICKET_FEE_ICON />,
      showOnScreen: true,
    },
    {
      id: EVENT_DETAIL_MENU_ID.GALLERY,
      title: translations.GALLERY,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_GALLERY_SMALL_ICON />,
      showOnScreen: true,
    },
    {
      id: EVENT_DETAIL_MENU_ID.RESULTS_AND_AWARDS,
      title: translations.RESULT_AWARDS,
      cover: <AppImages.EVENT_DETAIL_MENU.TPP_RESULT_AWARD_ICON />,
      showOnScreen: tense !== EVENT_STATUS.UP_COMING,
    },
    {
      id: EVENT_DETAIL_MENU_ID.JUDGES_EMCEES,
      title: translations.JUDGES_EMCEES,
      cover: <AppImages.EVENT_DETAIL_MENU.TPP_JUDGES_EMCEES_ICON />,
      showOnScreen: true,
    },

    {
      id: EVENT_DETAIL_MENU_ID.REVIEWS,
      title: translations.REVIEWS,
      cover: (
        <AppImages.EVENT_DETAIL_MENU.TPP_REIVEW_ICON width={16} height={16} />
      ),
      showOnScreen: true,
    },

    {
      id: EVENT_DETAIL_MENU_ID.PRICE_PACKAGE,
      title: translations.PRIZE_PACKAGE,
      cover: <AppImages.Drawer.About_ICON width={16} height={16} />,
      showOnScreen: true,
    },

    {
      id: EVENT_DETAIL_MENU_ID.AWARD,
      title: translations.AWARDS,
      cover: (
        <AppImages.PAGEANT_DETAIL_MENU.TPP_AWARD_ICON width={16} height={16} />
      ),
      showOnScreen: isAwardAvailable,
    },
  ];

  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      onRequestClose={() => setMenuModalVisible(false)}
      visible={isMenuModalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setMenuModalVisible(false)}
        style={styles.outerviewContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              <OpenChildAnimation
                isVisible={isMenuModalVisible}
                durationHeight={500}
                durationFade={400}
                child={
                  <View>
                    {popupMenuData.map((i, index) => {
                      return i.showOnScreen ? (
                        <TouchableOpacity
                          style={styles.cardContainer}
                          onPress={() => {
                            onMenuClick(i.title, i.id);
                          }}>
                          <View style={styles.cardRow}>
                            <View style={styles.staticCadImage}>{i.cover}</View>
                            {selectedMenuId === i.id ? (
                              <Text style={styles.selectedCardLableContainer}>
                                {i.title}
                              </Text>
                            ) : (
                              <Text style={styles.staticCardLable}>
                                {i.title}
                              </Text>
                            )}
                          </View>
                        </TouchableOpacity>
                      ) : null;
                    })}
                  </View>
                }
              />
            </ScrollView>
          </TouchableOpacity>
          <FloatingButton
            iconId={FLOATING_ICON.PLUS}
            isRotate
            onPress={() => setMenuModalVisible(false)}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EventDetailMenu;
