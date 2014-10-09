var app = angular.module('bmi-home', ['ui.bootstrap', 'ngAnimate']);

function NavBarCtrl($scope) {
    $scope.isCollapsed = true;
}

// Revised scroll directive that supports IE8 Offset
// https://gist.github.com/markcoleman/5300596#file-gistfile1-js

app.directive("scroll", function ($window) {
    return function (scope, element, attrs) {

        function getScrollOffsets(w) {

            // Use the specified window or the current window if no argument
            w = w || window;

            // This works for all browsers except IE versions 8 and before
            if (w.pageXOffset != null) return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };

            // For IE (or any browser) in Standards mode
            var d = w.document;
            if (document.compatMode == "CSS1Compat") {
                return {
                    x: d.documentElement.scrollLeft,
                    y: d.documentElement.scrollTop
                };
            }

            // For browsers in Quirks mode
            return {
                x: d.body.scrollLeft,
                y: d.body.scrollTop
            };
        }

        angular.element($window).bind("scroll", function () {
            var offset = getScrollOffsets($window);
            if (offset.y >= 100) {
                scope.bmiChangeClass = true;
            } else {
                scope.bmiChangeClass = false;
            }
            scope.$apply();
        });
    };
})

// Smooth Anchor Scrolling
// http://jsfiddle.net/brettdewoody/y65G5/

var $scope, $location;

app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 60);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

})
  .controller('ScrollCtrl', function($scope, $location, anchorSmoothScroll) {

      $scope.gotoElement = function (eID){



          // call $anchorScroll()
          anchorSmoothScroll.scrollTo(eID);

      };
  });