var imagesCount = 600,
	images = [],
	actualCount = 4,
	visibleCount = 576,
	k = 0,
	imageFadeLength = 500,
	imageTimeMultiplier = 30,
	minTimeSeconds = 5,
	minTimeStart = 10000;

for(var i = 0; i < imagesCount; i++) {
	if(k + 1 == actualCount)
		k = 0;
	else
		k++;
	images[i] = "images/image"+  (k + 1) + ".jpg";
}

(function () {
	window.onload = function() {
		var preloadDiv = $("#preload");
		for(var i = 0; i < imagesCount; i++) {
			var $div = $("<div></div>");
			$div.css("background", "url(" + images[i] + ") no-repeat -9999px -9999px");
			preloadDiv.append($div);
			//console.log(div);
		}
	}
}());


(function () {
    var ImageDiv = (function () {
        function ImageDiv(element, settings) {
            this.defaults = {
                
            };
             
            this.$wrapper = $(element);
            this.$img = this.$wrapper.find("img");
            this.options = $.extend(this.defaults, settings);
            //this.random = Math.floor(Math.random() * (1 - minTimeSeconds/10 + 1) + minTimeSeconds/10);
            //this.random = Math.random();
            this.init();
        }

        return ImageDiv;
    }());

    ImageDiv.prototype.init = function () {
    	this.$wrapper.addClass("show");
    	this.switch();
    };

    ImageDiv.prototype.switch = function() {
    	var that = this;

    	setTimeout(function() {
        	that.setImage();
        	that.switch();
        }, Math.random() * 10 * 1000 * imageTimeMultiplier + minTimeStart);
    }

    ImageDiv.prototype.pickImageUrl = function() {
    	return images[Math.floor(Math.random() * (imagesCount))];
    }

    ImageDiv.prototype.setImage = function() {
    	var imageUrl = this.pickImageUrl(),
    		$img = this.$img,
    		$newImg = $("<img/>")
    	$newImg.attr("src", imageUrl);
    	$newImg.css("display", "none");
    	$img.after($newImg);
    	$img.fadeOut(imageFadeLength);
    	$newImg.fadeIn(imageFadeLength, function() {
    		$img.remove();
    	});
    	this.$img = $newImg;
    }

    $.fn.imageDiv = function () {
    	var items = [];

    	for(var i = 0; i < this.length; i++)
        	items[i] =  new ImageDiv($(this[i]), arguments[0]);

        return items;
    };
}());

(function() {
	$(document).ready(function() {
		var $imagesDiv = $("#images");

		for(var i = 0; i < visibleCount; i++) {
			var $img = $("<img/>");
			$img.attr("src", images[i]);
			$imagesDiv.append($img);
			$img.wrap("<div class='item'></div>");
			//$img.addClass("show");
			//$img.fadeOut(0);
			//$img.fadeIn(Math.floor(visibl));
		}

		setTimeout(function() {
			$(".item").imageDiv({});
		}, 0);

		setTimeout(function() {
			$("#label").addClass("show");
		}, 10000);
	})
}());