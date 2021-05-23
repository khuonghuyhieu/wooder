$(document).ready(function () {
    //question
    $(document).on('click', '.accordion', function () {
        $('.accordion').not($(this)).removeClass("active1");
        $(".panel").not($(this).next()).slideUp();
        $(this).next().slideToggle();
        $(this).toggleClass("active1");
    });
    // tab list
    let list = $('.news__list');
    $(document).on('click', '.news__tags-text .tag', function () {
        let index = $(this).index();
        let itemList = list.eq(index);
        $('.tag').removeClass("activebtn");
        $(this).addClass('activebtn');
        list.removeClass('activelist');
        itemList.addClass('activelist');
    });
    // slider flickity
    let $carousel = $('.slider__item-wrap');
    $carousel.flickity({
        //option
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        autoPlay: true,
        on: {
            ready: function () {
                let dotted = $('.flickity-page-dots');
                paging = $('.slider__bottom-paging .dots');
                dotted.appendTo(paging);
            },
            change: function (index) {
                let number = $('.slider__bottom-paging .number');
                let indexPage = index + 1;
                number.text(indexPage.toString().padStart(2, 0));
            }
        }
    });
    let sliderTitle = $('.slider .slider__item-text .title');
    let sliderBtnmain = $('.slider .slider__item-text .btnmain');
    let sliderIndex = $('.slider__item');
    $('.slider__bottom .prev').on('click', function () {
        $carousel.flickity('previous');
    });
    $('.slider__bottom .next').on('click', function () {
        $carousel.flickity('next');
    });
    // slider photo
    let sliderPhoto = $('.photos');
    sliderPhoto.flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        freeScroll: true,
        pageDots: false,
    });
    //video
    let video = $('.video__item-wrap .video__item-img');
    let closeVideo = $('.popup-video .close');
    let popup_video = $('.popup-video');
    let iframe_video = $('.popup-video iframe');
    video.on('click', function (e) {
        e.stopPropagation();
        let video_id = $(this).data('video-id'),
            iframe_src = `https://www.youtube.com/embed/${video_id}?autoplay=1`;
        iframe_video.attr('src', iframe_src);
        popup_video.addClass('active');
    });
    function hideModel() {
        iframe_video.attr('src', '');
        popup_video.removeClass('active');
    }
    closeVideo.on('click', function () {
        hideModel();
    });
    iframe_video.on('click', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', function () {
        hideModel();
    });
    //back to top
    let backtotop = $('.backtop');
    backtotop.on('click', function () {
        window.scroll({
            top: 20,
            behavior: 'smooth'
        });
    });
    let = productsScroll = $('.products').offsetTop;
    console.log(productsScroll);
    $(window).scroll(function () {
        let scroll = window.pageYOffset;
    });






    //libs photoSwipe
    var initPhotoSwipeFromDOM = function (gallerySelector) {
        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                if (figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if (figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML;
                }
                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function (el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if (!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }
                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };
        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};
            if (hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function (index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                },
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            if (fromURL) {
                if (options.galleryPIDs) {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if (isNaN(options.index)) {
                return;
            }
            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };

    initPhotoSwipeFromDOM('.gallery__gird');

});
