/*
 * jQuery SliderTabs v1.1
 * http://lopatin.github.com/sliderTabs
 *
 * Copyright 2012, Alex Lopatin
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

   
    (function(e) {
         "use strict";
        e.sliderTabs = function(t, n) {
            var r = this;
            var i = {autoplay: false, tabArrowWidth: 35, classes: {leftTabArrow: "", panel: "", panelActive: "", panelsContainer: "", rightTabArrow: "", tab: "", tabActive: "", tabsList: ""}, defaultTab: 1, height: null, indicators: false, mousewheel: true, position: "top", panelArrows: false, panelArrowsShowOnHover: false, tabs: true, tabHeight: 30, tabArrows: true, tabSlideLength: 100, tabSlideSpeed: 200, transition: "slide", transitionEasing: "easeOutCubic", transitionSpeed: 500, width: null};
            var s = e(t), o, u, a, f, l, c, h, p, d, v;
            var m = false, g = true;
            var y, b;
            r.selectedTab = i.defaultTab;
            r.init = function() {
                y = r.settings = e.extend({}, i, n);
                s.addClass("ui-slider-tabs");
                a = s.children("div").addClass("ui-slider-tab-content").remove();
                u = s.children("ul").addClass("ui-slider-tabs-list").remove();
                u.children("li").remove().appendTo(u);
                r.count = u.children("li").length;
                l = e("<div class='ui-slider-tabs-list-wrapper'>");
                f = e("<div class='ui-slider-tabs-list-container'>").append(u).appendTo(l);
                f.find("li").css("height", y.tabHeight + 2);
                f.find("li a").css("height", y.tabHeight + 2);
                h = e("<a href='#' class='ui-slider-left-arrow'><div></div></a>").css({width: y.tabArrowWidth, height: y.tabHeight + 2}).appendTo(f).click(function(e) {
                    r.slideTabs("right", y.tabSlideLength);
                    return false
                });
                p = e("<a href='#' class='ui-slider-right-arrow'><div></div></a>").css({width: y.tabArrowWidth, height: y.tabHeight + 2}).appendTo(f).click(function(e) {
                    r.slideTabs("left", y.tabSlideLength);
                    return false
                });
                c = e("<div class='ui-slider-tabs-content-container'>").append(a);
                if (y.position == "bottom")
                    s.append(c).append(l.addClass("bottom"));
                else
                    s.append(l).append(c);
                if (y.width)
                    s.width(parseInt(y.width));
                if (y.height)
                    c.height(parseInt(y.height) - y.tabHeight);
                if (y.indicators)
                    r.showIndicators();
                r.selectTab(y.defaultTab);
                r.slideTabs("left", 0);
                S();
                A();
                s.delegate(".ui-slider-tabs-list li a", "click", function() {
                    if (!e(this).parent().hasClass("selected") && !m) {
                        r.selectTab(e(this).parent())
                    }
                    return false
                });
                if (o)
                    o.delegate(".ui-slider-tabs-indicator", "click", function() {
                        if (!e(this).hasClass("selected") && !m)
                            r.selectTab(e(this).index() + 1)
                    });
                e.each(y.classes, function(e, t) {
                    switch (e) {
                        case"leftTabArrow":
                            h.addClass(t);
                            break;
                        case"rightTabArrow":
                            p.addClass(t);
                            break;
                        case"panel":
                            a.addClass(t);
                            break;
                        case"panelsContainer":
                            c.addClass(t);
                            break;
                        case"tab":
                            u.find("li").addClass(t);
                            break;
                        case"tabsList":
                            u.addClass(t);
                            break;
                        default:
                            break
                        }
                });
                if (y.panelArrows)
                    k();
                if (y.panelArrowsShowOnHover) {
                    if (d)
                        d.addClass("showOnHover");
                    if (v)
                        v.addClass("showOnHover")
                }
                c.resize(k);
                l.resize(function() {
                    L();
                    A()
                });
                setInterval(function() {
                    var e = c.children(".selected");
                    if (e.outerHeight() > c.outerHeight() && g)
                        C(e)
                }, 100);
                L();
                if (!y.tabs)
                    l.hide();
                if (y.autoplay)
                    setInterval(r.next, y.autoplay);
                s.bind("mousewheel", function(e, t, n, i) {
                    if (t > 0)
                        r.next();
                    else if (t < 0)
                        r.prev();
                    return false
                })
            };
            r.selectTab = function(e) {
                g = false;
                var t = typeof e === "number" ? u.children("li:nth-child(" + e + ")") : e;
                var n = t.find("a").attr("href").substr(1);
                var i = c.children("#" + n);
                r.selectedTab = typeof e === "number" ? e : e.index() + 1;
                C(i);
                m = true;
                var s = u.find(".selected").index() < t.index() ? "left" : "right";
                t.siblings().removeClass("selected");
                if (y.classes.tabActive != "")
                    t.siblings().removeClass(y.classes.tabActive);
                t.addClass("selected").addClass(y.classes.tabActive);
                T(c.children(".ui-slider-tab-content:visible"), s);
                N(i);
                E(t);
                w()
            };
            r.next = function() {
                if (!m) {
                    if (r.count === r.selectedTab)
                        r.selectTab(1);
                    else
                        r.selectTab(r.selectedTab + 1)
                }
            };
            r.prev = function() {
                if (!m) {
                    if (r.selectedTab === 1)
                        r.selectTab(r.count);
                    else
                        r.selectTab(r.selectedTab - 1)
                }
            };
            r.slideTabs = function(e, t) {
                var n = parseInt(u.css("margin-left"));
                var r = n;
                h.removeClass("edge");
                p.removeClass("edge");
                if (e == "right")
                    r += t;
                else if (e == "left")
                    r -= t;
                if (r >= 0) {
                    r = 0;
                    h.addClass("edge")
                } else if (r <= b) {
                    r = b;
                    p.addClass("edge")
                }
                u.animate({"margin-left": r}, y.tabSlideSpeed)
            };
            r.showIndicators = function() {
                if (!o) {
                    o = e("<div class='ui-slider-tabs-indicator-container'>");
                    for (var t = 0; t < a.length; t++) {
                        o.append("<div class='ui-slider-tabs-indicator'></div>")
                    }
                    c.append(o)
                } else
                    o.show()
            };
            r.hideIndicators = function() {
                if (o)
                    o.hide()
            };
            r.showTabArrows = function() {
                if (!y.tabArrows)
                    return;
                h.show();
                p.show();
                f.css("margin", "0 " + y.tabArrowWidth + "px")
            };
            r.hideTabArrows = function() {
                h.hide();
                p.hide();
                f.css("margin", "0")
            };
            r.showPanelArrows = function() {
                if (d)
                    d.show();
                if (v)
                    v.show()
            };
            r.hidePanelArrows = function() {
                if (d)
                    d.hide();
                if (v)
                    v.hide()
            };
            var w = function() {
                if (y.indicators && o) {
                    var e = o.children("div:nth-child(" + r.selectedTab + ")");
                    e.siblings().removeClass("selected");
                    e.addClass("selected")
                }
            };
            var E = function(e) {
                var t = e.offset(), n = f.offset(), i = t.left - n.left, s = n.left + f.outerWidth() - (t.left + e.outerWidth());
                if (i < 0)
                    r.slideTabs("right", -i);
                else if (s < 0)
                    r.slideTabs("left", -s)
            };
            var S = function() {
                if (y.transition == "slide")
                    u.children("li").each(function(t, n) {
                        var r = u.children(".selected").index(), i = e(n).index();
                        var s = c.children("#" + e(n).find("a").attr("href").substr(1));
                        if (r < i)
                            s.css({left: c.width() + "px"});
                        else if (r > i)
                            s.css({left: "-" + c.width() + "px"});
                        else
                            s.addClass(y.classes.panelActive)
                    });
                if (y.transition == "fade")
                    u.children("li").each(function(t, n) {
                        var r = u.children(".selected").index(), i = e(n).index();
                        var s = c.children("#" + e(n).find("a").attr("href").substr(1));
                        if (r != i)
                            s.css({opacity: 0});
                        else
                            s.addClass(y.classes.panelActive)
                    })
            };
            var x = function(e) {
                return{hide: {slideleft: {left: "-" + e + "px"}, slideright: {left: e + "px"}, fade: {opacity: 0}}, show: {slide: {left: 0}, fade: {opacity: 1}}}
            };
            var T = function(e, t) {
                if (y.transition == "slide")
                    var n = "slide" + t;
                else
                    var n = y.transition;
                e.animate(x(c.width())["hide"][n], y.transitionSpeed, y.transitionEasing, function() {
                    e.hide();
                    e.removeClass("selected");
                    m = false;
                    S()
                })
            };
            var N = function(e) {
                e.show();
                e.addClass(y.classes.panelActive).addClass("selected");
                e.animate(x(c.width())["show"][y.transition], y.transitionSpeed, y.transitionEasing, function() {
                    m = false;
                    g = true;
                    S()
                })
            };
            var C = function(e) {
                if (!y.height)
                    c.animate({height: O(e)}, 200)
            };
            var k = function() {
                if (y.panelArrows) {
                    if (!d && !v) {
                        d = e("<div class='ui-slider-tabs-leftPanelArrow'>").click(function() {
                            r.prev()
                        });
                        v = e("<div class='ui-slider-tabs-rightPanelArrow'>").click(function() {
                            r.next()
                        });
                        d.appendTo(c);
                        v.appendTo(c)
                    }
                    v.css({top: c.height() / 2 - v.outerHeight() / 2});
                    d.css({top: c.height() / 2 - d.outerHeight() / 2})
                }
            };
            var L = function() {
                var t = 0;
                u.children().each(function(n, r) {
                    t += e(r).outerWidth(true)
                });
                u.width(t);
                if (f.width() < t && y.tabArrows) {
                    r.showTabArrows();
                    b = f.width() - t
                } else
                    r.hideTabArrows()
            };
            var A = function() {
                a.width(c.width() - (a.outerWidth() - a.width()))
            };
            var O = function(e) {
                var t = {display: e.css("display"), left: e.css("left"), position: e.css("position")};
                e.css({display: "normal", left: -5e3, position: "absolute"});
                var n = e.outerHeight();
                e.css(t);
                return n
            };
            r.init()
        };
        e.fn.sliderTabs = function(t) {
            return this.each(function() {
                var n = e(this), r = n.data("sliderTabs");
                if (!r) {
                    r = new e.sliderTabs(this, t);
                    n.data("sliderTabs", r);
                    return r
                }
                if (r.methods[t]) {
                    return r.methods[t].apply(this, Array.prototype.slice.call(arguments, 1))
                }
            })
        }
    })(jQuery);
     jQuery.extend(this.easing, {def: "easeOutQuad", swing: function(e, t, n, r, i) {
            return $.easing[$.easing.def](e, t, n, r, i)
        }, easeInQuad: function(e, t, n, r, i) {
            return r * (t /= i) * t + n
        }, easeOutQuad: function(e, t, n, r, i) {
            return-r * (t /= i) * (t - 2) + n
        }, easeInOutQuad: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1)
                return r / 2 * t * t + n;
            return-r / 2 * (--t * (t - 2) - 1) + n
        }, easeInCubic: function(e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        }, easeOutCubic: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        }, easeInOutCubic: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1)
                return r / 2 * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t + 2) + n
        }, easeInQuart: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        }, easeOutQuart: function(e, t, n, r, i) {
            return-r * ((t = t / i - 1) * t * t * t - 1) + n
        }, easeInOutQuart: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1)
                return r / 2 * t * t * t * t + n;
            return-r / 2 * ((t -= 2) * t * t * t - 2) + n
        }, easeInQuint: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        }, easeOutQuint: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        }, easeInOutQuint: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1)
                return r / 2 * t * t * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        }, easeInSine: function(e, t, n, r, i) {
            return-r * Math.cos(t / i * (Math.PI / 2)) + r + n
        }, easeOutSine: function(e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        }, easeInOutSine: function(e, t, n, r, i) {
            return-r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        }, easeInExpo: function(e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        }, easeOutExpo: function(e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
        }, easeInOutExpo: function(e, t, n, r, i) {
            if (t == 0)
                return n;
            if (t == i)
                return n + r;
            if ((t /= i / 2) < 1)
                return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
            return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        }, easeInCirc: function(e, t, n, r, i) {
            return-r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        }, easeOutCirc: function(e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        }, easeInOutCirc: function(e, t, n, r, i) {
            if ((t /= i / 2) < 1)
                return-r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
            return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        }, easeInElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0)
                return n;
            if ((t /= i) == 1)
                return n + r;
            if (!o)
                o = i * .3;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else
                var s = o / (2 * Math.PI) * Math.asin(r / u);
            return-(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
        }, easeOutElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0)
                return n;
            if ((t /= i) == 1)
                return n + r;
            if (!o)
                o = i * .3;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else
                var s = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
        }, easeInOutElastic: function(e, t, n, r, i) {
            var s = 1.70158;
            var o = 0;
            var u = r;
            if (t == 0)
                return n;
            if ((t /= i / 2) == 2)
                return n + r;
            if (!o)
                o = i * .3 * 1.5;
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else
                var s = o / (2 * Math.PI) * Math.asin(r / u);
            if (t < 1)
                return-.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
            return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
        }, easeInBack: function(e, t, n, r, i, s) {
            if (s == undefined)
                s = 1.70158;
            return r * (t /= i) * t * ((s + 1) * t - s) + n
        }, easeOutBack: function(e, t, n, r, i, s) {
            if (s == undefined)
                s = 1.70158;
            return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
        }, easeInOutBack: function(e, t, n, r, i, s) {
            if (s == undefined)
                s = 1.70158;
            if ((t /= i / 2) < 1)
                return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
            return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
        }, easeInBounce: function(e, t, n, r, i) {
            return r - $.easing.easeOutBounce(e, i - t, 0, r, i) + n
        }, easeOutBounce: function(e, t, n, r, i) {
            if ((t /= i) < 1 / 2.75) {
                return r * 7.5625 * t * t + n
            } else if (t < 2 / 2.75) {
                return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
            } else if (t < 2.5 / 2.75) {
                return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
            } else {
                return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
            }
        }, easeInOutBounce: function(e, t, n, r, i) {
            if (t < i / 2)
                return $.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n;
            return $.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
        }});
    (function(e) {
        "use strict";
        function r(t) {
            var n = t || window.event, r = [].slice.call(arguments, 1), i = 0, s = true, o = 0, u = 0;
            t = e.event.fix(n);
            t.type = "mousewheel";
            if (n.wheelDelta) {
                i = n.wheelDelta / 120
            }
            if (n.detail) {
                i = -n.detail / 3
            }
            u = i;
            if (n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS) {
                u = 0;
                o = -1 * i
            }
            if (n.wheelDeltaY !== undefined) {
                u = n.wheelDeltaY / 120
            }
            if (n.wheelDeltaX !== undefined) {
                o = -1 * n.wheelDeltaX / 120
            }
            r.unshift(t, i, o, u);
            return(e.event.dispatch || e.event.handle).apply(this, r)
        }
        var t = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks) {
            for (var n = t.length; n; ) {
                e.event.fixHooks[t[--n]] = e.event.mouseHooks
            }
        }
        e.event.special.mousewheel = {setup: function() {
                if (this.addEventListener) {
                    for (var e = t.length; e; ) {
                        this.addEventListener(t[--e], r, false)
                    }
                } else {
                    this.onmousewheel = r
                }
            }, teardown: function() {
                if (this.removeEventListener) {
                    for (var e = t.length; e; ) {
                        this.removeEventListener(t[--e], r, false)
                    }
                } else {
                    this.onmousewheel = null
                }
            }};
        e.fn.extend({mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            }, unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }})
    })(jQuery);
    (function(e, t, n) {
        "use strict";
        function c() {
            s = t[o](function() {
                r.each(function() {
                    var t = e(this), n = t.width(), r = t.height(), i = e.data(this, a);
                    if (n !== i.w || r !== i.h) {
                        t.trigger(u, [i.w = n, i.h = r])
                    }
                });
                c()
            }, i[f])
        }
        var r = e([]), i = e.resize = e.extend(e.resize, {}), s, o = "setTimeout", u = "resize", a = u + "-special-event", f = "delay", l = "throttleWindow";
        i[f] = 250;
        i[l] = true;
        e.event.special[u] = {setup: function() {
                if (!i[l] && this[o]) {
                    return false
                }
                var t = e(this);
                r = r.add(t);
                e.data(this, a, {w: t.width(), h: t.height()});
                if (r.length === 1) {
                    c()
                }
            }, teardown: function() {
                if (!i[l] && this[o]) {
                    return false
                }
                var t = e(this);
                r = r.not(t);
                t.removeData(a);
                if (!r.length) {
                    clearTimeout(s)
                }
            }, add: function(t) {
                function s(t, i, s) {
                    var o = e(this), u = e.data(this, a);
                    u.w = i !== n ? i : o.width();
                    u.h = s !== n ? s : o.height();
                    r.apply(this, arguments)
                }
                if (!i[l] && this[o]) {
                    return false
                }
                var r;
                if (e.isFunction(t)) {
                    r = t;
                    return s
                } else {
                    r = t.handler;
                    t.handler = s
                }
            }}
    })(jQuery, this)
