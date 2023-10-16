let locomotive,scrollTop;
let all_mobile = 768;
setTimeout(function () {AOS.init({scroll: 0, mobile: all_mobile,once: false});},10)
if (document.querySelector('[data-scroll-container]')) {
    locomotive = new LocomotiveScroll({el: document.querySelector('[data-scroll-container]'), smooth: true, lerp: 0.09});
    locomotive.on('scroll', function (position) {
        scrollTop = position.scroll.y;
        AOS.init({scroll: scrollTop, mobile: all_mobile,once: false,});
        scrollTop_start(scrollTop)

        // var length = $('.banner .wrap img').length;
        // var height = document.documentElement.clientHeight
        // for (let i = 1; i <= length; i++) {
        //     var start = (i - 1) * height
        //     var clip = Math.min((scrollTop - start) / height * 100,100)
        //     var img = $('.banner .wrap img:nth-child('+ (i+1) +')')
        //     if (scrollTop >= start) {
        //         img.css({
        //             'clip-path': 'circle('+ clip +'% at 50% 50%)'
        //         })
        //     }else {
        //         img.css({
        //             'clip-path': 'circle(0% at 50% 50%)'
        //         })
        //     }
        // }

    });
}
