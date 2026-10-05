#import "PaymentModule.h"
#import <React/RCTLog.h>
#import "GlobalVariables.h"
#import "BrainTreePaymentManager.h"

@implementation PaymentModule

RCT_EXPORT_MODULE(PaymentModule);

RCT_EXPORT_METHOD(initBrainTree:(NSString *)token )
{
  brainTreeToken=token;
}


RCT_EXPORT_METHOD(getCardNonce:(RCTResponseSenderBlock)success failureCallback:(RCTResponseSenderBlock)failure) 
{
  paymentSuccessCallback=success;
  paymentFailureCallback=failure;
//  [[BrainTreeManager shared] showDropInWithToken:brainTreeToken];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [BrainTreePaymentManager shared].objcInstance = self;
    [[BrainTreePaymentManager shared] showDropInWithToken:brainTreeToken];
   });
  
}

- (void)invokeSuccessCallbackWithData:(NSString *)data {
 if (paymentSuccessCallback != nil) {
   paymentSuccessCallback(@[data]);
   paymentSuccessCallback = nil;
  }
}

- (void)invokeFailureCallbackWithData:(NSString *)data {
 if (paymentFailureCallback != nil) {
   paymentFailureCallback(@[data]);
   paymentFailureCallback = nil;
  }
}

@end
