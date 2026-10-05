import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import EditProfile from '../drawercontent/editprofile';
import ProfileImage from '../drawercontent/editprofile/profileImage';
import SubGallery from './contestantdashboard/gallery/subgallery';
import AddEventDetail from './contestantdashboard/editcontestantdetails/addeventdetail';
import ToDoScreen from './contestantdashboard/myjourney/todos';
import {SCREEN} from '../../../root/screenname';
import CreateContestentProfile from './createcontestentprofile';
import DashboardNavigation from '../drawercontent/navigation';
import ViewAllComponent from './contestantdashboard/profilesection/tabcontent/viewallsection';
import GridComponent from './contestantdashboard/profilesection/tabcontent/gridview';
import ChangePassword from '../drawercontent/changepassword';
import ResetPassword from '../../onboarding/welcome/login/forgotpassword/emailverification/resetpassword';
import EditContestantDetails from './contestantdashboard/editcontestantdetails';
import ChooseProfile from './chooseprofiletype';
import ConfirmationStep from './contestantdashboard/editcontestantdetails/confirmationstep';
import AlbumDetail from './contestantdashboard/gallery/subgallery/albumdetail';
import AddTags from './contestantdashboard/gallery/subgallery/albumdetail/tags/addtag';

import UploadPhoto from './contestantdashboard/gallery/subgallery/uploadphoto';
import AddPageant from './pageantdashboard/addpageant';
import PageantDetail from './pageantdashboard/pageantdetail';
import PageantCreationRequest from './createcontestentprofile/pageantcreationrequest';
import MyUploads from './contestantdashboard/myjourney/myuploads/todoslistView';
import Testimonials from './pageantdashboard/pageantdetail/testimoniallistcomp/testimoniallistView';
import UploadedFiles from './contestantdashboard/myjourney/myuploads';
import SelectableAlbum from './contestantdashboard/gallery/subgallery/selectalbum';
import AddpagentRules from './pageantdashboard/addpageant/addpagentrules';
import EditGroup from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/groups/editgroup';
import EventDetail from './pageantdashboard/pageantdetail/eventlist/eventdetail';
import AddPageantEvent from './pageantdashboard/pageantdetail/eventlist/eventdetail/addevent';
import EventAddEditResult from './pageantdashboard/pageantdetail/eventlist/eventdetail/resultaward/addresultnaward/addeditresult';
import EventAddEditAward from './pageantdashboard/pageantdetail/eventlist/eventdetail/resultaward/addresultnaward/addeditaward';
import EventAddConstestant from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/contestants/addcompetitor';
import EventEditConstestant from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/contestants/editcompetitor';
import AddJudges from './pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees/addjudges';
import EditJugesEmcees from './pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees/editjudgesemcees';
import AddNewGroup from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/groups/addnewgroup';
import AddContestants from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/groups/addcontestants';
import RemoveContestants from './pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/groups/removecontestants';
import AddNewJudge from './pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees/addnewjudge';
import AddNewjudgeEmcee from './pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees/addnewJudgeemcee';
import RemoveJudgesEmcees from './pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees/removejudgesemcees';
import PcaForm from './pageantdashboard/pageantdetail/peoplechoiceawards/pcaform';
import CreateOrEditPrize from './pageantdashboard/pageantdetail/peoplechoiceawards/pcaandprize/eventprizes/createoreditprize';
import Directory from '../directory';
import AddEditTodo from './pageantdashboard/pageantdetail/eventlist/eventdetail/todos/contestanttodos/addedittodo';
import ContestantSubmission from './pageantdashboard/pageantdetail/eventlist/eventdetail/todos/contestanttodos/contestantsubmission';
import CompletedPending from './pageantdashboard/pageantdetail/eventlist/eventdetail/todos/contestanttodos/contestantsubmission/completedpending';
import PublicProfile from '../directory/publicprofile/expertcontestant';
import ClaimProfile from '../directory/publicprofile/expertcontestant/claimprofile';
import WriteAReview from '../directory/publicprofile/expertcontestant/expertprofile/writeareview';
import ExpertPublicProfilePageantWorkWith from '../directory/publicprofile/expertcontestant/expertprofile/pageantworkwith';
import ViewAllExpertExtraImages from '../directory/publicprofile/expertcontestant/expertprofile/viewallextraimages';
import ExpertPublicProfileContestantWorkWith from '../directory/publicprofile/expertcontestant/expertprofile/contestantworkwith';
import ExpertPublicProfilePageantWorkWithSubGallery from '../directory/publicprofile/expertcontestant/expertprofile/pageantworkwith/albumimages';
import ExpertPublicProfileContestWorkWithSubGallery from '../directory/publicprofile/expertcontestant/expertprofile/contestantworkwith/albumimages';
import PageantPublicProfile from '../directory/publicprofile/pageant';
import PublicProfileGallery from '../directory/publicprofile/expertcontestant/contestantprofile/gallery';
import PublicProfileSubGallery from '../directory/publicprofile/expertcontestant/contestantprofile/gallery/subgallery';
import EventPublicProfile from '../directory/publicprofile/pageant/eventpublicprofile';
import PageantPublicProfileEvents from '../directory/publicprofile/pageant/pageantEvents';
import PageantPublicProfileRules from '../directory/publicprofile/pageant/rules';
import PageantPublicProfileStaff from '../directory/publicprofile/pageant/staff';
import FunFact from './createcontestentprofile/funfact';
import EventPublicProfileContestants from '../directory/publicprofile/pageant/eventpublicprofile/contestants';
import EventPublicProfileResults from '../directory/publicprofile/pageant/eventpublicprofile/results';
import PagentEventPublicProfileGallery from '../directory/publicprofile/pageant/gallery';
import PageantEventPublicProfileContestantVote from '../directory/publicprofile/pageant/eventpublicprofile/contestants/contestantvote';
import PageantPublicProfileCrownConvo from '../directory/publicprofile/pageant/crownconvo';
import EventPublicProfileJudgeEmcees from '../directory/publicprofile/pageant/eventpublicprofile/judgeemcees';
import LikeListing from '../convo/likelisting';
import EventPublicProfileSponsors from '../directory/publicprofile/pageant/eventpublicprofile/sponsors';
import ReportPost from '../convo/reportpost';
import Comment from '../convo/comment';
import AddCrownConvo from '../convo/addcrownconvo';
import AddPageantTag from '../convo/addcrownconvo/components/addpageanttag';
import PageantEventPublicProfileSubGallery from '../directory/publicprofile/pageant/gallery/subgallery';
import SellItemServices from '../sellitemservices';
import Sell from '../sellitemservices/sell';
import SellPriview from '../sellitemservices/sell/preview';
import SellTwoStep from '../sellitemservices/sell/digitalprint';
import WebPage from '../../onboarding/welcome/signup/webpage';
import ProductDetail from '../shop/productdetail';
import SearchSreen from '../shop/searchscreen';
import FilterProduct from '../shop/filterproduct';
import SoldAndExportBy from '../shop/productdetail/soldandshiped';
import InquiryForm from '../shop/productdetail/soldandshiped/inquiryform';
import SellerProductsList from '../shop/searchscreen/components/sellerproductslist';
import ShoppingBag from '../shop/shoppingbag';
import ChangeAddress from '../shop/shoppingbag/components/address/changeaddress';
import AddEditAddress from '../shop/shoppingbag/addeditaddress';
import BuyVotes from '../directory/publicprofile/pageant/eventpublicprofile/contestants/contestantvote/buyvotes';
import SupportContestant from '../shop/shoppingbag/components/payment/supportcontestant';
import PaymentConfirmation from '../shop/shoppingbag/components/payment/orderconfirmedmodal';
import useCgMutation from '../../../services/api/useCgMutation';
import {GET_CART_COUNT} from '../../../services/endpoints';
import {MethodTypes} from '../../../services/constants';
import {checkIsConnected} from '../../utils/helperFunction';
import MyOrders from '../drawercontent/myorders';
import ReceivedOrders from '../drawercontent/receivedorders';
import OrderDetails from '../drawercontent/myorders/orderdetails';
import Favourites from '../shop/shoppingbag/favourites';
import ShippingReturnDetails from '../drawercontent/myorders/shippingreturndetails';
import AddEditBankDetails from '../drawercontent/addeditbankdetails';
import BankDetails from '../drawercontent/bankdetails';
import ManageAddresses from '../drawercontent/account/manageaddresses';
import Contestantdetail from './pageantdashboard/pageantdetail/contestantdetail';
import ContactList from './pageantdashboard/pageantdetail/contactlist';
import Shop from '../shop';
import LeadDetails from './pageantdashboard/pageantdetail/leaddetails';
import Message from '../message';
import NotificationCenter from '../notification';
import ManageNotification from '../drawercontent/managenotification';
import ChatScreen from '../message/chatscreen';
import Compose from '../message/compose';
import {User} from '../../../services/models/user/user';
import {Base} from '../../../services/models/base';
import Dashboard from '.';
import PurchasePlan from './pageantdashboard/pageantdetail/leaddetails/components';
import ReferralLeaderboard from '../drawercontent/referralleaderboard';
import ReferralLeaderboardList from '../drawercontent/referralleaderboard/components';
import CreateExpertAlbum from './expertdashboard/mywork/createalbum';
import CreateExpertForm from './expertdashboard/createexpertform';
import SelectCountries from './expertdashboard/createexpertform/selectcountries';
import SelectStates from './expertdashboard/createexpertform/selectstates';
import ExpertRoles from './expertdashboard/expertroles';
import BlockedUsers from '../drawercontent/blockedusers';
import ViewExpertAlbum from './expertdashboard/mywork/viewexpertalbum';
import {RootContext} from '../../../store/rootStore';
import CreateProfileNavigator from './profilenavigator';

const Stack = createStackNavigator();

const EditProfileNavigation = () => {
  const {setCounter} = useContext(RootContext);
  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    disableLoader: true,
    offSuccessToast: true,
  });

  const getCartCountApi = async () => {
    if (checkIsConnected()) {
      const productAllDetail = await viewProducts();
      //getting complete detail now
      if (productAllDetail?.success && productAllDetail?.data !== undefined) {
        setCounter(productAllDetail?.data);
      }
    }
  };
  return (
    <Stack.Navigator
      initialRouteName={SCREEN.DASHBOARD_NAVIGATION}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen
        name={SCREEN.CONTESTANT_DASHBOARD}
        component={Dashboard}
        headerShown={false}
      />
      <Stack.Screen
        name={SCREEN.ADD_EDIT_BANK_DETAILS}
        component={AddEditBankDetails}
      />
      <Stack.Screen name={SCREEN.COMPOSE} component={Compose} />
      <Stack.Screen
        name={SCREEN.CREATE_EXPERT_PROFILE}
        component={CreateExpertForm}
      />
      <Stack.Screen
        name={SCREEN.CHOOSE_EXPERT_PROFILE}
        component={ExpertRoles}
      />
      <Stack.Screen
        name={SCREEN.SELECT_COUNTRIES}
        component={SelectCountries}
      />

      <Stack.Screen name={SCREEN.SELECT_STATES} component={SelectStates} />

      <Stack.Screen
        name={SCREEN.MANAGE_NOTIFICATION}
        component={ManageNotification}
      />
      <Stack.Screen
        name={SCREEN.SHIPPING_RETURN_DETAILS}
        component={ShippingReturnDetails}
      />
      <Stack.Screen
        name={SCREEN.CONTESTANT_DETAILS}
        component={Contestantdetail}
      />
      <Stack.Screen name={SCREEN.CONTACT_LIST} component={ContactList} />
      <Stack.Screen name={SCREEN.SHOP} component={Shop} />
      <Stack.Screen name={SCREEN.LEAD_DETAILS} component={LeadDetails} />
      <Stack.Screen
        name={SCREEN.CONTESTANT_LEADERBOARD_LIST}
        component={ReferralLeaderboardList}
      />
      <Stack.Screen name={SCREEN.BANK_DETAILS} component={BankDetails} />
      <Stack.Screen name={SCREEN.ORDER_DETAILS} component={OrderDetails} />
      <Stack.Screen name={SCREEN.PURCHASE_PLAN} component={PurchasePlan} />
      <Stack.Screen name={SCREEN.BUY_VOTES} component={BuyVotes} />
      <Stack.Screen name={SCREEN.ADD_EDIT_ADDRESS} component={AddEditAddress} />
      <Stack.Screen
        name={SCREEN.SHOPPING_BAG}
        component={ShoppingBag}
        initialParams={{getCartCountApi: getCartCountApi}}
      />
      <Stack.Screen name={SCREEN.INQUIRY_FORM} component={InquiryForm} />
      <Stack.Screen
        name={SCREEN.SOLD_AND_SHIPPED_BY}
        component={SoldAndExportBy}
      />
      <Stack.Screen name={SCREEN.CONVO_COMMENTS} component={Comment} />
      <Stack.Screen name={SCREEN.REPORT_POST} component={ReportPost} />
      <Stack.Screen name={SCREEN.LIKE_LISTING} component={LikeListing} />
      <Stack.Screen name={SCREEN.WRITE_A_REVIEW} component={WriteAReview} />
      <Stack.Screen name={SCREEN.ADD_EDIT_TODO} component={AddEditTodo} />
      <Stack.Screen name={SCREEN.PCA_FORM} component={PcaForm} />
      <Stack.Screen
        name={SCREEN.ADD_PAGENT_EVENT}
        component={AddPageantEvent}
      />
      <Stack.Screen
        name={SCREEN.ADD_NEW_JUDGE_EMCEE}
        component={AddNewjudgeEmcee}
      />
      <Stack.Screen name={SCREEN.ADD_JUDGES} component={AddJudges} />
      <Stack.Screen name={SCREEN.ADD_CONTESTANTS} component={AddContestants} />
      <Stack.Screen name={SCREEN.ADD_NEW_JUDGE} component={AddNewJudge} />
      <Stack.Screen
        name={SCREEN.REMOVE_JUDGES_EMCEES}
        component={RemoveJudgesEmcees}
      />
      <Stack.Screen
        name={SCREEN.EDIT_JUDGES_EMCEES}
        component={EditJugesEmcees}
      />
      <Stack.Screen name={SCREEN.EDIT_GROUP} component={EditGroup} />
      <Stack.Screen name={SCREEN.ADD_PAGENT_RULES} component={AddpagentRules} />
      <Stack.Screen name={SCREEN.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={SCREEN.PROFLIE_IMAGE} component={ProfileImage} />
      <Stack.Screen
        name={SCREEN.CREATE_CONTESTENT_PROFILE}
        component={CreateContestentProfile}
      />
      <Stack.Screen name={SCREEN.ADD_PAGEANT} component={AddPageant} />
      <Stack.Screen
        name={SCREEN.PAGEANT_CREATION_REQUEST}
        component={PageantCreationRequest}
      />
      <Stack.Screen
        name={SCREEN.DASHBOARD_NAVIGATION}
        component={DashboardNavigation}
      />
      <Stack.Screen
        name={SCREEN.CHOOSE_PROFILE_WITH_BACK}
        component={ChooseProfile}
      />
      <Stack.Screen name={SCREEN.SUB_GALLERY} component={SubGallery} />
      <Stack.Screen name={SCREEN.EVENT_SUB_GALLERY} component={SubGallery} />
      <Stack.Screen name={SCREEN.ADD_EVENT_DETAIL} component={AddEventDetail} />
      <Stack.Screen name={SCREEN.TODO} component={ToDoScreen} />
      <Stack.Screen name={SCREEN.MY_UPLOADS} component={MyUploads} />
      <Stack.Screen
        name={SCREEN.DASHBOARD}
        component={CreateProfileNavigator}
      />
      <Stack.Screen
        name={SCREEN.PRODUCT_DETAIL}
        component={ProductDetail}
        initialParams={{getCartCountApi: getCartCountApi}}
      />
      <Stack.Screen name={SCREEN.TESTIMONIALS} component={Testimonials} />
      <Stack.Screen name={SCREEN.UPLOADED_FILES} component={UploadedFiles} />
      <Stack.Screen name={SCREEN.VIEW_ALL} component={ViewAllComponent} />
      <Stack.Screen name={SCREEN.GRID_VIEWALL} component={GridComponent} />
      <Stack.Screen name={SCREEN.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={SCREEN.PASSWORD_RESET} component={ResetPassword} />
      <Stack.Screen
        name={SCREEN.EDIT_CONTESTANT_DETAILS}
        component={EditContestantDetails}
      />
      <Stack.Screen
        name={SCREEN.CONFIRMATION_STEP}
        component={ConfirmationStep}
      />
      <Stack.Screen name={SCREEN.FUN_FACTS} component={FunFact} />
      <Stack.Screen
        name={SCREEN.ALBUM_DETAIL}
        component={AlbumDetail}
        getId={({params}) => params?.displayKey + ''}
      />
      <Stack.Screen name={SCREEN.EVENT_ALBUM_DETAIL} component={AlbumDetail} />
      <Stack.Screen
        name={SCREEN.ADD_TAG}
        component={AddTags}
        getId={({params}) => params?.tag + ''}
      />

      <Stack.Screen
        name={SCREEN.UPLOAD_PHOTOH_IN_ALBUM}
        component={UploadPhoto}
      />
      <Stack.Screen
        name={SCREEN.SELECTABLE_ALBUM}
        component={SelectableAlbum}
      />
      <Stack.Screen name={SCREEN.ADD_GROUP} component={AddNewGroup} />
      <Stack.Screen name={SCREEN.PAGEANT_DETAIL} component={PageantDetail} />
      <Stack.Screen
        name={SCREEN.EVENT_ADD_EDIT_RESULT}
        component={EventAddEditResult}
      />
      <Stack.Screen
        name={SCREEN.EVENT_ADD_EDIT_AWARD}
        component={EventAddEditAward}
      />
      <Stack.Screen
        name={SCREEN.EVENT_ADD_CONSTESTANT}
        component={EventAddConstestant}
      />
      <Stack.Screen
        name={SCREEN.EVENT_EDIT_CONSTESTANT}
        component={EventEditConstestant}
      />
      <Stack.Screen
        name={SCREEN.REMOVE_CONTESTANT}
        component={RemoveContestants}
      />
      <Stack.Screen name={SCREEN.EVENT_DETAIL} component={EventDetail} />
      <Stack.Screen
        name={SCREEN.CREATE_A_PRIZE}
        component={CreateOrEditPrize}
      />
      <Stack.Screen name={SCREEN.DIRECTORY} component={Directory} />
      <Stack.Screen
        name={SCREEN.CONTESTANT_SUBMISSIONS}
        component={ContestantSubmission}
      />
      <Stack.Screen
        name={SCREEN.COMPLETED_PENDING}
        component={CompletedPending}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE}
        component={PublicProfile}
        getId={({params}) => params?.key + ''}
      />
      <Stack.Screen name={SCREEN.CLAIM_PROFILE} component={ClaimProfile} />
      <Stack.Screen
        name={SCREEN.PUBLIC_PROFILE_GALLERY}
        component={PublicProfileGallery}
      />
      <Stack.Screen
        name={SCREEN.PUBLIC_PROFILE_SUB_GALLERY}
        component={PublicProfileSubGallery}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_PEGEANT_WORK_WITH}
        component={ExpertPublicProfilePageantWorkWith}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_PUBLIC_PROFILE_EXTRA_IMAGES}
        component={ViewAllExpertExtraImages}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH}
        component={ExpertPublicProfileContestantWorkWith}
        getId={({params}) => params?.tag + ''}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_ALBUM}
        component={ViewExpertAlbum}
        getId={({params}) => params?.tag + ''}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_PEGEANT_WORK_WITH_ALBUM_IMAGES}
        component={ExpertPublicProfilePageantWorkWithSubGallery}
      />
      <Stack.Screen
        name={SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES}
        component={ExpertPublicProfileContestWorkWithSubGallery}
        getId={({params}) => params?.tag + ''}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE}
        component={PageantPublicProfile}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE}
        component={EventPublicProfile}
        getId={({params}) => {
          const slug = params?.slugId;
          if (slug != null && String(slug).trim() !== '') {
            return `slug:${String(slug).trim()}`;
          }
          return `id:${params?.eventId ?? ''}`;
        }}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENTS}
        component={PageantPublicProfileEvents}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_RULES}
        component={PageantPublicProfileRules}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_STAFF}
        component={PageantPublicProfileStaff}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT}
        component={EventPublicProfileContestants}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_RESULT}
        component={EventPublicProfileResults}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_GALLERY}
        component={PagentEventPublicProfileGallery}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_SUB_GALLERY}
        component={PageantEventPublicProfileSubGallery}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE}
        component={PageantEventPublicProfileContestantVote}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO}
        component={PageantPublicProfileCrownConvo}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_JUDGE_EMCEES}
        component={EventPublicProfileJudgeEmcees}
      />
      <Stack.Screen
        name={SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_SPONSORS}
        component={EventPublicProfileSponsors}
      />
      <Stack.Screen name={SCREEN.ADD_CROWN_CONVO} component={AddCrownConvo} />
      <Stack.Screen name={SCREEN.ADD_PAGEANT_TAG} component={AddPageantTag} />
      <Stack.Screen
        name={SCREEN.SELL_ITEM_SERVICES}
        component={SellItemServices}
      />
      <Stack.Screen name={SCREEN.FAVOURITES} component={Favourites} />
      <Stack.Screen name={SCREEN.SELL_TWO_STEP} component={SellTwoStep} />
      <Stack.Screen name={SCREEN.SELL} component={Sell} />
      <Stack.Screen name={SCREEN.SELL_PRIVIEW} component={SellPriview} />
      <Stack.Screen name={SCREEN.STATIC_PAGE} component={WebPage} />
      <Stack.Screen name={SCREEN.SEARCH_SCREEN} component={SearchSreen} />
      <Stack.Screen
        name={SCREEN.FILTER_PRODUCT}
        component={FilterProduct}
        getId={({params}) => params?.displayKey + ''}
      />
      <Stack.Screen
        name={SCREEN.SELLER_PRODUCTS}
        component={SellerProductsList}
      />
      <Stack.Screen name={SCREEN.CHANGE_ADDRESS} component={ChangeAddress} />
      <Stack.Screen
        name={SCREEN.SUPPORT_CONTESTANT}
        component={SupportContestant}
      />
      <Stack.Screen
        name={SCREEN.PAYMENT_ORDER_CONFIRMATION}
        component={PaymentConfirmation}
      />
      <Stack.Screen name={SCREEN.MY_ORDERS} component={MyOrders} />
      <Stack.Screen name={SCREEN.RECEIVED_ORDERS} component={ReceivedOrders} />
      <Stack.Screen
        name={SCREEN.REFERRAL_LEADERABOARD}
        component={ReferralLeaderboard}
      />
      <Stack.Screen
        name={SCREEN.MANAGE_ADDRESSES}
        component={ManageAddresses}
      />
      <Stack.Screen name={SCREEN.CHAT_SCREEN} component={ChatScreen} />
      <Stack.Screen name={SCREEN.MESSAGE} component={Message} />
      <Stack.Screen name={SCREEN.NOTIFICATION} component={NotificationCenter} />
      <Stack.Screen name={SCREEN.BLOCKED_USERS} component={BlockedUsers} />
      <Stack.Screen
        name={SCREEN.CREATE_EXPERT_ALBUM}
        component={CreateExpertAlbum}
      />
    </Stack.Navigator>
  );
};

export default EditProfileNavigation;
