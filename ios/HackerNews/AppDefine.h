//
//  AppDefine.h
//  HackerNews
//
//  Created by Hanks on 16/12/8.
//  Copyright © 2016年 Weex. All rights reserved.
//

#ifndef AppDefine_h
#define AppDefine_h


#define CURRENT_IP @"your computer ip address"

#if TARGET_IPHONE_SIMULATOR
#define DEMO_HOST @"127.0.0.1"
#else
#define DEMO_HOST CURRENT_IP
#endif

#define DEMO_URL(path) [NSString stringWithFormat:@"http://%@:12580/%s", DEMO_HOST, #path]

#define HOME_URL [NSString stringWithFormat:@"http://%@:12580/dist/index.js", DEMO_HOST]

#endif /* AppDefine_h */
