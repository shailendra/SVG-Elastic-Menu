function setupElasticMenu() {
   var elasticX = 200;
   var boxWidth = 400;
   var svgBackground = '#00000054';
   //----------------------------------------------------------------
   var svgWidth;
   var svgSquare = $('.svg-square');
   var svgPath = $('.svg-square .square-path');
   var winHeight = 0;
   var elasticObj = { x: 0 };
   var boxObj = { width: 0 };
   function drawSVGPath(elX, boxWidth) {
      // Right side Vertical line
      var pathArr = ['M' + svgWidth, 0];
      pathArr.push('L' + svgWidth, winHeight);

      // Bottom Horizontal line
      pathArr.push('L' + (svgWidth - boxWidth), winHeight);

      // Left Vertical line
      pathArr.push('Q ' + ((svgWidth - boxWidth) + elX), winHeight / 2, (svgWidth - boxWidth), 0);

      // Top Horizontal line
      pathArr.push('L' + (svgWidth), 0);
      //
      //
      svgPath.attr('d', pathArr.join(','));
      //svgPath.attr('d', pathStr);
   }
   //----------------------------------------------------------------
   // On Resize Window
   function onSVGResize() {

      svgWidth = $(window).width();;
      winHeight = $(window).height();
      svgSquare.attr('width', svgWidth);
      svgSquare.attr('height', winHeight);
      drawSVGPath(elasticObj.x, boxObj.width);
   }
   $(window).bind('resize', onSVGResize);
   onSVGResize();
   //----------------------------------------------------------------
   // Open Close Button Event
   $('.openCloseBtn').bind('click', () => {
      var elX;
      var width;
      var background;
      if ($(".openCloseBtn").hasClass("openBtn")) {
         $(".openCloseBtn").removeClass("openBtn");
         $(".openCloseBtn").addClass("closeBtn");
         elX = -elasticX;
         width = boxWidth;
         background = svgBackground;

      } else {
         $(".openCloseBtn").removeClass("closeBtn");
         $(".openCloseBtn").addClass("openBtn");
         elX = elasticX;
         width = 0;
         background = '00000000';
      }
      //----------------------------------------------------------------
      //----------------------------------------------------------------
      if (width < 1) {
         console.log('Start Menu Closed');
      } else {
         console.log('Start Menu Open');
			svgSquare.css({display:'block'});
      }
      //----------------------------------------------------------------
      //----------------------------------------------------------------
      gsap.killTweensOf(svgSquare);
      gsap.to(svgSquare, 0.8, {
         background: background,
         ease: Expo.easeOut
      });
      gsap.killTweensOf(boxObj);
      gsap.to(boxObj, 0.8, {
         width: width, ease: Expo.easeOut
      });
      gsap.killTweensOf(elasticObj);
      gsap.to(elasticObj, 0.3, {
         x: elX, ease: Cubic.easeOut, onUpdate: () => {
            drawSVGPath(elasticObj.x, boxObj.width);
         }, onComplete: () => {
            gsap.to(elasticObj, 1.5, {
               x: 0, ease: "elastic.out(1, 0.3)",
               onUpdate: () => {
                  drawSVGPath(elasticObj.x, boxObj.width);
               },
               onComplete: () => {
                  //----------------------------------------------------------------
                  //----------------------------------------------------------------
                  if (boxObj.width < 1) {
                     console.log('on Menu Closed');
							svgSquare.css({display:'none'});
                  } else {
                     console.log('on Menu Open');
                  }
                  //----------------------------------------------------------------
                  //----------------------------------------------------------------
               }
            });
         }
      });
   });
}
$(document).ready(function () {
   setupElasticMenu();
});
