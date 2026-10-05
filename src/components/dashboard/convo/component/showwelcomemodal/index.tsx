import React, {useEffect, useState} from 'react';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import WelcomeModal from '../../../dashboard/chooseprofiletype/welcomemodal';

interface Props {
  showModal: boolean;
}

const ShowWelcomeModal = ({showModal}: Props) => {
  const [isModalVisible, setisModalVisible] = useState(showModal);

  useEffect(() => {}, []);

  return (
    <WelcomeModal
      label={translations.CONGRATULATION}
      bodyText={translations.COMPLETING_FIRST_STEP}
      icon={<AppImages.Dashboard.Congratulation_ICON />}
      isModalVisible={isModalVisible}
      buttonText={translations.LETS_GET_STARTED}
      closeModal={setisModalVisible}
    />
  );
};

export default ShowWelcomeModal;
