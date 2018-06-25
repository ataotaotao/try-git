$(document).ready(function() {
	
	//banner
	(function(){
		var banimg=$('.banner li'),
			banbtn=$('.arrow a');
		var n=0,maxn=banimg.length-1;
		
		banbtn.eq(0).addClass('cur');
		
		var timer=setInterval(nextf,5000);
		
		banbtn.hover(function(){
			if(banimg.is(':animated')){
				return false;	
			}
			clearInterval(timer);
			n=$(this).index();
			play();
			timer=setInterval(nextf,5000);
		});
		
		function nextf(){
			n=n+1>maxn?0:n+1;
			play();
		}
		
		function play(){
			banimg.eq(n).fadeIn().siblings().fadeOut();
			banbtn.eq(n).addClass('cur').siblings().removeClass('cur');
		}
		
	})();
	
	//合作
	/*$('.home_div7').slick({
	  	slidesToShow: 8,
	  	slidesToScroll: 1,
	});*/
	
	//导航
	$(function(){
		$(".home_menu li").hover(function(){
			$(this).children(".navbox").stop(true,true).slideDown(200);
		},function(){
			$(this).children(".navbox").stop(true,true).slideUp(0);
		});	
	});
	
	
	$(function(){
		$.fn.smartFloat = function smartFloat(){
			var sfobj = $(this), top = sfobj.offset().top, left = sfobj.offset().left;
			$(window).scroll(function() {
	            var scrolls = $(window).scrollTop();
	            if (scrolls > top)
                    sfobj.css({
                        "position": "fixed",
                        "top": 0,
                        "left": 0
                    });
	            else
	                sfobj.css({
	                    "position": "fixed",
	                    "top": top - scrolls,
	                    "left": 0,
	                    "z-index":99999,
	                });
	        });
		}
		$(".menu_btn").smartFloat();
	});
	
});

$(document).ready(function(e) {
	$('a.goto_id').click(function(){
		var id = $(this).attr('data-id');
		
		if (id){
			$('body,html').animate({scrollTop:$('a[name="'+id+'"]').offset().top},100);
		}
		
		return false;
	});
	
	var cs = location.href.split("#")[1];
	if (cs){
		$('body,html').animate({scrollTop:$('a[name="'+cs+'"]').offset().top},100);
	}
	
	//加载下一页
	$('body').on('click','#ajax_page_btn',function(){
		var obj = $('#ajax_list'), 
			cur_url = $('#current_url').val(), 
			next_url = $('#next_url').val();
		
		if (!obj.attr('loading') && cur_url != next_url){
			obj.attr('loading','true');
			$('#ajax_page_info').remove();
			
			$.ajax({
				type: 'POST',
				url: next_url,
				success: function(data) {
					obj.removeAttr('loading');
					
					jQuery(obj).append(jQuery(data).find('#ajax_list').html());
					
					if ($('#next_url').length == 0){
						$('#ajax_page_btn').remove();
					}
				}
			});
		}
		
		return false;
	});
	$(window).scroll(function(){
		if (($(window).scrollTop() + $(window).height() >= ($(document).height() - $('.foot-box').outerHeight() - $('.banquan-box').outerHeight())) && $('#ajax_page_btn').length > 0) {
			$('#ajax_page_btn').trigger('click');
		}
	});
});

function CheckContact(o){
	obj = $(o);
	
	msg = '';
	username = obj.find('#username').val(); 
	gsname = obj.find('#companyname').val(); 
	E_mail = obj.find('#email').val();
	mobile = obj.find('#telphone').val();
	mess = obj.find('#message').val();
	
	
	if (username.length < 1 || username.length > 100){
		msg += '请输入您的名称\r';
	}
	if (E_mail.length < 6 || E_mail.length > 50){
		msg += '请输入电子邮箱\r';
	}else{
		var reg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
    	if (!reg.test(E_mail)){
			msg += '请输入正确的邮箱\n';
		}
	}
	if (mobile.length < 7 || mobile.length > 15){
		msg += '请输入联系电话\r';
	}else{
		/*var reg = /^1\d{10}$/;
		if (!reg.test(mobile)){
			msg += '请输入正确的手机号码\n';
		}*/
	}
	
	if (msg.length){
		alert(msg);
		
		return false;
	}

	return true;
}

function CheckMerchants(o){
	obj = $(o);
	
	msg = '';
	gsname = obj.find('#username').val(); 
	mobile = obj.find('#telphone').val();
	E_mail = obj.find('#email').val();
	qu_id = obj.find('#qu_id').val();
	sheng_id = obj.find('#sheng_id').val();
	shi_id = obj.find('#shi_id').val();
	address = obj.find('#address').val();
	mess = obj.find('#message').val();
	
	
	if (gsname.length < 1 || gsname.length > 100){
		msg += '请输入您的姓名\r';
	}
	if (mobile.length != 11){
		msg += '请输入联系手机\r';
	}else{
		var reg = /^1\d{10}$/;
		if (!reg.test(mobile)){
			//msg += '请输入正确的手机号码\n';
		}
	}
	if (E_mail.length < 6 || E_mail.length > 50){
		msg += '请输入联系邮箱\r';
	}else{
		var reg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
    	if (!reg.test(E_mail)){
			msg += '请输入正确的邮箱\n';
		}
	}
	if (qu_id.length < 1){
		msg += '请选择省份\r';
	}
	if (sheng_id.length < 1){
		msg += '请选择城市\r';
	}
	if (shi_id.length < 1){
		msg += '请选择县乡\r';
	}
	if (address.length < 1 || address.length > 100){
		msg += '请输入联系地址\r';
	}
	
	if (msg.length){
		alert(msg);
		
		return false;
	}

	return true;
}

function CheckFaq(o){
	obj = $(o);
	
	msg = '';
	searKey = obj.find('#searKey').val(); 
	
	if (searKey.length < 1 || searKey == '请输入您要搜索的疑问...'){
		msg += '请输入您要搜索的疑问...\r';
	}
	
	if (msg.length){
		alert(msg);
		
		return false;
	}

	return true;
}

function searchPro(o){
	obj = $(o);
	
	msg = '';
	searKey = obj.find('#searKey').val(); plac = obj.find('#searKey').attr('placeholder');
	
	if (searKey.length < 1 || searKey == plac){
		msg += plac+'\r';
	}
	
	if (msg.length){
		alert(msg);
		
		return false;
	}

	return true;
}
/*动画*/

$(window).scroll(function(){
	var otop = $(document).scrollTop();
	console.log(otop);
	if(otop>300){
		$('.other_body .home_con41 li').addClass('opac1');
		$('#gy .home_div4_1 li').removeClass('opac1');
	}
	if(otop>400){
		$('.index_body .home_con2 .home_tit').addClass('opac1');
		$('.service_body .support_con2').addClass('opac1')
	}
	if(otop>500){
		$('.about_body .home_con4 .text').addClass('opac1');
	}
	if(otop>650){
		$('.index_body .home_con2 .home_div2').addClass('opac1');
		$('.other_body .home_con52 li').addClass('opac1');
		$('.service_body .support_con2 .f-l,.service_body .support_con2 .f-r').addClass('opac1')
		$('.merchants_body .home_con61 .home_tit').addClass('opac1');
		$('.about_body .home_con4 .more').addClass('opac1')
		setTimeout(fun,800)
		function fun(){
			$('.merchants_body .home_con61 .home_div6').addClass('opac1');
		}
		$('.ahome_div43 .home_tit').addClass('opac1');
	}
	if(otop>850){
		$('.other_body .home_con53').addClass('opac1');
		$('.other_body .td_left').addClass('opac1');
		$('.ahome_div43 .home_div4').addClass('opac1');
	}
	if(otop>1090){	 
		$('.other_body .home_con53 li').addClass('opac1');
	}
	if(otop>990){
		$('.product_body .pro_div2').addClass('opac1');	
		
	}
	if(otop>1000){
		$('.index_body .home_con3,.index_body .home_con3 .home_tit').addClass('opac1');
		
		$('.about_body .about_con3 .f-l').eq(0).addClass('opac1');
		setTimeout(afun,800)
		function afun(){
			$('.about_body .about_con3 .f-r').eq(0).addClass('opac1')
		}
	}
	if(otop>1200){
		$('.service_body .about_con2 .home_tit').addClass('opac1')
		$('.merchants_body .home_con40 .home_tit').addClass('opac1');
		
		setTimeout(fun1,800)
		function fun1(){
			$('.merchants_body .home_con40 .shouji').addClass('opac1');
		}
		$('.ohome_div43 .chakan').addClass('opac1');
		
	}
	if(otop>1300){
		$('.index_body .home_con3 .home_div3').addClass('opac1');
		$('.other_body .home_con54').addClass('opac1');
		$('.service_body .about_con2 li').addClass('opac1')
		
	}
	if(otop>1400){
		$('#gy .home_tit').addClass('opac1');
		$('.ohome_div44 .home_tit').addClass('opac1');
	}
	if(otop>1500){
		$('.product_body .pro_div3 .w1220').addClass('opac1');
		$('#gy .home_div4_1 li').addClass('opac1');
	}
	if(otop>1700){
		$('.product_body .pro_div3 .pro_con').addClass('opac1');
		$('.service_body .support_con3').addClass('opac1');
		$('.about_body .about_con4 .f-r').addClass('opac1');
		setTimeout(afun1,800)
		function afun1(){
			$('.about_body .about_con4 .f-l').addClass('opac1')
			
		}
		$('.ohome_div44 .home_div4').addClass('opac1');
	}
	if(otop>1800){
		$('.index_body .home_con4 .home_tit').addClass('opac1');
	}
	if(otop>1950){
		$('.index_body .home_con4 .home_div4').addClass('opac1');
		$('.service_body .support_con3 .f-l,.service_body .support_con3 .f-r').addClass('opac1')
		$('.merchants_body .home_con31 .home_tit').addClass('opac1');
		setTimeout(fun2,800)
		function fun2(){
			$('.merchants_body .home_con31 .home_con3_quan').addClass('opac1');
		}
	}
	if(otop>2100){
		$('.about_body .home_con6 .home_tit').addClass('opac1');
		setTimeout(afun2,1200)
		function afun2(){
			$('.about_body .home_con6 .home_div6').addClass('opac1');
			
		}
		$('#pl .home_tit').addClass('opac1');
		$('.ohome_div45 .home_tit').addClass('opac1');
	}
	if(otop>2200){
		$('.product_body .pro_div4 .tit').addClass('opac1');
		$('.product_body .pro_div4').addClass('opac1');
		$('.service_body .support_con4').addClass('opac1');
		$('.about_body .home_con6 .text').addClass('opac1');
	}
	if(otop>2360){
		$('.index_body .home_con5,.index_body .home_con5 .home_tit').addClass('opac1');
		$('.product_body .pro_div4 ul').addClass('opac1');
		$('.service_body .support_con4 .home_tit').addClass('opac1')
		$('#pl .pl_pic,#pl .pl_nr').addClass('opac1');
		$('.ohome_div45 .home_div4').addClass('opac1');
	}
	if(otop>2560){
		$('.index_body .home_con5 .home_div5').addClass('opac1');
		$('.service_body .support_con4 .f-l,.service_body .support_con4 .f-r').addClass('opac1')
	}
	if(otop>2650){
		$('.ohome_div46 .home_tit').addClass('opac1');
	}
	if(otop>2860){
		$('.index_body .home_con6,.index_body .home_con6 .home_tit').addClass('opac1');
		$('.product_body .pro_div5 .tit,.product_body .pro_div5 .name').addClass('opac1');
		$('.merchants_body .home_con81 .home_con8_1').addClass('opac1');
		$('.merchants_body .home_con81 .home_tit').addClass('opac1');
		$('#fu .home_tit').addClass('opac1');
	}
	if(otop>3060){
		$('.index_body .home_con6 .home_div6').addClass('opac1');
		$('.product_body .pro_div5 ul').addClass('opac1');
		$('#fu .sg').addClass('opac1');
	}
	if(otop>3400){
		$('.product_body .pro_div5 .main_li').addClass('opac1');
		$('.product_body .pro_div5 .more_center').addClass('opac1');
		$('.merchants_body .home_con51 .home_tit').addClass('opac1');
		setTimeout(fun3,800)
		function fun3(){
			$('.merchants_body .home_con51 .home_div5').addClass('opac1');
		}
	}
	
})

window.onload=function(){
	
	$('.good_banner_p1').css('left','50%');
	$('.good_banner_p2').css('left','50%');
	$('.good_banner_p1,.good_banner_p2').css({
		'opacity':'1',
		'transition':'all 1s',
	});
}



//视频播放功能
jQuery(document).ready(function(e) {

	if ($('.play_video_btn').length){
		$('.play_video_btn').bind('click',function(){
			playthis = $(this);

			if (!$('#play_video_container').length){
				$('body').append('<div id="playboxbg"></div><div id="play_video_container"><a href="#" title="Close Video" class="close_video">X</a><div class="video_play"></div></div>');
			}else{

				if (playthis.attr('player') == 'yes'){
					return false;
				}
			}


			if (playthis.attr('video-data')){
				videosrc = playthis.attr('video-data');
			}else{
				videosrc = '/mp4/test.flv';
			}

			if (canplay()){
				$('#play_video_container .video_play').html('<video id="my_video_2" controls preload="auto" width="100%"> video <source src="'+videosrc+'" type="video/mp4"></video>');
			}else{
				//alert(0);
				$('#play_video_container .video_play').html(playvideo(videosrc,'800','480',true));
			}

			$('#playboxbg').css({'width':$(document).width(),'height':$(document).height(),'opacity':'0.7'}).fadeIn(function(){});
			$('#play_video_container').fadeIn(function(){});
			playthis.attr('player','yes');

			if (canplay()){
				$("#my_video_2").load();document.getElementById("my_video_2").play();
			}


			$('#play_video_container .close_video').click(function(){
				if (canplay()){
					var video = document.getElementById('my_video_2');
					if (!video.paused) {
						video.pause();
					}
				}
				$('#playboxbg').fadeOut(function(){$(this).remove();});
				$('#play_video_container').fadeOut(function(){playthis.removeAttr('player');$(this).remove();});

				return false;
			});

			if (canplay()){

				document.getElementById('my_video_2').addEventListener('ended',function(){$('#play_video_container .close_video').click();},false);

				/*if (isMobile.iOS()){
				 document.getElementById('my_video_2').addEventListener('pause',function(){$('#play_video_container').fadeOut(function(){playthis.removeAttr('player')});},false);
				 }else if (isMobile.Android()){
				 }*/
			}


			vnum1 = ($(window).height()-$('#play_video_container').height())/2;
			vnum2 = ($(document).width()-$('#play_video_container').width())/2;

			$('#play_video_container').animate({'top':vnum1+$(document).scrollTop(),'margin':0,'left':vnum2},300);


			$(window).scroll(function(e) {
				vnum1 = ($(window).height()-$('#play_video_container').height())/2;
				vnum2 = ($(document).width()-$('#play_video_container').width())/2;

				$('#play_video_container').animate({'top':vnum1+$(document).scrollTop(),'margin':0,'left':vnum2},100);
			})

			return false;
		});
	}
});


function canplay() {
	return !!document.createElement('video').canPlayType; // boolean
}

function playvideo(videourl,w,h,f){
	if(videourl=='') return;
	var s = '';
	if (right(videourl,4).toLowerCase()=='.flv' || right(videourl,4).toLowerCase()=='.mp4'){

		s += "<object width='"+w+"' height='"+h+"' name='player' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' id='player'>";
		s += "<param value='/templates/default/js/player.swf' name='movie'>";
		s += "<param name='wmode' value='Opaque'>		<param value='true' name='allowfullscreen'>";
		s += "<param value='always' name='allowscriptaccess'>";
		s += "<param value='file="+videourl+"&amp;image=&amp;logo=&amp;stretching=exactfit&amp;autostart="+f+"' name='flashvars'>";
		s += "<embed width='"+w+"' height='"+h+"' flashvars='file="+videourl+"&amp;image=&amp;logo==exactfit&amp;autostart="+f+"' allowfullscreen='true' allowscriptaccess='always' src='/templates/default/js/player.swf' name='player2' id='player2' wmode='transparent' type='application/x-shockwave-flash'>";
		s += "</object>";
	}else if (right(videourl,4)=='.swf'){
		s += '<embed height="'+h+'" type="application/x-shockwave-flash" align="middle" width="'+w+'" src="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&amp;VideoIDS=XMzMwMzgzMjgw&amp;isAutoPlay='+f+'&amp;isShowRelatedVideo=false" wmode="transparent" border="0">';
	}

	return s;
}

function right(mainStr,lngLen) {
	if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
		return mainStr.substring(mainStr.length-lngLen,mainStr.length)
	}else{
		return null
	}
}



