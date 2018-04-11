//
//  SampleViewManager.swift
//  SwiftNative
//
//  Created by steven on 2018/4/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation

@objc(SampleViewManager)
class SampleViewManager: RCTViewManager {
  override func view() -> UIView! {
    return SampleView();
  }
}
