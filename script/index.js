  //下单页面的找货/找车页面转换active	  
	var clicked =$api.domAll('header ul li .text .item');
    var changeColor =function(index)
    {
        if (index == 0) {
             $api.addCls(clicked[0],'active');
             $api.removeCls(clicked[1],'active');
        }
        if (index == 1) {
            $api.addCls(clicked[1],'active');
            $api.removeCls(clicked[0],'active');
        }
    }
//抢单页面的找货/找车页面转换active	
	var clicked2 =$api.domAll('header ul li .text2 .item');
    var changeColor2 =function(index)
    {
        if (index == 0) {
             $api.addCls(clicked2[0],'active');
             $api.removeCls(clicked2[1],'active');
        }
        if (index == 1) {
            $api.addCls(clicked2[1],'active');
            $api.removeCls(clicked2[0],'active');
        }
    }
    var changeGroupIndex = function(index){
        if(index==0)
        {
        	console.log("passenger");
        	$api.setStorage("identity","passenger");
        }
        else
        {
        	console.log("driver");
        	$api.setStorage("identity","driver");
        }
        api.setFrameGroupIndex({//设置 frame 组当前可见 frame
            name: 'index_group',
            index: index,
            scroll: true
        });
    };
	
	
	//抢单页面的找货/找车页面转换
	
	var changeGroupIndex2 = function(index){
        api.setFrameGroupIndex({//设置 frame 组当前可见 frame
            name: 'seek_car_cargo',
            index: index,
            scroll: true
        });
    };
	
	
	
	
	
    // 随意切换按钮
    var changeGroup1Index = function(index){
        api.setFrameGroupIndex({//设置 frame 组当前可见 frame
            name: 'group1',
            index: index,
            scroll: true
        });
        
        if( index != 1)//隐藏显示frame1中的order_manage-group
        {
        api.setFrameGroupAttr({
        name: 'order_manage-group',
        hidden: true
        });
        }else{
          api.setFrameGroupAttr({
        name: 'order_manage-group',
        hidden: false
        });  
        }
        
        if( index != 0)//隐藏显示frame0中的index_group
        {
        api.setFrameGroupAttr({
        name: 'index_group',
        hidden: true
        });
        }else{
            api.setFrameGroupAttr({
        name: 'index_group',
        hidden: false
        });
        }
    };  
	/* inform order page including all_order/cancel/inservice/evaluate
	   page to refresh*/      
	function refreshOrder(){
		api.sendEvent({
		    name:'refreshOrder'
	    });
	}


    //初始化***********************************************************************************
   apiready = function () {  
        $api.fixStatusBar( $api.dom('header') );
        api.setStatusBarStyle({
            style: 'dark',
            color: '#8142b9'
        });
        funIniGroup();
        loadInfo();
        timeUpdata();
		
		
		
		//设置背景颜色为白色
		var groupColor = $api.getStorage('theme');
        if (groupColor && groupColor == 1) {
            groupColor = '#1E1E23';
        } else{
            groupColor = '#FFFFFF';
        }
		
		
		//抢单页面的找货/找车页面转换
	api.openFrameGroup({//打开 frame 组frame 组打开后，当前页面加载完成后，页面会预加载后面指定个数页面
            name: 'seek_car_cargo',
            background: groupColor,
            customRefreshHeader: 'UIPullRefresh',
            scrollEnabled: true,
            rect: {
                x: 0,
                y: $api.dom('header').offsetHeight,
                w: 'auto',
                h: $api.dom('#main').offsetHeight
            },
            index: 0,
            frames:[
                {
                    name: 'seek_cargo', 
                    url: './html/frame1.html', //优惠活动
                    pageParam:{}, 
                    bounces:true, //（可选项）页面是否弹动
                    opaque:true,
                    bgColor: groupColor
                },{
                    name: 'seek_car', 
                    url: './html/seek_order/seek_car.html', 
                    pageParam:{}, 
                    bounces:true, 
                    opaque:true,
                    bgColor: groupColor
                }
            ]
        }, function(ret, err){
            var name = ret.name;
            var index = ret.index;
            changeColor2(index);
            if(index==0)
            {
            	api.sendEvent({
	                name:'refreshFrame1'
                });
            }
            else
            {
            	api.sendEvent({
	                name:'refreshSeekCar'
                });
            }
        });                
		
		
		
		
		

//index_group是司机/货主的两个页面
         
        api.openFrameGroup({//打开 frame 组frame 组打开后，当前页面加载完成后，页面会预加载后面指定个数页面
            name: 'index_group',
            background: groupColor,
            customRefreshHeader: 'UIPullRefresh',
            scrollEnabled: true,
            rect: {
                x: 0,
                y: $api.dom('header').offsetHeight,
                w: 'auto',
                h: $api.dom('#main').offsetHeight
            },
            index: 0,
            frames:[
                {
                    name: 'complete_order_information', 
                    url: './html/frame0.html', 
                    pageParam:{}, 
                    bounces:true, //（可选项）页面是否弹动
                    opaque:true,
                    bgColor: groupColor
                },{
                    name: 'driver', 
                    url: './html/order/driver.html', 
                    pageParam:{}, 
                    bounces:true, 
                    opaque:true,
                    bgColor: groupColor
                }
            ]
        }, function(ret, err){
            var name = ret.name;
            var index = ret.index;
            changeColor(index);
        });






    }
	
	
	
    
	
	
	
    function timeUpdata(){
//  	var updataMapID=window.setInterval(uploadMapInfo(function(ret,err){
//  		if(ret.status)
//  		{
//  			console.log('地理位置实时上传正常');
//  		}
//  		else
//  		{
//  			console.log('地理位置实时上传异常');
//  			var updataMapError=window.setInterval(uploaderMapInfo(function(ret,err){
//  				if(ret.status)
//  				{
//  					console.log('地理位置实时上传恢复');
//  					clearInterval(updataMapError);
//  				}
//  				else
//  				{
//  					console.log('地理位置实时上传未恢复');
//  				}
//  			}),10000);
//  		}
//  	}),5000);
    	window.updataMapID=window.setInterval("uploadMapInfo(function(ret,err){if(ret.status){console.log('地理位置实时上传正常');}else{console.log('地理位置实时上传异常');window.timeOutError=window.setInterval(\"uploadMapInfo(function(ret,err){if(ret.status){console.log('地理位置实时上传恢复');window.clearInterval(window.timeOutError);}else{console.log('地理位置实时上传未恢复');}})\",40000);}})",30000);    	
    }
    function loadInfo(){
		fsExist("fs://user.txt",function(ret,err){
			if(ret.exist)
			{
				console.log(JSON.stringify(ret));
		    	fsRead("fs://user.txt",function(ret,content){
		    		if(ret.status)
		    		{
		    			console.log(content);
		    			var user=JSON.parse(content);
						$api.setStorage("identity","passenger");		    			
		            	$api.setStorage("login",user.login);
						$api.setStorage("id",user.id);
						$api.setStorage("tel",user.tel);
						$api.setStorage("nickname",user.nickname);
						$api.setStorage("map_id",user.map_id);
						$api.setStorage("mutex","true");
						$api.setStorage("stop","false");
						console.log("数据导入成功");
						mcmUpdataById(user.id,user.login,function(ret,err){
							if(ret.status)
							{
								console.log(JSON.stringify(ret));
								console.log("网络连接成功，本地数据同步成功");
								$api.setStorage("network","true");
							}
							else
							{
								console.log(JSON.stringify(err));
								console.log("网络连接不成功，本地数据 同步失败");
								$api.setStorage("network","false");
							}
						});
						if(user.login=="true")
						{
							checkLocSer(function(ret){
					        	if(ret.status)
					        	{
					        		console.log("获得定位权限，开启地理信息实时上传");
					        		if($api.getStorage("map_id")<20)
					        		{
					        			console.log("map_id异常");
						        		mcmWhetherMapId(function(ret,err){
						        			if(ret.status)
						        			{
								        		uploadMapInfo(function(ret,err){
								        			if(ret.status)
								        			{
								        				console.log("地理信息上传最终成功");
								        			}
								        			else
								        			{
								        				console.log("地理信息上传最终失败");
								        			}
								        		})					        				
						        			}
						        			else
						        			{
						        				console.log("map_id修复失败");
						        			}
						        		});
					        		}
					        		else
					        		{
					        			console.log("map_id正常");
						        		uploadMapInfo(function(ret,err){
						        			if(ret.status)
						        			{
						        				console.log("地理信息上传最终成功");
						        			}
						        			else
						        			{
						        				console.log("地理信息上传最终失败");
						        			}
						        		})					        		
					        		}					        		
					        	}
					        	else
					        	{
					        		console.log("未得到定位权限，位置坐标未上传");
					        	}
					        });
						}
						else
						{
							console.log("未登录，未检测地理坐标信息");
						}										
		    		}
		    		else
		    		{
		    			console.log(content);
						$api.setStorage("identity","passenger");		    			
		              	$api.setStorage("login","false");
						$api.setStorage("id","");
						$api.setStorage("tel","");
						$api.setStorage("nickname","货急送");
						$api.setStorage("map_id","");
						$api.setStorage("mutex","true");
						$api.setStorage("stop","false");						  			
		    			console.log("数据导入失败");
		    		}
		    	});				
			}
			else
			{
				console.log(JSON.stringify(err));
				$api.setStorage("mutex","true");
				$api.setStorage("stop","false");				
				$api.setStorage("identity","passenger");
              	$api.setStorage("login","false");
				$api.setStorage("id","");
				$api.setStorage("tel","");
				$api.setStorage("nickname","货急送");
				$api.setStorage("map_id","");  			
    			console.log("文件不存在，数据导入失败");				
			}
		});
    }
    function funIniGroup(){
        var eHeaderLis = $api.domAll('header li'),
            frames = [];
        for (var i = 0,len = eHeaderLis.length; i < len; i++) {
                frames.push( { 
                    name: 'frame'+i, 
                    url: './html/frame'+i+'.html', 
                    bgColor : 'rgba(0,0,0,.2)',
                    bounces:true
                } )
        }
        $api.setStorage('header-Height',$api.dom('header').offsetHeight);
        $api.setStorage('foot-Height',$api.dom('#main').offsetHeight);
        api.openFrameGroup({
            name: 'group1',
            customRefreshHeader:'UIPullRefresh',
            scrollEnabled: false,
            rect: {
                x: 0, 
                y: $api.dom('header').offsetHeight, 
                w: api.winWidth, 
                h: $api.dom('#main').offsetHeight
            },
            index: 0,
          preload:0,
            frames: frames
        }, function (ret, err) {
            var index = ret.index;
        });
    }

    // 随意切换按钮
    var changeGroup1Index = function(index){
        api.setFrameGroupIndex({//设置 frame 组当前可见 frame
            name: 'group1',
            index: index,
            scroll: true
        });
        
        if( index != 2)//隐藏显示frame1中的order_manage-group
        {
        api.setFrameGroupAttr({
        name: 'order_manage-group',
        hidden: true
        });
        }else{
          api.setFrameGroupAttr({
        name: 'order_manage-group',
        hidden: false
        });  
        }
		
		if( index != 1)//隐藏显示frame1中的order_manage-group
        {
        api.setFrameGroupAttr({
        name: 'seek_car_cargo',
        hidden: true
        });
        }else{
          api.setFrameGroupAttr({
        name: 'seek_car_cargo',
        hidden: false
        });  
        }
        
        if( index != 0)//隐藏显示frame0中的index_group
        {
        api.setFrameGroupAttr({
        name: 'index_group',
        hidden: true
        });
        }else{
            api.setFrameGroupAttr({
        name: 'index_group',
        hidden: false
        });
        }
    };
    function randomSwitchBtn( tag ) {
        if( tag == $api.dom('#footer li.active') )return;
        var eFootLis = $api.domAll('#footer li'),
            eHeaderLis = $api.domAll('header li'),
            index = 0;
        for (var i = 0,len = eFootLis.length; i < len; i++) {
            if( tag == eFootLis[i] ){
                index = i;
            }else{
                $api.removeCls(eFootLis[i], 'active');
                $api.removeCls(eHeaderLis[i], 'active');
            }
        }
        $api.addCls( eFootLis[index], 'active');
        $api.addCls( eHeaderLis[index], 'active');
        api.setFrameGroupIndex({
            name: 'group1',
            index: index
        });
    }
    function mcmWhetherMapId(back)
    {
		var query=api.require('query');
		var model=api.require('model');
		model.config({
		    appId:'A6932793671075',
		    appKey:'56926729-60C6-147B-4323-43298EA81159'
	    });
	    query.createQuery({
        },function(ret,err){
        	if(ret)
        	{
        		query.whereEqual({
	                qid:ret.qid,
	                column:'users_id',
	                value:$api.getStorage("id")
                });
                model.findAll({
	                class:'map',
	                qid:ret.qid
                },function(ret,err){
                	if(ret)
                	{
                		console.log(JSON.stringify(ret));
                		if(ret.length==0)
                		{
                			console.log("map里面不存在user_id");
                			mcmMapCreate($api.getStorage("id"),function(ret,err){
                				if(ret)
                				{
                					console.log("map创建user_id成功");
                					var map_id=ret.id;
                					$api.setStorage("map_id",map_id);
                					mcmUpdataMapIdById($api.getStorage("id"),map_id,function(ret,err){
                						if(ret.status)
                						{
		                 					console.log("map_id载入user成功");
					                		var back_ret=JSON.parse('{"status":true}');
					                		var bacK_err=JSON.parse('{"error":"0"}');
					                		back(back_ret,back_err);                							
                						}
                						else
                						{
                							console.log("map_id载入user_id失败");
					                		var back_ret=JSON.parse('{"status":false}');
					                		var bacK_err=JSON.parse('{"error":"map_id和user_id配对失败","code":"mcm"}');
					                		back(back_ret,back_err);                							
                						}
                					});
                				}
                				else
                				{
                					console.log("map创建user_id失败");
			                		var back_ret=JSON.parse('{"status":false}');
			                		var bacK_err=JSON.parse('{"error":"创建map_id错误","code":"mcm"}');
			                		back(back_ret,back_err);                					
                				}
                			});               			
                		}
                		else
                		{
        					var map_id=ret[0].id;
        			        $api.setStorage("map_id",map_id);
        					mcmUpdataMapIdById($api.getStorage("id"),map_id,function(ret,err){
        						if(ret.status)
        						{
                 					console.log("map_id载入user成功");
			                		var back_ret=JSON.parse('{"status":true}');
			                		var bacK_err=JSON.parse('{"error":"0"}');
			                		back(back_ret,back_err);                							
        						}
        						else
        						{
        							console.log("map_id载入user_id失败");
			                		var back_ret=JSON.parse('{"status":false}');
			                		var bacK_err=JSON.parse('{"error":"map_id和user_id配对失败","code":"mcm"}');
			                		back(back_ret,back_err);                							
        						}
        					});                			                 			
                		}
                	}
                	else
                	{
                		var back_ret=JSON.parse('{"status":false}');
                		var bacK_err=JSON.parse('{"error":"findAll错误","code":"mcm"}');
                		back(back_ret,back_err);
                	}
                });
        	}
        	else
        	{
        		console.log(JSON.stringify(err));
        		console.log("创建query失败");
        		var back_ret=JSON.parse('{"status":false}');
        		var back_err=JSON.parse('{"error":"创建query失败","code":"mcm"}');
        	}
        });
    }
	/*creat fs*/
	function fsCreate(path,back){
		var fs=api.require('fs');
		fs.createFile({
		    path: path
	    },function(ret,err){
	    	if(ret)
	    	{
	    		console.log(ret);
	    		var back_ret=JSON.parse('{"status":true}');
	    		var back_err=JSON.parse('{"status":false,"error":4}');
	    		back(back_ret,back_err);
	    	}
	    	else
	    	{
	    		console.log(err);
	    		var back_ret=JSON.parse('{"status":true}');
	    		var back_err=JSON.parse('{"status":false,"error":3}');
	    		back(back_ret,back_err);    		
	    	}
	    });
	}
	/*read some info to fs*/
	function fsRead(path,back){
		var fs=api.require('fs');
		fs.open({
		    path:path,
		    flags:'read_write'
	    },function(ret,err){
	    	if(ret.status)
	    	{
	    		var fid=ret.fd;
	    		console.log(JSON.stringify(ret));
	    		fs.read({
	                fd:fid
	            },function(ret,err){
	            	if(ret.status)
	            	{
	            		console.log(JSON.stringify(ret));
	            		var content=ret.data;
	            		fs.close({
		                    fd:fid
	                    },function(ret,err){
	                    	if(ret)
	                    	{
	                    		console.log(JSON.stringify(ret));
	                    		console.log(content);
	                    		var back_ret=JSON.parse('{"status":true}');
			    				var back_content=content;
			    				back(back_ret,back_content); 
	                    	}
	                    	else
	                    	{
	                    		console.log(JSON.stringify(err));
	                    		var back_ret=JSON.parse('{"status":false}');
			    				var back_content=content;
			    				back(back_ret,back_content); 
	                    	}
	                    });          		
	            	}
	            	else
	            	{
	            		console.log(JSON.stringify(err));
	            		fs.close({
		                    fd:fid
	                    },function(ret,err){
	                    	if(ret)
	                    	{
	                    		console.log(JSON.stringify(ret));
	                    		var back_ret=JSON.parse('{"status":false}');
			    				var back_err=JSON.parse('{"status":false,"error":3}');
			    				back(back_ret,back_err); 
	                    	}
	                    	else
	                    	{
	                    		console.log(JSON.stringify(err));
	                    		var back_ret=JSON.parse('{"status":false}');
					    		var back_err=JSON.parse('{"status":false,"error":3}');
					    		back(back_ret,back_err); 
	                    	}
	                    });             		
	            	}
	            });
	    	}
	    	else
	    	{
	    		console.log(JSON.stringify(err));
	    		var back_ret=JSON.parse('{"status":false}');
	    		var back_err=JSON.parse('{"status":false,"error":3}');
	    		back(back_ret,back_err);    	
	    	}
	    });
	}	
	/*write some info to fs*/
	function fsWrite(path,content,back){
		var fs=api.require('fs');
		fs.open({
		    path:path,
		    flags:'read_write'
	    },function(ret,err){
	    	if(ret.status)
	    	{
	    		var fid=ret.fd;
	    		console.log(JSON.stringify(ret));
	    		fs.write({
		            fd:fid,
		            data:content,
		            offset:0,
		            overwrite:true
	            },function(ret,err){
	            	if(ret.status)
	            	{
	            		console.log(JSON.stringify(ret));
	            		fs.close({
		                    fd:fid
	                    },function(ret,err){
	                    	if(ret)
	                    	{
	                    		console.log(JSON.stringify(ret));
	                    		var back_ret=JSON.parse('{"status":true}');
			    				var back_err=JSON.parse('{"status":false,"error":4}');
			    				back(back_ret,back_err); 
	                    	}
	                    	else
	                    	{
	                    		console.log(JSON.stringify(err));
	                    		var back_ret=JSON.parse('{"status":false}');
					    		var back_err=JSON.parse('{"status":false,"error":3}');
					    		back(back_ret,back_err); 
	                    	}
	                    });          		
	            	}
	            	else
	            	{
	            		console.log(JSON.stringify(err));
	            		fs.close({
		                    fd:fid
	                    },function(ret,err){
	                    	if(ret)
	                    	{
	                    		console.log(JSON.stringify(ret));
	                    		var back_ret=JSON.parse('{"status":false}');
			    				var back_err=JSON.parse('{"status":false,"error":3}');
			    				back(back_ret,back_err); 
	                    	}
	                    	else
	                    	{
	                    		console.log(JSON.stringify(err));
	                    		var back_ret=JSON.parse('{"status":false}');
					    		var back_err=JSON.parse('{"status":false,"error":3}');
					    		back(back_ret,back_err); 
	                    	}
	                    });             		
	            	}
	            });
	    	}
	    	else
	    	{
	    		console.log(JSON.stringify(err));
	    		var back_ret=JSON.parse('{"status":false}');
	    		var back_err=JSON.parse('{"status":false,"error":3}');
	    		back(back_ret,back_err);    	
	    	}
	    });
	}
	/*check whether the file(users.txt) exist */
	function fsExist(path,back){
		var fs=api.require('fs');
		fs.exist({
		    path:path
	    },function(ret,err){
	    	if(ret.exist)
	    	{
	    		console.log(JSON.stringify(ret));
	    		var back_ret=JSON.parse('{"status":true,"exist":true}');
	    		var back_err=JSON.parse('{"status":false,"error":4}');
	    		back(back_ret,back_err);
	    	}
	    	else
	    	{
	    		console.log(JSON.stringify(err));
	    		var back_ret=JSON.parse('{"status":true,"exist":false}');
	    		var back_err=JSON.parse('{"status":false,"error":3}');
	    		back(back_ret,back_err);
	    	}
	    });
	}
	/*change the cloud status of the login from false 
	  to true*/
	function mcmUpdataById(id,value,back){
		var query=api.require('query');
		var model=api.require('model');
		console.log(id+value);
		model.config({
		    appId:'A6932793671075',
		    appKey:'56926729-60C6-147B-4323-43298EA81159'
	    });
	    model.updateById({
		    class:'users',
		    id:id,
		    value:{
		    	login:value
		    }
	    },function(ret,err){
	    	if(ret)
	    	{
	    		console.log(JSON.stringify(ret));
	    		var back_ret=JSON.parse('{"status":true}');
	    		var back_err=JSON.parse('{"status":false}');
	    		back(back_ret,back_err);
	    	}
	    	else
	    	{
	    		console.log(JSON.stringify(err));
	    		var back_ret=JSON.parse('{"status":false}');
	    		var back_err=JSON.parse('{"status":false}');
	    		back(back_ret,back_err);
	    	}
	    });
	}
	function checkLocSer(back){
		var bMap=api.require('bMap');
		bMap.getLocationServices(
	        function(ret,err) {
        	if(ret.enable)
        	{
        		console.log("本地定位权限开启");
        		var back_ret=JSON.parse('{"status":true}');
        		back(back_ret);
        	}
        	else
        	{
        		console.log("本地定位权限未开启");
        		var back_ret=JSON.parse('{"status":false}');
        		back(back_ret);
        	}
        });
	}
	function uploadMapInfo(back){
		getMapLoc(function(ret,err){
			if(ret.status)
			{
				var map_id=$api.getStorage("map_id");
				$api.setStorage("map_lon",ret.lon);
				$api.setStorage("map_lat",ret.lat);
				if(map_id.length<20)
				{
					console.log("map_id错误");					
				}
				else
				{
					console.log("map_id可行");
					updataMapLoc(ret.lon,ret.lat,function(ret,err){
			        	if(ret.status)
			        	{
			        		console.log("地理信息上传成功");
			        		var back_ret=JSON.parse('{"status":true}');
			        		var back_err=JSON.parse('{"error":"0"}');
			        		back(back_ret,back_err);
			        	}
			        	else
			        	{
			        		console.log("地理信息上传失败");
			        		console.log(JSON.stringify(err));
			        		var back_ret=JSON.parse('{"status":false}');
			        		var back_err=err;
			        		back(back_ret,back_err);        		
			        	}
					});
				}
			}
			else
			{
				console.log("定位信息获取失败");
				var back_ret=JSON.parse('{"status":false}');
				var back_err=JSON.parse('{"status":false,"error":"定位信息获取失败"}');
				back(back_ret,back_err);
			}
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
	function updataMapLoc(lon,lat,back){
		var model=api.require('model');
		model.config({
		    appId:'A6932793671075',
		    appKey:'56926729-60C6-147B-4323-43298EA81159'
	    });
	    model.updateById({
	        class:'map',
	        id:$api.getStorage("map_id"),
	        value:{
	        	lon:lon,
	        	lat:lat
	        }
        },function(ret,err){
        	if(ret)
        	{
        		console.log("地理信息上传成功");
        		var back_ret=JSON.parse('{"status":true}');
        		var back_err=JSON.parse('{"error":"0"}');
        		back(back_ret,back_err);
        	}
        	else
        	{
        		console.log("地理信息上传失败");
        		console.log(JSON.stringify(err));
        		var back_ret=JSON.parse('{"status":false}');
        		var back_err=err;
        		back(back_ret,back_err);        		
        	}
        });
	}
/*insert info to mcm database*/
function mcmMapCreate(id,back)
{
	var query=api.require('query');
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159'
    });
    model.insert({
	    class:'map',
	    value:{
	    	users_id:id,
	    	lon:"",
	    	lat:""
	    }
    },function(ret,err){
    	if(ret)
    	{
    		console.log(JSON.stringify(ret));
    		var back_ret=JSON.parse('{"status":true,"id":"'+ret.id+'"}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret=JSON.parse('{"status":false}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
    	}
    });
}	
function mcmUpdataMapIdById(id,map_id,back){
	var query=api.require('query');
	var model=api.require('model');
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159'
    });
    model.updateById({
	    class:'users',
	    id:id,
	    value:{
	    	map_id:map_id
	    }
    },function(ret,err){
    	if(ret)
    	{
    		console.log(JSON.stringify(ret));
    		var back_ret=JSON.parse('{"status":true}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret=JSON.parse('{"status":false}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
    	}
    });
}