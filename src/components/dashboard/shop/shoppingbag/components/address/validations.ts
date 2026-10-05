import translations from '../../../../../../assets/translations';
import { BillingAddress } from '../../../../../../services/models/shop/addressList';

 export const isValid = (
    billingAddress:BillingAddress, 
    shippingAddress: BillingAddress, 
    orderNote:string,
    setBillingError: Function,
    setShippingError : Function,
    setWearDateError:Function
  ) => {

  const isValidAddress=(address : BillingAddress, setError: Function)=>{
    if(Object.values(address)[0] === undefined){
      setError(translations.PLEASE_ADD_ADDRESS_TO_PROCEED)
      return false
    }else{
      return true
    }
  }

  const isValidOrderNote=()=>{
    if(orderNote?.trim()?.length === 1){
      setWearDateError(translations.ENTER_ATLEAST_TWO_CHARS)
      return false
    }else{
      return true
    }
  }
  
  const isAddressValid = () => {
    isValidAddress(billingAddress, setBillingError);
    isValidAddress(shippingAddress, setShippingError);
    isValidOrderNote();

    return (
      isValidAddress(billingAddress, setBillingError) &&
      isValidAddress(shippingAddress, setShippingError) &&
      isValidOrderNote()
    );
  };

  return isAddressValid();
};
