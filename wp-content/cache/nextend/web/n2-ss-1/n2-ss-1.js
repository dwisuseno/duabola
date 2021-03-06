(function ($, scope, undefined) {
    function NextendSmartSliderWidgetArrowImage(id, desktopRatio, tabletRatio, mobileRatio) {
        this.slider = window[id];

        this.slider.started($.proxy(this.start, this, id, desktopRatio, tabletRatio, mobileRatio));
    };

    NextendSmartSliderWidgetArrowImage.prototype.start = function (id, desktopRatio, tabletRatio, mobileRatio) {
        if (this.slider.sliderElement.data('arrow')) {
            return false;
        }
        this.slider.sliderElement.data('arrow', this);

        this.deferred = $.Deferred();

        this.slider.sliderElement
            .on('SliderDevice', $.proxy(this.onDevice, this))
            .trigger('addWidget', this.deferred);

        this.previous = $('#' + id + '-arrow-previous').on('click', $.proxy(function () {
            this.slider.previous();
        }, this));

        this.previousResize = this.previous.find('.n2-resize');
        if (this.previousResize.length == 0) {
            this.previousResize = this.previous;
        }


        this.next = $('#' + id + '-arrow-next').on('click', $.proxy(function () {
            this.slider.next();
        }, this));

        this.nextResize = this.next.find('.n2-resize');
        if (this.nextResize.length == 0) {
            this.nextResize = this.next;
        }

        this.desktopRatio = desktopRatio;
        this.tabletRatio = tabletRatio;
        this.mobileRatio = mobileRatio;

        $.when(this.previous.imagesLoaded(), this.next.imagesLoaded()).always($.proxy(this.loaded, this));
    };

    NextendSmartSliderWidgetArrowImage.prototype.loaded = function () {
        this.previousWidth = this.previousResize.width();
        this.previousHeight = this.previousResize.height();

        this.nextWidth = this.nextResize.width();
        this.nextHeight = this.nextResize.height();
        this.onDevice(null, {device: this.slider.responsive.getDeviceMode()});

        this.deferred.resolve();
    };

    NextendSmartSliderWidgetArrowImage.prototype.onDevice = function (e, device) {
        var ratio = 1;
        switch (device.device) {
            case 'tablet':
                ratio = this.tabletRatio;
                break;
            case 'mobile':
                ratio = this.mobileRatio;
                break;
            default:
                ratio = this.desktopRatio;
        }
        this.previousResize.width(this.previousWidth * ratio);
        this.previousResize.height(this.previousHeight * ratio);
        this.nextResize.width(this.nextWidth * ratio);
        this.nextResize.height(this.nextHeight * ratio);
    };


    scope.NextendSmartSliderWidgetArrowImage = NextendSmartSliderWidgetArrowImage;
})(n2, window);
(function ($, scope, undefined) {
    "use strict";
    function NextendSmartSliderWidgetBarHorizontal(id, bars, parameters) {
        this.slider = window[id];

        this.slider.started($.proxy(this.start, this, id, bars, parameters));
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.start = function (id, bars, parameters) {
        if (this.slider.sliderElement.data('bar')) {
            return false;
        }
        this.slider.sliderElement.data('bar', this);

        this.offset = 0;
        this.tween = null;

        this.originalBars = this.bars = bars;
        this.bar = this.slider.sliderElement.find('.nextend-bar');
        this.innerBar = this.bar.find('> div');

        this.slider.sliderElement.on('slideCountChanged', $.proxy(this.onSlideCountChanged, this));

        if (parameters.animate) {
            this.slider.sliderElement.on('mainAnimationStart', $.proxy(this.onSliderSwitchToAnimateStart, this));
        } else {
            this.slider.sliderElement.on('sliderSwitchTo', $.proxy(this.onSliderSwitchTo, this));
        }

        if (parameters.overlay == 0) {
            var side = false;
            switch (parameters.area) {
                case 1:
                    side = 'Top';
                    break;
                case 12:
                    side = 'Bottom';
                    break;
            }
            if (side) {
                this.offset = parseFloat(this.bar.data('offset'));
                this.slider.responsive.addStaticMargin(side, this);
            }
        }
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.onSliderSwitchTo = function (e, targetSlideIndex) {
        this.innerBar.html(this.bars[targetSlideIndex]);
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.onSliderSwitchToAnimateStart = function () {
        var deferred = $.Deferred();
        this.slider.sliderElement.on('mainAnimationComplete.n2Bar', $.proxy(this.onSliderSwitchToAnimateEnd, this, deferred));
        if (this.tween) {
            this.tween.pause();
        }
        NextendTween.to(this.innerBar, 0.3, {
            opacity: 0,
            onComplete: function () {
                deferred.resolve();
            }
        }).play();
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.onSliderSwitchToAnimateEnd = function (deferred, e, animation, currentSlideIndex, targetSlideIndex) {
        this.slider.sliderElement.off('.n2Bar');
        deferred.done($.proxy(function () {
            var innerBar = this.innerBar.clone();
            this.innerBar.remove();
            this.innerBar = innerBar.css('opacity', 0)
                .html(this.bars[targetSlideIndex])
                .appendTo(this.bar);

            this.tween = NextendTween.to(this.innerBar, 0.3, {
                opacity: 1
            }).play();
        }, this));
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.isVisible = function () {
        return this.bar.is(':visible');
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.getSize = function () {
        return this.bar.height() + this.offset;
    };

    NextendSmartSliderWidgetBarHorizontal.prototype.onSlideCountChanged = function (e, newCount, slidesInGroup) {
        this.bars = [];
        for (var i = 0; i < this.originalBars.length; i++) {
            if (i % slidesInGroup == 0) {
                this.bars.push(this.originalBars[i]);
            }
        }
    };

    scope.NextendSmartSliderWidgetBarHorizontal = NextendSmartSliderWidgetBarHorizontal;
})(n2, window);
(function ($, scope, undefined) {
    "use strict";
    function NextendSmartSliderWidgetThumbnailDefault(id, parameters) {

        this.slider = window[id];

        this.slider.started($.proxy(this.start, this, id, parameters));
    };


    NextendSmartSliderWidgetThumbnailDefault.prototype.start = function (id, parameters) {

        if (this.slider.sliderElement.data('thumbnail')) {
            return false;
        }
        this.slider.sliderElement.data('thumbnail', this);

        this.hidden = false;
        this.forceHidden = false;
        this.forceHiddenCB = null;
        this.group = 2;
        this.itemPerPane = 1;
        this.currentI = 0;
        this.offset = 0;
        this.horizontal = {
            prop: 'width',
            Prop: 'Width',
            sideProp: 'left'
        };
        this.vertical = {
            prop: 'height',
            Prop: 'Height',
            sideProp: 'top'
        };

        this.group = parseInt(parameters.group);
        this.orientation = parameters.orientation;

        this.outerBar = this.slider.sliderElement.find('.nextend-thumbnail-default');
        this.bar = this.outerBar.find('.nextend-thumbnail-inner');
        this.scroller = this.bar.find('.nextend-thumbnail-scroller');

        var event = 'universalclick';
        if (parameters.action == 'mouseenter') {
            event = 'mouseenter';
        }
        this.dots = this.scroller.find('td > div').on(event, $.proxy(this.onDotClick, this));

        this.previous = this.outerBar.find('.nextend-thumbnail-previous').on('click', $.proxy(this.previousPane, this));
        this.next = this.outerBar.find('.nextend-thumbnail-next').on('click', $.proxy(this.nextPane, this));

        if (this.orientation == 'horizontal' && this.group > 1) {
            var dots = [],
                group = this.group;
            this.scroller.find('tr').each(function (i, tr) {
                $(tr).find('td > div').each(function (j, div) {
                    dots[i + j * group] = div;
                });
            });
            this.dots = $(dots);
        }


        this.thumbnailDimension = {
            width: this.dots.outerWidth(true),
            height: this.dots.outerHeight(true)
        };

        this.sideDimension = this.thumbnailDimension[this[this.orientation].prop] * 0.25;

        if (this.orientation == 'horizontal') {
            this.scroller.height(this.thumbnailDimension.height * this.group);
            this.bar.height(this.scroller.outerHeight(true));
        } else {
            this.scroller.width(this.thumbnailDimension.width * this.group);
            this.bar.width(this.scroller.outerWidth(true));
        }
        //this.onSliderResize();

        this.slider.sliderElement
            .on('BeforeVisible', $.proxy(this.onReady, this))
            .on('sliderSwitchTo', $.proxy(this.onSlideSwitch, this));

        if (parameters.overlay == 0) {
            var side = false;
            switch (parameters.area) {
                case 1:
                    side = 'Top';
                    break;
                case 12:
                    side = 'Bottom';
                    break;
                case 5:
                    side = 'Left';
                    break;
                case 8:
                    side = 'Right';
                    break;
            }
            if (side) {
                this.offset = parseFloat(this.outerBar.data('offset'));
                this.slider.responsive.addStaticMargin(side, this);
            }
        }
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.onReady = function () {
        this.slider.sliderElement.on('SliderResize', $.proxy(this.onSliderResize, this));
        this.onSliderResize();
    };


    NextendSmartSliderWidgetThumbnailDefault.prototype.onSliderResize = function () {
        if (this.forceHiddenCB !== null) {
            this.forceHiddenCB.call(this);
        }
        this.adjustScrollerSize();

        this.goToDot(this.dots.index(this.dots.filter('.n2-active')));
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.adjustScrollerSize = function () {
        var prop = this[this.orientation].prop,
            size = Math.ceil(this.dots.length / this.group) * this.thumbnailDimension[prop],
            diff = this.scroller['outer' + this[this.orientation].Prop]() - this.scroller[prop](),
            barDimension = this.slider.dimensions['thumbnail' + prop];
        if (size + diff <= barDimension) {
            this.scroller[prop](barDimension - diff);
        } else {
            this.scroller[prop](size);
        }

    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.onDotClick = function (e) {
        this.slider.directionalChangeToReal(this.dots.index(e.currentTarget));
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.onSlideSwitch = function (e, targetSlideIndex, realTargetSlideIndex) {
        this.dots.filter('.n2-active').removeClass('n2-active');
        this.dots.eq(realTargetSlideIndex).addClass('n2-active');

        this.goToDot(realTargetSlideIndex);

    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.previousPane = function () {
        this.goToDot(this.currentI - this.itemPerPane);
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.nextPane = function () {
        this.goToDot(this.currentI + this.itemPerPane);
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.goToDot = function (i) {
        if (this.forceHidden) {
            return;
        }
        var variables = this[this.orientation];
        var barDimension = this.slider.dimensions['thumbnail' + variables.prop];

        var itemPerPane = (barDimension - this.sideDimension * 2) / this.thumbnailDimension[variables.prop];
        if (barDimension != 0 && itemPerPane < 1) {
            if (!this.hidden) {
                if (this.orientation == 'horizontal') {
                    this.outerBar.css('height', 0);
                } else {
                    this.outerBar.css('width', 0);
                }
                this.hidden = true;
                this.forceHidden = true;
                setTimeout($.proxy(function () {
                    this.forceHiddenCB = function () {
                        this.forceHiddenCB = null;
                        this.forceHidden = false;
                    };
                }, this), 300);
                this.slider.responsive.doNormalizedResize();
            }
        } else if (this.hidden) {
            if (itemPerPane >= 2) {
                this.hidden = false;
                if (this.orientation == 'horizontal') {
                    this.outerBar.css('height', '');
                } else {
                    this.outerBar.css('width', '');
                }
                this.slider.responsive.doNormalizedResize();
            }
        }

        if (!this.hidden) {
            itemPerPane = Math.floor(itemPerPane);
            i = Math.max(0, Math.min(this.dots.length - 1, i));
            var currentPane = Math.floor(i / this.group / itemPerPane),
                to = {};

            var min = -(this.scroller['outer' + variables.Prop]() - barDimension);

            if (currentPane == Math.floor((this.dots.length - 1) / this.group / itemPerPane)) {
                to[variables.sideProp] = -(currentPane * itemPerPane * this.thumbnailDimension[variables.prop]);
                if (currentPane == 0) {
                    this.previous.removeClass('n2-active');
                } else {
                    this.previous.addClass('n2-active');
                }
                this.next.removeClass('n2-active');
            } else if (currentPane > 0) {
                to[variables.sideProp] = -(currentPane * itemPerPane * this.thumbnailDimension[variables.prop] - this.sideDimension);
                this.previous.addClass('n2-active');
                this.next.addClass('n2-active');
            } else {
                to[variables.sideProp] = 0;
                this.previous.removeClass('n2-active');
                this.next.addClass('n2-active');
            }
            if (min >= to[variables.sideProp]) {
                to[variables.sideProp] = min;
                this.next.removeClass('n2-active');
            }
            NextendTween.to(this.scroller, 0.5, to).play();
        }


        this.currentI = i;
        this.itemPerPane = itemPerPane;
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.isVisible = function () {
        return this.outerBar.is(':visible');
    };

    NextendSmartSliderWidgetThumbnailDefault.prototype.getSize = function () {
        if (this.orientation == 'horizontal') {
            return this.outerBar.height() + this.offset;
        }
        return this.outerBar.width() + this.offset;
    };

    scope.NextendSmartSliderWidgetThumbnailDefault = NextendSmartSliderWidgetThumbnailDefault;

})(n2, window);
