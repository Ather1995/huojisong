function back(){
	api.closeWin({
		name:'map_index'
    });
}
function searchCity(){
	api.openWin({
	    name: 'map_city',
	    url: './map_city.html'
    });
}
apiready = function(){
	api.addEventListener({
        name:'changeCity'
    },function(ret,err){
    	console.log(JSON.stringify(ret));
    	document.getElementById("city").innerHTML=ret.value.city;
    });

	api.addEventListener({
	    name:'blur'
    },function(ret,err){
    	document.getElementById("search").blur();
    });
    
	api.addEventListener({
	    name:'again'
    },function(ret,err){
    	searchPoint();
    });
        
};
function searchPoint(){
	var city=document.getElementById("city").innerHTML;
	var search_p=document.getElementById("search").value;
	checkStart(function(ret){
		if(ret=="true")
		{
			$api.setStorage("mutex","false");
			api.sendEvent({
	            name:'search_p',
	            extra:{
	            	search_p:search_p,
	            	city:city
	            }
            });
		}
		else
		{
			$api.setStorage("stop","true");
		}
	});

}
function checkStart(back){
	var mutex=$api.getStorage("mutex");
	if(mutex=="true")
	{
		back("true");
	}
	else
	{
		back("false");
	}
}
function checkAgain(back){
	var stop=$api.getStorage("stop");
	if(stop=="true")
	{
		back("false");
	}
	else
	{
		back("true");
	}
}
function startSearch(){
	console.log("foucs");
	api.sendEvent({
	    name:'open_map_city'
    });
}