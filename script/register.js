/* error code:
 * 0--不存在错误
 * 1--网络连接错误
 * 2--mcm错误
 * 3--数据错误
 */
 function goback () {
    api.closeWin({name:'register'});
}
apiready=function(){
	document.getElementById("content").style.height=api.winWidth+"px";
	$api.fixStatusBar(document.getElementById("header"));
	api.setStatusBarStyle({
		    style: 'dark',
            color: '#222222'
    });
}
/*close the page and change to login page*/
function backToLogin()
{
	api.closeWin({
		name:'register'
    });
}
function closeLogin(){
	api.closeWin({
    	name:'login'
    });
}
/*to check the form of tel and pw*/
function validateTel(tel){
	var reg = /^1[3|4|5|8][0-9]\d{8}$/;
	return reg.test(tel);
}
function validatePW(pw){
	var reg = /^[A-Za-z0-9]{6,12}$/;
	return reg.test(pw);
}
function saveInfo(){
		var login=$api.getStorage("login");
		var id=$api.getStorage("id");
		var tel=$api.getStorage("tel");
		var nickname=$api.getStorage("nickname");
		var map_id=$api.getStorage("map_id");
		var content='{"login":"'+login+'","id":"'+id+'","tel":"'+tel+'","nickname":"'+nickname+'","map_id":"'+map_id+'"}';
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
}
function regist(){
	var tel=document.getElementById("tel").value;
	var pw=document.getElementById("pw").value;
	var pw_again=document.getElementById("pw_again").value
	console.log(tel+pw+pw_again);
	checkOffline(tel,pw,pw_again,function(ret,err){
		if(ret.status)
		{
			console.log(JSON.stringify(ret));
			api.showProgress({title: '注册中', modal: false});
			checkOnline(tel,pw,function(ret,err){
				if(ret.status)
				{
					console.log(JSON.stringify(ret));
					saveInfo()
					api.hideProgress();
					api.sendEvent({
	                    name:'login'
                    });
					closeLogin();
					backToLogin();
				}
				else
				{
					console.log(JSON.stringify(err));
					api.hideProgress();
					if(err.error==1)
					{
						api.toast({
		                    msg:'Sorry,您的网络抽风了~',
		                    location:'middle'
		                });					
					}
				}
			});			
		}
		else
		{
			console.log(JSON.stringify(err));
		}
	});
}
/*check the tel and pw offline*/
function checkOffline(tel,pw,pw_again,back){
	if(tel.length==0 || pw.length == 0){
		api.toast({msg: '请输入手机号和密码', location: 'middle'});
		var back_ret=JSON.parse('{"status":false}');
		var back_err=JSON.parse('{"status":false,"error":"tel or pw is empty"}');
		back(back_ret,back_err);
	}else if(pw != pw_again)
	{
		api.toast({msg: '两次输入密码不同，请重新输入', location: 'middle'});
		var back_ret=JSON.parse('{"status":false}');
		var back_err=JSON.parse('{"status":false,"error":"pw is different pw_again"}');
		back(back_ret,back_err);
	}
	else if(!validateTel(tel)){
		api.toast({msg: '手机号格式有误', location: 'middle'});
		var back_ret=JSON.parse('{"status":false}');
		var back_err=JSON.parse('{"status":false,"error":"the form of tel is wrong"}');
		back(back_ret,back_err);
	}else if(!validatePW(pw)){
		api.toast({msg: '密码格式有误', location: 'middle'});
		var back_ret=JSON.parse('{"status":false}');
		var back_err=JSON.parse('{"status":false,"error":"the form of pw is wrong"}');
		back(back_ret,back_err);
	}else{
		var back_ret=JSON.parse('{"status":true}');
		var back_err=JSON.parse('{"status":false}');
		back(back_ret,back_err);
	}	
}
/*check the tel and pw online*/
function checkOnline(tel,pw,back){
	var query=api.require('query');
	var model=api.require('model');
	console.log(tel+" "+pw);
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159'
    });
    query.createQuery({
    },function(ret,err){
    	if(ret&&ret.qid)
    	{
    		console.log(JSON.stringify(ret));
    		query.whereEqual({
	            qid:ret.qid,
	            column:'tel',
	            value:tel
            });          
            model.findAll({
	            class:'users',
	            qid:ret.qid
            },function(ret,err){
            	if(ret)
            	{
            		if(ret.length!=0) 
            		{
            			api.toast({
	                        msg:'手机号已存在'
                        });
						var back_ret=JSON.parse('{"status":false}');
						var back_err=JSON.parse('{"status":false,"error":3}');
						back(back_ret,back_err);
            		}
            		else
            		{
            			console.log(JSON.stringify(ret));
            			mcmInsert(tel,pw,function(ret,err){
            				if(ret.status)
            				{ 				           				
            					console.log(JSON.stringify(ret));
            					var login="true";
            					var id=ret.id;
            					var nickname=ret.nickname;
            					mcmMapCreate(id,function(ret,err){
            						if(ret.status)
            						{
            							console.log("map_id已经创建成功");
            							var map_id=ret.id;
		            					$api.setStorage("login",login);
		            					$api.setStorage("id",id);
		            					$api.setStorage("tel",tel);
		            					$api.setStorage("nickname",nickname);
		            					$api.setStorage("map_id",map_id);
		            					var back_ret=JSON.parse('{"status":true}');
										var back_err=JSON.parse('{"status":false,"error":0}');
										back(back_ret,back_err);		            					            							 
            						}
            						else
            						{
            							console.log("map_id没有创建成功");
		            					$api.setStorage("login",login);
		            					$api.setStorage("id",id);
		            					$api.setStorage("tel",tel);
		            					$api.setStorage("nickname",nickname);
		            					$api.setStorage("map_id","");
		            					var back_ret=JSON.parse('{"status":false}');
										var back_err=JSON.parse('{"status":false,"error":2}');
										back(back_ret,back_err);            							
            						}
            					});
            				}
            				else
            				{
						 		console.log(JSON.stringify(err));
								var back_ret=JSON.parse('{"status":false}');
								var back_err=JSON.parse('{"status":false,"error":2}');
								back(back_ret,back_err);
            				}
            			});
            		}
            	}
            	else
            	{
			 		console.log(JSON.stringify(err));
					var back_ret=JSON.parse('{"status":false}');
					var back_err=JSON.parse('{"status":false,"error":1}');
					back(back_ret,back_err);           		
            	}
            });
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret=JSON.parse('{"status":false}');
    		var back_err=JSON.parse('{"status":false,"error":2}');
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
/*insert info to mcm database*/
function mcmInsert(tel,pw,back)
{
	var query=api.require('query');
	var model=api.require('model');
	var order="{\"order\":[\"123\"]}";
	console.warn(order);
	console.log(tel+" "+pw);
	model.config({
	    appId:'A6932793671075',
	    appKey:'56926729-60C6-147B-4323-43298EA81159'
    });
    model.insert({
	    class:'users',
	    value:{
	    	tel:tel,
	    	pw:pw,
	    	nickname:"货急送",
	    	login:"true",
	    	map_id:"",
	    	order:order
	    }
    },function(ret,err){
    	if(ret)
    	{
    		console.log(JSON.stringify(ret));
    		var back_ret=JSON.parse('{"status":true,"id":"'+ret.id+'","nickname":"'+ret.nickname+'"}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
    	}
    	else
    	{
    		console.log(JSON.stringify(err));
    		var back_ret=JSON.parse('{"status":true}');
    		var back_err=JSON.parse('{"status":false}');
    		back(back_ret,back_err);
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