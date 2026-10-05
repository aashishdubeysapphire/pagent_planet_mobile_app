
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "PaymentModule.h"

@interface BrainTreePaymentManager : NSObject <RCTBridgeModule>
+ (instancetype)shared;
@property (nonatomic, strong) PaymentModule *objcInstance;
- (void)showDropInWithToken:(NSString *)token;

@end
