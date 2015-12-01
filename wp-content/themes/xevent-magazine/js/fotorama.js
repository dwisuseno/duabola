/*!
 * Fotorama 4.5.2 | http://fotorama.io/license/
 */
fotoramaVersion="4.5.2",function(a,b,c,d,e){"use strict";function f(a){var b="bez_"+d.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof d.easing[b]){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){for(var b,c=a,d=0;++d<14&&(b=f(c,0)-a,!(Math.abs(b)<.001));)c-=b/g(c);return c};return function(a){return f(h(a),1)}};d.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}function g(){}function h(a,b,c){return Math.max(isNaN(b)?-1/0:b,Math.min(isNaN(c)?1/0:c,a))}function i(a){return a.match(/ma/)&&a.match(/-?\d+(?!d)/g)[a.match(/3d/)?12:4]}function j(a){return Kc?+i(a.css("transform")):+a.css("left").replace("px","")}function k(a){var b={};return Kc?b.transform="translate3d("+a+"px,0,0)":b.left=a,b}function l(a){return{"transition-duration":a+"ms"}}function m(a,b){return+String(a).replace(b||"px","")||e}function n(a){return/%$/.test(a)&&m(a,"%")}function o(a,b){return n(a)/100*b||m(a)}function p(a){return(!!m(a)||!!m(a,"%"))&&a}function q(a,b,c,d){return(a-(d||0))*(b+(c||0))}function r(a,b,c,d){return-Math.round(a/(b+(c||0))-(d||0))}function s(a){var b=a.data();if(!b.tEnd){var c=a[0],d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};S(c,d[sc.prefixed("transition")],function(a){b.tProp&&a.propertyName.match(b.tProp)&&b.onEndFn()}),b.tEnd=!0}}function t(a,b,c,d){var e,f=a.data();f&&(f.onEndFn=function(){e||(e=!0,clearTimeout(f.tT),c())},f.tProp=b,clearTimeout(f.tT),f.tT=setTimeout(function(){f.onEndFn()},1.5*d),s(a))}function u(a,b){if(a.length){var c=a.data();Kc?(a.css(l(0)),c.onEndFn=g,clearTimeout(c.tT)):a.stop();var d=v(b,function(){return j(a)});return a.css(k(d)),d}}function v(){for(var a,b=0,c=arguments.length;c>b&&(a=b?arguments[b]():arguments[b],"number"!=typeof a);b++);return a}function w(a,b){return Math.round(a+(b-a)/1.5)}function x(){return x.p=x.p||("https:"===c.protocol?"https://":"http://"),x.p}function y(a){var c=b.createElement("a");return c.href=a,c}function z(a,b){if("string"!=typeof a)return a;a=y(a);var c,d;if(a.host.match(/youtube\.com/)&&a.search){if(c=a.search.split("v=")[1]){var e=c.indexOf("&");-1!==e&&(c=c.substring(0,e)),d="youtube"}}else a.host.match(/youtube\.com|youtu\.be/)?(c=a.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),d="youtube"):a.host.match(/vimeo\.com/)&&(d="vimeo",c=a.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,""));return c&&d||!b||(c=a.href,d="custom"),c?{id:c,type:d,s:a.search.replace(/^\?/,""),p:x()}:!1}function A(a,b,c){var e,f,g=a.video;return"youtube"===g.type?(f=x()+"img.youtube.com/vi/"+g.id+"/default.jpg",e=f.replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===g.type?d.ajax({url:x()+"vimeo.com/api/v2/video/"+g.id+".json",dataType:"jsonp",success:function(d){a.thumbsReady=!0,B(b,{img:d[0].thumbnail_large,thumb:d[0].thumbnail_small},a.i,c)}}):a.thumbsReady=!0,{img:e,thumb:f}}function B(a,b,c,e){for(var f=0,g=a.length;g>f;f++){var h=a[f];if(h.i===c&&h.thumbsReady){var i={videoReady:!0};i[Zc]=i[_c]=i[$c]=!1,e.splice(f,1,d.extend({},h,i,b));break}}}function C(a){function b(a,b,e){var f=a.children("img").eq(0),g=a.attr("href"),h=a.attr("src"),i=f.attr("src"),j=b.video,k=e?z(g,j===!0):!1;k?g=!1:k=j,c(a,f,d.extend(b,{video:k,img:b.img||g||h||i,thumb:b.thumb||i||h||g}))}function c(a,b,c){var e=c.thumb&&c.img!==c.thumb,f=m(c.width||a.attr("width")),g=m(c.height||a.attr("height"));d.extend(c,{width:f,height:g,thumbratio:R(c.thumbratio||m(c.thumbwidth||b&&b.attr("width")||e||f)/m(c.thumbheight||b&&b.attr("height")||e||g))})}var e=[];return a.children().each(function(){var a=d(this),f=Q(d.extend(a.data(),{id:a.attr("id")}));if(a.is("a, img"))b(a,f,!0);else{if(a.is(":empty"))return;c(a,null,d.extend(f,{html:this,_html:a.html()}))}e.push(f)}),e}function D(a){return 0===a.offsetWidth&&0===a.offsetHeight}function E(a){return!d.contains(b.documentElement,a)}function F(a,b,c){a()?b():setTimeout(function(){F(a,b)},c||100)}function G(a){c.replace(c.protocol+"//"+c.host+c.pathname.replace(/^\/?/,"/")+c.search+"#"+a)}function H(a,b,c){var d=a.data(),e=d.measures;if(e&&(!d.l||d.l.W!==e.width||d.l.H!==e.height||d.l.r!==e.ratio||d.l.w!==b.w||d.l.h!==b.h||d.l.m!==c)){var f=e.width,g=e.height,i=b.w/b.h,j=e.ratio>=i,k="scaledown"===c,l="contain"===c,m="cover"===c;j&&(k||l)||!j&&m?(f=h(b.w,0,k?f:1/0),g=f/e.ratio):(j&&m||!j&&(k||l))&&(g=h(b.h,0,k?g:1/0),f=g*e.ratio),a.css({width:Math.ceil(f),height:Math.ceil(g),left:Math.floor(b.w/2-f/2),top:Math.floor(b.h/2-g/2)}),d.l={W:e.width,H:e.height,r:e.ratio,w:b.w,h:b.h,m:c}}return!0}function I(a,b){var c=a[0];c.styleSheet?c.styleSheet.cssText=b:a.html(b)}function J(a,b,c){return b===c?!1:b>=a?"left":a>=c?"right":"left right"}function K(a,b,c,d){if(!c)return!1;if(!isNaN(a))return a-(d?0:1);for(var e,f=0,g=b.length;g>f;f++){var h=b[f];if(h.id===a){e=f;break}}return e}function L(a,b,c){c=c||{},a.each(function(){var a,e=d(this),f=e.data();f.clickOn||(f.clickOn=!0,d.extend(ab(e,{onStart:function(b){a=b,(c.onStart||g).call(this,b)},onMove:c.onMove||g,onTouchEnd:c.onTouchEnd||g,onEnd:function(c){c.moved||b.call(this,a)}}),{noMove:!0}))})}function M(a,b){return'<div class="'+a+'">'+(b||"")+"</div>"}function N(a){for(var b=a.length;b;){var c=Math.floor(Math.random()*b--),d=a[b];a[b]=a[c],a[c]=d}return a}function O(a){return"[object Array]"==Object.prototype.toString.call(a)&&d.map(a,function(a){return d.extend({},a)})}function P(a,b,c){a.scrollLeft(b||0).scrollTop(c||0)}function Q(a){if(a){var b={};return d.each(a,function(a,c){b[a.toLowerCase()]=c}),b}}function R(a){if(a){var b=+a;return isNaN(b)?(b=a.split("/"),+b[0]/+b[1]||e):b}}function S(a,b,c,d){b&&(a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent("on"+b,c))}function T(a){return!!a.getAttribute("disabled")}function U(a){return{tabindex:-1*a+"",disabled:a}}function V(a,b){S(a,"keyup",function(c){T(a)||13==c.keyCode&&b.call(a,c)})}function W(a,b){S(a,"focus",a.onfocusin=function(c){b.call(a,c)},!0)}function X(a,b){a.preventDefault?a.preventDefault():a.returnValue=!1,b&&a.stopPropagation()}function Y(a){return a?">":"<"}function Z(a,b){var c=a.data(),e=Math.round(b.pos),f=function(){c.sliding=!1,(b.onEnd||g)()};"undefined"!=typeof b.overPos&&b.overPos!==b.pos&&(e=b.overPos,f=function(){Z(a,d.extend({},b,{overPos:b.pos,time:Math.max(Sc,b.time/2)}))});var h=d.extend(k(e),b.width&&{width:b.width});c.sliding=!0,Kc?(a.css(d.extend(l(b.time),h)),b.time>10?t(a,"transform",f,b.time):f()):a.stop().animate(h,b.time,bd,f)}function $(a,b,c,e,f,h){var i="undefined"!=typeof h;if(i||(f.push(arguments),Array.prototype.push.call(arguments,f.length),!(f.length>1))){a=a||d(a),b=b||d(b);var j=a[0],k=b[0],l="crossfade"===e.method,m=function(){if(!m.done){m.done=!0;var a=(i||f.shift())&&f.shift();a&&$.apply(this,a),(e.onEnd||g)(!!a)}},n=e.time/(h||1);c.removeClass(Pb+" "+Ob),a.stop().addClass(Pb),b.stop().addClass(Ob),l&&k&&a.fadeTo(0,0),a.fadeTo(l?n:0,1,l&&m),b.fadeTo(n,0,m),j&&l||k||m()}}function _(a){var b=(a.touches||[])[0]||a;a._x=b.pageX,a._y=b.clientY,a._now=d.now()}function ab(c,e){function f(a){return n=d(a.target),v.checked=q=r=t=!1,l||v.flow||a.touches&&a.touches.length>1||a.which>1||Cc&&Cc.type!==a.type&&Ec||(q=e.select&&n.is(e.select,u))?q:(p="touchstart"===a.type,r=n.is("a, a *",u),o=v.control,s=v.noMove||v.noSwipe||o?16:v.snap?0:4,_(a),m=Cc=a,Dc=a.type.replace(/down|start/,"move").replace(/Down/,"Move"),(e.onStart||g).call(u,a,{control:o,$target:n}),l=v.flow=!0,void((!p||v.go)&&X(a)))}function h(a){if(a.touches&&a.touches.length>1||Pc&&!a.isPrimary||Dc!==a.type||!l)return l&&i(),void(e.onTouchEnd||g)();_(a);var b=Math.abs(a._x-m._x),c=Math.abs(a._y-m._y),d=b-c,f=(v.go||v.x||d>=0)&&!v.noSwipe,h=0>d;p&&!v.checked?(l=f)&&X(a):(X(a),(e.onMove||g).call(u,a,{touch:p})),!t&&Math.sqrt(Math.pow(b,2)+Math.pow(c,2))>s&&(t=!0),v.checked=v.checked||f||h}function i(a){(e.onTouchEnd||g)();var b=l;v.control=l=!1,b&&(v.flow=!1),!b||r&&!v.checked||(a&&X(a),Ec=!0,clearTimeout(Fc),Fc=setTimeout(function(){Ec=!1},1e3),(e.onEnd||g).call(u,{moved:t,$target:n,control:o,touch:p,startEvent:m,aborted:!a||"MSPointerCancel"===a.type}))}function j(){v.flow||setTimeout(function(){v.flow=!0},10)}function k(){v.flow&&setTimeout(function(){v.flow=!1},Rc)}var l,m,n,o,p,q,r,s,t,u=c[0],v={};return Pc?(S(u,"MSPointerDown",f),S(b,"MSPointerMove",h),S(b,"MSPointerCancel",i),S(b,"MSPointerUp",i)):(S(u,"touchstart",f),S(u,"touchmove",h),S(u,"touchend",i),S(b,"touchstart",j),S(b,"touchend",k),S(b,"touchcancel",k),S(a,"scroll",k),S(u,"mousedown",f),S(b,"mousemove",h),S(b,"mouseup",i)),c.on("click","a",function(a){v.checked&&X(a)}),v}function bb(a,b){function c(c,d){A=!0,j=l=c._x,q=c._now,p=[[q,j]],m=n=D.noMove||d?0:u(a,(b.getPos||g)()),(b.onStart||g).call(B,c)}function e(a,b){s=D.min,t=D.max,v=D.snap,x=a.altKey,A=z=!1,y=b.control,y||C.sliding||c(a)}function f(d,e){D.noSwipe||(A||c(d),l=d._x,p.push([d._now,l]),n=m-(j-l),o=J(n,s,t),s>=n?n=w(n,s):n>=t&&(n=w(n,t)),D.noMove||(a.css(k(n)),z||(z=!0,e.touch||Pc||a.addClass(cc)),(b.onMove||g).call(B,d,{pos:n,edge:o})))}function i(e){if(!D.noSwipe||!e.moved){A||c(e.startEvent,!0),e.touch||Pc||a.removeClass(cc),r=d.now();for(var f,i,j,k,o,q,u,w,y,z=r-Rc,C=null,E=Sc,F=b.friction,G=p.length-1;G>=0;G--){if(f=p[G][0],i=Math.abs(f-z),null===C||j>i)C=f,k=p[G][1];else if(C===z||i>j)break;j=i}u=h(n,s,t);var H=k-l,I=H>=0,J=r-C,K=J>Rc,L=!K&&n!==m&&u===n;v&&(u=h(Math[L?I?"floor":"ceil":"round"](n/v)*v,s,t),s=t=u),L&&(v||u===n)&&(y=-(H/J),E*=h(Math.abs(y),b.timeLow,b.timeHigh),o=Math.round(n+y*E/F),v||(u=o),(!I&&o>t||I&&s>o)&&(q=I?s:t,w=o-q,v||(u=q),w=h(u+.03*w,q-50,q+50),E=Math.abs((n-w)/(y/F)))),E*=x?10:1,(b.onEnd||g).call(B,d.extend(e,{moved:e.moved||K&&v,pos:n,newPos:u,overPos:w,time:E}))}}var j,l,m,n,o,p,q,r,s,t,v,x,y,z,A,B=a[0],C=a.data(),D={};return D=d.extend(ab(b.$wrap,d.extend({},b,{onStart:e,onMove:f,onEnd:i})),D)}function cb(a,b){var c,e,f,h=a[0],i={prevent:{}};return S(h,Qc,function(a){var h=a.wheelDeltaY||-1*a.deltaY||0,j=a.wheelDeltaX||-1*a.deltaX||0,k=Math.abs(j)&&!Math.abs(h),l=Y(0>j),m=e===l,n=d.now(),o=Rc>n-f;e=l,f=n,k&&i.ok&&(!i.prevent[l]||c)&&(X(a,!0),c&&m&&o||(b.shift&&(c=!0,clearTimeout(i.t),i.t=setTimeout(function(){c=!1},Tc)),(b.onEnd||g)(a,b.shift?l:j)))}),i}function db(){d.each(d.Fotorama.instances,function(a,b){b.index=a})}function eb(a){d.Fotorama.instances.push(a),db()}function fb(a){d.Fotorama.instances.splice(a.index,1),db()}var gb="fotorama",hb="fullscreen",ib=gb+"__wrap",jb=ib+"--css2",kb=ib+"--css3",lb=ib+"--video",mb=ib+"--fade",nb=ib+"--slide",ob=ib+"--no-controls",pb=ib+"--no-shadows",qb=ib+"--pan-y",rb=ib+"--rtl",sb=ib+"--only-active",tb=ib+"--no-captions",ub=ib+"--toggle-arrows",vb=gb+"__stage",wb=vb+"__frame",xb=wb+"--video",yb=vb+"__shaft",zb=gb+"__grab",Ab=gb+"__pointer",Bb=gb+"__arr",Cb=Bb+"--disabled",Db=Bb+"--prev",Eb=Bb+"--next",Fb=gb+"__nav",Gb=Fb+"-wrap",Hb=Fb+"__shaft",Ib=Fb+"--dots",Jb=Fb+"--thumbs",Kb=Fb+"__frame",Lb=Kb+"--dot",Mb=Kb+"--thumb",Nb=gb+"__fade",Ob=Nb+"-front",Pb=Nb+"-rear",Qb=gb+"__shadow",Rb=Qb+"s",Sb=Rb+"--left",Tb=Rb+"--right",Ub=gb+"__active",Vb=gb+"__select",Wb=gb+"--hidden",Xb=gb+"--fullscreen",Yb=gb+"__fullscreen-icon",Zb=gb+"__error",$b=gb+"__loading",_b=gb+"__loaded",ac=_b+"--full",bc=_b+"--img",cc=gb+"__grabbing",dc=gb+"__img",ec=dc+"--full",fc=gb+"__dot",gc=gb+"__thumb",hc=gc+"-border",ic=gb+"__html",jc=gb+"__video",kc=jc+"-play",lc=jc+"-close",mc=gb+"__caption",nc=gb+"__caption__wrap",oc=gb+"__spinner",pc='" tabindex="0" role="button',qc=d&&d.fn.jquery.split(".");if(!qc||qc[0]<1||1==qc[0]&&qc[1]<8)throw"Fotorama requires jQuery 1.8 or later and will not run without it.";var rc={},sc=function(a,b,c){function d(a){r.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&r[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+u.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+v.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=b.documentElement,p="modernizr",q=b.createElement(p),r=q.style,s=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),t="Webkit Moz O ms",u=t.split(" "),v=t.toLowerCase().split(" "),w={},x=[],y=x.slice,z=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:p+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',p,'">',a,"</style>"].join(""),j.id=p,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=o.style.overflow,o.style.overflow="hidden",o.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),o.style.overflow=i),!!g},A={}.hasOwnProperty;l=e(A,"undefined")||e(A.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=y.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(y.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(y.call(arguments)))};return d}),w.csstransforms3d=function(){var a=!!i("perspective");return a};for(var B in w)l(w,B)&&(k=B.toLowerCase(),n[k]=w[B](),x.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(o.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),q=j=null,n._version=m,n._prefixes=s,n._domPrefixes=v,n._cssomPrefixes=u,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=z,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},n}(a,b),tc={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},uc="webkit moz o ms khtml".split(" ");if("undefined"!=typeof b.cancelFullScreen)tc.ok=!0;else for(var vc=0,wc=uc.length;wc>vc;vc++)if(tc.prefix=uc[vc],"undefined"!=typeof b[tc.prefix+"CancelFullScreen"]){tc.ok=!0;break}tc.ok&&(tc.event=tc.prefix+"fullscreenchange",tc.is=function(){switch(this.prefix){case"":return b.fullScreen;case"webkit":return b.webkitIsFullScreen;default:return b[this.prefix+"FullScreen"]}},tc.request=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},tc.cancel=function(){return""===this.prefix?b.cancelFullScreen():b[this.prefix+"CancelFullScreen"]()});var xc,yc={lines:12,length:5,width:2,radius:7,corners:1,rotate:15,color:"rgba(128, 128, 128, .75)",hwaccel:!0},zc={top:"auto",left:"auto",className:""};!function(a,b){xc=b()}(this,function(){function a(a,c){var d,e=b.createElement(a||"div");for(d in c)e[d]=c[d];return e}function c(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function d(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=m.substring(0,m.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return o[e]||(p.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",p.cssRules.length),o[e]=1),e}function f(a,b){var c,d,f=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<n.length;d++)if(c=n[d]+b,f[c]!==e)return c;return f[b]!==e?b:void 0}function g(a,b){for(var c in b)a.style[f(a,c)||c]=b[c];return a}function h(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]===e&&(a[d]=c[d])}return a}function i(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function j(a,b){return"string"==typeof a?a:a[b%a.length]}function k(a){return"undefined"==typeof this?new k(a):void(this.opts=h(a||{},k.defaults,q))}function l(){function b(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}p.addRule(".spin-vml","behavior:url(#default#VML)"),k.prototype.lines=function(a,d){function e(){return g(b("group",{coordsize:k+" "+k,coordorigin:-i+" "+-i}),{width:k,height:k})}function f(a,f,h){c(m,c(g(e(),{rotation:360/d.lines*a+"deg",left:~~f}),c(g(b("roundrect",{arcsize:d.corners}),{width:i,height:d.width,left:d.radius,top:-d.width>>1,filter:h}),b("fill",{color:j(d.color,a),opacity:d.opacity}),b("stroke",{opacity:0}))))}var h,i=d.length+d.width,k=2*i,l=2*-(d.width+d.length)+"px",m=g(e(),{position:"absolute",top:l,left:l});if(d.shadow)for(h=1;h<=d.lines;h++)f(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=d.lines;h++)f(h);return c(a,m)},k.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var m,n=["webkit","Moz","ms","O"],o={},p=function(){var d=a("style",{type:"text/css"});return c(b.getElementsByTagName("head")[0],d),d.sheet||d.styleSheet}(),q={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};k.defaults={},h(k.prototype,{spin:function(b){this.stop();var c,d,e=this,f=e.opts,h=e.el=g(a(0,{className:f.className}),{position:f.position,width:0,zIndex:f.zIndex}),j=f.radius+f.length+f.width;if(b&&(b.insertBefore(h,b.firstChild||null),d=i(b),c=i(h),g(h,{left:("auto"==f.left?d.x-c.x+(b.offsetWidth>>1):parseInt(f.left,10)+j)+"px",top:("auto"==f.top?d.y-c.y+(b.offsetHeight>>1):parseInt(f.top,10)+j)+"px"})),h.setAttribute("role","progressbar"),e.lines(h,e.opts),!m){var k,l=0,n=(f.lines-1)*(1-f.direction)/2,o=f.fps,p=o/f.speed,q=(1-f.opacity)/(p*f.trail/100),r=p/f.lines;!function s(){l++;for(var a=0;a<f.lines;a++)k=Math.max(1-(l+(f.lines-a)*r)%p*q,f.opacity),e.opacity(h,a*f.direction+n,k,f);e.timeout=e.el&&setTimeout(s,~~(1e3/o))}()}return e},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=e),this},lines:function(b,e){function f(b,c){return g(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px,0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(var h,i=0,k=(e.lines-1)*(1-e.direction)/2;i<e.lines;i++)h=g(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:m&&d(e.opacity,e.trail,k+i*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"}),e.shadow&&c(h,g(f("#000","0 0 4px #000"),{top:"2px"})),c(b,c(h,f(j(e.color,i),"0 0 1px rgba(0,0,0,.1)")));return b},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var r=g(a("group"),{behavior:"url(#default#VML)"});return!f(r,"transform")&&r.adj?l():m=f(r,"animation"),k});var Ac,Bc,Cc,Dc,Ec,Fc,Gc=d(a),Hc=d(b),Ic="quirks"===c.hash.replace("#",""),Jc=sc.csstransforms3d,Kc=Jc&&!Ic,Lc=Jc||"CSS1Compat"===b.compatMode,Mc=tc.ok,Nc=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),Oc=!Kc||Nc,Pc=navigator.msPointerEnabled,Qc="onwheel"in b.createElement("div")?"wheel":b.onmousewheel!==e?"mousewheel":"DOMMouseScroll",Rc=250,Sc=300,Tc=1400,Uc=5e3,Vc=2,Wc=64,Xc=500,Yc=333,Zc="$stageFrame",$c="$navDotFrame",_c="$navThumbFrame",ad="auto",bd=f([.1,0,.25,1]),cd=99999,dd={width:null,minwidth:null,maxwidth:"100%",height:null,minheight:null,maxheight:null,ratio:null,margin:Vc,glimpse:0,fit:"contain",nav:"dots",navposition:"bottom",navwidth:null,thumbwidth:Wc,thumbheight:Wc,thumbmargin:Vc,thumbborderwidth:Vc,thumbfit:"cover",allowfullscreen:!1,transition:"slide",clicktransition:null,transitionduration:Sc,captions:!0,hash:!1,startindex:0,loop:!1,autoplay:!1,stopautoplayontouch:!0,keyboard:!1,arrows:!0,click:!0,swipe:!0,trackpad:!1,controlsonstart:!0,shuffle:!1,direction:"ltr",shadows:!0,spinner:null},ed={left:!0,right:!0,down:!1,up:!1,space:!1,home:!1,end:!1};jQuery.Fotorama=function(a,e){function f(){d.each(yd,function(a,b){if(!b.i){b.i=le++;var c=z(b.video,!0);if(c){var d={};b.video=c,b.img||b.thumb?b.thumbsReady=!0:d=A(b,yd,he),B(yd,{img:d.img,thumb:d.thumb},b.i,he)}}})}function g(a){return Yd[a]||he.fullScreen}function i(a){var b="keydown."+gb,c=gb+ie,d="keydown."+c,f="resize."+c+" orientationchange."+c;a?(Hc.on(d,function(a){var b,c;Cd&&27===a.keyCode?(b=!0,md(Cd,!0,!0)):(he.fullScreen||e.keyboard&&!he.index)&&(27===a.keyCode?(b=!0,he.cancelFullScreen()):a.shiftKey&&32===a.keyCode&&g("space")||37===a.keyCode&&g("left")||38===a.keyCode&&g("up")?c="<":32===a.keyCode&&g("space")||39===a.keyCode&&g("right")||40===a.keyCode&&g("down")?c=">":36===a.keyCode&&g("home")?c="<<":35===a.keyCode&&g("end")&&(c=">>")),(b||c)&&X(a),c&&he.show({index:c,slow:a.altKey,user:!0})}),he.index||Hc.off(b).on(b,"textarea, input, select",function(a){!Bc.hasClass(hb)&&a.stopPropagation()}),Gc.on(f,he.resize)):(Hc.off(d),Gc.off(f))}function j(b){b!==j.f&&(b?(a.html("").addClass(gb+" "+je).append(pe).before(ne).before(oe),eb(he)):(pe.detach(),ne.detach(),oe.detach(),a.html(me.urtext).removeClass(je),fb(he)),i(b),j.f=b)}function n(){yd=he.data=yd||O(e.data)||C(a),zd=he.size=yd.length,!xd.ok&&e.shuffle&&N(yd),f(),Ie=y(Ie),zd&&j(!0)}function s(){var a=2>zd||Cd;Le.noMove=a||Rd,Le.noSwipe=a||!e.swipe,!Vd&&re.toggleClass(zb,!e.click&&!Le.noMove&&!Le.noSwipe),Pc&&pe.toggleClass(qb,!Le.noSwipe)}function t(a){a===!0&&(a=""),e.autoplay=Math.max(+a||Uc,1.5*Ud)}function w(){function a(a,c){b[a?"add":"remove"].push(c)}he.options=e=Q(e),Rd="crossfade"===e.transition||"dissolve"===e.transition,Ld=e.loop&&(zd>2||Rd&&(!Vd||"slide"!==Vd)),Ud=+e.transitionduration||Sc,Xd="rtl"===e.direction,Yd=d.extend({},e.keyboard&&ed,e.keyboard);var b={add:[],remove:[]};zd>1?(Md=e.nav,Od="top"===e.navposition,b.remove.push(Vb),ve.toggle(!!e.arrows)):(Md=!1,ve.hide()),cc(),Bd=new xc(d.extend(yc,e.spinner,zc,{direction:Xd?-1:1})),Ec(),Fc(),e.autoplay&&t(e.autoplay),Sd=m(e.thumbwidth)||Wc,Td=m(e.thumbheight)||Wc,Me.ok=Oe.ok=e.trackpad&&!Oc,s(),dd(e,[Ke]),Nd="thumbs"===Md,Nd?(rc(zd,"navThumb"),Ad=Ae,ge=_c,I(ne,d.Fotorama.jst.style({w:Sd,h:Td,b:e.thumbborderwidth,m:e.thumbmargin,s:ie,q:!Lc})),xe.addClass(Jb).removeClass(Ib)):"dots"===Md?(rc(zd,"navDot"),Ad=ze,ge=$c,xe.addClass(Ib).removeClass(Jb)):(Md=!1,xe.removeClass(Jb+" "+Ib)),Md&&(Od?we.insertBefore(qe):we.insertAfter(qe),wc.nav=!1,wc(Ad,ye,"nav")),Pd=e.allowfullscreen,Pd?(Ce.prependTo(qe),Qd=Mc&&"native"===Pd):(Ce.detach(),Qd=!1),a(Rd,mb),a(!Rd,nb),a(!e.captions,tb),a(Xd,rb),a("always"!==e.arrows,ub),Wd=e.shadows&&!Oc,a(!Wd,pb),pe.addClass(b.add.join(" ")).removeClass(b.remove.join(" ")),Je=d.extend({},e)}function x(a){return 0>a?(zd+a%zd)%zd:a>=zd?a%zd:a}function y(a){return h(a,0,zd-1)}function D(a){return Ld?x(a):y(a)}function T(a){return a>0||Ld?a-1:!1}function _(a){return zd-1>a||Ld?a+1:!1}function ab(){Le.min=Ld?-1/0:-q(zd-1,Ke.w,e.margin,Fd),Le.max=Ld?1/0:-q(0,Ke.w,e.margin,Fd),Le.snap=Ke.w+e.margin}function db(){Ne.min=Math.min(0,Ke.nw-ye.width()),Ne.max=0,ye.toggleClass(zb,!(Ne.noMove=Ne.min===Ne.max))}function Nb(a,b,c){if("number"==typeof a){a=new Array(a);var e=!0}return d.each(a,function(a,d){if(e&&(d=a),"number"==typeof d){var f=yd[x(d)];if(f){var g="$"+b+"Frame",h=f[g];c.call(this,a,d,f,h,g,h&&h.data())}}})}function Ob(a,b,c,d){(!Zd||"*"===Zd&&d===Kd)&&(a=p(e.width)||p(a)||Xc,b=p(e.height)||p(b)||Yc,he.resize({width:a,ratio:e.ratio||c||a/b},0,d!==Kd&&"*"))}function Pb(a,b,c,f,g){Nb(a,b,function(a,h,i,j,k,l){function m(a){var b=x(h);fd(a,{index:b,src:v,frame:yd[b]})}function n(){s.remove(),d.Fotorama.cache[v]="error",i.html&&"stage"===b||!w||w===v?(!v||i.html||q?"stage"===b&&(j.trigger("f:load").removeClass($b+" "+Zb).addClass(_b),m("load"),Ob()):(j.trigger("f:error").removeClass($b).addClass(Zb),m("error")),l.state="error",!(zd>1&&yd[h]===i)||i.html||i.deleted||i.video||q||(i.deleted=!0,he.splice(h,1))):(i[u]=v=w,Pb([h],b,c,f,!0))}function o(){d.Fotorama.measures[v]=t.measures=d.Fotorama.measures[v]||{width:r.width,height:r.height,ratio:r.width/r.height},Ob(t.measures.width,t.measures.height,t.measures.ratio,h),s.off("load error").addClass(dc+(q?" "+ec:"")).prependTo(j),H(s,c||Ke,f||i.fit||e.fit),d.Fotorama.cache[v]=l.state="loaded",setTimeout(function(){j.trigger("f:load").removeClass($b+" "+Zb).addClass(_b+" "+(q?ac:bc)),"stage"===b?m("load"):(i.thumbratio===ad||!i.thumbratio&&e.thumbratio===ad)&&(i.thumbratio=t.measures.ratio,vd())},0)}function p(){var a=10;F(function(){return!ee||!a--&&!Oc},function(){o()})}if(j){var q=he.fullScreen&&i.full&&i.full!==i.img&&!l.$full&&"stage"===b;if(!l.$img||g||q){var r=new Image,s=d(r),t=s.data();l[q?"$full":"$img"]=s;var u="stage"===b?q?"full":"img":"thumb",v=i[u],w=q?null:i["stage"===b?"thumb":"img"];if("navThumb"===b&&(j=l.$wrap),!v)return void n();d.Fotorama.cache[v]?!function y(){"error"===d.Fotorama.cache[v]?n():"loaded"===d.Fotorama.cache[v]?setTimeout(p,0):setTimeout(y,100)}():(d.Fotorama.cache[v]="*",s.on("load",p).on("error",n)),l.state="",r.src=v}}})}function Qb(a){He.append(Bd.spin().el).appendTo(a)}function cc(){He.detach(),Bd&&Bd.stop()}function jc(){var a=Dd[Zc];a&&!a.data().state&&(Qb(a),a.on("f:load f:error",function(){a.off("f:load f:error"),cc()}))}function qc(a){V(a,sd),W(a,function(){setTimeout(function(){P(xe)},0),Nc({time:Ud,guessIndex:d(this).data().eq,minMax:Ne})})}function rc(a,b){Nb(a,b,function(a,c,e,f,g,h){if(!f){f=e[g]=pe[g].clone(),h=f.data(),h.data=e;var i=f[0];"stage"===b?(e.html&&d('<div class="'+ic+'"></div>').append(e._html?d(e.html).removeAttr("id").html(e._html):e.html).appendTo(f),e.caption&&d(M(mc,M(nc,e.caption))).appendTo(f),e.video&&f.addClass(xb).append(Ee.clone()),W(i,function(){setTimeout(function(){P(qe)},0),pd({index:h.eq,user:!0})}),se=se.add(f)):"navDot"===b?(qc(i),ze=ze.add(f)):"navThumb"===b&&(qc(i),h.$wrap=f.children(":first"),Ae=Ae.add(f),e.video&&f.append(Ee.clone()))}})}function sc(a,b,c){return a&&a.length&&H(a,b,c)}function uc(a){Nb(a,"stage",function(a,b,c,f,g,h){if(f){var i=x(b);h.eq=i,Qe[Zc][i]=f.css(d.extend({left:Rd?0:q(b,Ke.w,e.margin,Fd)},Rd&&l(0))),E(f[0])&&(f.appendTo(re),md(c.$video));var j=c.fit||e.fit;sc(h.$img,Ke,j),sc(h.$full,Ke,j)}})}function vc(a,b){if("thumbs"===Md&&!isNaN(a)){var c=-a,f=-a+Ke.nw;Ae.each(function(){var a=d(this),g=a.data(),h=g.eq,i={h:Td},j=(yd[h]||{}).thumbfit||e.thumbfit;i.w=g.w,g.l+g.w<c||g.l>f||sc(g.$img,i,j)||b&&Pb([h],"navThumb",i,j)})}}function wc(a,b,c){if(!wc[c]){var f="nav"===c&&Nd,g=0;b.append(a.filter(function(){for(var a,b=d(this),c=b.data(),e=0,f=yd.length;f>e;e++)if(c.data===yd[e]){a=!0,c.eq=e;break}return a||b.remove()&&!1}).sort(function(a,b){return d(a).data().eq-d(b).data().eq}).each(function(){if(f){var a=d(this),b=a.data(),c=Math.round(Td*b.data.thumbratio)||Sd;b.l=g,b.w=c,a.css({width:c}),g+=c+e.thumbmargin}})),wc[c]=!0}}function Cc(a){return a-Re>Ke.w/3}function Dc(a){return!(Ld||Ie+a&&Ie-zd+a||Cd)}function Ec(){var a=Dc(0),b=Dc(1);te.toggleClass(Cb,a).attr(U(a)),ue.toggleClass(Cb,b).attr(U(b))}function Fc(){Me.ok&&(Me.prevent={"<":Dc(0),">":Dc(1)})}function Ic(a){var b,c,d=a.data();return Nd?(b=d.l,c=d.w):(b=a.position().left,c=a.width()),{c:b+c/2,min:-b+10*e.thumbmargin,max:-b+Ke.w-c-10*e.thumbmargin}}function Jc(a){var b=Dd[ge].data();Z(Be,{time:1.2*a,pos:b.l,width:b.w-2*e.thumbborderwidth})}function Nc(a){var b=yd[a.guessIndex][ge];if(b){var c=Ne.min!==Ne.max,d=a.minMax||c&&Ic(Dd[ge]),e=c&&(a.keep&&Nc.l?Nc.l:h((a.coo||Ke.nw/2)-Ic(b).c,d.min,d.max)),f=c&&h(e,Ne.min,Ne.max),g=1.1*a.time;Z(ye,{time:g,pos:f||0,onEnd:function(){vc(f,!0)}}),ld(xe,J(f,Ne.min,Ne.max)),Nc.l=e}}function Qc(){Tc(ge),Pe[ge].push(Dd[ge].addClass(Ub))}function Tc(a){for(var b=Pe[a];b.length;)b.shift().removeClass(Ub)}function Vc(a){var b=Qe[a];d.each(Ed,function(a,c){delete b[x(c)]}),d.each(b,function(a,c){delete b[a],c.detach()})}function bd(a){Fd=Gd=Ie;var b=Dd[Zc];b&&(Tc(Zc),Pe[Zc].push(b.addClass(Ub)),a||he.show.onEnd(!0),u(re,0,!0),Vc(Zc),uc(Ed),ab(),db())}function dd(a,b){a&&d.each(b,function(b,c){c&&d.extend(c,{width:a.width||c.width,height:a.height,minwidth:a.minwidth,maxwidth:a.maxwidth,minheight:a.minheight,maxheight:a.maxheight,ratio:R(a.ratio)})})}function fd(b,c){a.trigger(gb+":"+b,[he,c])}function gd(){clearTimeout(hd.t),ee=1,e.stopautoplayontouch?he.stopAutoplay():be=!0}function hd(){e.stopautoplayontouch||(id(),jd()),hd.t=setTimeout(function(){ee=0},Sc+Rc)}function id(){be=!(!Cd&&!ce)}function jd(){if(clearTimeout(jd.t),!e.autoplay||be)return void(he.autoplay&&(he.autoplay=!1,fd("stopautoplay")));he.autoplay||(he.autoplay=!0,fd("startautoplay"));var a=Ie,b=Dd[Zc].data();F(function(){return b.state||a!==Ie},function(){jd.t=setTimeout(function(){be||a!==Ie||he.show(Ld?Y(!Xd):x(Ie+(Xd?-1:1)))},e.autoplay)})}function kd(){he.fullScreen&&(he.fullScreen=!1,Mc&&tc.cancel(ke),Bc.removeClass(hb),Ac.removeClass(hb),a.removeClass(Xb).insertAfter(oe),Ke=d.extend({},de),md(Cd,!0,!0),rd("x",!1),he.resize(),Pb(Ed,"stage"),P(Gc,_d,$d),fd("fullscreenexit"))}function ld(a,b){Wd&&(a.removeClass(Sb+" "+Tb),b&&!Cd&&a.addClass(b.replace(/^|\s/g," "+Rb+"--")))}function md(a,b,c){b&&(pe.removeClass(lb),Cd=!1,s()),a&&a!==Cd&&(a.remove(),fd("unloadvideo")),c&&(id(),jd())}function nd(a){pe.toggleClass(ob,a)}function od(a){if(!Le.flow){var b=a?a.pageX:od.x,c=b&&!Dc(Cc(b))&&e.click;od.p!==c&&qe.toggleClass(Ab,c)&&(od.p=c,od.x=b)}}function pd(a){clearTimeout(pd.t),e.clicktransition&&e.clicktransition!==e.transition?(Vd=e.transition,he.setOptions({transition:e.clicktransition}),pd.t=setTimeout(function(){he.show(a)},10)):he.show(a)}function qd(a,b){var c=a.target,f=d(c);f.hasClass(kc)?he.playVideo():c===De?he.toggleFullScreen():Cd?c===Ge&&md(Cd,!0,!0):b?nd():e.click&&pd({index:a.shiftKey||Y(Cc(a._x)),slow:a.altKey,user:!0})}function rd(a,b){Le[a]=Ne[a]=b}function sd(a){var b=d(this).data().eq;pd({index:b,slow:a.altKey,user:!0,coo:a._x-xe.offset().left})}function td(a){pd({index:ve.index(this)?">":"<",slow:a.altKey,user:!0})}function ud(a){W(a,function(){P(qe),setTimeout(function(){P(qe)},0),nd(!1)})}function vd(){vd.ok;if(n(),w(),!vd.i){vd.i=!0;var a=e.startindex;(a||e.hash&&c.hash)&&(Kd=K(a||c.hash.replace(/^#/,""),yd,0===he.index||a,a)),Ie=Fd=Gd=Hd=Kd=D(Kd)||0}if(zd){if(wd())return;Cd&&md(Cd,!0),Ed=[],Vc(Zc),vd.ok=!0,he.show({index:Ie,time:0}),he.resize()}else he.destroy()}function wd(){return!wd.f===Xd?(wd.f=Xd,Ie=zd-1-Ie,he.reverse(),!0):void 0}function xd(){xd.ok||(xd.ok=!0,fd("ready"))}Ac=d("html"),Bc=d("body");var yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,$d,_d,ae,be,ce,de,ee,fe,ge,he=this,ie=d.now(),je=gb+ie,ke=a[0],le=1,me=a.data(),ne=d("<style></style>"),oe=d(M(Wb)),pe=d(M(ib)),qe=d(M(vb)).appendTo(pe),re=(qe[0],d(M(yb)).appendTo(qe)),se=d(),te=d(M(Bb+" "+Db+pc)),ue=d(M(Bb+" "+Eb+pc)),ve=te.add(ue).appendTo(qe),we=d(M(Gb)),xe=d(M(Fb)).appendTo(we),ye=d(M(Hb)).appendTo(xe),ze=d(),Ae=d(),Be=(re.data(),ye.data(),d(M(hc)).appendTo(ye)),Ce=d(M(Yb+pc)),De=Ce[0],Ee=d(M(kc)),Fe=d(M(lc)).appendTo(qe),Ge=Fe[0],He=d(M(oc)),Ie=!1,Je={},Ke={},Le={},Me={},Ne={},Oe={},Pe={},Qe={},Re=0,Se=[];pe[Zc]=d(M(wb)),pe[_c]=d(M(Kb+" "+Mb+pc,M(gc))),pe[$c]=d(M(Kb+" "+Lb+pc,M(fc))),Pe[Zc]=[],Pe[_c]=[],Pe[$c]=[],Qe[Zc]={},pe.addClass(Kc?kb:jb).toggleClass(ob,!e.controlsonstart),me.fotorama=this,he.startAutoplay=function(a){return he.autoplay?this:(be=ce=!1,t(a||e.autoplay),jd(),this)},he.stopAutoplay=function(){return he.autoplay&&(be=ce=!0,jd()),this
},he.show=function(a){var b;"object"!=typeof a?(b=a,a={}):b=a.index,b=">"===b?Gd+1:"<"===b?Gd-1:"<<"===b?0:">>"===b?zd-1:b,b=isNaN(b)?K(b,yd,!0):b,b="undefined"==typeof b?Ie||0:b,he.activeIndex=Ie=D(b),Id=T(Ie),Jd=_(Ie),Ed=[Ie,Id,Jd],Gd=Ld?b:Ie;var c=Math.abs(Hd-Gd),d=v(a.time,function(){return Math.min(Ud*(1+(c-1)/12),2*Ud)}),f=a.overPos;a.slow&&(d*=10);var g=Dd;he.activeFrame=Dd=yd[Ie];var i=g===Dd;md(Cd,Dd.i!==yd[x(Fd)].i),rc(Ed,"stage"),uc(Oc?[Gd]:[Gd,T(Gd),_(Gd)]),rd("go",!0),i||fd("show",{user:a.user,time:d}),be=!0;var j=he.show.onEnd=function(b){if(!j.ok){if(j.ok=!0,b||bd(!0),!i&&(fd("showend",{user:a.user}),!b&&Vd&&Vd!==e.transition))return he.setOptions({transition:Vd}),void(Vd=!1);jc(),Pb(Ed,"stage"),rd("go",!1),Fc(),od(),id(),jd()}};if(Rd){var k=Dd[Zc],l=Ie!==Hd?yd[Hd][Zc]:null;$(k,l,se,{time:d,method:e.transition,onEnd:j},Se)}else Z(re,{pos:-q(Gd,Ke.w,e.margin,Fd),overPos:f,time:d,onEnd:j});if(Ec(),Md){Qc();var m=y(Ie+h(Gd-Hd,-1,1));Nc({time:d,coo:m!==Ie&&a.coo,guessIndex:"undefined"!=typeof a.coo?m:Ie,keep:i}),Nd&&Jc(d)}return ae="undefined"!=typeof Hd&&Hd!==Ie,Hd=Ie,e.hash&&ae&&!he.eq&&G(Dd.id||Ie+1),this},he.requestFullScreen=function(){return Pd&&!he.fullScreen&&($d=Gc.scrollTop(),_d=Gc.scrollLeft(),P(Gc),rd("x",!0),de=d.extend({},Ke),a.addClass(Xb).appendTo(Bc.addClass(hb)),Ac.addClass(hb),md(Cd,!0,!0),he.fullScreen=!0,Qd&&tc.request(ke),he.resize(),Pb(Ed,"stage"),jc(),fd("fullscreenenter")),this},he.cancelFullScreen=function(){return Qd&&tc.is()?tc.cancel(b):kd(),this},he.toggleFullScreen=function(){return he[(he.fullScreen?"cancel":"request")+"FullScreen"]()},S(b,tc.event,function(){!yd||tc.is()||Cd||kd()}),he.resize=function(a){if(!yd)return this;var b=arguments[1]||0,c=arguments[2];dd(he.fullScreen?{width:"100%",maxwidth:null,minwidth:null,height:"100%",maxheight:null,minheight:null}:Q(a),[Ke,c||he.fullScreen||e]);var d=Ke.width,f=Ke.height,g=Ke.ratio,i=Gc.height()-(Md?xe.height():0);return p(d)&&(pe.addClass(sb).css({width:d,minWidth:Ke.minwidth||0,maxWidth:Ke.maxwidth||cd}),d=Ke.W=Ke.w=pe.width(),Ke.nw=Md&&o(e.navwidth,d)||d,e.glimpse&&(Ke.w-=Math.round(2*(o(e.glimpse,d)||0))),re.css({width:Ke.w,marginLeft:(Ke.W-Ke.w)/2}),f=o(f,i),f=f||g&&d/g,f&&(d=Math.round(d),f=Ke.h=Math.round(h(f,o(Ke.minheight,i),o(Ke.maxheight,i))),qe.stop().animate({width:d,height:f},b,function(){pe.removeClass(sb)}),bd(),Md&&(xe.stop().animate({width:Ke.nw},b),Nc({guessIndex:Ie,time:b,keep:!0}),Nd&&wc.nav&&Jc(b)),Zd=c||!0,xd())),Re=qe.offset().left,this},he.setOptions=function(a){return d.extend(e,a),vd(),this},he.shuffle=function(){return yd&&N(yd)&&vd(),this},he.destroy=function(){return he.cancelFullScreen(),he.stopAutoplay(),yd=he.data=null,j(),Ed=[],Vc(Zc),vd.ok=!1,this},he.playVideo=function(){var a=Dd,b=a.video,c=Ie;return"object"==typeof b&&a.videoReady&&(Qd&&he.fullScreen&&he.cancelFullScreen(),F(function(){return!tc.is()||c!==Ie},function(){c===Ie&&(a.$video=a.$video||d(d.Fotorama.jst.video(b)),a.$video.appendTo(a[Zc]),pe.addClass(lb),Cd=a.$video,s(),ve.blur(),Ce.blur(),fd("loadvideo"))})),this},he.stopVideo=function(){return md(Cd,!0,!0),this},qe.on("mousemove",od),Le=bb(re,{onStart:gd,onMove:function(a,b){ld(qe,b.edge)},onTouchEnd:hd,onEnd:function(a){ld(qe);var b=(Pc&&!fe||a.touch)&&e.arrows&&"always"!==e.arrows;if(a.moved||b&&a.pos!==a.newPos&&!a.control){var c=r(a.newPos,Ke.w,e.margin,Fd);he.show({index:c,time:Rd?Ud:a.time,overPos:a.overPos,user:!0})}else a.aborted||a.control||qd(a.startEvent,b)},timeLow:1,timeHigh:1,friction:2,select:"."+Vb+", ."+Vb+" *",$wrap:qe}),Ne=bb(ye,{onStart:gd,onMove:function(a,b){ld(xe,b.edge)},onTouchEnd:hd,onEnd:function(a){function b(){Nc.l=a.newPos,id(),jd(),vc(a.newPos,!0)}if(a.moved)a.pos!==a.newPos?(be=!0,Z(ye,{time:a.time,pos:a.newPos,overPos:a.overPos,onEnd:b}),vc(a.newPos),Wd&&ld(xe,J(a.newPos,Ne.min,Ne.max))):b();else{var c=a.$target.closest("."+Kb,ye)[0];c&&sd.call(c,a.startEvent)}},timeLow:.5,timeHigh:2,friction:5,$wrap:xe}),Me=cb(qe,{shift:!0,onEnd:function(a,b){gd(),hd(),he.show({index:b,slow:a.altKey})}}),Oe=cb(xe,{onEnd:function(a,b){gd(),hd();var c=u(ye)+.25*b;ye.css(k(h(c,Ne.min,Ne.max))),Wd&&ld(xe,J(c,Ne.min,Ne.max)),Oe.prevent={"<":c>=Ne.max,">":c<=Ne.min},clearTimeout(Oe.t),Oe.t=setTimeout(function(){Nc.l=c,vc(c,!0)},Rc),vc(c)}}),pe.hover(function(){setTimeout(function(){ee||nd(!(fe=!0))},0)},function(){fe&&nd(!(fe=!1))}),L(ve,function(a){X(a),td.call(this,a)},{onStart:function(){gd(),Le.control=!0},onTouchEnd:hd}),ve.each(function(){V(this,function(a){td.call(this,a)}),ud(this)}),V(De,he.toggleFullScreen),ud(De),d.each("load push pop shift unshift reverse sort splice".split(" "),function(a,b){he[b]=function(){return yd=yd||[],"load"!==b?Array.prototype[b].apply(yd,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(yd=O(arguments[0])),vd(),he}}),vd()},d.fn.fotorama=function(b){return this.each(function(){var c=this,e=d(this),f=e.data(),g=f.fotorama;g?g.setOptions(b,!0):F(function(){return!D(c)},function(){f.urtext=e.html(),new d.Fotorama(e,d.extend({},dd,a.fotoramaDefaults,b,f))})})},d.Fotorama.instances=[],d.Fotorama.cache={},d.Fotorama.measures={},d=d||{},d.Fotorama=d.Fotorama||{},d.Fotorama.jst=d.Fotorama.jst||{},d.Fotorama.jst.style=function(a){{var b,c="";rc.escape}return c+=".fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(b=a.m)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb-border{\nheight:"+(null==(b=a.h-a.b*(a.q?0:2))?"":b)+"px;\nborder-width:"+(null==(b=a.b)?"":b)+"px;\nmargin-top:"+(null==(b=a.m)?"":b)+"px}"},d.Fotorama.jst.video=function(a){function b(){c+=d.call(arguments,"")}var c="",d=(rc.escape,Array.prototype.join);return c+='<div class="fotorama__video"><iframe src="',b(("youtube"==a.type?a.p+"youtube.com/embed/"+a.id+"?autoplay=1":"vimeo"==a.type?a.p+"player.vimeo.com/video/"+a.id+"?autoplay=1&badge=0":a.id)+(a.s&&"custom"!=a.type?"&"+a.s:"")),c+='" frameborder="0" allowfullscreen></iframe></div>\n'},d(function(){d("."+gb+':not([data-auto="false"])').fotorama(),"https://"===x().p||a.blockFotoramaData||d("body").append('<iframe style="display: none;"></iframe>')})}(window,document,location,"undefined"!=typeof jQuery&&jQuery);