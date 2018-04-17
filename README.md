# huojisong

这是一款中小型货车空闲载荷共享平台设计和开发的基于Apicloud平台的顺带货物的Hybrid APP。
研究意义：
（1）目前社会上的中小型货车合理配置难以实现，在此基础上，一个便捷可用的平台，能够加强客户端与司机端的联系，实现物流信息的顺畅流通，使货车空闲载荷得到充分利用，解决了客户的“找车难”，司机的“没货运”问题；
（2）货车货物的“顺带”模式，即在B地的货车司机想从A地运货到B地，往往空车前往A地，此时利用平台，联系恰好有从B地运货到A地需求的居民，可“顺带”货物，一方面实现货车资源充分利用，另一方面降低货物运输成本。不但解决了客户“运费高”问题，还为司机增加额外收入；
（3）实现货车空闲载荷资源充分利用，减少私家车的“勉强”运货，减少了道路汽车数量，有利于缓解道路交通压力，同时减少车辆废气排放，有利于环境保护。

## 功能演示视频

这是整体功能展示，包括更换头像，下单，抢单等等。<br>
![overall](https://github.com/Ather1995/huojisong/blob/master/display/hjs_overall.gif?raw=true)

## 产品logo
![logo](https://github.com/Ather1995/huojisong/blob/master/display/logo.png?raw=true) <br>
##各种图 
### 1
![overall](https://github.com/Ather1995/huojisong/blob/master/display/lb1.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/lb2.png?raw=true) <br>
### 2
![overall](https://github.com/Ather1995/huojisong/blob/master/display/acty.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/aty.png?raw=true) <br>
### 3
![overall](https://github.com/Ather1995/huojisong/blob/master/display/cardetail.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/coin.png?raw=true) <br>
### 4
![overall](https://github.com/Ather1995/huojisong/blob/master/display/exService.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/findcar.png?raw=true) <br>
### 5
![overall](https://github.com/Ather1995/huojisong/blob/master/display/map.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/money.png?raw=true) <br>
### 6
![overall](https://github.com/Ather1995/huojisong/blob/master/display/my.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/order.png?raw=true) <br>
### 7
![overall](https://github.com/Ather1995/huojisong/blob/master/display/order_manage.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/ordercar.png?raw=true) <br>
### 8
![overall](https://github.com/Ather1995/huojisong/blob/master/display/route.png?raw=true)
![overall](https://github.com/Ather1995/huojisong/blob/master/display/youhui.png?raw=true) <br>

## 技术亮点
### （1）UIMediaScanner
手机相册,封装了从媒体库（相册）读取资源的功能
```var UIMediaScanner = api.require('UIMediaScanner');
UIMediaScanner.open({
    type: 'picture',
    column: 4,
    classify: true,
    max: 4,
    sort: {
        key: 'time',
        order: 'desc'
    },
    texts: {
        stateText: '已选择*项',
        cancelText: '取消',
        finishText: '完成'
    },
    styles: {
        bg: '#fff',
        mark: {
            icon: '',
            position: 'bottom_left',
            size: 20
        },
        nav: {
            bg: '#eee',
            stateColor: '#000',
            stateSize: 18,
            cancelBg: 'rgba(0,0,0,0)',
            cancelColor: '#000',
            cancelSize: 18,
            finishBg: 'rgba(0,0,0,0)',
            finishColor: '#000',
            finishSize: 18
        }
    },
    scrollToBottom: {
        intervalTime: 3,
        anim: true
    },
    exchange: true,
    rotation: true
}, function(ret) {
    if (ret) {
        alert(JSON.stringify(ret));
    }
});
```
### (2) 轮播UIScrollPicture
```
var UIScrollPicture = api.require('UIScrollPicture');
UIScrollPicture.open({
    rect: {
        x: 0,
        y: 0,
        w: api.winWidth,
        h: api.winHeight / 2
    },
    data: {
        paths: [
            'widget://res/img/apicloud.png',
            'widget://res/img/apicloud-gray.png',
            'widget://res/img/apicloud.png',
            'widget://res/img/apicloud-gray.png'
        ],
        captions: ['apicloud', 'apicloud', 'apicloud', 'apicloud']
    },
    styles: {
        caption: {
            height: 35,
            color: '#E0FFFF',
            size: 13,
            bgColor: '#696969',
            position: 'bottom'
        },
        indicator: {
           dot:{
             w:20,
             h:10,
             r:5,
             margin:20
          },
            align: 'center',
            color: '#FFFFFF',
            activeColor: '#DA70D6'
        }
    },
    placeholderImg: 'widget://res/slide1.jpg',
    contentMode: 'scaleToFill',
    interval: 3,
    fixedOn: api.frameName,
    loop: true,
    fixed: false
}, function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});
```

### (3)百度map
手机地图,封装了百度地图的开放 SDK
bMap 模块封装了百度地图的原生 SDK，集成了百度地图常用基本接口；手机版原生地图，不同于 js 地图，相对于js地图而言，本模块封装的原生手机地图更加流畅迅速、动画效果更加逼真。使用此模块可轻松把百度地图集成到自己的app内，实现百度地图常用的定位、关键字搜索、周边搜索、自定义标注及气泡、查公交路线等各种功能；另外本模块已支持百度地图离线版本。
```
  <feature name="bMap">
    <param name="android_api_key" value="f7Is0dWLom2q6rV3ZfFPZ1aa" />
    <param name="ios_api_key" value="81qz3dBYB5q2nGji4IYrawr1" />
  </feature>
```
## APIcloud相对于原生开发的不足
### 标准的规范尚未定案。
APICloud 的实现需要多个层面的标准配套，如WAC标准、Device API标准以及HTML5标准。在这些标准都尚未完善之前，APICloud还无法完整实现Native App的常用功能。即便实现了以后，再流畅度和用户体验上仍然存在很大的问题；
### 不同浏览器支持的差异性
在PC端Firefox、IE、Chrome等浏览器虽然都遵循HTML标准，但最终展示效果仍旧会有偏差。在移动端这种情况只会进一步加剧。比如HTML5标准中对input的类型进行了定义，其中包括时间型如type=datetime。不同的浏览器展示出来的最终效果千差万别。另外CSS3的支持效果各个浏览器核心也会有自己的风格，做不到完全统一。这和Native App相比，成为比较大的弱势。
###  移动设备浏览器的性能还不能支持API Cloud
和大多数web App相似，APICloud体验不流畅和响应速度慢是当前面临两个最大的硬伤。目前APICloud主要使用第三方的JS框架来完成开发，其中国外比较知名的包括JQuery Mobile、Sencha Touch、JQMobi等。这些开发框架的比较统一的特色比如都是把代码写在一个网页文件内，不同的界面通过不同的DIV切换来展示。这直接导致了WebApp在界面切换过程中的不流畅。而这一问题必须随着硬件的发展和软件的优化来逐渐的完善。



