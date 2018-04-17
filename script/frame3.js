function changeHeader(){
		api.actionSheet({
		title:'上传头像',
		cancelTitle:'取消',
		buttons: ['拍照','从手机相册选择']
		},function(ret, err){
    	if (ret) {
    		getPicture(ret.buttonIndex);
    	}
	});
}
	function getPicture(sourceType) {
		if(sourceType==1){
			//拍照获取一张图片
			api.getPicture({
				sourceType:'camera',
				encodingType:'png',
				mediaValue:'pic',
				allowEdit:false,
				quality:90,
				saveToPhotoAlbum:true
				},function(ret, err){
					// 获取拍照数据并处理
					if (ret) 
					{
						//ret.data表示图片
						var imgSrc =ret.data;
						if (imgSrc !="")
						{
							var ele=$api.dom('#head');
							$api.attr(ele,'src',imgSrc);
						}
					}
				});
			}else if(sourceType==2){
				// 从相机中选择UIMediaScanner 是一个多媒体扫描器，可扫描系统的图片、视频等多媒体资源
				var obj =api.require('UIMediaScanner');
				obj.open({
					//返回的资源种类,picture（图片）,video（视频）,all（图片和视频
					type:'picture',
					//（可选项）图片显示的列数，须大于1
					column:4,max:1,
					//（可选项）图片排序方式,asc（旧->新）,desc（新->旧
					sort:
					{
						key:'time',
						order:'desc'
					},
					//（可选项）模块各部分的文字内容
					texts:{stateText:'已选择*项',cancelText:'取消',finishText:'完成'},
					styles:{
						bg:'#fff',
						mark:
						{
							icon:'',
							position:'bottom_right',
							size:20
						},
						nav:
						{
							bg:'#eee',
							stateColor:'#000',
							stateSize:18,
							cancleBg:'rgba(0,0,0,0)',
							cancelColor:'#000',
							cancelSize:18,
							finishBg:'rgba(0,0,0,0)',
							finishColor:'#000',
							finishSize:18
						}
					}
				},function(ret) {
				/* 获取图片数据并处理*/
					if(ret){
						if(getJsonObjLength(ret.list)!=0)
						{
							obj.transPath({
	                            path: ret.list[0].path
                            },function(ret,err){
                            	if(ret)
                            	{
									var ele=$api.dom('#head');
									$api.attr(ele,'src',ret.path);
									savePicture(ret.path);
//									upPicture(ret.path);
                            	}
                            	else
                            	{
                            		console.log(JSON.stringify(err));
                            	}
                            });

						}
					};
				});
			}
		}
	  function getJsonObjLength(jsonObj) {
		    var Length = 0;
		    for (var item in jsonObj) {
		      Length++;
		    }
		    return Length;
	  }
	  function savePicture(PicURL){
	  	var account=getFileName(PicURL);
	  	var fs = api.require('fs');
		fs.copyTo({
		    oldPath: PicURL,
		    newPath: 'fs://'
		}, function(ret, err) {
		    if (ret.status) {
		    	console.log(JSON.stringify(ret));
		    } else {
		        console.log(JSON.stringify(err));
		    }
		});
	fs.exist({
	    path:'fs://userHeadImg.txt'
	},function(ret,err){
		if(ret)
		{
			if(ret.exist)
			{
				fs.open({
	                path: 'fs://userHeadImg.txt',
	                flags: 'write'
	            },function(ret,err){
	            	if(ret)
	            	{
	            		fs.write({
	                        fd:ret.fd,
	                        data:account,
	                        offset:0,
	                        overwrite:true	
	                    },function(ret,err){
	                    	if(ret){console.log(JSON.stringify(ret))}
	                    	else{alert(JSON.stringify(err));} 
	                    });
	            		fs.close({
	                        fd:ret.fd,
	                    },function(ret,err){
	                    	if(ret){}
	                    	else{alert(JSON.stringify(err));}
	                    });                        
	            	}
	            	else
	            	{
	            		alert(JSON.stringify(err));                		
	            	}
	            });
			}
			else
			{
				fs.createFile({
	                path: 'fs://userHeadImg.txt'
	            },function(ret,err){
	            	if(ret)
	            	{
	            		fs.open({
	                        path: 'fs://userHeadImg.txt',
	                        flags: 'write'
	                        },function(ret,err){
	                        	if(ret)
	                        	{
			                		fs.write({
			                            fd:ret.fd,
			                            data:account,
			                            offset:0,
			                            overwrite:true	
			                        },function(ret,err){
			                        	if(ret){}
			                        	else{alert(JSON.stringify(err));} 
			                        });
			                		fs.close({
			                            fd:ret.fd,
			                        },function(ret,err){
			                        	if(ret){}
			                        	else{alert(JSON.stringify(err));}
			                        }); 
	                        	}
	                        	else
	                        	{
	                        		alert(JSON.stringify(err));
	                        	}
	                        });
	                	}
	                	else
	                	{
	                		alert(JSON.stringify(err));
	                	}
	                });    			
	    		}
	    	}
	    	else
	    	{
	    		alert(JSON.stringify(err));
	    	}
	    });
	  }
	function getFileName(o){
		var tmp=new Array();
		tmp=o.split("/");
		return tmp[tmp.length-1];
	}
	function isExistedFile(path,ExistedBack)
	{
		var fs=api.require('fs');			
		fs.exist({
            path: path
        },function(ret,err){
        	if(ret)
        	{
        		if(ret.exist)
        		{
        			ExistedBack("true");
        			return;
        		}
        		else
        		{
        			ExistedBack("false");
        			return;
        		}
        	}
        	else
        	{
        		alert(JSON.stringify(err));
        		return ;
        	}
        });		
	}	
	function changeHeadImg(source)
	{
		if(source!="none")
		{
			var ele=$api.dom('#head');
			isExistedFile(api.fsDir+'/'+source,function(state){
				if(state=="true")
				{
					$api.attr(ele,'src',api.fsDir+'/'+source);
				}
				else
				{
					downLoadImg("fs://"+source,$api.getStorage("img_id"),function(state){
						if(state=="true")
						{
							$api.attr(ele,'src',api.fsDir+'/'+source);
						}
						else
						{
							$api.attr(ele,'src','../image/head.png');
						}
					})
				}
			})
					
		}
		else
		{
			$api.attr(ele,'src','../image/head.png');
		}
	}	
	function headImg(state)
	{

		if(state=="true")
		{
			isExistedFile("fs://userHeadImg.txt",function(state){
				if(state=="true")
				{
					readFile("fs://userHeadImg.txt",function(state,content){
						if(state=="true")
						{
					 		source=content;
							if(source=="null")
							{
								source="none";
								changeHeadImg(source);
							}
							else
							{
								changeHeadImg(source);
							}
							
						}
						else
						{
							changeHeadImg("none");
						}
					})
				}
				else
				{
					changeHeadImg("none");
				}
			})
		}
		else
		{
			source="none";
			changeHeadImg(source);
		}
	}			  	
function openMyNewWin(type)
{
	api.openWin({
	    name: type,
	    url: './my/'+type+'.html'
    });
}


function changeToLogin()
{
	if($api.getStorage("login")=="true")
	{
		console.log("exit()");
		exit();
	}
	else
	{
		console.log("login()");
		login();
	}
}
function exit(){
	var nickname=document.getElementById("nickname");
	var exit=document.getElementById("exit");
	var login="false";
	var id=$api.getStorage("id");
	var tel=$api.getStorage("tel");
	var nickname=$api.getStorage("nickname");
	var map_id=$api.getStorage("map_id");
	var content='{"login":"'+login+'","id":"'+id+'","tel":"'+tel+'","nickname":"'+nickname+'","map_id":"'+map_id+'"}';
	console.log(content);
	fsExist("fs://user.txt",function(ret,err){
		if(ret.exist)
		{
			console.log(JSON.stringify(ret));
			fsWrite("fs://user.txt",content,function(ret,err){
				if(ret.status)
				{
					console.log(JSON.stringify(ret));
				}
				else
				{
					console.log(JSON.stringify(err));
				}
			});
			mcmUpdataById(id,function(ret,err){
				if(ret.status)
				{
					console.log(JSON.stringify(ret));
					console.log("网络连接成功，退出信息已经同步");
				}
				else
				{
					console.log(JSON.stringify(err));
					console.log("网络连接不稳定，退出信息未同步");
				}
			});				
		}
		else
		{
			console.log(JSON.stringify(ret));
			fsCreate("fs://user.txt",function(ret,err){
				if(ret.status)
				{
					console.log(JSON.stringify(ret));
					fsWrite("fs://user.txt",content,function(ret,err){
						if(ret.status)
						{
							console.log(JSON.stringify(ret));
						}
						else
						{
							console.log(JSON.stringify(err));
						}
					});
				}
				else
				{
					console.log(JSON.stringify(err));
				}
			});
		}
	});
	nickname.innerHTML="货急送";
	exit.innerHTML="登录";			
	api.openWin({
	    name: 'login',
	    url: './login.html',
	    softInputMode:'resize',
	    animation:{
		    type:"movein",             
		    subType:"from_right",      
		    duration:500
	    }
    });	
}
function login(){	
	api.openWin({
	    name: 'login',
	    url: './login.html',
	    animation:{
		    type:"movein",             
		    subType:"from_right",      
		    duration:500 
	    }
    });	
}
function loadInfo(){
	var nickname=document.getElementById("nickname");
	var exit=document.getElementById("exit");
	var login=$api.getStorage("login");
	var id=$api.getStorage("id");
	var tel=$api.getStorage("tel");
	var nname=$api.getStorage("nickname");
	if(login=="true")
	{
		nickname.innerHTML=nname;
		exit.innerHTML="退出";
	}
	else
	{
		nickname.innerHTML="货急送";
		exit.innerHTML="登录";
	}
}
apiready=function(){
	if($api.getStorage('login')=='true')
	{
		headImg("true");
	}
	else
	{
		var ele=$api.dom('#head');
		$api.attr(ele,'src','../image/1.jpg');				
	}
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
	
	loadInfo();
	api.addEventListener({
	    name:'login'
    },function(ret,err){
    	var nickname=$api.getStorage("nickname");
    	document.getElementById("nickname").innerHTML=nickname;
    	document.getElementById("exit").innerHTML="退出";
    	var id=$api.getStorage("id");
    	var map_id=$api.getStorage("map_id");
    	mcmUpdataMapIdById(id,map_id,function(ret,err){
    		if(ret.status)
    		{
    			console.log("网络连接成功，map_id已经上传到user");
    		}
    		else
    		{
    			console.log("网络连接不成功，map_id没有上传到user，请稍后重试");
    		}
    	});
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
/*change the cloud status of the login from true 
  to false*/
function mcmUpdataById(id,back){
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
	    	login:'false'
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
	function readFile(path,readBack)
	{
		var fs=api.require('fs');
		fs.open({
	        path: path,
	        flags: 'read'
        },function(ret,err){
        	if(ret)
        	{
        		var fid=ret.fd;
        		fs.read({
	                fd:fid
                },function(ret,err){
                	if(ret)
                	{
                		readBack("true",ret.data);
		                fs.close({
		                    fd:fid,
		                },function(ret,err){
		                	if(ret){}
		                	else{alert(JSON.stringify(err));}
		                });
                	}
                	else
                	{
                		readBack("false","0");
                		alert(JSON.stringify(err));
                	}
                });
        	}
        	else
        	{
        		readBack("false","0");
        		alert(JSON.stringify(err));
        	}
        });
	}
	function writeFile(content,path)
	{
		var fs=api.require('fs');
		fs.open({
            path: path,
            flags: 'write'
        },function(ret,err){
        	if(ret)
        	{
        		var fid=ret.fd;
        		fs.write({
                    fd:fid,
                    data:content,
                    offset :0,
                    overwrite:true	                                
                },function(ret,err){
                	if(ret)
                	{
		                fs.close({
		                    fd:fid,
		                },function(ret,err){
		                	if(ret){}
		                	else{alert(JSON.stringify(err));}
		                });
                	}
                	else{alert(JSON.stringify(err));}                                	
                });
        	}
        	else
        	{
        		alert(JSON.stringify(err));
        	}
        });
	}
	function createFile(path)
	{
		var fs=api.require('fs');	
		fs.createFile({
            path: path
        },function(ret,err){
        	if(ret)
        	{
        	}
        	else
        	{
        		alert(JSON.stringify(err));
        	}
        });	
	}