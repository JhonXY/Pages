// 点p为鼠标当前的点
// 点A为鼠标上一次的点
// 点B，C为sub子菜单的上边缘和下边缘
/*
向量Vab = Pb -Pa

二维向量叉乘公式：
a(x1,y1) * b(x2,y2) = x1*y2 - x2*y1

用叉乘法判断是否在三角形内
*/

function sameSign(a, b){
    return(a ^ b) >= 0
}

function vector(a, b){
    return{
        x:b.x - a.x,
        y:b.y - a.y
    }
}

function vectorProduct(v1, v2){
    return v1.x * v2.y - v2.x * v1.y
}

function isPointInTrangle(p, a, b, c){
    var pa = vector(p, a)
    var pb = vector(p, b)
    var pc = vector(p, c)

    var t1 = vectorProduct(pa, pb)
    var t2 = vectorProduct(pb, pc)
    var t3 = vectorProduct(pc, pa)

    return sameSign(t1, t2) && sameSign(t2, t3)
}

// 基于用户的行为切换是否延迟操作
function needDelay(elem, leftCorner, currMousePos){
    var offset = elem.offset()

    var topLeft = {
        x:offset.left,
        y:offset.top
    }

    var bottomLeft = {
        x:offset.left,
        y:offset.top + elem.height()
    }

    return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
}


// $(function () {
//   $("ul.service-bd li").mouseover(function () {
//     $(this).addClass("on")
//     $("div.service-float").css("display","block").children().eq(0).css("display","block")
//   }).mouseout(function (){
//     $(this).removeClass("on")
//     $("div.service-float").css("display","none").children().eq(0).css("display","none")
//   })
// })

$(function () {
  var sf = $("div.service-float"),
      activeRow,
      activeMenum,
      timer,
      mouseInsf = false

  sf.mouseenter(function() {
    mouseInsf = true
    // $(this).addClass("on")
    // activeMenum.css("display","block").children().eq(0).css("display","block")
  }).mouseleave(function() {
    mouseInsf = false
  });

  var mouseTrack = []

  var moveHandler = function(e){
        mouseTrack.push({
            // 获取当前鼠标相对页面的坐标
            x:e.pageX,
            y:e.pageY
        })

        // 只需要当前位置和前一个位置所以多余的弹出
        if(mouseTrack, length > 3){
            mouseTrack.shift()
        }
  }

  $('#sub')
        .on('mouseover', function(e) {
            sf.css("display","block")
            $(document).on('mousemove', moveHandler)
        })
        .on('mouseout', function(e) {
            // 鼠标离开消失
            sf.css("display","none")

            if (activeRow){
                // 有存在激活样式的行去掉样式，变量置空
                activeRow.removeClass('on')
                activeRow = null
            }

            if(activeMenu){
                // 对应二级菜单内的项目操作一样
                activeMenu.css("display","none")
                activeMenu = null
            }

            // 事件解绑，以防影响到其他组件的生效
            $(document).off('mousemove', moveHandler)
        })
  $('ul.service-bd').on('mouseenter', 'li', function (e) {
          if (!activeRow) {
            activeRow = $(e.currentTarget)
            activeRow.addClass('on')

            // 这里因为只有一个，之后统一改
            activeMenu = sf.children().eq(0)
            activeMenu.css("display","block")
            return
          }

          if (timer) {
            clearTimeout(timer)
          }

          // var currMousePos = mouseTrack[mouseTrack.length - 1]
          //   // 鼠标上一次的位置
          // var leftCorner = mouseTrack[mouseTrack.length - 2]
          //   // 判断是否需要延时，引用needDelay函数
          // var delay = needDelay(sf, leftCorner, currMousePos)

          // if (delay) {
            timer = setTimeout(function () {
              if ( mouseInsf ) {
                return
              }

              activeRow.removeClass('on')
              activeMenu.css("display","none")

              activeRow = $(e.currentTarget)
              activeRow.addClass('on')

              // 这里因为只有一个，之后统一改
              activeMenu = sf.children().eq(0)
              activeMenu.css("display","block")
            }, 3000)
          // } else {
          //   var preActiveRow = activeRow
          //   var preActiveMenu = activeMenu
          //   // 移除上一次的二级菜单
          //   preActiveRow.removeClass('on')
          //   preActiveMenu.css("display","none")
          //
          //   activeRow = $(e.currentTarget)
          //   activeMenu = sf.children().eq(0)
          //   // 添加当前的
          //   activeRow.addClass('on')
          //   activeMenu.css("display","block")
          // }
        })
})
