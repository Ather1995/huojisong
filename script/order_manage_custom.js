function goback () {
    api.closeWin({name:'order_manage_custom'});
}

apiready=function()
{
       window.headerTabBar = $api.dom('.order_manage-tabBar');
       
        window.main = $api.byId('main');
        var mainPos = $api.offset(main);


        var groupColor = $api.getStorage('theme');
        if (groupColor && groupColor == 1) {
            groupColor = '#1E1E23';
        } else{
            groupColor = '#FFFFFF';
        }
        var y_pos=parseInt($api.dom('#button-switch').offsetHeight)+parseInt($api.getStorage('header-Height'));
        var h_hei=parseInt($api.getStorage('foot-Height'))-parseInt($api.dom('#button-switch').offsetHeight);
        api.openFrameGroup({//打开 frame 组frame 组打开后，当前页面加载完成后，页面会预加载后面指定个数页面
            name: 'order_manage-group',
            background: groupColor,
            scrollEnabled: true,
            rect: {
                x: 0,
                y: y_pos,
                w: 'auto',
                h: 'auto'
            },
            index: 0,
            frames:[
                {
                    name: 'all-type', 
                    url: './order_manage/driver_all_order.html', 
                    pageParam:{}, 
                    bounces:true, //（可选项）页面是否弹动
                    opaque:true,
                    bgColor: groupColor
                },{
                    name: 'inservice', 
                    url: './order_manage/driver_inservice.html', 
                    pageParam:{}, 
                    bounces:true, 
                    opaque:true,
                    bgColor: groupColor
                },{
                    name: 'evaluate', 
                    url: './order_manage/driver_evaluate.html', 
                    pageParam:{}, 
                    bounces:true, 
                    opaque:true,
                    bgColor: groupColor
                },{
                    name: 'cancel', 
                    url: './order_manage/driver_cancel.html', 
                    pageParam:{}, 
                    bounces:true, 
                    opaque:true,
                    bgColor: groupColor
                }
            ]
        }, function(ret, err){
            var name = ret.name;
            var index = ret.index;
            changeBar(index);
        });
        
        
};



    var aTabBarBtn = $api.domAll('.order_manage-tabBar .tabBar-btn');
    var tabBar = $api.dom('.order_manage-tabBar .tabBar-bar');
    var changeBar = function(index){
        tabBar.style.webkitTransform = 'translateX('+(100*index)+'%)';// translate：平移，基于XY轴重新定位元素。translate(Xpx,Ypx)。属性值为一个时，x、y轴参数相同；为两个时，x、y轴分别定位
        tabBar.style.transform = 'translateX('+100*index+'%)';
        for (var i = 0,len = aTabBarBtn.length; i < len; i++) {
            if (index == i) {
                $api.addCls(aTabBarBtn[i],'active');
            } else{
                $api.removeCls(aTabBarBtn[i],'active');
            }
            
        };
    };
    // 窗口组切换
    var changeGroupIndex = function(index){
        api.setFrameGroupIndex({//设置 frame 组当前可见 frame
            name: 'order_manage-group',
            index: index,
            scroll: true
        });
    };
    