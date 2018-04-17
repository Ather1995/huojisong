/*
 * This page is to accept the order.
 * In apiready function.There are some module followed:
 * 1. initial() ---------- initial some infomation on this page
 * 2. fixStatusBar ------- set the bars on the top of the page
 * 3. set the height of img in order to  be adapted to width 
 */
apiready=function(){
	initial(function(ret){
		if(ret=="true")
		{}
		else
		{
			api.toast({
	            msg:'您的网络抽风了，请稍后重试~'
            });
		}
	});
	
	$api.fixStatusBar(document.getElementById("header"));
    api.setStatusBarStyle({
	    style: 'dark',
	    color: '#8142b9'	
	});
	for(var i=0;i<3;i++)
	{
		document.getElementsByClassName("img")[i].style.height=api.winWidth/3+"px";
	}
}
/*********************************module funtion***************************************/
/*
 * some function in the ready funtion and some function when users do some behave
 * 1、initial ------------- in the apiready;
 * 2、nextstep ------------ when the user want to accept the order;
 */

/*nextstep ------------ when the user want to accept the order; */
function nextStep(){
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159' 
    });
    model.updateById({
	    class:'order',
	    id:$api.getStorage("order_id"),
	    value:{
	    	driver:$api.getStorage("id"),
	    	state:"3"
	    }
    },function(ret,err){
    	console.warn(JSON.stringify(ret));
    	if(ret)
    	{
    		api.toast({
	            msg:'抢单成功'
            });
            api.closeWin({
            });
    	}
    	else
    	{
    		console.warn(JSON.stringify(err));
    		api.toast({
	            msg:'Sorry，您的网络有异常，请稍后重试'
            });
    	}
    });
}
function initial(back){
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159' 
    });
    model.findById({
	    class:'order',
	    id:$api.getStorage("order_id")
    },function(ret,err){
    	if(ret)
    	{
			var start_lon=ret.start_lon;
			var start_lat=ret.start_lat;
			var stop_lon=ret.stop_lon;
			var stop_lat=ret.stop_lat;
			var price=ret.price;
			var state=ret.state;
			var shareCar=ret.shareCar;
			var car_kind=ret.car_kind;
			var year=ret.year;
			var date=ret.date;
			var month=ret.month;
			var hours=ret.hours;
			var week=ret.week;
			var min=ret.minute;
			var second=ret.second;
			var start_place;
			var stop_place;
			var time;
			switch(car_kind)
			{
				case "s_mini":car_kind="小型面包车";break;
				case "l_mini":car_kind="大型面包车";break;
				case "s_flat":car_kind="小型平板车";break;
				case "l_flat":car_kind="大型平板车";break;
			} 
			getNameFromNum(start_lon,start_lat,function(ret){
				if(ret!="error")
				{
					start_place=ret;
					getNameFromNum(stop_lon,stop_lat,function(ret){
						if(ret!="error")
						{
							stop_place=ret;
							time=""+year+"年"+month+"月"+date+"日（"+week+")  "+hours+":"+min;
							document.getElementById("start_place").innerHTML=start_place;
							document.getElementById("stop_place").innerHTML=stop_place;
							document.getElementById("time").innerHTML=time;
							document.getElementById("car_kind").innerHTML=car_kind;
							document.getElementById("price").innerHTML="￥"+price;
							back("true");
						}
					});
				}
			});			   		
    	}
    	else
    	{
    	}
    });
}
/*get the info about the place name by
  lon and lat.
  back(back_ret)--’error'/name */
function getNameFromNum(lon,lat,back)
{
	var bMap=api.require('bMap');
	bMap.getNameFromCoords({
	    lon: lon,
	    lat: lat
    },function(ret,err){
    	if(ret.status)
    	{
    		console.log(JSON.stringify(ret));
    		if(ret.address!="")
    		{    		
	    		var back_ret=ret.poiList[0].name;
	    		back(back_ret);
    		}
    		else
    		{
 	    		var back_ret="error";
	    		back(back_ret);   			
    		}
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret="error";
    		back(back_ret);
    	}
    });
}