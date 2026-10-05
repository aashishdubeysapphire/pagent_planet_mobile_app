import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import ToDoViews from './component/todoview';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  CREATE_TODO,
  GET_EVENT_ASSOCIATED_DATA_FOR_TODO,
  GET_PCA_TIMEZONE_DATA,
  GET_TODO_DETILS,
  TYPE_OF_TO_DO_LIST,
  UPDTE_TODO,
} from '../../../../../../../../../../services/endpoints';
import {MethodTypes} from '../../../../../../../../../../services/constants';
import {
  checkIsConnected,
  trackScreenView,
} from '../../../../../../../../../utils/helperFunction';
import {useSetScreenRefresh} from '../../../../../../../../../../store/useAppStore';
import {TimeZoneRes} from '../../../../../../../../../../services/models/pca/timezone';
import {Base} from '../../../../../../../../../../services/models/base';
import {TodoType} from '../../../../../../../../../../services/models/eventmanager/todotype';
import {todoCategory, TODO_INFO_ARRAY} from './localarray';
import {EventAssociatedData} from '../../../../../../../../../../services/models/eventmanager/eventassociateddata';
import {isValid} from './validation';
import {getCreateToDo, getEditTodoBody} from './todohelperfunctions';
import {todoGetData} from '../../../../../../../../../../services/models/eventmanager/todogetdetials';
import {isValueNull} from '../../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import Loader from '../../../../../../../../../common/customloader';
import {REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import {toastError} from '../../../../../../../../../common/commonalert';
import {ANALYTICS_SCREEN} from '../../../../../../../../../../assets/translations/analyticsscreenname';
const AddEditTodo = props => {
  const {eventId, timeZone, isEditable, todoId} = props?.route?.params;
  useEffect(() => {
    getInitialData();
    trackScreenView(ANALYTICS_SCREEN.CREATE_TODO);
  }, []);
  useEffect(() => {
    if (isEditable === true) {
      trackScreenView(ANALYTICS_SCREEN.UPDATE_TODO);
    }
  }, [props?.route?.params]);
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();

  const [loader, setLoader] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [timeZoneCommingFrombackEnd, setTimeZoneCommingFrombackEnd] =
    useState(false);
  useEffect(() => {
    if (isSaved) {
      if (isEditable === true) {
        hitupdateTodo();
      } else {
        createToDoHitAPi();
      }
      setIsSaved(false);
    }
  }, [isSaved]);
  const [todoData, setTodoData] = useState({
    timeZone: '',
    typeOfTodo: '',
    dueDateTime: '',
    category: '',
    ageDevision: '',
    contestants: '',
    group: '',
    description: '',
    addLink: '',
    titleForLink: '',
    location: translations.NO_SMALL,
    locationName: '',
    egShoeSize: '',
    title: '',
    startDate: '',
  });
  const [dropDownData, setDropDownData] = useState({});
  const [eventEndDate, setEventEndDate] = useState('');
  const [todoStatus, setTodoStatus] = useState('');
  const onChangeTodoData = data => {
    setTodoData({...todoData, ...data});
  };

  const onChangeDropDownData = data => {
    setDropDownData({...dropDownData, ...data});
  };
  const [toDoErrorMsg, setToDoErrorMsg] = useState({});

  const {mutateAsync: getPCATimezoneData} = useCgMutation<Base<TimeZoneRes>>({
    key: GET_PCA_TIMEZONE_DATA,
    method: MethodTypes.GET,
    url: GET_PCA_TIMEZONE_DATA,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getTypeofToDo} = useCgMutation<Base<TodoType>>({
    key: TYPE_OF_TO_DO_LIST,
    method: MethodTypes.GET,
    url: TYPE_OF_TO_DO_LIST,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getToDodata} = useCgMutation<Base<todoGetData>>({
    key: GET_TODO_DETILS,
    method: MethodTypes.GET,
    url: GET_TODO_DETILS + todoId,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getEventAssicatiedData} = useCgMutation<
    Base<EventAssociatedData>
  >({
    key: GET_EVENT_ASSOCIATED_DATA_FOR_TODO,
    method: MethodTypes.GET,
    url: GET_EVENT_ASSOCIATED_DATA_FOR_TODO + eventId,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: createToDo} = useCgMutation<Base<EventAssociatedData>>({
    key: CREATE_TODO,
    method: MethodTypes.Post,
    url: CREATE_TODO,
    body: getCreateToDo(todoData, eventId),

    disableLoader: true,
  });
  const {mutateAsync: updateTodo} = useCgMutation<Base<EventAssociatedData>>({
    key: UPDTE_TODO,
    method: MethodTypes.Post,
    url: UPDTE_TODO,
    body: getEditTodoBody(todoData, eventId, todoId),

    disableLoader: true,
  });

  const hitupdateTodo = async () => {
    if (checkIsConnected() && isValid(todoData, setToDoErrorMsg)) {
      setLoader(true);
      const res = await updateTodo();
      if (res.success) {
        setScreenRefresh(REFESH_SCREEN.CONTESTANT_TODOS);
        navigation.goBack();
      }
      setLoader(false);
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  const createToDoHitAPi = async () => {
    if (checkIsConnected() && isValid(todoData, setToDoErrorMsg)) {
      setLoader(true);
      const res = await createToDo();
      if (res.success) {
        setScreenRefresh(REFESH_SCREEN.CONTESTANT_TODOS);
        navigation.goBack();
      }
      setLoader(false);
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  const getInitialData = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      const res = await getPCATimezoneData();
      if (res.success) {
        const todoType = await getTypeofToDo();
        if (todoType.success) {
          const eventAssicatiedData = await getEventAssicatiedData();
          if (eventAssicatiedData.success) {
            onChangeDropDownData({
              timeZone: res.data?.timezone,
              category: todoCategory,
              typeOfTodo: todoType.data?.CategoryList,
              ageDevision: eventAssicatiedData.data?.pageantAgeDivisionList,
              contestants: eventAssicatiedData.data?.pageantContestantList,
              group: eventAssicatiedData.data?.eventGroupList,
            });
            setEventEndDate(eventAssicatiedData.data?.eventDetails.end_date);
            if (isEditable === true) {
              const toDodataVar = await getToDodata();
              if (toDodataVar.success) {
                onChangeTodoData({
                  timeZone: timeZone,
                  typeOfTodo: toDodataVar.data?.todo.todo_category,
                  dueDateTime: toDodataVar.data?.todo.due_date_formatted,
                  category: getEditCatogrytype(
                    toDodataVar.data?.todo.ageDivisionsData,
                    toDodataVar.data?.todo.contestantsData,
                    toDodataVar.data?.todo.groupsData,
                  ),
                  ageDevision: toDodataVar.data?.todo.ageDivisionsData,
                  contestants: toDodataVar.data?.todo.contestantsData,
                  group: toDodataVar.data?.todo.groupsData,
                  description: isValueNull(toDodataVar.data?.todo.description),
                  addLink: isValueNull(toDodataVar.data?.todo.link),
                  titleForLink: isValueNull(
                    toDodataVar.data?.todo.title_for_link,
                  ),
                  location: !!toDodataVar.data?.todo.location_address
                    ? translations.YES
                    : translations.NO_SMALL,
                  locationName: isValueNull(
                    toDodataVar.data?.todo.location_address,
                  ),
                  egShoeSize: isValueNull(toDodataVar.data?.todo.wardrobe_text),
                  title: isValueNull(toDodataVar.data?.todo.name),
                  startDate: toDodataVar.data?.todo?.start_due_date_formatted,
                });
                setTodoStatus(toDodataVar.data?.todo.todo_status.todo_status);
                !!timeZone && setTimeZoneCommingFrombackEnd(true);
              }
            } else {
              onChangeTodoData({
                timeZone: timeZone,
              });
              !!timeZone && setTimeZoneCommingFrombackEnd(true);
            }
          }
        }
        setLoader(false);
      }
    }
  };
  const getEditCatogrytype = (ageDev, contestent, grp) => {
    if (ageDev?.length > 0) {
      return todoCategory[1];
    } else if (contestent?.length > 0) {
      return todoCategory[2];
    } else if (grp?.length > 0) {
      return todoCategory[3];
    } else {
      return todoCategory[0];
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loader} />
      <Header
        lable={
          (isEditable ? translations.EDIT : translations.ADD) +
          translations.TODO
        }
        rightText={translations.SAVE}
        isUnderLineRequired
        onPressRightText={() => {
          setIsSaved(true);
        }}
        infoIcon={isEditable ? false : true}
        infoDataArray={TODO_INFO_ARRAY}
      />
      <ScrollView style={styles.subContiner}>
        <ToDoViews
          todoData={todoData}
          onChangeTodoData={onChangeTodoData}
          toDoErrorMsg={toDoErrorMsg}
          dropDownData={dropDownData}
          timeZoneCommingFrombackEnd={timeZoneCommingFrombackEnd}
          isEditable={isEditable}
          eventEndDate={eventEndDate}
          todoStatus={todoStatus}
        />
        <View style={styles.bottomHeight} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddEditTodo;
