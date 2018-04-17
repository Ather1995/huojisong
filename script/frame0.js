// apiready = function(){
//      
//      api.setCustomRefreshHeaderInfo({
//          bgColor : '#f0f0f0',
//          image : {
//              pull : 'widget://image/pull.png',
//              transform : [
//                  'widget://image/pull_end_image_frame_01.png',
//					'widget://image/pull_end_image_frame_01.png',
//                  'widget://image/pull_end_image_frame_02.png',
//					'widget://image/pull_end_image_frame_02.png',
//                  'widget://image/pull_end_image_frame_03.png',
//					'widget://image/pull_end_image_frame_03.png',
//                  'widget://image/pull_end_image_frame_04.png',
//					'widget://image/pull_end_image_frame_04.png',
//                  'widget://image/pull_end_image_frame_05.png',
//					'widget://image/pull_end_image_frame_05.png'
//              ],
//              load : [
//                  'widget://image/refreshing_image_frame_01.png',
//					'widget://image/refreshing_image_frame_01.png',
//                  'widget://image/refreshing_image_frame_02.png',
//					'widget://image/refreshing_image_frame_02.png',
//                  'widget://image/refreshing_image_frame_03.png',
//					'widget://image/refreshing_image_frame_03.png',
//                  'widget://image/refreshing_image_frame_04.png',
//					'widget://image/refreshing_image_frame_04.png',
//                  'widget://image/refreshing_image_frame_05.png',
//					'widget://image/refreshing_image_frame_05.png',
//                  'widget://image/refreshing_image_frame_06.png',
//					'widget://image/refreshing_image_frame_06.png'
//              ]
//          }
//      }, function() {
//          //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
//          setTimeout(function(){
//              api.refreshHeaderLoadDone()
//          }, 3000);
//      });
//  }
var UIScrollPicture;
function openNewWin(type)
{
	api.openWin({
	    name: type,
	    url: './'+type+'.html'
    });
}

	function openMy1NewWin(type)
{
	api.openWin({
	    name: type,
	    url: './seek_order/'+type+'.html'
    });
}
function openOrder(type)
{
	api.openWin({
	    name: type,
	    url: './order/'+type+'.html'
    });
}
/*function openMy2NewWin(type)
{
	api.openWin({
	    name: type,
	    url: './order_manage/'+type+'.html'
    });
}*/


apiready = function() {
	UIScrollPicture = api.require('UIScrollPicture');
	fnOpen();
};

	function fnOpen() {
		UIScrollPicture.open({
			rect : {
				x : 0,
				y : 0,
				w : api.winWidth,
				h : 150
			},
			data : {
				paths : ['widget://image/carousel1.png', 'widget://image/carousel2.png', 'widget://image/carousel3.png'],
				captions : ['车，奔跑的力量', '车，共富的力量', '车，大家的力量']
			},
			styles : {
				caption : {
					height : 20,
					color : '#E0FFFF',
					size : 10,
					bgColor : '#696969',
					position : 'bottom'
				},
				indicator : {
					align : 'center',
					color : '#FFFFFF',
					activeColor : '#037467'
				}
			},
			placeholderImg : 'widget://image/carousel3.png',
			contentMode : 'scaleToFill',
			interval : 3,
			loop : true,
			fixedOn: api.frameName,
			fixed : false
		}, function(ret, err) {
			if (ret) {
				// alert(JSON.stringify(ret));
			} else {
				// alert(JSON.stringify(err));
			}
		});
	};

