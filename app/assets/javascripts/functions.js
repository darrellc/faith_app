/**
 * Creates an alert at the top of the frame. 
 * @param {Object} alertP
 * 	type - success, error, warning, info
 *  msg - The text to be out putted
 *  timeout - The time till the alert fades out.
 */
//Scroll Offsets
var SCROLL_PIXEL_OFFSETS = {};

function createAlert(alertP){
	if(alertP.type === undefined) alert("createAlert - param: 'type' cannot be undefined.");
	if(alertP.msg === undefined) alert("createAlert - param: 'msg' cannot be undefined.");	
	var time = (alertP.timeout === undefined) ? 1000 : alertP.timeout;
	var alert = $("<div />", {"class":"alert-box top "+alertP.type+" radius bxsh-l pos-a z-2000 mt-10 d-n", "html": alertP.msg});
	$(".alert-box.top").remove(); 
	$("body").prepend(alert);
	$(alert).velocity("fadeIn", {duration: 100,complete: function(){
		$(alert).velocity("fadeOut", {delay: time, duration: 100});	
	} });
}

function toggleModal(id){
	//Needs to work with multiple open modals
	var open = $(".velocity-modal.open").not(id);		
	var zind = 100;
	//The modal is visible	
	if($(id).is(":visible")){
		zind = parseInt($(id).css("zIndex"));
		$(id).find(".modal-dialog").velocity("transition.expandOut",{duration: 500, display: "none", complete: function(){
			$(id).removeClass("open").css({"zIndex": 110}).hide();	
		} });		
		if(open.length > 0)
			$("#modal-overlay").css("zIndex", zind - 40);
		else			
			$("#modal-overlay").hide().css({"zIndex": 100});
	//The modal is not visible
	}else{	
		for(var i=0;i<open.length;i++){
			if(zind < $(open[i]).css("z-index"))
				zind = parseInt($(open[i]).css("z-index")) + 20;		
		}
		$(id).show().addClass("open").css({"zIndex": zind + 10});
		$(id).find(".modal-dialog").velocity("transition.expandIn",{duration: 500, display: "block"});
		$(id).children(".modal-dialog").show();
		$("#modal-overlay").show().css("zIndex", zind);
	}
}



$(function(){	
	//Get all the anywhere tabs
	var tabs = $("a[data-transit]");	
	for(var i=0;i<tabs.length;i++){		
		var id = $(tabs[i]).attr("href");
		setEvents(tabs[i], id, tabs);
	}	
});


function setEvents(link, target, allLinks){
	//Get the pixel offset from the top of the current target.
	if($(target).offset() !== undefined){	
		SCROLL_PIXEL_OFFSETS[target] = $(target).offset().top+$(target).outerHeight(true)-$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
	}
	$(link).on({
		"click": function(e){
			var opt = $(this).attr("data-options");
			var options = {};
			opt = opt.split(",");
			for(var j=0;j<opt.length;j++){
				var o = opt[j].split(":");			
				options[o[0]] = o[1];
			}		
			//Remove all active classes
			$(allLinks).removeClass("active");
			//Get class
			var dc = $(this).attr("data-class");
			$("a[data-class='"+dc+"']").addClass("active");						
			switch(options.animation){
				case "scroll":
					var st = $(window).scrollTop();
					if($("#breadcrumbs").is(":visible") || $(window).width() > 768)
						offset = -$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
					else
						offset = -$("header").outerHeight(true);					
					$(target).velocity("scroll", {duration: 1000, easing: "easeOutExpo", offset: offset});
					break;
				case "show":
					//if(!$(this).hasClass("active")){
		    		//var c = $(this).attr("href")+"-container";
		    		//$(".side a").removeClass("active");
		    		//$(".tab-content").children("div").hide();
		    		//$(c).show();
		    		//$("a[data-class='" + $(this).attr("data-class") + "']").addClass("active");
		    		//$("#side-bar").attr("data-class",$(this).attr("data-class"));
		    		//$(this).addClass("active");	
		    	//}
		    	
		    	//if($("#side-bar-mobile").is(":visible"))
		    	//	toggleSideBar();
		    		//Get the container
		    		var c = $(this).attr("href")+"-container";
		    		//Get the data class
		    		$("#side-bar").attr("data-class", dc);
		    		$(allLinks).removeClass("active");
		    		$(c).siblings().hide();
		    		$(c).show();
		    		$("a[data-class='"+dc+"']").addClass("active");
					break;
			}
			e.preventDefault();
		},
	});	
}

function checkScroll(num){
	//iterate through offsets
	//we have to create an offset
	num = num + $("header").outerHeight(true)+$("#breacrumbs").outerHeight(true)+100;
	var active = {};
	var changeActive = false;
	for(var offset in SCROLL_PIXEL_OFFSETS){
		var o = SCROLL_PIXEL_OFFSETS[offset];
		var oHeight = $(offset).outerHeight(); 
		if(num > o && num < oHeight+o ){
			changeActive = true;
			active = $("a[href='"+offset+"']");
			break;
		}
	}
	if(changeActive){
		$("a[data-transit]").removeClass("active");
		$(active).addClass("active");
	}else{
		$("a[data-transit]").removeClass("active");
	}
}

