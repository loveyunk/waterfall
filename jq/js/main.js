function waterfall() {
    var $boxs = $('#main > div');
    var w = $boxs.eq(0).outerWidth();
    var clos = Math.floor($(window).width() / w);
    $('#main').width(w * clos).css('margin', '0 auto');
    var hArr = [];
    $boxs.each(function (index, value) {
        var h = $boxs.eq(index).outerHeight();
        if (index < clos) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            });
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    });
}

function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis < scrollTop + documentH) ? true : false;
}

$(window).on('load', function () {
    waterfall();
    $(window).on('scroll', function () {
        var dataInt = {'data': [{'src': '1.png'}, {'src': '2.png'}, {'src': '3.png'}, {'src': '4.png'}, {'src': '5.png'}, {'src': '6.png'}, {'src': '7.png'}, {'src': '8.png'}, {'src': '9.png'}, {'src': '10.png'}]};
        if (checkScrollSlide()) {
            $.each(dataInt.data, function (key, value) {
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src', 'img/' + $(value).attr('src')).appendTo(oPic);
            });
            waterfall();
        }
    });
});

