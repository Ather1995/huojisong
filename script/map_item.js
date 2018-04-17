apiready=function(){
	api.addEventListener({
	    name:'search_p'
    },function(ret,err){
    	console.log(JSON.stringify(ret));
    	if(ret.value.search_p.length>=1)
    	{
			var map = api.require('bMap');
			map.searchInCity({
			    city: ret.value.city,
			    keyword: ret.value.search_p,
			    pageIndex: 0,
			    pageCapacity: 10
			}, function(ret, err) {
			    if (ret.status) {
			        console.log(JSON.stringify(ret));
			        var save_ret=ret;
			        checkAgain(function(ret){
			        	if(ret=="true")
			        	{
			        		console.log(JSON.stringify(save_ret));			        	
							var line=document.getElementsByClassName("line");			        	
			        		if(save_ret.totalNum<10)
			        		{
			        			for(var i=0;i<save_ret.totalNum;i++)
			        			{
			        				var content=line[i].children[1];
			        				content.children[0].innerHTML=save_ret.results[i].name;
			        				content.children[1].innerHTML=save_ret.results[i].address;			        				
			        				content.children[2].innerHTML=save_ret.results[i].lon;
			        				content.children[3].innerHTML=save_ret.results[i].lat;
			        				line[i].style.display="-webkit-box";
			        			}
		        				$api.setStorage("mutex","true");
								$api.setStorage("stop","false");			        						        			
		        				$api.setStorage("mutex","true");
								$api.setStorage("stop","false");
								api.sendEvent({
				            		name:'again'
			            		});				        		
			        		}
			        		else
			        		{
			        			for(var i=0;i<10;i++)
			        			{
			        				var content=line[i].children[1];
			        				content.children[0].innerHTML=save_ret.results[i].name;
			        				content.children[1].innerHTML=save_ret.results[i].address;			        				
			        				content.children[2].innerHTML=save_ret.results[i].lon;
			        				content.children[3].innerHTML=save_ret.results[i].lat;
			        				line[i].style.display="-webkit-box";
			        			}
		        				$api.setStorage("mutex","true");
								$api.setStorage("stop","false");
								api.sendEvent({
				            		name:'again'
			            		});											        			
			        		}
			        	}
			        	else
			        	{
					        $api.setStorage("mutex","true");
							$api.setStorage("stop","false");
							api.sendEvent({
			            		name:'again'
		            		});										        		
			        	}
			        });
			    } else {
			        console.log(JSON.stringify(err));
			        $api.setStorage("mutex","true");
					$api.setStorage("stop","false");
					api.sendEvent({
	            		name:'again'
            		});
			    }
			});
		}
		else
		{
			$api.setStorage("mutex","true");
			$api.setStorage("stop","false");
			api.sendEvent({
	            name:'again'
            });
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

function select(num){
	var line=document.getElementsByClassName("line");
	var lon=line[num].children[1].children[2].innerHTML;
	var lat=line[num].children[1].children[3].innerHTML;
	api.sendEvent({
	    name:'changePoint',
	    extra:{
	    	lon:lon,
	    	lat:lat
	    }
    });
}