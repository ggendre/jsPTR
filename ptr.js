//use it like this
/*
	//on doc loaded
	ptr.enable(function onPTR(release){
			//do something
			//then release PTR
			release();
	});
*/


var ptr_height=40;
(function($){

	var applyCss=function(css){
		var style = document.createElement('style'),
			head = document.getElementsByTagName('head')[0];

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	};
	
	var ptr={
		css : 'body{ transition-duration: 0.2s; transition-property: all; -webkit-transition-duration: 0.2s;	-webkit-transition-property: all; -webkit-perspective: 0; -webkit-transform: translate3d(0,0,0); } '+
				'#ptr{ height:'+ptr_height+'px; position:absolute; width:100%; top:-'+ptr_height+'px; text-align:center; }' +
				'#ptr .content{ position:relative; width:280px; margin:0 auto; height:100%; }' +
				'#ptr .release_please, #ptr .pull_please{ margin:10px; }' +
				'#ptr .loading{ margin-top:10px; }' +
				'#ptr .arrow{ position:absolute; display:inline-block; width:'+(ptr_height-10)+'px; height:'+(ptr_height-10)+'px; overflow:hidden; text-align:center; line-height:'+(ptr_height-10)+'px;font-size:'+(ptr_height-10)+'px; top:8px; left:10px; -webkit-transform:rotate(180deg); transition-duration: 0.2s; transition-property: all; -webkit-transition-duration: 0.2s;-webkit-transition-property: all; }' +
				'#ptr .arrow, #ptr .pull_please, #ptr .release_please, #ptr .loading{ display:none; }' +
				'#ptr.pulling .arrow, #ptr.pulling .pull_please{ display:inline-block;}' +
				'#ptr.should_release .arrow, #ptr.should_release .release_please{ display:inline-block;}' +
				'#ptr.should_release .arrow{ -webkit-transform:rotate(0deg); }' +
				'#ptr.waiting .loading{ display:block;}',
				
		html : '<div id="ptr" class="pulling"><div class="content">' +
							'<div class="arrow">&#8682;</div><div class="pull_please">Tirer pour rafraîchir...</div><div class="release_please">Relâcher pour rafraîchir...</div>' +
				            '<div class="loading">Chargement...</div>' +
				          '</div></div>',
				          
		enable :function(refreshCallback){
			var start_x,start_y, last_x,last_y, start_time,
				ptr_state='pulling';
				
			
			$('body').prepend(this.html);
			applyCss(this.css);
	
			var scrollTo=function(y){
				$('body').css('margin-top',y+"px");
			};
			var updateState=function(){
				$('#ptr').removeClass('pulling').removeClass('should_release').removeClass('waiting').removeClass('released')
				$('#ptr').addClass(ptr_state)
			}
			var release=function(){
				ptr_state="release"
				updateState()
				scrollTo(0);
			}
		
			$('body').on('touchstart',function(e){
				start_x=e.touches[0].clientX;
				start_y=e.touches[0].clientY;
				last_x=start_x;
				last_y=start_y;
				start_time=new Date().getTime();
		
			})
		
			$('body').on('touchmove',function(e){
				var time=new Date().getTime();
				var x=e.touches[0].clientX;
				var y=e.touches[0].clientY;
				//console.log(x,y, time-start_time)
		
				if ($('body')[0].scrollTop==0 &&  y > start_y && (x-start_x < 50) && !$('body').hasClass('showSideMenu')){
					ptr_state='pulling';
					if (y-start_y < ptr_height){
						scrollTo(y-start_y)
					}else{
						scrollTo(ptr_height);
						ptr_state='should_release'
					}
					updateState();
	
	
				}
			})
		
			$('body').on('touchend',function(e){
				switch(ptr_state){
					case "pulling":	scrollTo(0); break;
					case "should_release":
						ptr_state="waiting";
						updateState()
						if (refreshCallback){
							refreshCallback(release);
						}
					break;
				}
		
			})
	
		}
	}
	window.ptr=ptr;

})( Zepto || jQuery );



