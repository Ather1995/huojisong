function openNewWin(num)
{
	switch(num)
	{
		case 0:
			$api.setStorage("car_id","s_mini");
			break;
		case 1:
			$api.setStorage("car_id","l_mini");
			break;			
		case 2:
			$api.setStorage("car_id","s_flat");
			break;		
		case 3:
			$api.setStorage("car_id","l_mini");
			break;		
	}
	api.openWin({
		name:'complete_order_information',
		url:'./order/complete_order_information.html',
		customRefreshHeader:'UIPullRefresh',
		rect:{
			x:0,
			y:0,
			w:'auto',
			h:'auto',
		},
		softInputMode:'resize',
		bounces:false,
		delay:200,
		animation: {
				type: 'movein'
			}
	});
}
    apiready = function(){
        
        api.setCustomRefreshHeaderInfo({
            bgColor : '#f0f0f0',
            image : {
                pull : 'widget://image/pull.png',
                transform : [
                    'widget://image/pull_end_image_frame_01.png',
					'widget://image/pull_end_image_frame_01.png',
                    'widget://image/pull_end_image_frame_02.png',
					'widget://image/pull_end_image_frame_02.png',
                    'widget://image/pull_end_image_frame_03.png',
					'widget://image/pull_end_image_frame_03.png',
                    'widget://image/pull_end_image_frame_04.png',
					'widget://image/pull_end_image_frame_04.png',
                    'widget://image/pull_end_image_frame_05.png',
					'widget://image/pull_end_image_frame_05.png'
                ],
                load : [
                    'widget://image/refreshing_image_frame_01.png',
					'widget://image/refreshing_image_frame_01.png',
                    'widget://image/refreshing_image_frame_02.png',
					'widget://image/refreshing_image_frame_02.png',
                    'widget://image/refreshing_image_frame_03.png',
					'widget://image/refreshing_image_frame_03.png',
                    'widget://image/refreshing_image_frame_04.png',
					'widget://image/refreshing_image_frame_04.png',
                    'widget://image/refreshing_image_frame_05.png',
					'widget://image/refreshing_image_frame_05.png',
                    'widget://image/refreshing_image_frame_06.png',
					'widget://image/refreshing_image_frame_06.png'
                ]
            }
        }, function() {
            //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
            setTimeout(function(){
                api.refreshHeaderLoadDone()
            }, 3000);
        });
    }

 function fnRefreshHeaderLoading() {
        api.refreshHeaderLoading();
    };