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
		console.log("Expanded");
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
		if(data.index === -1){
			if(!$(".kwicks-selected").children("div").is(":visible"))
				$(".kwicks-selected").children("div").fadeIn(1000);
			else
				$(".kwicks-selected").children("div").show();
		}
	});
	$("#registerLink").on("click", function(e){
		if($(this).hasClass("active")){$(this).removeClass("active");$("#footer").hide("slide", {direction: "down"}, 300,function(){$(this).removeClass("fxd-bottom");$("#registerContainer").fadeOut(300,function(){$("#body").show("slide", {direction: "left"}, 400);});});}
		else{$(this).addClass("active");$("#footer").hide().addClass("fxd-bottom");$("#body").hide("slide", {direction: "left"}, 400, function(){$("#footer").show("slide", {direction: "down"}, 300,function(){$("#registerContainer").fadeIn(300);});});}
		e.preventDefault();		
	});	
	$("#loginLink").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$("#loginForm").slideUp(400);
		}else{
			$(this).addClass("active");
			$("#loginForm").slideDown(400);
		}
	});
	
	
	$("#registerForm").validate({
		rules: {
			"user[first_name]":"required",
			"user[last_name]":"required",
			"user[username]":"required",
			"user[email]":{required: true,email: true},
			"user[password]":{required: true, minlength:8},
			"user[password_confirmation]":{required:true,equalTo: "#user_password_confirmation"}
		}
	});
});
