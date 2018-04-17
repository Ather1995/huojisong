	apiready = function(){
		var map_frame_x=api.winWidth*0.05;
		var map_frame_y=$api.getStorage('header-Height')*0.4;
		var map_frame_w=api.winWidth*0.9;
		var map_h=$api.dom('.bottom_f').offsetHeight;
		var map_ann_w=26;
		var map_ann_h=32;
		var map_ann_x=(api.winWidth-map_ann_w)/2;
		var map_ann_y=(api.winHeight/2)-map_ann_h;
		var map_city_x=map_frame_x;
		var map_city_y=map_frame_y+55;
		var map_city_h=200;
		var map_city_w=map_frame_w;
		api.openFrame({
	        name: 'map',
	        url: './map/map.html',
	        rect: {
		        x:0,
		        y:0,
		        w:api.winWidth,
		        h:map_h
	        }
        });
		api.openFrame({
	        name: 'map_frame',
	        url: './map/map_frame.html',
	        rect: {
		        x:map_frame_x,
		        y:map_frame_y,
		        w:map_frame_w,
		        h:50
	        }
        }); 
		api.openFrame({
	        name: 'map_ann',
	        url: './map/map_ann.html',
	        rect: {
		        x:map_ann_x,
		        y:map_ann_y,
		        w:map_ann_w,
		        h:map_ann_h
	        }
        });
        api.addEventListener({
	        name:'open_map_city'
        },function(ret,err){
        	api.openFrame({
	            name: 'map_item',
	            vScrollBarEnabled:"false",
	            url: './map/map_item.html',
	            rect: {
		            x:map_city_x,
		            y:map_city_y,
		            w:map_city_w,
		            h:map_city_h
	            }
            });
        });              
	};
	function mapGetCenter()
	{
		api.sendEvent({
	        name:'getCenter'
        });
	}