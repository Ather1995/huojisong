function openNewWin(type)
{
	api.openWin({
	    name: type,
	    url: './'+type+'.html'
    });
}

function startPlace(){
	$api.setStorage("map_kind","start");
	api.openWin({
		customRefreshHeader:'UIPullRefresh',
	    name: 'map_index',
	    url: '../map_index.html'
    });	
}
function stopPlace(){
	$api.setStorage("map_kind","stop");
	api.openWin({
		customRefreshHeader:'UIPullRefresh',
	    name: 'map_index',
	    url: '../map_index.html'
    });	
}
function goback(){
    api.closeWin({name:'complete_order_information'});
}
apiready=function()
{
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
		initialize();

	api.addEventListener({
	    name:'start_place'
    },function(ret,err){
    	var lon=$api.getStorage("start_lon");
    	var lat=$api.getStorage("start_lat");
    	getNameFromNum(lon,lat,function(ret){
    		if(ret!="error")
    		{
    			document.getElementById("orign").innerHTML=ret;
    		}
    	});
    	api.closeWin({
        	name:'map_index'
        });
    }); 
    api.addEventListener({
	    name:'stop_place'
    },function(ret,err){
    	var lon=$api.getStorage("stop_lon");
    	var lat=$api.getStorage("stop_lat");
    	var start_lon=$api.getStorage("start_lon");
    	var start_lat=$api.getStorage("start_lat");    	
    	var bMap=api.require('bMap');
    	getNameFromNum(lon,lat,function(ret){
    		if(ret!="error")
    		{
    			document.getElementById("destination").innerHTML=ret;
    		}
    	});
    	bMap.getDistance({
	        start: {
		        lon: start_lon,
		        lat: start_lat
	        },
	        end: {
		        lon: lon,
		        lat: lat
	        }
        },function(ret,err){
        	if(ret.status)
        	{
        		console.log(JSON.stringify(ret));
        		var distance=ret.distance;
        		getPrice(distance);
        	}
        });
    	api.closeWin({
        	name:'map_index'
        });
    });
}
function getPrice(dis)
{
	var distance=(Math.round(dis/10))/100;
	var car_id=$api.getStorage("car_id");
	if(distance<=5)
	{
		switch(car_id)
		{
			case "s_mini":
				document.getElementById("price").innerHTML="33";
				break;
			case "l_mini":
				document.getElementById("price").innerHTML="108";
				break;
			case "s_flat":
				document.getElementById("price").innerHTML="48";
				break;
			case "s_flat":
				document.getElementById("price").innerHTML="128";
				break;												
		}
		
	}
	else
	{
		var left_distance=distance-5.0;
		var price=0.0;
		switch(car_id)
		{
			case "s_mini":
				price=(left_distance)*3.0+33;
				document.getElementById("price").innerHTML=""+price;
				break;
			case "l_mini":
				price=(left_distance)*4.0+108;
				document.getElementById("price").innerHTML=""+price;
				break;
			case "s_flat":
				price=(left_distance)*4.0+48;
				document.getElementById("price").innerHTML=""+price;
				break;
			case "s_flat":
				price=(left_distance)*5.0+128;
				document.getElementById("price").innerHTML=""+price;
				break;												
		}		
	}
}
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
function initialize()
{
	var lon=$api.getStorage("map_lon");
	var lat=$api.getStorage("map_lat");
	var start_lon=$api.setStorage("start_lon",lon);
	var start_lat=$api.setStorage("start_lat",lat);	
	getNameFromNum(lon,lat,function(ret){
		if(ret!="error")
		{
			document.getElementById("orign").innerHTML=ret;
		}
	});
}
/*when passengers submit the info about order. The 
  system need to do somethings.*/
function nextStep(){
	var timerStr=new Date();
	var year=timerStr.getFullYear();
	var month = timerStr.getMonth() + 1;
	var date = timerStr.getDate();
	var hours = timerStr.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
	var minute = timerStr.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }	
	var second = timerStr.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }	
	var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weekArray[timerStr.getDay()];
	var info=document.getElementById("destination").innerHTML;
	if(info!="请输入目的地")
	{
		if($api.getStorage("login")=="true")
		{
	    	var start_lon=$api.getStorage("start_lon");
	    	var start_lat=$api.getStorage("start_lat");
	    	var stop_lon=$api.getStorage("stop_lon");
	    	var stop_lat=$api.getStorage("stop_lat");
	    	var users_id=$api.getStorage("id");
	    	var car_kind=$api.getStorage("car_id");
	    	var state="0";
	    	var price=document.getElementById("price").innerHTML;
			var model=api.require('model');
			var query=api.require('query');
			var shareCar="1";
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
	        		var order_length=order_JSON.order.length;
	        		model.insert({
				        class:'order',
				        value:{
				        	start_lon:start_lon,
				        	start_lat:start_lat,
				        	stop_lon:stop_lon,
				        	stop_lat:stop_lat,
				        	users_id:users_id,
				        	price:price,
				        	car_kind:car_kind,
				        	state:state,
				        	year:year,
				        	month:month,
				        	date:date,
				        	shareCar:shareCar,
				        	hours:hours,
				        	week:week,
				        	minute:minute,
				        	second:second
				        }
			        },function(ret,err){
			        	if(ret)
			        	{
			        		var extra_id=ret.id;
			        		var order_change="{\"order\":[\""+extra_id+"\"";
			        		for(var i=0;i<order_length;i++)
			        		{
			        			if(order_JSON.order[i]!="123")
			        			{
			        				order_change+=",\""+order_JSON.order[i]+"\"";
			        			}
			        		}
			        		order_change+="]}";
			        		console.log(order_change);
			        		model.updateById({
		                        class:'users',
		                        id:$api.getStorage("id"),
		                        value:{
		                        	order:order_change
		                        }
	                        },function(ret,err){
	                        	if(ret)
	                        	{
	                        		console.log(JSON.stringify(ret));
	                        	}
	                        	else
	                        	{
	                        		console.log(JSON.stringify(err));
	                        	}
	                        });
			        		goback();
			        	}
			        	else
			        	{
			        		console.log(JSON.stringify(err));
			        		api.toast({
			        			msg:'Sorry,您的网络抽风了~，请稍后重试'
			        		})
			        	}
			        });
	        	}
	        	else
	        	{
	        		console.error(JSON.stringify(err));
					api.toast({
	        			msg:'Sorry,您的网络抽风了~，请稍后重试'
	        		})
	        	}
	        });
	    }
	    else
	    {
	    	api.toast({
	            msg:'请先登录'
            });
	    }	        	
	}
	else
	{
		api.toast({
	        msg:'请填写目的地'
        });
	}	
}