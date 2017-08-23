/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
/**
 *
 * variables
 *
 */


// 禁止页面滚动
function disableBodyMove() {
  $('body').on('touchmove', function (e) {
    e.preventDefault();
  }); // 禁止页面滚动
}

disableBodyMove();

// 使页面滚动
function enableBodyMove() {
  $('body').off('touchmove'); // 取消禁止页面滚动
}

// alert(window.orientation);
/*=============================================
=            initView            =
=============================================*/
function initViewDom() {
  var DEFAULT_WIDTH = 640, // 页面默认宽度
    ua = navigator.userAgent.toLowerCase(), // 根据user agent的信息获取浏览器信息
    deviceWidth = window.screen.width, // 设备的宽度
    devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素，默认为1
    targetDensitydpi;

    var supportsOrientationChange = (typeof window.orientation == "number" && typeof window.onorientationchange == "object"); 
  
    // var supportsOrientationChange = "onorientationchange" in window;
    var orientationEvent = supportsOrientationChange ? "onorientationchange" : "resize";

    var deviceInfo = 'ua is: ' + ua + ', deviceWidth is: ' + deviceWidth + ', devicePixelRatio is: ' + devicePixelRatio;
    
    console.log(orientationEvent);
    console.log(deviceInfo);

    $(window).on(orientationEvent, function (e) {
      console.log('orientationEvent is: ' + orientationEvent);
      onResize();
    });

    $(window).resize(onResize);
    onResize();

    function onResize() {
      var scale;
      if (window.orientation == 180 || window.orientation == 0) {
        // alert("竖屏");

        var domwidth = document.documentElement.clientWidth;
        var domheight = document.documentElement.clientHeight;
        scale = Math.max(domwidth / 640, domheight / 1138);
        var width = 640 * scale;
        var height = 1138 * scale;
        TweenMax.set($("#minisite"), {
          rotation: 90,
          scaleX: scale,
          scaleY: scale
        });
      }

      if (window.orientation
         == 90 || window.orientation == -90) {
        // alert("横屏");
        var domwidth = document.documentElement.clientWidth;
        var domheight = document.documentElement.clientHeight;
        scale = Math.max(domwidth / 1138, domheight / 640);
        var width = 1138 * scale;
        var height = 640 * scale;
        TweenMax.set($("#minisite"), {
          rotation: 0,
          scaleX: scale,
          scaleY: scale
        });
      }

      $("#log").html("domwidth: " + domwidth + "--domheight: " + domheight + "--scale: " + scale + "--orientationEvent: " + orientationEvent);
      
    }
}

/*
*when DOMContentLoaded, exec initView
*/
(function () {
  var initView = function () {
    initViewDom();
  }
  document.addEventListener("DOMContentLoaded", initView);
})();

/*=====  End of initView  ======*/


/*----------  draggale  ----------*/
var dragDis = 0;
Draggable.create('#drag-layer', {
  type: 'x',
  bounds: document.getElementById('drag-scene'),
  throwProps: false,
  onDrag: function () {
    console.log('x is: ' + this.x);
    dragDis = Math.abs(this.x);
    console.log("dragDis is: " + dragDis);
    updateSceneScroll();
  }
});

function updateSceneScroll() {
  $("#main-scene").scrollLeft(dragDis);
}

