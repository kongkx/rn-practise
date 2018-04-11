//
//  SampleViewModule.m
//  SwiftNative
//
//  Created by steven on 2018/4/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SampleViewModule.h"

@interface RCT_EXTERN_MODULE(SampleViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(txt, NSString)
@end
