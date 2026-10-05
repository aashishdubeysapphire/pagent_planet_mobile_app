import {ScrollView, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../../../common/header';
import {styles} from './styles';
import {SCREEN} from '../../../../../../../root/screenname';
import NetInfo from '@react-native-community/netinfo';
import TestimonialListComp from '..';

const Testimonial = props => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        displayTestimonialDetail(props.route.params);
      }
    });
  }, []);
  const displayTestimonialDetail = testimonialDetails => {
    setListData(testimonialDetails);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={SCREEN.TESTIMONIALS} isUnderLineRequired />
      <ScrollView style={styles.listView} showsVerticalScrollIndicator={false}>
        <FlatList
          data={listData}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          key={'@'}
          renderItem={item => {
            return (
              <>
                <TestimonialListComp
                  label={item?.item?.commenter}
                  designation={item?.item?.commenter_position}
                  info={item?.item?.comment}
                />
              </>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Testimonial;
