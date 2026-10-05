import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatingBigInput from '../../../../../../../../../../../common/floatingbiginput';
import FloatingDateTimeInput from '../../../../../../../../../../../common/floatingdatetimeinput';
import FloatingDropdown from '../../../../../../../../../../../common/floatingdropown';
import FloatingInput from '../../../../../../../../../../../common/floatinginput';
import translations from '../../../../../../../../../../../../assets/translations';
import {
  dontAcceptEmoji,
  keyBoardManager,
} from '../../../../../../../../../../../utils/helperFunction';
import CustomBottomModal from '../../../../../../../../../../../common/custombottommodal';
import {TIME_FORMAT} from '../../../../../../../../../../../utils/datetimemanger';
import {
  TODO_CATEGORY,
  TODO_TYPE,
} from '../../../../../../../../../../../utils/enum';
import MultiSelectinput from '../../../../../../../../../../../common/multiselectinput';
import DynamicradioButton from '../../../../../../../../../../../common/dynamicradiobutton/dynamicradioButton';
import {location} from '../../localarray';
import {styles} from './styles';
import {removeEmojis} from '../../../../../../../../../../../utils/validations';

const ToDoViews = ({
  todoData,
  onChangeTodoData,
  toDoErrorMsg,
  dropDownData,
  timeZoneCommingFrombackEnd,
  isEditable,
  eventEndDate,
  todoStatus,
}) => {
  useEffect(() => {
    keyBoardManager();
  }, []);
  const [, setAddLinkRef] = useState();
  const [titleRef, setTitleRef] = useState();
  const onChangeTypeOfTodo = selectedText => {
    onChangeTodoData({
      egShoeSize: '',
      location: translations.NO_SMALL,
      locationName: '',
      typeOfTodo: selectedText,
    });
  };
  const onChangeCategory = selectedText => {
    if (selectedText.text === TODO_CATEGORY.AGE_DEVISION) {
      onChangeTodoData({
        ageDevision:
          dropDownData.ageDevision.length === 1 ? dropDownData.ageDevision : '',
        contestants: '',
        group: '',
        category: selectedText,
      });
    } else if (selectedText.text === TODO_CATEGORY.CONTESTANTS) {
      onChangeTodoData({
        ageDevision: '',
        contestants:
          dropDownData.contestants.length === 1 ? dropDownData.contestants : '',
        group: '',
        category: selectedText,
      });
    } else if (selectedText.text === TODO_CATEGORY.GROUPS) {
      onChangeTodoData({
        ageDevision: '',
        contestants: '',
        group: dropDownData.group.length === 1 ? dropDownData.group : '',
        category: selectedText,
      });
    }
  };

  const [modalVar, setModalVar] = useState({
    timeZone: false,
    category: false,
    ageDevision: false,
    contestants: false,
    group: false,
  });
  const onChangeModalVar = data => {
    setModalVar({...modalVar, ...data});
  };
  const getValue = () => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return todoData?.ageDevision;
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return todoData?.contestants;
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return todoData?.group;
    }
  };
  const onFieldFocus = (val = true) => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return onChangeModalVar({
        ageDevision: val,
      });
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return onChangeModalVar({
        contestants: val,
      });
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return onChangeModalVar({
        group: val,
      });
    }
  };
  const errorMsg = () => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return toDoErrorMsg?.ageDevision;
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return toDoErrorMsg?.contestants;
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return toDoErrorMsg?.group;
    }
  };
  const getmodalData = () => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return dropDownData.ageDevision;
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return dropDownData.contestants;
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return dropDownData.group;
    }
  };
  const getModalVisibilty = () => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return modalVar.ageDevision;
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return modalVar.contestants;
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return modalVar.group;
    }
  };

  const getparentCallback = selectedText => {
    if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
      return onChangeTodoData({ageDevision: selectedText});
    } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
      return onChangeTodoData({contestants: selectedText});
    } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
      return onChangeTodoData({group: selectedText});
    }
  };
  const selectAgeDivContestenOrGrpUI = () => {
    if (
      todoData.category?.text === TODO_CATEGORY.ALL ||
      todoData.category?.text === undefined
    ) {
      return null;
    } else {
      return (
        <>
          <MultiSelectinput
            floatingText={translations.SELECT + todoData.category?.text}
            value={getValue()}
            isMandatory={true}
            onFieldFocus={() => {
              if (isEditable) {
                // Do nothing or perform any desired action
              } else {
                onFieldFocus(true);
              }
            }}
            onDelete={val => {
              if (isEditable) {
                // Do nothing or perform any desired action
              } else {
                getparentCallback(val);
              }
            }}
            addMore={() => {
              if (isEditable) {
                // Do nothing or perform any desired action
              } else {
                onFieldFocus(true);
              }
            }}
            errorMsg={errorMsg()}
            opacity={isEditable ? 0.5 : 1}
          />
          <CustomBottomModal
            isModalVisible={getModalVisibilty()}
            setIsModalVisible={val => onFieldFocus(val)}
            data={getmodalData() === undefined ? [] : getmodalData()}
            preSelectedValue={getValue()}
            parentCallback={selectedText => {
              getparentCallback(selectedText);
            }}
            heading={todoData.category?.text}
            enableSearch={true}
            enableMultiselect={true}
            showSelectAllSelectNon={true}
          />
        </>
      );
    }
  };

  const dateTimeView = () => {
    if (
      (todoData.typeOfTodo?.id === TODO_TYPE.OTHER &&
        todoData.location === translations.YES) ||
      todoData.typeOfTodo?.id === TODO_TYPE.REHERSALS ||
      todoData.typeOfTodo?.id === TODO_TYPE.SCHEDULE
    ) {
      return (
        <>
          <FloatingDateTimeInput
            floatingText={translations.START_DATE_TIME}
            onChange={value => {
              onChangeTodoData({startDate: value});
            }}
            setMaxDate={() => {
              return new Date(String(eventEndDate));
            }}
            value={todoData.startDate}
            errorMsg={toDoErrorMsg?.startDate}
            frontEndFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
            isfeildInactive={
              isEditable === true && todoStatus === 'Past' ? true : false
            }
            opacity={isEditable === true && todoStatus === 'Past' ? 0.4 : 1}
          />
          <FloatingDateTimeInput
            floatingText={translations.END_DATE_TIME}
            onChange={value => {
              onChangeTodoData({dueDateTime: value});
            }}
            setMaxDate={() => {
              return new Date(String(eventEndDate));
            }}
            isMandatory
            value={todoData.dueDateTime}
            errorMsg={toDoErrorMsg?.dueDateTime}
            frontEndFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
            isfeildInactive={
              isEditable === true && todoStatus === 'Past' ? true : false
            }
            opacity={isEditable === true && todoStatus === 'Past' ? 0.4 : 1}
          />
        </>
      );
    } else {
      return (
        <FloatingDateTimeInput
          floatingText={translations.DUE_DATE_TIME}
          onChange={value => {
            onChangeTodoData({dueDateTime: value});
          }}
          setMaxDate={() => {
            return new Date(String(eventEndDate));
          }}
          isMandatory
          value={todoData.dueDateTime}
          errorMsg={toDoErrorMsg?.dueDateTime}
          frontEndFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
          isfeildInactive={
            isEditable === true && todoStatus === 'Past' ? true : false
          }
          opacity={isEditable === true && todoStatus === 'Past' ? 0.4 : 1}
        />
      );
    }
  };

  return (
    <View>
      <FloatingDropdown
        floatingText={translations.SELECT_YOUR_TIMEZONE}
        isMandatory={true}
        value={todoData.timeZone?.text}
        onFieldFocus={() =>
          timeZoneCommingFrombackEnd
            ? {}
            : onChangeModalVar({
                timeZone: true,
              })
        }
        errorMsg={toDoErrorMsg?.timeZone}
        opacity={timeZoneCommingFrombackEnd ? 0.4 : 1}
      />
      <CustomBottomModal
        isModalVisible={modalVar.timeZone}
        setIsModalVisible={val =>
          onChangeModalVar({
            timeZone: val,
          })
        }
        data={dropDownData.timeZone === undefined ? [] : dropDownData.timeZone}
        preSelectedValue={todoData.timeZone?.id}
        parentCallback={selectedText => {
          onChangeTodoData({timeZone: selectedText});
        }}
        enableSearch={true}
        heading={translations.SELECT_YOUR_TIMEZONE}
        searchKey={'text'}
      />

      <FloatingDropdown
        floatingText={translations.TYPE_OF_TO_DO}
        isMandatory={true}
        value={todoData.typeOfTodo?.name}
        onFieldFocus={() =>
          isEditable === true
            ? {}
            : onChangeModalVar({
                typeOfTodo: true,
              })
        }
        errorMsg={toDoErrorMsg?.typeOfTodo}
        opacity={isEditable === true ? 0.4 : 1}
      />
      <CustomBottomModal
        isModalVisible={modalVar.typeOfTodo}
        setIsModalVisible={val =>
          onChangeModalVar({
            typeOfTodo: val,
          })
        }
        data={
          dropDownData.typeOfTodo === undefined ? [] : dropDownData.typeOfTodo
        }
        preSelectedValue={todoData.typeOfTodo?.id}
        parentCallback={selectedText => {
          onChangeTypeOfTodo(selectedText);
        }}
        heading={translations.SELECT_CATEGORY}
      />
      {todoData.typeOfTodo?.id === TODO_TYPE.WARDROBE && (
        <FloatingBigInput
          floatingText={translations.EG_SHOE_SIZE}
          value={todoData.egShoeSize}
          returnKeyType={'done'}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          setText={value =>
            onChangeTodoData({
              egShoeSize: dontAcceptEmoji(value),
            })
          }
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          maxLength={255}
          isMandatory={true}
          errorMsg={toDoErrorMsg?.egShoeSize}
        />
      )}

      <View style={{opacity: isEditable ? 0.5 : 1}}>
        {(todoData.typeOfTodo?.id === TODO_TYPE.REHERSALS ||
          todoData.typeOfTodo?.id === TODO_TYPE.SCHEDULE) && (
          <FloatingInput
            floatingText={translations.ENTER + translations.LOCATION}
            value={todoData.locationName}
            isMandatory
            errorMsg={toDoErrorMsg?.locationName}
            setText={(value: string) => {
              onChangeTodoData({locationName: removeEmojis(value)});
            }}
            isEditable={isEditable ? false : true}
            returnKeyType={'done'}
            maxLength={50}
            autoCapitalize={'none'}
          />
        )}
        {(todoData.typeOfTodo?.id === TODO_TYPE.OTHER ||
          todoData.typeOfTodo?.id === TODO_TYPE.REHERSALS ||
          todoData.typeOfTodo?.id === TODO_TYPE.SCHEDULE) && (
          <FloatingInput
            floatingText={translations.TITLE}
            isMandatory
            value={todoData.title}
            errorMsg={toDoErrorMsg?.title}
            setText={(value: string) => {
              onChangeTodoData({title: dontAcceptEmoji(value)});
            }}
            maxLength={255}
            returnKeyType={'done'}
            autoCapitalize={'none'}
            isEditable={isEditable ? false : true}
          />
        )}
        {todoData.typeOfTodo?.id === TODO_TYPE.OTHER && (
          <>
            <Text style={styles.subHeading}>
              {translations.SELECT_LOCATON}
              <Text style={styles.redStar}>*</Text>
            </Text>
            <DynamicradioButton
              data={location}
              selectedRadio={todoData.location}
              setSelectedRadio={val => {
                if (isEditable) {
                  // Do nothing or perform any desired action
                } else {
                  onChangeTodoData({location: val});
                }
              }}
              customStyles={styles.marginRight32}
              numColumns={3}
            />
            {todoData.location === translations.YES && (
              <FloatingInput
                floatingText={translations.LOCATION}
                value={todoData.locationName}
                isMandatory
                errorMsg={toDoErrorMsg?.locationName}
                setText={(value: string) => {
                  onChangeTodoData({locationName: dontAcceptEmoji(value)});
                }}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                isEditable={isEditable ? false : true}
              />
            )}
          </>
        )}
      </View>
      {dateTimeView()}
      {isEditable === true ? null : (
        <>
          <FloatingDropdown
            floatingText={translations.SELECT_AUDIENCE}
            isMandatory={true}
            value={todoData.category?.text}
            onFieldFocus={() =>
              onChangeModalVar({
                category: true,
              })
            }
            errorMsg={toDoErrorMsg?.category}
          />
          <CustomBottomModal
            isModalVisible={modalVar.category}
            setIsModalVisible={val =>
              onChangeModalVar({
                category: val,
              })
            }
            data={
              dropDownData.category === undefined ? [] : dropDownData.category
            }
            preSelectedValue={todoData.category?.id}
            parentCallback={selectedText => {
              onChangeTodoData({category: selectedText});
              onChangeCategory(selectedText);
            }}
            heading={translations.SELECT_AUDIENCE}
          />
        </>
      )}
      {selectAgeDivContestenOrGrpUI()}

      <FloatingBigInput
        floatingText={translations.DESCRIPTION}
        value={todoData.description}
        multiline={true}
        numberOfLines={5}
        textAlignVertical={'top'}
        setText={value =>
          onChangeTodoData({description: dontAcceptEmoji(value)})
        }
        forMultiline={true}
        autoCapitalize={'sentences'}
        showLength={false}
        isMandatory={true}
        maxLength={255}
        errorMsg={toDoErrorMsg?.description}
      />
      <FloatingInput
        floatingText={translations.ADD_LINK}
        value={todoData.addLink}
        errorMsg={toDoErrorMsg?.addLink}
        nextField={titleRef}
        setRef={ref => setAddLinkRef(ref)}
        setText={(value: string) => {
          onChangeTodoData({addLink: dontAcceptEmoji(value)});
        }}
        returnKeyType={'next'}
        autoCapitalize={'none'}
      />

      <FloatingInput
        floatingText={translations.TITLE_FOR_LINK}
        value={todoData.titleForLink}
        errorMsg={toDoErrorMsg?.titleForLink}
        setRef={ref => setTitleRef(ref)}
        setText={(value: string) => {
          onChangeTodoData({titleForLink: dontAcceptEmoji(value)});
        }}
        maxLength={50}
        returnKeyType={'done'}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default ToDoViews;
