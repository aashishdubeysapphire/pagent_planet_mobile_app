#import <React/RCTBridgeModule.h>

@interface PaymentModule : NSObject <RCTBridgeModule>
- (void)invokeSuccessCallbackWithData:(NSString *)data;
- (void)invokeFailureCallbackWithData:(NSString *)data;
@end
