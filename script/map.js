apiready=function()
{
	var map=api.require('bMap');
	getMapLoc(function(ret,err){
		if(ret.status)
		{
			console.log(JSON.stringify(ret));
			getNameFromNum(ret.lon,ret.lat,function(ret){
				api.sendEvent({
                    name:'changeCity',
                    extra:{
                		city:ret,
                		tag:"first_open"
                	}
                });
			});			
			mapOpen(ret.lon,ret.lat,function(){
				console.log(JSON.stringify(ret));
				map.addEventListener({
				    name: 'viewChange'
				}, function(ret) {
				    if (ret.status) {
				        console.log(JSON.stringify(ret));
				    }
				});
				map.addEventListener({
				    name: 'click'
				}, function(ret) {
				    if (ret.status) {
				        console.log(JSON.stringify(ret));
				        api.sendEvent({
	                        name:'blur'
                        });
                        api.closeFrame({
                        	name:'map_item'
                        });
				    }
				});				
			});
		}
		else
		{
			console.log(JSON.stringify(err));
			mapOpen(116.4021310000,39.9994480000,function(){
				map.addEventListener({
				    name: 'viewChange'
				}, function(ret) {
				    if (ret.status) {
				        console.log(JSON.stringify(ret));
				    }
				});	
				map.addEventListener({
				    name: 'click'
				}, function(ret) {
				    if (ret.status) {
				        console.log(JSON.stringify(ret));
				        api.sendEvent({
	                        name:'blur'
                        });
                        api.closeFrame({
                        	name:'map_item'
                        });
				    }
				});							 
				console.log(JSON.stringify(err));
			})	
		}
	});


	api.addEventListener({
	    name:'getCenter'
    },function(ret,err){
    	if(ret)
    	{
    		console.log(JSON.stringify(ret));
    		var map_kind=$api.getStorage("map_kind");
    		if(map_kind=="start")
    		{
    			map.getCenter(
	                function(ret,err) {
                	console.log(ret.lon+ret.lat);
            		$api.setStorage("start_lon",ret.lon);
            		$api.setStorage("start_lat",ret.lat);
            		api.sendEvent({
	                    name:'start_place'
                    });
                });
    		}
    		else if(map_kind=="stop")
    		{
    			map.getCenter(
	                function(ret,err) {
                	console.log(ret.lon+ret.lat);
            		$api.setStorage("stop_lon",ret.lon);
            		$api.setStorage("stop_lat",ret.lat);
            		api.sendEvent({
	                    name:'stop_place'
                    });
                });
    		}
    		else if(map_kind=="drive_start")
    		{
    			map.getCenter(
	                function(ret,err) {
                	console.log(ret.lon+ret.lat);
            		$api.setStorage("start_lon",ret.lon);
            		$api.setStorage("start_lat",ret.lat);
            		api.sendEvent({
	                    name:'drive_start_place'
                    });
                });    		
    		}
    		else
    		{
    			map.getCenter(
	                function(ret,err) {
                	console.log(ret.lon+ret.lat);
            		$api.setStorage("stop_lon",ret.lon);
            		$api.setStorage("stop_lat",ret.lat);
            		api.sendEvent({
	                    name:'drive_stop_place'
                    });
                });    		
    		}
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    	}
    });
    /*when the city has been changed*/
	api.addEventListener({
        name:'changeCity'
    },function(ret,err){
    	console.log(JSON.stringify(ret));
		if(ret.value.tag!="first_open")
		{
			var map = api.require('bMap');
			map.getCoordsFromName({
			    address: ret.value.city
			}, function(ret, err) {
			    if (ret.status) {
			        console.log(JSON.stringify(ret));
			        bMapChangeCenter(ret.lat,ret.lon);
			    }
			});
		}
    });
    /* change the  address*/
   api.addEventListener({
	   name:'changePoint'
   },function(ret,err){
   		api.closeFrame({
           	name:'map_item'
           });
 		bMapChangeCenter(ret.value.lat,ret.value.lon);  		
   });       
}
/*the wrap funciton of getMapLocation*/
function getMapLoc(back){
	var map=api.require('bMap'); 
	map.getLocation({
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	}, function(ret, err) {
	    if (ret.status) {
	        console.log(JSON.stringify(ret));
	    	var back_ret=JSON.parse('{"status":true,"lon":'+ret.lon+',"lat":'+ret.lat+'}');
	    	back(back_ret,"");
	    }else {
	        console.log(err.code);
	        var back_err=err;
	        back('{"status":false}',back_err);
	    }
	});	
}
/*the wrap function of open */
function mapOpen(lon,lat,back){
	var map=api.require('bMap');
	map.open({
	    rect: {
	        x: 0,
	        y: 0,
	    	w:api.winWidth,
	    	h:api.winHeight
	    },
	    center: {
	        lon: lon,
	        lat: lat
	    },
	    zoomLevel: 16,
	    showUserLocation: true,
	    fixedOn: api.frameName,
	    fixed: true
	}, function(ret) {
	    if (ret.status)
	    {
	        console.log('地图打开成功');
			back(ret);	        
	    }else
	    {
	    	console.log(JSON.stringify(err));
	    	back(err);
	    }
	});
}
/*map center lon and lat*/
function bmapGetCenter()
{
	var map = api.require('bMap');
	map.getCenter(function(ret) {
	    console.log(ret.lon + '*' + ret.lat);
	    var map_kind=$api.getStorage("map_kind");
	    if(map_kind=="start") 
	    {
		    $api.setStorage("start_lon",ret.lon);
		    $api.setStorage("start_lat",ret.lat);	    	
	    }
	    else if(map_kind=="stop")
	    {
		    $api.setStorage("stop_lon",ret.lon);
		    $api.setStorage("stop_lat",ret.lat);	    
	    }
	    else if(map_kind=="drive_start")
	    {
		    $api.setStorage("start_lon",ret.lon);
		    $api.setStorage("start_lat",ret.lat);	    
	    }
	    else
	    {
		    $api.setStorage("stop_lon",ret.lon);
		    $api.setStorage("stop_lat",ret.lat);	    
	    }
	});
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
    		var back_ret=ret.city;
    		back(back_ret);
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret="error";
    		back(back_ret);
    	}
    });
}
/*change the center of the map*/
function bMapChangeCenter(lat,lon){
	var map = api.require('bMap');
	map.setCenter({
	    coords: {
	        lon: lon,
	        lat: lat
	    },
	    animation: true
	});
}