import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import SelectCategory from '../../../../../../../common/selectcategory';
import translations from '../../../../../../../../assets/translations';
import {REFESH_SCREEN, TODOS} from '../../../../../../../utils/enum';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {color} from '../../../../../../../../assets/colorConstant';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../services/constants';
import {
  DELETE_TODO,
  GET_CONTESTANT_TODOS_LIST,
  GET_DIRECTOR_TODOS_LIST,
  MARK_TODO_DONE,
} from '../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import AddFirstRecord from '../../../../../../../common/addfirstrecord';
import {FlatList} from 'react-native-gesture-handler';
import ToDoListItem from '../../../../../../../common/todolistitem';
import moment from 'moment';
import ContestantToDoListItem from '../../../../../../../common/contestanttodolistitem';
import {TIME_FORMAT} from '../../../../../../../utils/datetimemanger';
import ViewMoreModal from '../../../../../contestantdashboard/myjourney/viewmoremodal';
import WarningModel from '../../../../../../../common/warningmodel';
import AddNewToDoPopup from './contestanttodos/contestanttodoslandingpage';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import ViewPlanModal from '../../../components/viewplanmodal';
import {
  hapticFeedBack,
  trackScreenView,
} from '../../../../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../../../../assets/translations/analyticsscreenname';

const Todos = ({
  eventId,
  isFlatListScroolEnable,
  selectedToDoTab,
  pageantPlanDetail,
  pageantId,
}) => {
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const {
    storeData: {refresh},
  } = useAppStore();
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = useState(
    selectedToDoTab === 2 ? TODOS.CONTESTANT_TODOS : TODOS.MY_TODOS,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [contestantTodos, setContestantTodos] = useState([]);
  const [myTodos, setMyTodos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [todoId, setTodoId] = useState([]);
  const [todoName, setTodoName] = useState([]);
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [timeZone, setTimeZone] = useState();
  const [isPcaDeactivatedBeforeMinDays, setIsPcaDeactivatedBeforeMinDays] =
    useState(null);
  const [isPcaActivated, setIsPcaActivated] = useState(translations.NO_SMALL);
  const [directorActiveMembershipPackage, setDirectorActiveMembershipPackage] =
    useState(translations.NO_SMALL);
  const [landingPageShown, setLandingPageShown] = useState(false);
  const [toDoModalVisible, setToDoModalVisible] = useState(false);
  const [pcaActivateModalVisible, setpcaActivateModalVisible] = useState(false);
  const [addNewTodoModalVisible, setAddNewTodoModalVisible] = useState(false);
  const [isContestantDeleteModalVisible, setIsContestantDeleteModalVisible] =
    useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  useEffect(() => {
    if (isActive === TODOS.CONTESTANT_TODOS) {
      trackScreenView(ANALYTICS_SCREEN.CONTESTANT_SCHEDULE)
      hitGetcontestantTodos();
    }
  }, [isActive]);

  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
    }, 500);
  }, [refresh]);

  useEffect(() => {
    if (!isFocused && addNewTodoModalVisible) {
      setAddNewTodoModalVisible(false);
    }
  }, [isFocused]);
  const refreshScreen = () => {
    if (REFESH_SCREEN.CONTESTANT_TODOS === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      hitGetcontestantTodos();
    }
  };
  useEffect(() => {
    if (isActive === TODOS.MY_TODOS) {
      hitGetmyTodos();
      trackScreenView(ANALYTICS_SCREEN.DIRECTOR_TIMELINE);
    }
  }, [isActive]);

  const list = [
    {
      lable: TODOS.MY_TODOS,
    },
    {
      lable: TODOS.CONTESTANT_TODOS,
    },
  ];

  const {mutateAsync: getContestantTodos} = useCgMutation({
    key: GET_CONTESTANT_TODOS_LIST,
    method: MethodTypes.GET,
    url: GET_CONTESTANT_TODOS_LIST + eventId,
    offSuccessToast: true,
  });
  const {mutateAsync: getmyTodos} = useCgMutation({
    key: GET_DIRECTOR_TODOS_LIST,
    method: MethodTypes.GET,
    url: GET_DIRECTOR_TODOS_LIST + eventId,
    offSuccessToast: true,
  });

  const {mutateAsync: deleteContestantTodos} = useCgMutation({
    key: DELETE_TODO,
    method: MethodTypes.GET,
    url: DELETE_TODO + todoId,
    offSuccessToast: false,
  });
  const hitGetcontestantTodos = async () => {
    setIsLoading(true);
    const res = await getContestantTodos();
    if (res.success) {
      setContestantTodos(res.data.contestantTodoList);
      setIsPcaActivated(res.data.pageantDetail.is_pca_activated);
      setIsPcaDeactivatedBeforeMinDays(
        res.data.pageantDetail.is_pca_deactivated_before_min_days,
      );
      setTimeZone(res.data.pageantDetail.time_zone_data);
      setIsLoading(false);
      setTimeout(() => {
        if (res.data.contestantTodoList.length === 0 && !landingPageShown) {
          if (isFocused) {
            setAddNewTodoModalVisible(true);
          }
          setLandingPageShown(true);
        }
      }, 500);
    }

    setIsLoading(false);
  };
  const hitDeletecontestantTodos = async () => {
    setIsLoading(true);
    const res = await deleteContestantTodos();
    if (res.success) {
      hitGetcontestantTodos();
      setLandingPageShown(true);
    }

    setIsLoading(false);
  };
  const hitGetmyTodos = async () => {
    setIsLoading(true);
    const res = await getmyTodos();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setMyTodos(res.data.directotTodoList);
      setDirectorId(res.data.pageantDetail.owner_id);
      setDirectorActiveMembershipPackage(
        res.data.directorActiveMembershipPackage,
      );
    }
    setIsLoading(false);
  };
  const getDate = val => {
    return moment(val, TIME_FORMAT.YYYYMMDD).format('DD MMM');
  };
  const updatedBody = {
    director_id: directorId,
    profile_id: eventId,
    to_do_id: selected,
    marked_as_complete: translations.NO_SMALL,
  };
  const {mutateAsync: markTodoComplete} = useCgMutation({
    key: MARK_TODO_DONE,
    url: MARK_TODO_DONE,
    body: updatedBody,
    offSuccessToast: true,
    disableLoader: false,
  });
  const markTodoDoneApi = async () => {
    setIsLoading(true);
    const res = await markTodoComplete();
    if (res.success) {
      hitGetmyTodos();
      if(viewMoreModalVisible){
        setViewMoreModalVisible(false)
      }
    } else {
      setIsLoading(false);
    }
  };
  const onViewMoreClick = item => {
    setStatus(item?.todo_status?.todo_status);
    setTodoId(item?.id);
 setSelected(item?.id)
    setDescription(item?.description);
    setTodoName(item?.name ? item?.name : item?.todo_category?.name);
    setLocation(item?.location_address);
    setTime(item?.due_date_time ? item?.due_date_time : null);
    setStartDate(getDate(item?.start_date));
    setDueDate(getDate(item?.due_date));
    setStartDateTime(item?.start_date_time ? item?.start_date_time : null);
    setLink(item?.link);
    setLinkTitle(item?.title_for_link);
    setViewMoreModalVisible(true);
  };
  const onBuyPlanClick = () => {
    setIsPreviewModalVisible(true);
  };

  const onDirectorViewMoreClick = item => {
    setStatus(item?.todo_status);
    setTodoId(item?.id);
    setSelected(item?.id);
    setDescription(item?.description);
    setTodoName(item?.name ? item?.name : item?.todo_category?.name);

    setTime(
      item?.due_date_time
        ? `${item?.due_date_time}` + ' ' + `${timeZone}`
        : null,
    );

    setDueDate(getDate(item?.due_date_to_sort_todo));

    setLink(item?.link);
    setLinkTitle(item?.title_for_link);
    setViewMoreModalVisible(true);
  };
  const onBulletClick = item => {
    if (selected === null) {
      setSelected(item.id);
      setTodoId(item.id);
      setTodoName(item?.name ? item?.name : item?.todo_category?.name);
      setToDoModalVisible(true);
    }
    if (selected === item.id) {
      setSelected(null);
    } else {
      setSelected(item.id);
      setTodoId(item.id);
      setTodoName(item?.name ? item?.name : item?.todo_category?.name);
      setToDoModalVisible(true);
    }
    hapticFeedBack();
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };
  const TodosView = ({lable = '', onPressAdd = () => {}, length = 0}) => {
    if (isLoading) {
      return (
        <>
          <View style={styles.topHeight}></View>

          <ShimmerList
            width={Dimensions.get('window').width - moderateScaleVertical(32)}
            height={moderateScaleVertical(150)}
            padding={15}
            borderRadius={10}
          />
        </>
      );
    } else {
      if (isActive === TODOS.CONTESTANT_TODOS && contestantTodos?.length > 0) {
        return (
          <View>
            <View style={styles.eventHeadingArea}>
              <>
                <Text style={styles.headingLabel}>
                  {translations.ADD_CONTESTANT_TODO}
                </Text>
                <TouchableOpacity onPress={onPressAdd}>
                  <AppImages.Dashboard.addPageant_ICON />
                </TouchableOpacity>
              </>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREEN.CONTESTANT_SUBMISSIONS, {
                  eventId: eventId,
                  randomNo: new Date(),
                })
              }>
              <Text style={styles.contestantSubmission}>
                <Text
                  style={{color: color.P_PINK, fontFamily: font.RobotoMedium}}>
                  {translations.TAP_HERE}
                </Text>{' '}
                {translations.VIEW_CONTESTANT_SUBMISSIONS}
              </Text>
            </TouchableOpacity>

            <FlatList
              data={contestantTodos}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={isFlatListScroolEnable}
              ListFooterComponent={listFooterComponent}
              renderItem={item => {
                return (
                  <ContestantToDoListItem
                    status={item?.item?.todo_status?.todo_status}
                    onDeleteClick={() => onDeleteTodo(item?.item)}
                    onEditClick={() => onPressEditTodo(item?.item?.id)}
                    todoHeading={
                      item?.item?.name
                        ? item?.item?.name
                        : item?.item?.todo_category?.name
                    }
                    startDateTime={
                      item?.item?.start_date_time
                        ? item?.item?.start_date_time
                        : null
                    }
                    time={
                      item?.item?.due_date_time
                        ? item?.item?.due_date_time
                        : null
                    }
                    link={item?.item?.link}
                    location={item?.item?.location_address}
                    startDate={
                      item?.item?.start_date
                        ? getDate(item?.item?.start_date)
                        : null
                    }
                
                    dueDate={getDate(item?.item?.due_date)}
                    linkTitle={item?.item?.title_for_link}
                    todoText={item?.item?.description}
                    onViewMoreClick={() => onViewMoreClick(item?.item)}
                  />
                );
              }}
            />
          </View>
        );
      } else if (isActive === TODOS.MY_TODOS && myTodos?.length > 0) {
        return (
          <View>
            <View style={styles.headingArea} />

            <FlatList
              data={myTodos}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={isFlatListScroolEnable}
              ListFooterComponent={listFooterComponent}
              renderItem={item => {
                return (
                  <ToDoListItem
                    status={item?.item?.todo_status}
                    onBulletClick={() => onBulletClick(item?.item)}
                    isDirectorTodo={true}
                    todoHeading={
                      item?.item?.name
                        ? item?.item?.name
                        : item?.item?.todo_category?.name
                    }
                    pageantPlanDetail={pageantPlanDetail}
                    locked={
                      item?.item?.has_membership === 1 &&
                      directorActiveMembershipPackage === translations.NO_SMALL
                        ? true
                        : false
                    }
                    time={
                      item?.item?.due_date_time
                        ? item?.item?.due_date_time
                        : null
                    }

                    link={item?.item?.link}
                    dueDate={getDate(item?.item?.due_date_to_sort_todo)}
                    linkTitle={item?.item?.title_for_link}
                    todoText={item?.item?.description}
                    selected={selected === item?.item?.id ? true : false}
                    onViewMoreClick={() => onDirectorViewMoreClick(item?.item)}
                    onBuyPlanClick={onBuyPlanClick}
                  />
                );
              }}
            />
          </View>
        );
      } else {
        return (
          <AddFirstRecord
            label={isActive === TODOS.MY_TODOS ? '' : lable}
            onPress={isActive === TODOS.MY_TODOS ? null : onPressAdd}
            bodyText={
              isActive === TODOS.MY_TODOS
                ? translations.NO_TODO_FOUND
                : translations.NO_TODO_ADDED
            }
          />
        );
      }
    }
  };
  const onPressAddTodo = () => {
    if (!isLoading) {
      if (
        isPcaActivated === translations.YES ||
        isPcaDeactivatedBeforeMinDays === 0
      ) {
        navigation.navigate(SCREEN.ADD_EDIT_TODO, {
          eventId: eventId,
          timeZone: timeZone,
        });
      } else if (
        isPcaDeactivatedBeforeMinDays == 1 &&
        isPcaActivated === translations.NO_SMALL
      ) {
        setUnlockModalVisible(true);
      }
    }
  };
  const onDeleteTodo = item => {
    if (!isLoading) {
      if (
        isPcaActivated === translations.YES ||
        isPcaDeactivatedBeforeMinDays === 0
      ) {
        setTodoId(item?.id);
        setIsContestantDeleteModalVisible(true);
      } else if (
        isPcaActivated === translations.NO_SMALL &&
        isPcaDeactivatedBeforeMinDays === 1
      ) {
        setpcaActivateModalVisible(true);
      }
    }
  };
  const onPressEditTodo = toDoid => {
    if (!isLoading) {
      if (
        isPcaActivated === translations.YES ||
        isPcaDeactivatedBeforeMinDays === 0
      ) {
        navigation.navigate(SCREEN.ADD_EDIT_TODO, {
          eventId: eventId,
          timeZone: timeZone,
          isEditable: true,
          todoId: toDoid,
        });
      } else if (
        isPcaActivated === translations.NO_SMALL &&
        isPcaDeactivatedBeforeMinDays === 1
      ) {
        setpcaActivateModalVisible(true);
      }
    }
  };
  return (
    <View style={styles.tabContainer}>
      <View style={styles.mainView}>
        <SelectCategory
          isActive={isActive}
          setIsActive={setIsActive}
          list={list}
        />
      </View>
      {isActive === TODOS.MY_TODOS ? (
        <>
          <TodosView listData={myTodos} length={myTodos.length} />
        </>
      ) : (
        <>
          <TodosView
            lable={translations.ADD_CONTESTANT_TODO}
            onPressAdd={onPressAddTodo}
            listData={contestantTodos}
            length={contestantTodos.length}
          />
        </>
      )}
      <View style={styles.bottomHeight}></View>
      <AddNewToDoPopup
        isModalVisible={addNewTodoModalVisible}
        setModalVisible={setAddNewTodoModalVisible}
        setIsModalVisible={setAddNewTodoModalVisible}
        onPressAddTodo={onPressAddTodo}
      />
      <ViewMoreModal
        status={status}
        todoHeading={todoName}
        todoText={description}
        dueDate={dueDate}
        startDate={startDate}
        time={time}
        isModalVisible={viewMoreModalVisible}
        link={link}
        startDateTime={startDateTime}
        onEditClick={() => onPressEditTodo(todoId)}
        linkTitle={linkTitle}
        location={location}
        isContestantTodo={true}
        hideMarkDone={isActive===TODOS.CONTESTANT_TODOS?true:false}
        closeModal={setViewMoreModalVisible}
        onPressDelete={() => {}}
        onPressDone={markTodoDoneApi}
        setSelected={setSelected}
      />
      <WarningModel
        msg={`${translations.MARK} '${todoName}' ${translations.AS_DONE}`}
        isModalVisible={toDoModalVisible}
        setConfirm={() => markTodoDoneApi()}
        setCancel={() => setSelected(null)}
        setIsModalVisible={setToDoModalVisible}
        headingStyle={styles.modalLabel}
        isTodoModal={true}
      />
      <WarningModel
        msg={translations.DELETE_CONTESTANT_TODO_CONFIRM_MSG}
        isModalVisible={isContestantDeleteModalVisible}
        setConfirm={() => hitDeletecontestantTodos()}
        setIsModalVisible={setIsContestantDeleteModalVisible}
        headingStyle={styles.modalLabel}
      />
      <WarningModel
        msg={translations.UNLOCK_EVENT_MANAGER}
        isModalVisible={unlockModalVisible}
        setConfirm={() => {
          navigation.navigate(SCREEN.PCA_FORM, {eventId: eventId});
          setUnlockModalVisible(false);
        }}
        setCancel={() => setUnlockModalVisible(false)}
        setIsModalVisible={setUnlockModalVisible}
        headingStyle={styles.modalLabel}
        isTodoModal={true}
      />
      <WarningModel
        msg={translations.ACTIVATE_PCA}
        isModalVisible={pcaActivateModalVisible}
        setConfirm={() => {
          navigation.navigate(SCREEN.PCA_FORM, {eventId: eventId});
          setpcaActivateModalVisible(false);
        }}
        setCancel={() => setpcaActivateModalVisible(false)}
        setIsModalVisible={setpcaActivateModalVisible}
        headingStyle={styles.modalLabel}
        isTodoModal={true}
      />
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default Todos;
