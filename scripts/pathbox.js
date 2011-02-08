/*
 * jQuery "Pathbox" plug-in 0.1
 * Path(http://www.path.com/) style boxes. Idea taken from the iPhone Path app
 *
 * Copyright (c) 2011 Jeremy Woertink
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {
	$.extend($.fn, {
		pathbox: function() {
			var pathbox = $(this);
			// No options being used yet
			var options = arguments[0] || {};
			pathbox.active = (pathbox.length > 0);
			pathbox.log = function(msg) { if('console' in window) window.console.log(msg); }
			pathbox.init = function() {
			  pathbox.each(function(i,e) {
  		    var img_url = $(e).data('image');
  		    if(typeof img_url == 'undefined') {
  		      pathbox.log('box #' + (i + 1) + ' is missing an image');
  		    } else {
  		      $(e).css({'background': 'url('+$(e).data('image')+') no-repeat scroll center center'});
            $(e).addClass('closed');
  		    }
        });
        pathbox.live('click', function() {
          var this_box = $(this);
          var img = new Image();
          img.src = this_box.data('image');
          this_box.image = img;

          if(this_box.hasClass('closed')) {
            pathbox.open(this_box);
          } else {
            pathbox.close(this_box);
          }
        });
			}
			pathbox.open = function(box) {
			  box.animate({
          height: (box.image.height - 10)
        }, 'slow', function() {
          box.children().fadeOut('fast');
          box.removeClass('closed');
          box.addClass('open');
        });
			}
			pathbox.close = function(box) {
			  box.animate({
          height: '50px'
        }, 'slow', function() {
          box.children().fadeIn('fast');
          box.removeClass('open');
          box.addClass('closed');
        });
			}
			if(pathbox.active) {
			  pathbox.init();
			} else {
			  pathbox.log("No pathboxes detected");
			}
		}
	});
})(jQuery);