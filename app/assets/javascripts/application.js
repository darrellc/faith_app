// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .

$(function(){ 
	$(document).foundation(); 
	$('#kwiks-slideshow').kwicks({
		 maxSize: '60%',
		 behavior: 'menu',
		 autoResize: true,
		 spacing: 0
	});
	
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		var $h = $("header");
		var height = $h.outerHeight();
		if(st === 0)
			$h.removeClass("fxd");
		else{
			if(!$h.hasClass("fxd")){
				$h.hide();
				$h.addClass("fxd");
				$h.toggle("slide", {direction: "up"}, 300);
			}
		}
	});
	
	$("#slideshow").on('expand-complete.kwicks', function(e, data){
		$(data.expanded).children("div").fadeIn(200);		
		var c = $("#middleContainer");		
		if(data.index !== -1){
			$(".slide").fadeOut(100).delay(200);			
			$("#slide"+data.index.toString()).fadeIn(300);
		}
		
	});
	$("#slider").on('expand.kwicks', function(e, data) {
		$(data.oldExpanded).children("div").hide();		
		$(data.collapsed).children("div").hide();	
	});
// 	
	// $("#connect-button").click(function(e){
		// if($(this).attr("data-open") === "false"){
			// $("#login-form").slideDown(300);
			// $(this).animate({"border-bottom-left-radius":0, "border-bottom-right-radius":0, "-webkit-border-bottom-left-radius": 0, "-webkit-border-bottom-right-radius": 0}, 300);
			// //$(this).css({"border-bottom-left-radius":"0px","-webkit-border-bottom-right-radius":"0px"});
			// $(this).attr("data-open", "true");
		// }else{
			// $("#login-form").slideUp(300);
			// $(this).animate({"border-bottom-left-radius":10, "border-bottom-right-radius":10, "-webkit-border-bottom-left-radius": 10, "-webkit-border-bottom-right-radius": 10}, 300);
			// //$(this).css({"border-bottom-left-radius":"10px","-webkit-border-bottom-right-radius":"10px"});
			// $(this).attr("data-open", "false");			
		// }
		// e.preventDefault();
	// });
	
});
