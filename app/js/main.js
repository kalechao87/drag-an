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
    playAN();
  }
});

function updateSceneScroll() {
  $("#main-scene").scrollLeft(dragDis);
}

function playAN() {
  if (dragDis >= 160 && dragDis <= 520 ) {
    console.log('play1');
    scene1AN.seek((dragDis - 160) / (520 - 160) * scene1AN.totalDuration());
  }

  if (dragDis >= 1060 && dragDis <= 1620) {
    console.log("play2");
    scene2AN.seek((dragDis - 1060) / (1620 - 1060) * scene2AN.totalDuration());
  }
}

var scene1AN = new TimelineMax({
  paused: true
});
scene1AN.fromTo('#scene1-ball', 2, {x: 0, y: 0}, {x: 300, y: 400})
.to('#scene1-ball', 2, {x: 600, y: 0});

console.log(scene1AN.totalDuration());

var scene2AN = new TimelineMax({
  paused: true
});
scene2AN
  .fromTo("#scene2-ball", 2, { y: 0 }, { y: -500 });


/*----------  update  ----------*/
var i = 0;
function update() {
  i++;
  console.log(i);
  $('#drag-tip').html(i);
  requestAnimationFrame(update);
}
