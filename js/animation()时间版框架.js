/**
 * animation()时间框架
 * @authors Your Name (you@example.org)
 * @date    2018-02-09 00:11:13
 * @version $Id$
 */

    function animation( obj,attr,target,duration){
        window.requestAnimationFrame = window.requestAnimation || function(fn){
            setTimeout( fn,1000/30);
        };
        window.cancelAnimationFrame = window.cancelAnimation || clearTimeout;
        var init = parseFloat( getStyle( obj,attr) );
        target = parseFloat( target ) - init; //获取到路程
        var init_t = new Date();//获取到初始时间


        //单位问题
        var unit = '';
        if( attr != 'opacity'){
            unit = 'px';
        }


		var run_t;
		var prop;
		var val;

        //运动过程
        (function request(){
            run_t = new Date() - init_t;//已运动的时间
            prop = run_t/duration;//运动时间的比例
            if( prop > 1){
                prop = 1;
            }else{
                window.requestAnimationFrame( request );
            }
			val = prop*target;//计算路程
            obj.style[attr] = init + val + unit;//写入样式
        })();
    }



    function getStyle(obj,attr){
        return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
    }

