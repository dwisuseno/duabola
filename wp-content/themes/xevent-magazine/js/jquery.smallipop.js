/*!
Smallipop (06/21/2013)
Copyright (c) 2011-2013 Small Improvements (http://www.small-improvements.com)

Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.

@author Sebastian Helzle (sebastian@helzle.net)
*/
(function($){ "use strict";(function(e){if(typeof define==="function"&&define.amd){return define(["jquery"],e)}else{return e(jQuery)}})(function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et,tt,nt,rt,it,st,ot,ut,at,ft,lt,ct,ht,pt,dt,vt,mt,gt,yt,bt,wt,Et,St,xt,Tt,Nt,Ct,kt,Lt,At,Ot,Mt,_t,Dt;o="smallipop";f=o+"-hint";c=o+"-instance";a=o+"-content";h=o+"-left";p=o+"-right";u=o+"-bottom";i=o+"-align-left";s=o+"-align-right";l=o+"-initialized";d=o+"-theme-";v=o+"-tour";y=v+"-content";E=v+"-overlay";b=v+"-footer";g=v+"-close-icon";x=v+"-progress";m=v+"-close";S=v+"-prev";w=v+"-next";q="focus."+o;I="click."+o;F="blur."+o;U="mouseout."+o;z="mouseover."+o;V="touchend."+o;W="resize."+o;X="scroll."+o;R="keyup."+o;B=o+"OriginalZIndex";C=o+"BeingShown";M=o+"HideDelayTimer";_=o+"ShowDelayTimer";D=o+"TriggerHovered";L=o+"PopupHovered";O=o+"Shown";A=o+"Position";P=o+"XDistance";H=o+"YDistance";k=o+"IsTour";dt=new RegExp(o+"-(align|bottom)w*","g");vt=new RegExp(o+"w+","g");t=e(document);r=e(window);n=null;it={};Mt={};N=null;ut=1;ft=1;wt=null;at=0;gt=null;ht="<div class='"+c+"'><div class='"+a+"'/></div>";e.smallipop=Nt={version:"0.6.1",defaults:{autoscrollPadding:200,contentAnimationSpeed:150,cssAnimations:{enabled:false,show:"animated fadeIn",hide:"animated fadeOut"},funcEase:"easeInOutQuad",handleInputs:true,hideDelay:500,hideTrigger:false,hideOnPopupClick:true,hideOnTriggerClick:true,infoClass:f,invertAnimation:false,popupId:"",popupOffset:31,popupYOffset:0,popupDistance:5,popupDelay:100,popupAnimationSpeed:200,preferredPosition:"top",referencedContent:null,theme:"default",touchSupport:true,tourHighlight:false,tourHighlightColor:"#222",tourHighlightFadeDuration:200,tourHighlightOpacity:.5,tourHighlightZIndex:9997,tourNavigationEnabled:true,triggerAnimationSpeed:150,triggerOnClick:false,onAfterHide:null,onAfterShow:null,onBeforeHide:null,onBeforeShow:null,onTourClose:null,onTourNext:null,onTourPrev:null,windowPadding:30,labels:{prev:"Prev",next:"Next",close:"Close",of:"of"}}};if(!e.easing.easeInOutQuad){e.easing.easeInOutQuad=function(e,t,n,r,i){if((t/=i/2)<1){return r/2*t*t+n}else{return-r/2*(--t*(t-2)-1)+n}}}yt=function(){var e,t,n,r,i;i=[];for(n in Mt){t=Mt[n];i.push(function(){var n,i,s;s=[];for(n=0,i=t.length;n<i;n++){e=t[n];r=e.trigger;if(r.data(B)){s.push(r.css("zIndex",r.data(B)))}else{s.push(void 0)}}return s}())}return i};Ct=typeof Modernizr!=="undefined"&&Modernizr!==null?Modernizr.touch:void 0;T=typeof Modernizr!=="undefined"&&Modernizr!==null?Modernizr.cssanimations:void 0;tt=function(t){return e("."+(o+t))};et=function(){if(!n){n=e("<div id='"+E+"'/>").appendTo(e("body")).fadeOut(0)}return n};rt=function(e){et().fadeOut(e.tourHighlightFadeDuration);return yt()};nt=function(t){var n,r,i,s,u,a,f,l,c,h,p,d,v,m,g,y,b,w;clearTimeout(wt);l=(t!=null?t.target:void 0)?e(t.target):t;w=[];for(a in it){s=it[a];u=s.data();if(!(f=u[O])){continue}c=tt(f);p=c.is(l);h=c.data(o);d=h.options||Nt.defaults;if((u[k]||h.isFormElement)&&!s.is(l)&&!(p&&s.is(d.popupInstance))){continue}if(u[k]){N=null;if((y=c.data(o))!=null){if(typeof (g=y.options).onTourClose==="function"){g.onTourClose()}}rt(d)}i=!d.hideOnTriggerClick&&p;r=!d.hideOnPopupClick&&s.find(l).length;if(l&&c.length&&((b=t!=null?t.type:void 0)==="click"||b==="touchend")&&(i||r)){continue}if(f&&d.hideTrigger){c.stop(true).fadeTo(d.triggerAnimationSpeed,1)}s.data(M,null).data(C,false);if(d.cssAnimations.enabled){s.removeClass(d.cssAnimations.show).addClass(d.cssAnimations.hide).data(O,"");if(d.onAfterHide){w.push(window.setTimeout(d.onAfterHide,d.popupAnimationSpeed))}else{w.push(void 0)}}else{n=d.invertAnimation?-1:1;v=u[P]*n;m=u[H]*n;w.push(s.stop(true).animate({top:"-="+m,left:"+="+v,opacity:0},d.popupAnimationSpeed,d.funcEase,function(){var t;t=e(this);if(!t.data(C)){t.css("display","none").data(O,"")}return typeof d.onAfterHide==="function"?d.onAfterHide():void 0}))}}return w};xt=function(t){var n,r;n=e(this).data(o);if(!n){return}if(n.popupInstance.data(O)!==n.id&&((r=!n.type)==="checkbox"||r==="radio")){if(t!=null){t.preventDefault()}}return Dt.call(this)};ot=function(e){clearTimeout(e.data(M));return clearTimeout(e.data(_))};pt=function(e){if(e==null){e=50}clearTimeout(gt);return gt=setTimeout(mt,e)};G=function(e,t){if(e){return(e.match(t)||[]).join(" ")}};K=function(e,t){return G(t,dt)};Q=function(e,t){return G(t,vt)};mt=function(t){var n,r,a,f,l,v,m,g,y,b,w,E,S,x,T,N,k,L,M,_,D,B,j,F,I,q,R,U,z,W,X,V,J,Q,G,Y,Z,et;if(t==null){t=true}et=[];for(S in it){l=it[S];m=l.data();B=m[O];if(!B){continue}F=tt(B);I=F.data(o);f=I.options;l.removeClass(K);if(t){j=d+f.theme.split(" ").join(" "+d);l.attr("class",""+c+" "+j)}q=e(window);V=G=f.popupDistance;J=f.popupOffset;Y=f.popupYOffset;n=l.data(A)==="fixed";E=l.outerHeight();N=l.outerWidth();v=N/2;W=q.width();R=q.height();z=q.scrollTop();U=q.scrollLeft();X=f.windowPadding;r=F.offset();_=F.outerWidth();M=F.outerHeight();D=r.top-z;x=r.left+_/2;T=r.top-E+Y;k=E+f.popupDistance-Y;w=D-k;g=R-D-M-k;y=r.left-N-J;b=W-r.left-_-N;L=f.preferredPosition;if(L==="left"||L==="right"){G=0;T+=M/2+E/2;if(L==="right"&&b>X||y<X){l.addClass(p);x=r.left+_+J}else{l.addClass(h);x=r.left-N-J;V=-V}}else{V=0;if(x+v>W-X){x-=v*2-J;l.addClass(i)}else if(x-v<X){x-=J;l.addClass(s)}else{x-=v}if(x<X){x=X}if(L==="bottom"&&g>X||w<X){G=-G;T+=E+M-2*Y;l.addClass(u)}}if(E<M){Z=T+E+X-G+Y-z-R;if(Z>0){T=Math.max(T-Z-X,r.top+Y+X+G)}}if(N<_){Q=x+N+X+V+J-U-W;if(Q>0){x=Math.max(x-Q+X,r.left+J+X-V)}}if(f.hideTrigger){F.stop(true).fadeTo(f.triggerAnimationSpeed,0)}a=0;if(!m[C]||f.cssAnimations.enabled){T-=G;x+=V;V=G=0;a=1}if(n){x-=U;T-=z}l.data(P,V).data(H,G).css({top:T,left:x,display:"block",opacity:a});et.push($(l,{top:"-="+G,left:"+="+V,opacity:1}))}return et};Y=function(){return mt(false)};$=function(e,t){var n,r;n=((r=tt(e.data(O)).data(o))!=null?r.options:void 0)||Nt.defaults;if(n.cssAnimations.enabled){e.addClass(n.cssAnimations.show);return window.setTimeout(function(){return J(e,n)},n.popupAnimationSpeed)}else{return e.stop(true).animate(t,n.popupAnimationSpeed,n.funcEase,function(){return J(e,n)})}};J=function(e,t){var n;n=e.data();if(n[C]){e.data(C,false);return typeof t.onAfterShow==="function"?t.onAfterShow(tt(n[O])):void 0}};St=function(t,r){var i,s,u,f,l,c,h,p,d;if(r==null){r=""}p=t.data(o);d=p.options;u=p.popupInstance;if(!u.data(D)){return}c=u.data(O);if(c){i=tt(c);if(i.length){s=i.data(o).options||Nt.defaults;if(s.hideTrigger){i.stop(true).fadeTo(s.fadeSpeed,1)}}}if(d.tourHighlight&&d.tourIndex){h=et().css({backgroundColor:d.tourHighlightColor,zIndex:d.tourHighlightZIndex});yt();if(t.css("position")==="static"){t.css("position","relative")}if(!t.data(B)){t.data(B,t.css("zIndex"))}t.css("zIndex",d.tourHighlightZIndex+1);h.fadeTo(d.tourHighlightFadeDuration,d.tourHighlightOpacity)}else if(n){rt(d)}f=r||p.hint;if(d.referencedContent&&!r){f=e(d.referencedContent).clone(true,true)||f}l=st(t)?"fixed":"absolute";if(c!==p.id){u.hide(0)}u.data(C,true).data(O,p.id).data(A,l).find("."+a).empty().append(f);u.css("position",l);return pt(0)};st=function(e){var t;t=e;while(t.length&&t[0].nodeName!=="HTML"){if(t.css("position")==="fixed"){return true}t=t.parent()}return false};Dt=function(){var t,n,r,i,s,u;i=n=e(this);t=i.hasClass(l);if(!t){i=tt(n.data(O))}if(!i.length){return}s=i.data(o);n=s.popupInstance.data(t?D:L,true);ot(n);r=n.data(O);if(r!==s.id||n.css("opacity")===0){if(typeof (u=s.options).onBeforeShow==="function"){u.onBeforeShow(i)}return n.data(_,setTimeout(function(){return St(i)},s.options.popupDelay))}};_t=function(){var t,n,r,i,s,u;i=n=e(this);t=i.hasClass(l);if(!t){i=tt(n.data(O))}if(!i.length){return}s=i.data(o);n=s.popupInstance.data(t?D:L,false);ot(n);r=n.data();if(!(r[L]||r[D])){if(typeof (u=s.options).onBeforeHide==="function"){u.onBeforeHide(i)}return n.data(M,setTimeout(function(){return nt(n)},s.options.hideDelay))}};ct=function(e){clearTimeout(wt);return wt=setTimeout(Y,250)};Et=function(t,n){var r,i,s;if(!(t!=null?t.length:void 0)){return}s=t.data(o);r=s.tourTitle;if(r){i=s.popupInstance.find("."+y)}else{i=s.popupInstance.find("."+a)}if(i.html()!==n){return i.stop(true).fadeTo(s.options.contentAnimationSpeed,0,function(){e(this).html(n).fadeTo(s.options.contentAnimationSpeed,1);return mt()})}};bt=function(e,t){var n,r,i,s,u,a;s=e.data(o);i=s!=null?s.tourTitle:void 0;if(!(i&&Mt[i])){return}Mt[i].sort(function(e,t){return e.index-t.index});if(!(typeof t==="number"&&t%1===0)){t=-1}else{t-=1}N=i;n=Mt[i];for(r=u=0,a=n.length-1;0<=a?u<=a:u>=a;r=0<=a?++u:--u){if(t>=0&&r===t||t<0&&n[r].id===s.id){return Ot(i,r)}}};Ot=function(t,n){var r,i,s,u,a,f,l;s=Mt[t];if(!s){return}i=s[n].trigger;l=i.data(o);f=l.options;a=f.tourNavigationEnabled;u="";if(a){u+="<div class='"+x+"'>"+(""+(n+1)+" "+f.labels.of+" "+s.length+"</div>");if(n>0){u+="<a href='#' class='"+S+"'>"+f.labels.prev+"</a>"}if(n<s.length-1){u+="<a href='#' class='"+w+"'>"+f.labels.next+"</a>"}}if(!a||n===s.length-1){u+="<a href='#' class='"+m+"'>"+f.labels.close+"</a>"}r=e("<div class='"+y+"'/>"+("<a href='#' class='"+g+"'>&Chi;</a>")+("<div class='"+b+"'>"+u+"</div>"));r.eq(0).append(l.hint);ot(l.popupInstance);l.popupInstance.data(D,true);return Tt(i,r)};Tt=function(n,i){var s,u,a,f;u=n.offset().top;s=u-t.scrollTop();f=r.height();a=n.data(o).options;if(!st(n)&&(s<a.autoscrollPadding||s>f-a.autoscrollPadding)){return e("html, body").animate({scrollTop:u-f/2},800,"swing",function(){return St(n,i)})}else{return St(n,i)}};Lt=function(e){var t,n,r,i,s,u,a;if(e!=null){e.preventDefault()}n=Mt[N];if(!n){return}t=n[0].popupInstance;i=t.data(O)||n[0].id;for(r=u=0,a=n.length-2;0<=a?u<=a:u>=a;r=0<=a?++u:--u){if(!(n[r].id===i)){continue}s=n[r].trigger.data(o).options;if(s.tourNavigationEnabled){if(typeof s.onTourNext==="function"){s.onTourNext(n[r+1].trigger)}return Ot(N,r+1)}}};At=function(e){var t,n,r,i,s,u,a;if(e!=null){e.preventDefault()}n=Mt[N];if(!n){return}t=n[0].popupInstance;i=t.data(O)||n[0].id;for(r=u=1,a=n.length-1;1<=a?u<=a:u>=a;r=1<=a?++u:--u){if(!(n[r].id===i)){continue}s=n[r].trigger.data(o).options;if(s.tourNavigationEnabled){if(typeof s.onTourPrev==="function"){s.onTourPrev(n[r-1].trigger)}return Ot(N,r-1)}}};kt=function(t){var n;if(t!=null){t.preventDefault()}n=e(t.target).closest("."+c);return nt(n)};j=function(t){return t.each(function(){var t,n;n=e(this);t=n.data(o);if(t){return n.unbind("."+o).data(o,{}).removeClass(Q)}})};lt=function(e){var t,n,r,i,s;r=(i=e!=null?e.target.tagName.toLowerCase():void 0)==="input"||i==="textarea";switch(e.which){case 27:s=[];for(n in it){t=it[n];s.push(nt(t))}return s;break;case 37:if(!r){return At()}break;case 39:if(!r){return Lt()}}};Z=function(n,i){var s;if(n==null){n="default"}if(i==null){i=false}if(it[n]){return it[n]}s=e(ht).css("opacity",0).attr("id",""+(o+ft++)).addClass(c).data(P,0).data(H,0).data(k,i).bind(z,Dt).bind(U,_t);e("body").append(s);if(i){s.delegate("."+S,I,At).delegate("."+w,I,Lt).delegate("."+m+", ."+g,I,kt)}else{s.delegate("a",I,nt)}if(ft===2){t.bind(""+I+" "+V,nt);r.bind(W,pt).bind(X,ct).bind(R,lt)}return it[n]=s};return e.fn.smallipop=function(t,n){var r;if(t==null){t={}}if(n==null){n=""}if(typeof t==="string"){switch(t.toLowerCase()){case"show":xt.call(this.first().get(0));break;case"hide":nt(this.first().get(0));break;case"destroy":j(this);break;case"tour":bt(this.first(),n);break;case"update":Et(this.first(),n)}return this}t=e.extend(true,{},Nt.defaults,t);if(!T){t.cssAnimations.enabled=false}r=Z(t.popupId);return this.each(function(){var i,s,u,a,f,c,h,p,d,v,m,g,y,b,w,E;s=e(this);p=s[0].tagName.toLowerCase();w=s.attr("type");m=s.data();f=n||s.attr("title");i=e("> ."+t.infoClass+":first",s);if(i.length){f=i.clone(true,true).removeClass(t.infoClass)}if(f&&!s.hasClass(l)){a=ut++;g={};b=r;y=e.extend(true,{},t);if(typeof m[o]==="object"){e.extend(true,y,m[o])}for(c in m){E=m[c];if(!(c.indexOf(o)>=0)){continue}h=c.replace(o,"");if(h){h=h.substr(0,1).toLowerCase()+h.substr(1);y[h]=E}}u=y.handleInputs&&(p==="input"||p==="select"||p==="textarea");if(y.tourIndex){v=y.tourTitle||"defaultTour";y.hideOnTriggerClick=y.hideOnPopupClick=false;b=Z(v,true);if(!Mt[v]){Mt[v]=[]}Mt[v].push({index:y.tourIndex||0,id:a,trigger:s,popupInstance:b})}else{d=y.touchSupport&&Ct;if(u){y.hideOnTriggerClick=false;g[q]=Dt;g[F]=_t}else if(!d){g[U]=_t}if(y.triggerOnClick||d){g[I]=xt}else{g[I]=_t;g[z]=Dt}}s.addClass(""+l+" "+o+a).attr("title","").data(o,{id:a,hint:f,options:y,tagName:p,type:w,tourTitle:v,popupInstance:b,isFormElement:u}).bind(g);if(!y.hideOnTriggerClick){return s.delegate("a",I,nt)}}})}})})(jQuery);