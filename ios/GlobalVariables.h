//
//  GlobalVariablesTwo.m
//  SampleBridging
//
//  Created by rahul ramola on 23/10/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import "GlobalVariables.h"

RCTResponseSenderBlock storedCallback = nil;
RCTResponseSenderBlock paymentSuccessCallback = nil;
RCTResponseSenderBlock paymentFailureCallback = nil;

NSString *brainTreeToken = @""; 
