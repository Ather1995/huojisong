function openNewWin(type)
{
	api.openWin({
	    name: type,
	    url: './'+type+'.html'
    });
}

apiready=function()
{
//api.setCustomRefreshHeaderInfo({
//          bgColor : '#f0f0f0',
//          image : {
//              pull : 'widget://image/pull.png',
//              transform : [
//                  'widget://image/pull_end_image_frame_01.png',
//                  'widget://image/pull_end_image_frame_02.png',
//                  'widget://image/pull_end_image_frame_03.png',
//                  'widget://image/pull_end_image_frame_04.png',
//                  'widget://image/pull_end_image_frame_05.png'
//              ],
//              load : [
//                  'widget://image/refreshing_image_frame_01.png',
//                  'widget://image/refreshing_image_frame_02.png',
//                  'widget://image/refreshing_image_frame_03.png',
//                  'widget://image/refreshing_image_frame_04.png',
//                  'widget://image/refreshing_image_frame_05.png',
//                  'widget://image/refreshing_image_frame_06.png'
//              ]
//          }
//      }, function() {
//          //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
//          setTimeout(function(){
//              api.refreshHeaderLoadDone()
//          }, 3000);
//      });
}