import {View, ScrollView, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../../../common/header';
import {styles} from './styles';
import {SCREEN} from '../../../../../../../root/screenname';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {GET_TODO_UPLOADED_FILES} from '../../../../../../../services/endpoints';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import {checkIsConnected} from '../../../../../../utils/helperFunction';
import MyUploadListView from '../components/myuploadlistview';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/core';
import {TIME_FORMAT} from '../../../../../../utils/datetimemanger';
import { MethodTypes } from '../../../../../../../services/constants';
const MyUploads = props => {
  const setLoader = useSetLoader();
  const [listData, setListData] = useState([]);
  const isFocussed = useIsFocused();
  const {mutateAsync: getToDoUploadedFiles} = useCgMutation({
    key: GET_TODO_UPLOADED_FILES,
    url: GET_TODO_UPLOADED_FILES + `${props.route.params}`,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  useEffect(() => {
    getUploadedFiles();
  }, [isFocussed]);
  const getUploadedFiles = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await getToDoUploadedFiles();
      if (res.success) {
        setListData(res.data);
      } else {
        setLoader(false);
      }
    }
  };
  const getDate = val => {
    const myArray = val.split('T');

    return moment(myArray[0], TIME_FORMAT.YYYYMMDD).format(
      TIME_FORMAT.DDMMMYYYY,
    );
  };

  const checkInterNet = () => {
    return checkIsConnected();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={SCREEN.MY_UPLOADS} isUnderLineRequired />
      <ScrollView
        keyboardShouldPersistTaps={true}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        <View>
          <FlatList
            data={listData}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            key={'@'}
            renderItem={item => {
              return (
                <>
                  <MyUploadListView
                    label={item?.item?.todo_category?.name}
                    noOfDocuments={item?.item?.files_count}
                    info={getDate(item?.item?.last_updated)}
                    todoId={item?.item?.id}
                    eventId={props.route.params}
                    allowedSize={item?.item?.file_allowed_size}
                  />
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyUploads;
