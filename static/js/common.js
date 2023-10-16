setTimeout(function () {
    if (document.querySelector('[data-scroll-container]')) {
        document.querySelector('[data-opacity]').style.opacity = '1'
    }
},30)


var AOS = {
    init: function(e) {
        var allAos = document.querySelectorAll('*[aos]')
        for (let i = 0; i < allAos.length; i++) {
            document.body.clientWidth > e.mobile ? perform() : execution()
            function perform() {
                allAos[i].classList.add('aos-init')
                var offset = (allAos[i].offsetTop + window.pageYOffset) - document.documentElement.clientHeight
                if (offset < e.scroll) {
                    allAos[i].classList.add('aos-animate')
                } else if (e.once !== true){
                    allAos[i].classList.remove('aos-animate')
                }
            }
            function execution() {
                allAos[i].removeAttribute('aos')
                allAos[i].removeAttribute('aos-delay')
            }
        }
    }
}


$('.text_effect').each(function (index,ele) {
    var ly = $(ele).data('delay');
    if (ly === undefined) {
        ly = 20;
    }
    var text = $(ele).find('.appoint').text();
    var html = '';
    for(var i=0;i<text.length;i++){
        html += '<div style="display: inline-block;">'+text[i]+'</div>';
    }
    $(ele).find('.appoint').html('<div class="fist">'+html+'</div> <div class="fist">'+html+'</div>');
    $(ele).find('.fist').each(function (i,e) {
        $(e).find('div').each(function (i,e) {
            var delay = i*ly;
            $(e).css({
                'transition': '900ms cubic-bezier(.19,1,.22,1) '+ delay +'ms'
            })
        })
    })
})

// text_effect2 start
const DOM = {};
DOM.enter = document.querySelectorAll('.text_effect2 .appoint');
for (let i = 0; i < DOM.enter.length; i++) {
    function rgbToHex(rgb) {
        var rgbValues = rgb.match(/\d+/g);
        var hexColor = '#' + rgbValues.map(function (value) {
            var hex = parseInt(value).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
        return hexColor;
    }

    DOM.enter.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';

        for (const char of text) {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            element.appendChild(charSpan);
        }
    });

    DOM.enter[i].addEventListener('mouseenter', function () {
        var span = DOM.enter[i].querySelectorAll('span');
        var data_color = DOM.enter[i].getAttribute('data-color')
        anime.remove(span);
        anime({
            targets: span,
            delay: (t, i) => i * 7,
            translateY: [
                {value: 10, duration: 150, easing: 'easeInQuad'},
                {value: [-10, 0], duration: 150, easing: 'easeOutQuad'}
            ],
            opacity: [
                {value: 0, duration: 150, easing: 'linear'},
                {value: 1, duration: 150, easing: 'linear'}
            ],
            color: {
                value: data_color,
                duration: 1,
                delay: (t, i, l) => i * 7 + 150
            }
        });
    });

    DOM.enter[i].addEventListener('mouseleave', function () {
        var span = DOM.enter[i].querySelectorAll('span');
        var color_ = window.getComputedStyle(DOM.enter[i]).color;
        var hexColor = rgbToHex(color_);
        anime.remove(span);
        anime({
            targets: span,
            delay: (t, i, l) => (l - i - 1) * 7,
            translateY: [
                {value: 10, duration: 150, easing: 'easeInQuad'},
                {value: [-10, 0], duration: 150, easing: 'easeOutQuad'}
            ],
            opacity: [
                {value: 0, duration: 150, easing: 'linear'},
                {value: 1, duration: 150, easing: 'linear'}
            ],
            color: {
                value: hexColor,
                duration: 1,
                delay: (t, i, l) => (l - i - 1) * 7 + 150
            }
        });
    });
}

// text_effect2 end


$('.down_select').each(function(i,e) {
    $(e).find('.pull div').append('<span></span>')
    if ($(e).is('.active')) {
        $(e).find('.pull').prepend('<div class="on">请选择<span></span></div>')
    }
    $(e).click(function (e) {
        $(this).toggleClass('on').siblings().removeClass('on')
        e.stopPropagation()
    })
    $(e).find('.pull div').click(function (e) {
        var text = $(this).text()
        $(this).addClass('on').siblings().removeClass('on')
        $(this).parents('.down_select').find('.txt').text(text)
        $('.down_select').removeClass('on')
        e.stopPropagation()
    })
    $(e).find('.pull div span').css('background-color',$(e).attr('data-color'))
})

$('body').click(function () {
    $('.down_select').removeClass('on')
})

const countItems = document.querySelectorAll('.count-item');
function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const e = entry.target;
            animateCount(e);
            // observer.unobserve(e);
        }
    });
}
const observer = new IntersectionObserver(onIntersection);
countItems.forEach(item => observer.observe(item));
function animateCount(e) {
    var demo = { score: 0 },
        scoreDisplay = e,
        to = e.getAttribute('data-to'),
        speed = e.getAttribute('data-speed') * 1,
        separator = e.getAttribute('data-separator'),
        to_fixed = e.getAttribute('data-fixed');

    if (to !== null) {
        if (to.indexOf('.') !== -1) {
            var automatic = (to.length -1)-to.indexOf('.')
        }
    }
    if (speed === 0) {
        speed = 1;
    }
    TweenLite.to(demo, speed, {
        score: to,
        onUpdate: showScore
    });
    function showScore() {
        if (separator !== null) {
            scoreDisplay.innerHTML = formatNumberWithCommasAndDecimal(demo.score, to_fixed, separator);
        }else if (to_fixed !== null) {
            scoreDisplay.innerHTML = demo.score.toFixed(automatic);
        }else {
            scoreDisplay.innerHTML = demo.score.toFixed(0);
        }
    }
}
function formatNumberWithCommasAndDecimal(number, decimalPlaces,separator) {
    var formattedNumber = number.toFixed(decimalPlaces);
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return formattedNumber;
}


$('video:not(video[muted])').trigger('pause')

function video_alert(e) {
    var alert = $('.alert_video')
    var video = $('.alert_video .joke .video video')
    var controls = $(e).find('video').attr('controls')
    var loop = $(e).find('video').attr('loop')
    $(video).attr('controls',controls)
    $(video).attr('loop',loop)
    $(alert).addClass('video_active')
    $(video).attr('src',$(e).find('video').attr('src'))
    $(video).trigger('play');
    if ($(e).is('.all')) {
        $(alert).addClass('all')
    }else {
        $(alert).removeClass('all')
    }
}

function video_close() {
    $('.alert_video').removeClass('video_active')
    $('.alert_video .joke .video video').trigger('pause');
    $('.alert_video .joke .item').removeClass('item_active')
}

$(document).on('click','.alert_video .joke .close',function () {
    video_close()
})

$(document).on('click','.alert_video .mask',function () {
    video_close()
})

var video_html = '';
video_html+= `<div class="alert_video">
    <div class="joke">
        <div class="video">
            <video src=""></video>
        </div>
        <div class="close">
            <svg t="1676432369827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2743" width="64" height="64">
                <path d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                      p-id="2744"></path>
            </svg>
        </div>
    </div>
    <div class="mask"></div>
</div>`

if ($('*[onclick*="video_alert(this)"] video').length > 0) {
    $('body').append(video_html)
}



var public_text = '';
public_text += `<div class="alert_text animated fadeInUp_">
    <p></p>
</div>`

function alert_text(e) {
    $('html').append(public_text)
    if ($(e).is('.correct')) {
        $('.alert_text').addClass('correct').removeClass('error')
    }else if ($(e).is('.error')) {
        $('.alert_text').addClass('error').removeClass('correct')
    }
    var obj = $(e).find('.txt').text()
    var background = $(e).attr('data-background')
    var color = $(e).attr('data-color')
    if (obj !== '') {
        $('.alert_text p').text(obj)
    }else {
        $('.alert_text p').text(e.text)
        $('.alert_text').addClass(e.class)
    }
    $('.alert_text').each(function (index,ele) {
        var top = index * 60 + 60

        if (obj !== '') {
            $(ele).css({
                'top': top + 'px',
                'background-color': background,
            })
            $(ele).find('p').css({
                'color': color
            })
        }else {
            $(ele).css({
                'top': top + 'px',
                'background-color': e.background,
            })
            $(ele).find('p').css({
                'color': e.color
            })
        }

        setTimeout(function () {
            $(ele).removeClass('fadeInUp_').addClass('fadeOutDown_')
            setTimeout(function () {
                $(ele).remove()
            },800)
        },2000)
    })
    setInterval(function () {
        $('.alert_text').each(function (index,ele) {
            var top = index * 60 + 60
            $(ele).css({
                'top': top + 'px',
            })
        })
    },2800)

}

function GetRequest() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function link_scroll() {
    var anchor = GetRequest().scrollTop;
    if(anchor!==''){
        var ele = document.querySelector('#'+anchor);
        if(ele){
            locomotive.scrollTo(ele.offsetTop);
        }
    }
}

link_scroll()

document.querySelectorAll('[data-wheel]').forEach(function(element) {
    element.addEventListener('wheel', function(e) {
        e.stopPropagation();
    });
});

function scrollTop_start(e) {
    var scrollTop = e;
    $('[data-view]').each(function (index, ele) {
        var overall_height =  document.documentElement.clientHeight;
        var overall_width =  document.documentElement.clientWidth;
        var start = $(ele).parents('section').position().top;
        var distance = $(ele).attr('data-distance')
        var ease = $(ele).attr('data-ease')
        distance = distance === undefined ? 0 : distance
        var unit = $(ele).attr('data-unit')
        if (unit === 'vh') {
            if (distance.includes('-')) {
                distance = - overall_height / 10 * (distance*-1/10)
            }
        }

        var start_distance = start + parseFloat(distance)
        var animate_end = parseFloat($(ele).attr('data-animate'))
        var end = $(ele).parents('section').next().position().top - overall_height
        var end_value = $(ele).parents('section').height() - overall_height
        var distance_end = $(ele).attr('data-distance-end')
        if (distance_end) {
            var vh = overall_height / 10 * (distance_end/10)
            end = end + vh
            end_value = end_value + vh
        }

        var scale = $(ele).attr('data-scale')
        if (scale) {
            var scale_and;
            var scale_start = parseFloat(scale.split(',')[0])
            var scale_end = parseFloat(scale.split(',')[1])
            if (ease === '') {
                scale_and = scale_start + easeOutQuad((scrollTop - start_distance) / animate_end) * ((scale_start - scale_end) * -1)
            }else {
                scale_and = scale_start + (scrollTop - start_distance) / animate_end * ((scale_start - scale_end) * -1)
            }
        }
        scale_start = scale_start === undefined ? 1 : scale_start
        scale_and = scale_and === undefined ?  1 :scale_and
        scale_end = scale_end === undefined ?  1 :scale_end

        var x = $(ele).attr('data-x')
        x = x === undefined ? '0,0' : x
        if (x) {
            var x_and;
            var x_start = parseFloat(x.split(',')[0])
            var x_end = parseFloat(x.split(',')[1])
            if (ease === '') {
                x_and = x_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (x_start * -1)
            }else {
                x_and = x_start + (scrollTop - start_distance) / animate_end * ((x_start - x_end) * -1)
            }
            x_and = x_and ? x_and : 0
        }

        var y = $(ele).attr('data-y')
        y = y === undefined ? '0,0' : y
        if (y) {
            var y_and;
            var y_start = parseFloat(y.split(',')[0])
            var y_end = parseFloat(y.split(',')[1])
            if (ease === '') {
                y_and = y_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (y_start*-1)
            }else {
                y_and = y_start + (scrollTop - start_distance) / animate_end * ((y_start - y_end) *-1)
            }
            y_and = y_and ? y_and : 0
        }

        var opacity = $(ele).attr('data-opacity')
        if (opacity) {
            var opacity_and;
            var opacity_start = parseFloat(opacity.split(',')[0])
            var opacity_end = parseFloat(opacity.split(',')[1])
            if (ease === '') {
                opacity_and = opacity_start + easeOutQuad((scrollTop - start_distance) / animate_end) * (opacity_start*-1)
            }else {
                opacity_and = opacity_start + (scrollTop - start_distance) / animate_end * ((opacity_start - opacity_end) *-1)
            }
            opacity_and = opacity_and ? opacity_and : 1
        }

        if (scrollTop >= start_distance && scrollTop < start_distance + animate_end) {
            $(ele).css({
                'transform': 'translate('+ x_and +'px,'+ y_and +'px) scale('+ scale_and +')',
                'opacity': opacity_and
            })
        }else if (scrollTop < start_distance) {
            $(ele).css({
                'transform': 'translate('+ x_start +'px,'+ y_start +'px) scale('+ scale_start +')',
                'opacity': opacity_start
            })
        }

        if (scrollTop >= start_distance + animate_end) {
            $(ele).css({
                'transform': 'translate('+ x_end +'px,'+ y_end +'px) scale('+ scale_end +')',
                'opacity': opacity_end
            })
        }

        if ($(ele).attr('data-view') === 'auto') {
            if (scrollTop >= start_distance && scrollTop < end) {
                $(ele).css({
                    'transform': 'translate(0px,' + (scrollTop - start_distance) + 'px)'
                })
            }else if (scrollTop < start_distance) {
                $(ele).css({
                    'transform': 'translate(0px,0px)'
                })
            }
            if (scrollTop >= end) {
                $(ele).css({
                    'transform': 'translate(0px,'+ end_value +'px)'
                })
            }
        }
    })
}

function easeOutQuad(t) {
    return t * (2 - t);
}
