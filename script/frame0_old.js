   apiready = function(){
        $api.fixStatusBar(document.getElementById("header"));
        api.setStatusBarStyle({
            style: 'dark',
            color: '#8142b9'
        });
    }
	
	function goback () {
    api.closeWin({name:'frame0_old'});
}
	
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