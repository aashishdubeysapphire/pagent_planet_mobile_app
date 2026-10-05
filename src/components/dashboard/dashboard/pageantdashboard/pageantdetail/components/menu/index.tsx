import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import FloatingButton from '../../../../../../common/floatingbutton';
import {FLOATING_ICON} from '../../../../../../utils/enum';
import OpenChildAnimation from '../../../../../../common/openchildanimation';

export enum PAGEANT_DETAIL_MENU_ID {
  VIEW_PUBLIC_PAGE = 1,
  POTENTIAL_CONSTESTANT = 2,
  GALLERY = 3,
  TPP_PCA_ICON = 4,
  ADVERTISE = 5,
  EVENT = 6,
  RULES = 7,
  AWARD = 8,
  ABOUT = 9,
}

interface Props {
  isMenuModalVisible: boolean;
  isActivePageant: boolean;
  selectedMenuId: number;
  setMenuModalVisible: any;
  onMenuClick: (event: string, id: number) => void;
  isAwardAvailable: boolean;
}
const PageantDetailMenu = ({
  isMenuModalVisible,
  setMenuModalVisible,
  selectedMenuId,
  isActivePageant,
  onMenuClick,
  isAwardAvailable,
}: Props) => {
  const popupMenuData = [
    {
      id: PAGEANT_DETAIL_MENU_ID.VIEW_PUBLIC_PAGE,
      title: translations.VIEW_PUBLIC_PAGE,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_VIEW_PUBLIC_PAGE_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT,
      title: translations.POTTENTIAL_CONTESTANTS,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_POTENTIAL_CONSTESTANT_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.GALLERY,
      title: translations.GALLERY,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_GALLERY_SMALL_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON,
      title: translations.PEOPLE_CHOICE_AWARD,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_PCA_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.ADVERTISE,
      title: translations.ADVERTISE,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_ADVERTISE_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.EVENT,
      title: translations.EVENTS,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_EVENT_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.RULES,
      title: translations.RULES,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_RULES_ICON />,
      showOnScreen: true,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.AWARD,
      title: translations.AWARDS,
      cover: <AppImages.PAGEANT_DETAIL_MENU.TPP_AWARD_ICON />,
      showOnScreen: isAwardAvailable ? true : false,
    },
    {
      id: PAGEANT_DETAIL_MENU_ID.ABOUT,
      title: translations.ABOUT,
      cover: <AppImages.Drawer.About_ICON width={16} height={16} />,
      showOnScreen: true,
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
        style={styles.outerview}>
        <View style={styles.menuContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}>
              <OpenChildAnimation
                isVisible={isMenuModalVisible}
                durationHeight={500}
                durationFade={400}
                child={
                  <View>
                    {popupMenuData.map((i, index) => {
                      return (
                        i.showOnScreen && (
                          <TouchableOpacity
                            style={styles.card}
                            onPress={() => {
                              onMenuClick(i.title, i.id);
                            }}>
                            <View style={styles.cardRow}>
                              <View style={styles.staticCadImage}>
                                {i.cover}
                              </View>
                              {selectedMenuId === i.id ? (
                                <Text style={styles.selectedCardLable}>
                                  {i.title}
                                </Text>
                              ) : (
                                <Text style={styles.staticCardLable}>
                                  {i.title}
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        )
                      );
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

export default PageantDetailMenu;
