/* serialize form to json object */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/* basic notifier */
(function($) {
  $.fn.notify = function(options, callback) {
	
		var opts = $.extend({}, $.fn.notify.defaults, options);
		
    return this.each(function() {
			$(this).find('.noty_text').text(opts.message);
			$(this).addClass('noty_'+opts.type).animate({top:'0'},'fast').delay(opts.delay).animate({top:'-40px'},'slow', function() {
				if (typeof callback == 'function') { // make sure the callback is a function
					callback.call(this); // brings the scope to the callback
				}
			});
			$(this).click(onClick);
    });
		
		// events
		function onClick() {
      		$(this).stop().animate({top:'-40px'},'fast', function() {
				if (typeof callback == 'function') { // make sure the callback is a function
					callback.call(this); // brings the scope to the callback
				}
			});
      return false;
    }
  }

	// defaults
	/*
		{
			message: "your message", 
			type: "alert | error | information | success"
		}
	*/
	$.fn.notify.defaults = {message: "Success", type: "success", delay: 4000};
	
})(jQuery);

/** ===========================================================================
 * Looper.js | a jQuery plugin - v1.1.6
 * Copyright 2013 Ry Racherbaumer
 * http://rygine.com/projects/looper.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== **/
(function(t,e,i,n){"use strict";var s=function(){var t,e=i.body||i.documentElement,s={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MsTransition:"MSTransitionEnd",OTransition:"oTransitionEnd otransitionend"};for(t in s)if(e.style[t]!==n)return s[t];return!1}(),o=function(e,i){this.$element=t(e),this.options=i,this.looping=!1;var n=this;this.$element.attr("tabindex",0).keydown(function(t){switch(t.which){case 37:n.prev();break;case 39:n.next();break;default:return}t.preventDefault()}).find(".item").attr("aria-hidden",!0),"hover"===this.options.pause&&this.$element.on("mouseenter",t.proxy(this.pause,this)).on("mouseleave",t.proxy(this.loop,this)),this.$element.trigger("init")};o.prototype={loop:function(e){return e||(this.paused=!1),this.interval&&(clearInterval(this.interval),this.interval=null),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&s&&(this.$element.trigger(s),this.loop()),clearInterval(this.interval),this.interval=null,this},next:function(){return this.looping?this:this.go("next")},prev:function(){return this.looping?this:this.go("prev")},to:function(e){if(this.looping)return this;--e;var i=this.$element.find(".item"),n=i.filter(".active"),s=i.index(n);return e>i.length-1||0>e?this:s==e?this.pause().loop():this.go(t(i[e]))},go:function(e){if(this.looping)return this;var i=this.$element.find(".item");if(!i.length)return this;var n=i.filter(".active"),o=i.index(n),a="string"==typeof e?n[e]():e,r=i.index(a),l=this.interval,h="string"==typeof e?e:-1==o&&-1==r||r>o?"next":"prev",p="next"==h?"first":"last",d=this,u=function(e,n,s){if(this.looping){this.looping=!1,e.removeClass("active go "+s).attr("aria-hidden",!0),n.removeClass("go "+s).addClass("active").removeAttr("aria-hidden");var o=t.Event("shown",{relatedTarget:n[0],relatedIndex:i.index(n)});this.$element.trigger(o)}};if(a=a&&a.length?a:i[p](),a.hasClass("active"))return this;var f=t.Event("show",{relatedTarget:a[0],relatedIndex:i.index(a[0])});if(this.$element.trigger(f),f.isDefaultPrevented())return this;if(this.looping=!0,l&&this.pause(),this.$element.hasClass("slide")||this.$element.hasClass("xfade"))if(s)a.addClass(h),n.addClass("go "+h),a[0].offsetWidth,a.addClass("go"),this.$element.one(s,function(){n.length&&u.call(d,n,a,h)}),setTimeout(function(){u.call(d,n,a,h)},this.options.speed);else{var c,v,g={},m={};c=n.attr("style"),v=a.attr("style"),this.$element.hasClass("xfade")&&(g.opacity=0,m.opacity=1,a.css("opacity",0)),this.$element.hasClass("slide")&&(this.$element.hasClass("up")?(g.top="next"==h?"-100%":"100%",m.top=0):this.$element.hasClass("down")?(g.top="next"==h?"100%":"-100%",m.top=0):this.$element.hasClass("right")?(g.left="next"==h?"100%":"-100%",m.left=0):(g.left="next"==h?"-100%":"100%",m.left=0)),a.addClass(h),n.animate(g,this.options.speed),a.animate(m,this.options.speed,function(){u.call(d,n,a,h),n.attr("style",c||""),a.attr("style",v||"")})}else u.call(d,n,a,h);return(l||!l&&this.options.interval)&&(!e||"string"==typeof e&&e!==this.options.pause||e.length&&"to"!==this.options.pause)&&this.loop(),this}},t.fn.looper=function(e){var i=arguments;return this.each(function(){var n=t(this),s=n.data("looperjs"),a=t.extend({},t.fn.looper.defaults,t.isPlainObject(e)?e:{}),r="string"==typeof e?e:e.looper,l=e.args||i.length>1&&Array.prototype.slice.call(i,1);s||n.data("looperjs",s=new o(this,a)),"number"==typeof e?s.to(e):r?l?s[r].apply(s,l.length?l:(""+l).split(",")):s[r]():a.interval?s.loop():s.go()})},t.fn.looper.defaults={interval:5e3,pause:"hover",speed:500},t.fn.looper.Constructor=o,t(function(){t("body").on("click.looper","[data-looper]",function(e){var i=t(this);if("go"!=i.data("looper")){var n,s=t(i.data("target")||(n=i.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")),o=t.extend({},s.data(),i.data());s.looper(o),e.preventDefault()}}),t('[data-looper="go"]').each(function(){var e=t(this);e.looper(e.data())})})})(jQuery,window,document);