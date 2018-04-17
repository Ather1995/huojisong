var content=document.getElementById("content");
apiready=function(){
	$api.fixStatusBar(document.getElementById("header"));
    api.setStatusBarStyle({
    style: 'dark',
    color: '#8142b9'
});
//	api.setCustomRefreshHeaderInfo({
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
	
	
	
	mcmFindInOrderAll(function(ret,det){
		if(ret=="true")
		{
			content.innerHTML="";
			for(var i=0;i<det.length;i++)
			{
				loadInPage(det,i);
			}
		}
		else
		{
			api.toast({
	            msg:'您的网络抽风了'
            });
		}
	});
}
function openNewWin(type,order_id)
{
	$api.setStorage("order_id",order_id);
	api.openWin({
	    name: type,
	    url: '../seek_order/'+type+'.html'
    });
}
/* find all order in order table
 */
function mcmFindInOrderAll(back){
	var query=api.require("query");
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159' 
    });
    query.createQuery({
    },function(ret,err){
    	if(ret)
    	{
    		var queryID=ret.qid;
    		query.whereEqual({
	            qid:queryID,
	            column:'state',
	            value:'0'
            });
            query.asc({
	            qid:queryID,
	            column:'id'
            });
            model.findAll({
	            class:'order',
	            qid:queryID
            },function(ret,err){
            	if(ret)
            	{
            		var JSON_det=ret;
            		back("true",JSON_det);
            	}
            	else
            	{
		     		console.warn(JSON.stringify(err));
		    		back("false","");           		
            	}
            });
    	}
    	else
    	{
    		console.warn(JSON.stringify(err));
    		back("false","");
    	}
    });
}
/*load the info found by mcm in page */
function loadInPage(det,index){
	var order_id=det[index].id;
	var start_lon=det[index].start_lon;
	var start_lat=det[index].start_lat;
	var stop_lon=det[index].stop_lon;
	var stop_lat=det[index].stop_lat;
	var price=det[index].price;
	var state=det[index].state;
	var shareCar=det[index].shareCar;
	var car_kind=det[index].car_kind;
	var year=det[index].year;
	var date=det[index].date;
	var month=det[index].month;
	var hours=det[index].hours;
	var week=det[index].week;
	var min=det[index].minute;
	var second=det[index].second;
	var start_place;
	var stop_place;
	var time;
	var type="vehicle_details";
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
	}
	switch(shareCar)
	{
		case "0":shareCar="不同意拼车";break;
		case "1":shareCar="同意拼车";break;
	}
	getNameFromNum(start_lon,start_lat,function(ret){
		if(ret!="error")
		{
			start_place=ret;
			getNameFromNum(stop_lon,stop_lat,function(ret){
				if(ret!="error")
				{
					if(state=="未完成")
					{
						stop_place=ret;
						time1=""+year+"年"+month+"月"+date+"日（"+week+")  "+hours+":"+min;
						time2=""+year+"-"+month+"-"+date;
						content.innerHTML+=
							'<div class="block"  onclick="openNewWin(\''+
								type+
								"\',\'"+
								order_id+
							'\')">'+
							'<div class="line1">'+
								'<img src="../../image/mycar.png">'+
								'<div class="block2">'+
									'<div class="begin">'+
										'<img src="../../image/mybegin.png">'+
										'<div class="begintext">'+
											start_place+
										'</div>'+
									'</div>'+
									'<div class="end">'+
										'<img src="../../image/myend.png">'+
										'<div class="endtext">'+
										stop_place+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="block3">'+
									time2+
								'</div>'+
							'</div>'+
							'<div class="line2 line_img">'+
								'<img src="../../image/goods.png">'+
								'<div class="type mytext graytext">家具</div>'+
								'<div class="text2 mytext ">￥'+
									price+
								'</div>'+
								'<div class="tag1 mytext">'+
									shareCar+
								'</div>'+
							'</div>'+
							'<div class="line3 line_img">'+
								'<img src="../../image/time.png">'+
								'<div class="time mytext graytext">'+
									time1+
								'</div>'+
							'</div>'+
							'<div class="line4 line_img">'+ 
								'<img src="../../image/car.png">'+
								'<div class="cartypetext mytext graytext">'+
									car_kind+
								'</div>'+
								'<div class="cartype mytext graytext" style="margin-left: 15px">货重：1.5吨</div>'+
							'</div>'+
						'</div>';
					}
				}
			});
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
    		console.warn(JSON.stringify(err));
    		var back_ret="error";
    		back(back_ret);
    	}
    });
}