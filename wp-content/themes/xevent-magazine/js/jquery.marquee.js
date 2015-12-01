/*!
 * Marquee jQuery Plug-in
 *
 * Copyright 2009 Giva, Inc. (http://www.givainc.com/labs/) 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 	http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Date: 2009-05-20
 * Rev:  1.0.01
 */
(function(e){"use strict";e.marquee={version:"1.0.01"};e.fn.marquee=function(t){var n=typeof arguments[0]=="string"&&arguments[0];var r=n&&Array.prototype.slice.call(arguments,1)||arguments;var i=this.length==0?null:e.data(this[0],"marquee");if(i&&n&&this.length){if(n.toLowerCase()=="object")return i;else if(i[n]){var s;this.each(function(t){var o=e.data(this,"marquee")[n].apply(i,r);if(t==0&&o){if(!!o.jquery){s=e([]).add(o)}else{s=o;return false}}else if(!!o&&!!o.jquery){s=s.add(o)}});return s||this}else return this}else{return this.each(function(){new e.Marquee(this,t)})}};e.Marquee=function(t,n){function l(t){if(s.filter("."+n.cssShowing).length>0)return false;var o=s.eq(t);if(e.isFunction(n.beforeshow))n.beforeshow.apply(r,[i,o]);var u={top:(n.yScroll=="top"?"-":"+")+o.outerHeight()+"px",left:0};i.data("marquee.showing",true);o.addClass(n.cssShowing);o.css(u).animate({top:"0px"},n.showSpeed,n.fxEasingShow,function(){if(e.isFunction(n.show))n.show.apply(r,[i,o]);i.data("marquee.showing",false);c(o)})}function c(e,t){if(a==true)return false;t=t||n.pauseSpeed;if(v(e)){setTimeout(function(){if(a==true)return false;var t=e.outerWidth(),r=t*-1,i=parseInt(e.css("left"),10);e.animate({left:r+"px"},(t+i)*n.scrollSpeed,n.fxEasingScroll,function(){h(e)})},t)}else if(s.length>1){setTimeout(function(){if(a==true)return false;e.animate({top:(n.yScroll=="top"?"+":"-")+i.innerHeight()+"px"},n.showSpeed,n.fxEasingScroll);h(e)},t)}}function h(t){if(e.isFunction(n.aftershow))n.aftershow.apply(r,[i,t]);t.removeClass(n.cssShowing);m()}function p(){a=true;if(i.data("marquee.showing")!=true){s.filter("."+n.cssShowing).dequeue().stop()}}function d(){a=false;if(i.data("marquee.showing")!=true)c(s.filter("."+n.cssShowing),1)}function v(e){return e.outerWidth()>i.innerWidth()}function m(){o++;if(o>=s.length){if(!isNaN(n.loop)&&n.loop>0&&++f>=n.loop)return false;o=0}l(o)}n=e.extend({},e.Marquee.defaults,n);var r=this,i=e(t),s=i.find("> li"),o=-1,u=false,a=false,f=0;e.data(i[0],"marquee",r);this.pause=function(){u=true;p()};this.resume=function(){u=false;d()};this.update=function(){var e=s.length;s=i.find("> li");if(e<=1)d()};if(n.pauseOnHover){i.hover(function(){if(u)return false;p()},function(){if(u)return false;d()})}if(e.isFunction(n.init))n.init.apply(r,[i,n]);m()};e.Marquee.defaults={yScroll:"top",showSpeed:850,scrollSpeed:12,pauseSpeed:5e3,pauseOnHover:true,loop:-1,fxEasingShow:"swing",fxEasingScroll:"linear",cssShowing:"marquee-showing",init:null,beforeshow:null,show:null,aftershow:null}})(jQuery)