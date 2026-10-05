#import "BrainTreePaymentManager.h"
#import "UIViewController+TopViewController.h"
#import <BraintreeDropIn/BraintreeDropIn.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@implementation BrainTreePaymentManager : NSObject

+ (instancetype)shared {
  static BrainTreePaymentManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[BrainTreePaymentManager alloc] init];
    // sharedInstance.objcInstance = [[PaymentModule alloc] init];
  });
  return sharedInstance;
}

- (void)showDropInWithToken:(NSString *)token {
  BTDropInRequest *request = [[BTDropInRequest alloc] init];
  request.paypalDisabled = YES;

  BTDropInController *dropIn = [[BTDropInController alloc]
      initWithAuthorization:token
                    request:request
                    handler:^(BTDropInController *_Nonnull controller,
                              BTDropInResult *_Nullable result,
                              NSError *_Nullable error) {
                      if (error) {
                        [self.objcInstance
                            invokeFailureCallbackWithData:
                                error.localizedDescription ?: @""];

                        NSLog(@"ERROR");
                      } else if (result.isCanceled) {
                        [self.objcInstance invokeFailureCallbackWithData:@"USER_CANCELLED"];
                        NSLog(@"CANCELED");
                      } else if (result) {
                        BTPaymentMethodNonce *paymentMethod =
                            result.paymentMethod;
                        if (paymentMethod) {
                          NSString *nonce = paymentMethod.nonce;
                          NSLog(@"Received nonce: %@", nonce);
                          [self.objcInstance
                              invokeSuccessCallbackWithData:nonce];
                        }
                      }
                      [controller dismissViewControllerAnimated:YES
                                                     completion:nil];
                    }];
  UIViewController *topVC = [UIViewController topViewController];

  if (topVC) {
    [topVC presentViewController:dropIn animated:YES completion:nil];
  }
}

+ (NSString *)moduleName {
  return @"";
}

@end
