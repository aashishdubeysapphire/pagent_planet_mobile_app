//
//  UIViewController+TopViewControllers.m
//  SampleBridging
//
//  Created by rahul ramola on 21/11/23.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@implementation UIViewController (TopViewController)

+ (UIViewController *)topViewController {
    UIViewController *topViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    
    while (topViewController.presentedViewController) {
        topViewController = topViewController.presentedViewController;
    }

    if ([topViewController isKindOfClass:[UINavigationController class]]) {
        topViewController = [(UINavigationController *)topViewController visibleViewController];
    } else if ([topViewController isKindOfClass:[UITabBarController class]]) {
        topViewController = [(UITabBarController *)topViewController selectedViewController];
    }

    return topViewController;
}

@end
