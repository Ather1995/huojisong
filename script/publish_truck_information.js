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
	    name:'drive_start_place'
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
	    name:'drive_stop_place'
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
    	if(ret)
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
	var info=document.getElementById("destination").innerHTML;
	if(info!="请输入目的地")
	{
    	var start_lon=$api.getStorage("start_lon");
    	var start_lat=$api.getStorage("start_lat");
    	var stop_lon=$api.getStorage("stop_lon");
    	var stop_lat=$api.getStorage("stop_lat");
    	var users_id=$api.getStorage("id");
    	var price=document.getElementById("price").innerHTML;
		var model=api.require('model');
		model.config({
		    appId:'A6932793671075',
		    appKey:'56926729-60C6-147B-4323-43298EA81159'
	    });    	
    	model.insert({
	        class:'order',
	        value:{
	        	start_lon:start_lon,
	        	start_lat:start_lat,
	        	stop_lon:stop_lon,
	        	stop_lat:stop_lat,
	        	users_id:users_id,
	        	price:price
	        }
        },function(ret,err){
        	if(ret)
        	{
        		console.log(JSON.stringify(ret));
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
		api.toast({
	        msg:'请填写目的地'
        });
	}	
}