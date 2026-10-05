// Import required modules and components from React and React Native libraries
// Import necessary styles, translations, and images
// Import hooks and utilities from custom files
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {useSetLoader} from '../../../../../../store/useAppStore';
import FastImageView from '../../../../../common/fastimageview';
import {moderateScale} from '../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import FloatingDropdown from '../../../../../common/floatingdropown';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {YearName} from '../../../../../../services/models/pageantdetails/yearName';
import {GET_EVENT_LIST_BY_NAME_AND_YEAR} from '../../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../../services/constants';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import FloatingInput from '../../../../../common/floatinginput';
import {checkIsConnected} from '../../../../../utils/helperFunction';

// Define the Props interface for the TagPageant component
interface Props {
  // Years list to be displayed in the year dropdown
  yearsList?: YearName[];
  // Selected pageant ID
  pageantId: string;
  // Selected pageant name
  pageantName: string;
  // Callback function to update the selected pageant ID
  setPageantId?: any;
  // Selected year ID
  yearId: string;
  // Callback function to update the selected year ID
  setYearId: any;
  // Selected event ID
  eventId: string;
  // Callback function to update the selected event ID
  setEventId: any;
  // Error message for the selected year
  yearErr: string;
  // Callback function to update the error message for the selected year
  setYearErr: any;
  // Error message for the selected event
  eventErr: string;
  // Callback function to update the error message for the selected event
  setEventErr: any;
  // Selected event title
  event: string;
  // Callback function to update the selected event title
  setEvent: any;
  // Type of the form (e.g., 'EDIT' or 'CREATE')
  type: string;
  // Details of the form
  formDetails: Object;
  // Flag to indicate whether to show the pageant section
  showPageantSection: boolean;
}

// Define the TagPageant functional component
const TagPageant = ({
  yearsList,
  pageantId,
  setPageantId,
  yearId,
  setYearId,
  eventId,
  setEventId,
  yearErr,
  setYearErr,
  eventErr,
  setEventErr,
  event,
  setEvent,
  type,
  formDetails,
  showPageantSection,
  pageantName,
}: Props) => {
  // State variables to store the selected pageant details
  const [pageantValue, setPageantValue] = useState('');
  const [pageantImage, setPageantImage] = useState('');
  // State variable to store the selected year
  const [year, setYear] = useState('');
  // State variables to control the visibility of the year and event dropdowns
  const [yearDropDownVisible, setYearDropDownVisible] = useState(false);
  const [eventDropDownVisible, setEventDropDownVisible] = useState(false);
  // State variable to track whether there are events available for the selected pageant and year
  const [eventStatus, setEventStatus] = useState(false);
  // State variable to store the list of events for the selected pageant and year
  const [eventList, setEventList] = useState();
  // State variable to control the visibility of the event dropdown
  const [showEvent, setShowEvent] = useState(false);
  // Function to set the loader state using custom hook
  const setLoader = useSetLoader();
  // React Navigation hook to access the navigation object
  const navigation = useNavigation();

  // Custom mutation hook to get the list of events by pageant and year
  const {mutateAsync: getEventList} = useCgMutation({
    key: GET_EVENT_LIST_BY_NAME_AND_YEAR + pageantId + yearId,
    method: MethodTypes.GET,
    url:
      GET_EVENT_LIST_BY_NAME_AND_YEAR +
      Param.PAGAENT_ID +
      pageantId +
      Param.YEAR_ID +
      yearId,
    offSuccessToast: true,
  });

  // useEffect hook to pre-fill the pageant details when editing and show the event dropdown
  useEffect(() => {
    // Check if the type is 'EDIT' and the pageant section should be shown
    if (type === translations.EDIT && showPageantSection) {
      // Pre-fill the pageant details with the formDetails data
      onSelectingPageant(
        formDetails?.master_pageant_title,
        formDetails?.master_pageant_id,
        formDetails?.master_pageant_image_full_url,
      );
      // Set the selected year and show the event dropdown
      setYear(formDetails?.post_event?.year_name?.name);
      setShowEvent(true);
    }
  }, [formDetails, showPageantSection]);

  // useEffect hook to update the pageant value when the pageant name changes
  useEffect(() => {
    if (pageantName !== undefined) {
      setPageantValue(pageantName);
    }
  }, [pageantName]);

  // Function to handle selecting a pageant
  const onSelectingPageant = (title, id, image) => {
    setPageantValue(title);
    if (setPageantId !== undefined) {
      setPageantId(id);
    }
    setPageantImage(image);
  };

  // Function to handle selecting a year from the year dropdown
  const setYearDetails = (details: YearName) => {
    // Reset event details when selecting a year
    setEvent('');
    setEventId('');
    setEventStatus(false);
    setEventErr('');
    setYearErr('');
    setYear(details?.name);
    setYearId(details?.id);
    // Show the event dropdown if both the year and pageant value are selected
    if (details?.name !== '' && pageantValue !== '') {
      setShowEvent(true);
    } else {
      setShowEvent(false);
    }
  };

  // Function to handle selecting an event from the event dropdown
  const setEventDetails = details => {
    setEventId(details?.id);
    setEvent(details?.title);
    setEventErr('');
  };

  // Function to check if the device is connected to the internet
  const checkInterNet = () => {
    return checkIsConnected();
  };

  // Function to get the list of events by pageant and year
  const getEventListByName = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await getEventList();
      if (res.success) {
        // Delay showing the event dropdown for a better user experience
        setTimeout(() => {
          setEventList(res?.data?.events);
          if (event !== '') {
            setEventDropDownVisible(true);
          }
          setEventErr('');
        }, 300);
        if (res?.data?.events?.length > 1) {
          setTimeout(() => {
            setEventDropDownVisible(true);
          }, 500);
        }
        if (res?.data?.events?.length === 1) {
          setEvent(res?.data?.events[0]?.title);
          setEventId(res?.data?.events[0]?.id);
        }
        if (res?.data?.events?.length === 0) {
          setEventStatus(true);
          setEvent(pageantValue + ' ' + year);
        }
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  // Function to handle pressing the event dropdown
  const onPressEventDropdown = () => {
    if (year === '') {
      setYearErr(translations.THIS_FIELD_REQUIRED);
    } else {
      setYearErr('');
      getEventListByName();
    }
  };

  // Function to hide the pageant details
  const hidePageantView = () => {
    setPageantValue('');
    setPageantId('');
    setPageantImage('');
    setYear('');
    setYearId('');
    setEvent('');
    setEventId('');
    setEventList({});
    setEventStatus(false);
    setShowEvent(false);
    setYearErr('');
    setEventErr('');
  };

  // Render the component
  return (
    <View>
      {/* Check if a pageant is selected */}
      {pageantValue != '' ? (
        // If a pageant is selected, display the header and the selected pageant details
        <View style={{...styles.tagHeader, opacity: 1}}>
          {setPageantId !== undefined && (
            <>
              <Text style={styles.tagHeaderLabel}>
                {translations.TAG_A_PAGEANT}
              </Text>
              <View style={styles.selectedPageantView}>
                <View style={{marginLeft: -1.5, marginTop: 1.5}}>
                  {/* Display the pageant image using FastImageView */}
                  <FastImageView
                    imageUrl={pageantImage}
                    width={moderateScale(34)}
                    height={moderateScale(34)}
                    borderRadius={moderateScale(34)}
                    isCircle
                  />
                </View>
                {/* Display the selected pageant name */}
                <Text style={styles.pageantLabel} numberOfLines={1}>
                  {pageantValue}
                </Text>
                {/* Add a cross button to hide the pageant details */}
                <TouchableOpacity
                  onPress={() => hidePageantView()}
                  style={styles.pageantCrossButton}>
                  <AppImages.CreateContestentProfile.tpp_cross_small_icon />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Dropdown for selecting the year */}
          <FloatingDropdown
            floatingText={translations.SELECT_YEAR}
            value={String(year)}
            dropdown={true}
            isMandatory={true}
            setText={value => setYear(value)}
            errorMsg={yearErr}
            onPressDropdown={() => {
              setYearDropDownVisible(true);
            }}
            onFieldFocus={() => {
              setYearDropDownVisible(true);
            }}
          />

          {/* Display event dropdown only if there are events available */}
          {!eventStatus && showEvent ? (
            <FloatingDropdown
              floatingText={translations.EVENT}
              value={event}
              dropdown={true}
              isMandatory={true}
              setText={value => setEvent(value)}
              errorMsg={eventErr}
              onPressDropdown={() => {
                setEventDropDownVisible(true);
              }}
              onFieldFocus={() => {
                onPressEventDropdown();
              }}
            />
          ) : !showEvent ? null : (
            // If there are no events available, display a non-editable input with the event details
            <FloatingInput
              floatingText={translations.EVENT}
              setText={value => setEvent(value)}
              value={pageantValue + ' ' + year}
              returnKeyType={'done'}
              isEditable={false}
            />
          )}
        </View>
      ) : (
        // If no pageant is selected, display a button to tag a pageant
        <TouchableOpacity
          style={styles.tagPageantSection}
          onPress={() =>
            navigation.navigate(SCREEN.ADD_PAGEANT_TAG, {
              onClick: onSelectingPageant,
            })
          }>
          {setPageantId !== undefined && (
            <>
              {/* Display an image and text for tagging a pageant */}
              <AppImages.CONVO.TagPageant />
              <Text style={styles.tagPageantText}>
                {translations.TAG_A_PAGEANT}
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Dropdown for selecting the year */}
      {yearDropDownVisible ? (
        <CustomBottomModal
          isModalVisible={yearDropDownVisible}
          setIsModalVisible={setYearDropDownVisible}
          data={yearsList}
          parentCallback={selectedText => setYearDetails(selectedText)}
          heading={translations.SELECT_YEAR}
          preSelectedValue={yearId}
          customStyles={{height: '90%'}}
          enableSearch={true}
        />
      ) : null}

      {/* Dropdown for selecting the event */}
      {eventDropDownVisible ? (
        <CustomBottomModal
          isModalVisible={eventDropDownVisible}
          setIsModalVisible={setEventDropDownVisible}
          data={eventList}
          parentCallback={selectedText => setEventDetails(selectedText)}
          heading={translations.EVENT}
          preSelectedValue={eventId}
        />
      ) : null}
    </View>
  );
};

// Export the TagPageant component as the default export
export default TagPageant;
