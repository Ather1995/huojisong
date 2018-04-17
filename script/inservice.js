var content=document.getElementById("content");
var valid=0;
var lock="false";
var loopNum=0;
var loopNum2=0;
var order_len;
var timer;
var timer2;
apiready=function()
{
console.warn(lock);
if(lock=="false")
{
	if($api.getStorage("login")=="true")
	{
		lock=="true";
		console.warn(lock);
		getValidNum(function(){
		});
	}
}
api.addEventListener({
    name:'refreshOrder'
},function(ret,err){
	console.warn(lock);
	if(lock=="false")
	{
		if($api.getStorage("login")=="true")
		{
			lock="true";
			getValidNum(function(){
			});
		}
	}
});
api.setCustomRefreshHeaderInfo({
            bgColor : '#f0f0f0',
            image : {
                pull : 'widget://image/pull.png',
                transform : [
                    'widget://image/pull_end_image_frame_01.png',
                    'widget://image/pull_end_image_frame_02.png',
                    'widget://image/pull_end_image_frame_03.png',
                    'widget://image/pull_end_image_frame_04.png',
                    'widget://image/pull_end_image_frame_05.png'
                ],
                load : [
                    'widget://image/refreshing_image_frame_01.png',
                    'widget://image/refreshing_image_frame_02.png',
                    'widget://image/refreshing_image_frame_03.png',
                    'widget://image/refreshing_image_frame_04.png',
                    'widget://image/refreshing_image_frame_05.png',
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
/*the main function that check the order online and 
 * list all orders in this frame */
function getOrderOnline(num){
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159' 
    });
    model.findById({
	    class:'users',
	    id:$api.getStorage("id")
    },function(ret,err){
    	if(ret)
    	{
    		if(num!=0)
    		{
	    		var order_JSON=JSON.parse(ret.order);
	    		order_len=order_JSON.order.length;
	    		loopNum2=0;
	    		for(var i=0;i<order_len;i++)
	    		{
					getInfoFromDB(order_JSON.order[i],function(ret,det){
						if(ret.status=="true")
						{
							var JSON_ret=JSON.parse("{\"status\":\"true\"}");
							loadInfoOnPage("true",det);
						}
						else if(ret.status=="false")
						{
							console.warn(JSON.stringify(err));
							var JSON_ret=JSON.parse("{\"status\":\"false\"}");
						}
						else
						{
							loadInfoOnPage("ini",det);
						}
					});
					
	    		}
	    		window.timer2=window.setInterval("if(loopNum2==order_len){window.lock=\"false\";window.clearInterval(window.timer2);}",1000);
	    	}
	    	else
	    	{
	    		loadInfoOnPage("ini","");
	    	}
    	}
    	else
    	{
    		console.warn(JSON.stringify(err));
    		var JSON_ret=JSON.parse("{\"status\":\"false\"}");
    	}
    });	
}
/*get the number conform the requirement*/
function getValidNum(back){
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159' 
    });
    model.findById({
	    class:'users',
	    id:$api.getStorage("id")
    },function(ret,err){
    	if(ret)
    	{
    		var order_JSON=JSON.parse(ret.order);
    		order_len=order_JSON.order.length;
    		loopNum=0;
    		for(var i=0;i<order_len;i++)
    		{
				getInfoFromDB(order_JSON.order[i],function(ret,det){
					if(ret.status=="true")
					{
						if(det.state=="0")
						{
							valid+=1;
							loopNum++;
						}
						else
						{
							loopNum++;
						}
					}
					else
					{
						loopNum++;
					}
				});
    		}    		
    		window.timer=window.setInterval("if(loopNum==order_len){getOrderOnline(valid);window.clearInterval(window.timer);}",1000);
    	}
    	else
    	{
    	}
    });		
}
/*retrive info from the order db*/
function getInfoFromDB(id,back)
{
	if(id!="123")
	{
		var model=api.require('model');
		model.config({
		    appId:'A6932793671075',
		    appKey:'56926729-60C6-147B-4323-43298EA81159' 
	    });
	    model.findById({
		    class:'order',
		    id:id
	    },function(ret,err){
	    	if(ret)
	    	{
	    		var JSON_ret=JSON.parse("{\"status\":\"true\"}");
	    		var JSON_det=ret;
	    		back(JSON_ret,JSON_det);
	    	}
	    	else
	    	{
	    		console.warn(JSON.stringify(err));
	    		var JSON_ret=JSON.parse("{\"status\":\"false\"}");
	    		var JSON_det=("");
	    		back(JSON_ret,JSON_det);
	    	}
	    });
    }
    else
    {
		var JSON_ret=JSON.parse("{\"status\":\"ini\"}");
		var JSON_det=(""); 
		back(JSON_ret,JSON_det);  	
    }
}

/*load info in the page*/
function loadInfoOnPage(status,det){
	content.innerHTML="";
	if(status=="ini")
	{
		content.innerHTML+=
			'<div class="block1">'+
				'<img src="../../image/ic_order.png">'+
			'</div>'+
			'<div class="block2">'+
				'您还没有此类订单，快去下单吧'+
			'</div>'+
			'<div class="block3">'+
				'立即叫车'+
			'</div>';
			loopNum2++;
	}
	else if(status=="true")
	{
		var start_lon=det.start_lon;
		var start_lat=det.start_lat;
		var stop_lon=det.stop_lon;
		var stop_lat=det.stop_lat;
		var price=det.price;
		var state=det.state;
		var shareCar=det.shareCar;
		var car_kind=det.car_kind;
		var year=det.year;
		var date=det.date;
		var month=det.month;
		var hours=det.hours;
		var week=det.week;
		var min=det.minute;
		var second=det.second;
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
		switch(state)
		{
			case "0":state="未完成";break;
			case "1":state="已完成";break;
			case "2":state="已取消";break;
			case "3":state="服务中";break;
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
						if(state=="服务中")
						{
							content.innerHTML+=
								'<div class="block">'+
									'<div class="left">'+
										'<div class="line">'+
										  	'<div class="text">'+
												time+
											'</div>'+
											'<div class="text right status serve">服务中</div>'+
										'</div>'+
										'<div class="line">'+
											'<div class="text">'+
												start_place+
											'</div>'+
											'<div class="text"></div>'+
											'<div class="text">'+
												stop_place+
											'</div>'+
										'</div>'+
										'<div class="line">'+
										'<div class="text">'+
											car_kind+
											'</div>'+
											'<div class="text price">￥'+
												price+
											'</div>'+
											'<div class="text right"></div>'+
										'</div>'+
										'<div class="line score">'+
										'<div class="mytext">马上评分</div>'+
										'</div>'+
									'</div>'+
									'<div class="image">'+
										'<img src="../../image/jiantou.png">'+
									'</div>'+
								'</div>';
								loopNum2++;						
						}
						else if(state=="已完成")
						{			
							loopNum2++;			
						}
						else
						{
							loopNum2++;
						}
					}
					else
					{
						lock="false";
					}
				});
			}
			else
			{
				lock="false";
			}
		});
	}
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