var SCROLL_TARGET_OFFSETS = {};
$(function(){
    //Initialize foundation
    $(document).foundation();
    //Initialize date time picker
    $("#dtBox").DateTimePicker({maxTime: "12:59", dateFormat: "MM-dd-yyyy"});
    //Set the sidebars height to the window height minus the height of the header
    $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    $(".side-links").css("height", $(window).height()-$("header").outerHeight());    
    
    $(".connections a").each(function(){
		var t = $(this).attr("href");
		if(SCROLL_TARGET_OFFSETS[t] === undefined){
			SCROLL_TARGET_OFFSETS[t] = {fromTop: $(t).offset().top, height: $(t).outerHeight(true)};	
		}		
    });
    //$.sideLinks(); 
    //$("a[data-transit]").transitButtons({"tracksOffset": $("#home-page .connections").outerHeight(true) - 100});    
    //Canvas Loader
    var cl = new CanvasLoader('middleLoadingSpinner');
	cl.setColor('#333333'); // default is '#000000'
	cl.setDiameter(60); // default is 40
	cl.setDensity(70); // default is 40
	cl.setRange(0.8); // default is 1.3
	cl.setSpeed(1); // default is 2
	cl.setFPS(60); // default is 24
	cl.show(); // Hidden by default
	
});

