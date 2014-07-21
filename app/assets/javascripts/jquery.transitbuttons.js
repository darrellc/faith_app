(function( $ ){
	$.fn.transitButtons = function( options ) {
		var components = {targets: {} };
		var settings = $.extend({}, $.fn.transitButtons.defaults, options);
		for(var i=0;i<this.length;i++){
			var id = $(this[i]).attr("href");
			components.targets[id] = {html: this[i].outerHTML, offset: $(id).offset().top, width: $(id).outerWidth(true)};
		}
		
		//Create the transitTracks to add to the header.
		components.tracks = $.fn.transitButtons.createTracks(components.targets);
		//Create the transitTop to add to the footer.
		components.topButton = $.fn.transitButtons.createTransitTop();
		//append the transit top button to the body
		$(settings.topContainer).append(components.topButton);
		//Adde the tracks to the header
		$(settings.header).append(components.tracks);
		//Grabs all the data-transit links even the tracks
		components.links = $(this).add($(components.tracks).find("a"));
		//Iterate over every transit button
		for(var link in components.links){
			$(components.links[link]).on("click", function(e){
				//Get the options from the link
				var opt = (($(this).attr("data-options") === undefined )) ? settings.linkOptions : $(this).attr("data-options");
				var linkOptions = {};
				//Get each option in an array
				opt = opt.split(",");		
				for( var o in opt){
					//First entry
					var key = opt[o].split(":")[0];
					//Second entry
					var value = opt[o].split(":")[1];
					linkOptions[key] = value;
				}
				//Remove active class from all links
				$(components.links).removeClass(settings.activeLink);
				//Now we have the id from the link in the href
				//We will make every link with that same href active.
				$("a[href='"+$(this).attr("href")+"']").addClass(settings.activeLink);
				//Do the different DOM manipulations according to the data options
				$.fn.transitButtons.doTransit(this, linkOptions, components, settings);						
				// //Remove all active classes
				// $(allLinks).removeClass("active");
				// //Get class
				// var dc = $(this).attr("data-class");
				// $("a[data-class='"+dc+"']").addClass("active");						
				
				e.preventDefault();
			});
		}
		$.fn.transitButtons.doTransitScroll(components.targets, components, settings);				
		return $(this);
	};
	$.fn.transitButtons.defaults = {
		'scrollSpeed': 500,
		'header': "header",
		'footer': "footer",
		'topContainer': "body",
		'linkOptions' : 'animation:show',
		'activeLink' : 'active',
		'showWidth' : 768,
		'staticHeader': false,
		'tracksOffset' : 0
	};
	
	$.fn.transitButtons.init = function(){
		
	};
	
	$.fn.transitButtons.createTracks = function( tar ){
		var h = "<ul class='transit-tracks'>";
		var count = Object.keys(tar).length;		
		var w = 100/count;
		for(var t in tar){
			h += "<li style='width:"+w+"%;'>"+tar[t].html+"</li>";			
		}
		h += "</ul>";
		return $(h);
	};
	
	$.fn.transitButtons.removeClasses = function( links, c ){
		$(links).removeClass(c);
	}; 
	
	$.fn.transitButtons.doTransit = function(link, options, comp, s){
		switch(options.animation){
			case "scroll":
				//So the scrolling scrolls to the top of the target
				var scrollOffset, headH, tracH = 0;
				//Get the header height
				if(s.staticHeader){
					headH = 0;	
				}else{
					headH = $(s.header).outerHeight(true);
				}
				//Get the tracks height
				var tracH = $(comp.tracks).outerHeight(true);
				//Must make sure when scrolling it will scroll to the top of the target - the scroll offset. 
				scrollOffset = -(headH + tracH);
				//Set it to the settings
				s.scrollOffset = scrollOffset;
				//Scroll using velocity.js				
				$($(link).attr("href")).velocity("scroll", {duration: s.scrollSpeed, easing: "easeOutExpo", offset: scrollOffset});
				break;
			case "show":
				
				break;
			default:
				alert("You must have an option in the transit button");
				break;	
		}
	};
	
	$.fn.transitButtons.createTransitTop = function(){
		//<a href="#home-page .connections" class="pos-a c-dg ta-c button t-5 bg-n r-5 bdrz-50p fs-lg bxsh-l d-n" data-transit data-options="animation:scroll"><i class='fa fa-arrow-up'></i></a> -->
		//Create top button - When clicked will go to the top of the page.
		var b = "<a href='#' class='transitTopButton' ><i class='fa fa-arrow-up'></i></a>";
		return b;
	};
	
	$.fn.transitButtons.doTransitScroll = function( tar, comp, s ){
		$(window).on("scroll", function(){
			//Get the distance from the top of the window in pixels.
			var sT = $(this).scrollTop();
			if(sT > 0) $(comp.topButton).show();
			
			for(var t in tar){
				//The scroll is in between the target div.
				if(sT+s.scrollOffset > tar[t].offset && sT.s.scrollOffset < tar[t].offset + tar[t].width){
					//Make those links active
					$("a[href='"+t+"']").addClass(s.activeLink);
					break;
				}else{
					$(comp.links).removeClass(s.activeLink);		
				}
			} 
		});	
	};
	// switch(options.animation){
					// case "scroll":
						// var st = $(window).scrollTop();
						// if($("#breadcrumbs").is(":visible") || $(window).width() > 768)
							// offset = -$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
						// else
							// offset = -$("header").outerHeight(true);					
						// $(target).
						// break;
					// case "show":
						// //if(!$(this).hasClass("active")){
			    		// //var c = $(this).attr("href")+"-container";
			    		// //$(".side a").removeClass("active");
			    		// //$(".tab-content").children("div").hide();
			    		// //$(c).show();
			    		// //$("a[data-class='" + $(this).attr("data-class") + "']").addClass("active");
			    		// //$("#side-bar").attr("data-class",$(this).attr("data-class"));
			    		// //$(this).addClass("active");	
			    	// //}
// 				    	
			    	// //if($("#side-bar-mobile").is(":visible"))
			    	// //	toggleSideBar();
			    		// //Get the container
			    		// var c = $(this).attr("href")+"-container";
			    		// //Get the data class
			    		// $("#side-bar").attr("data-class", dc);
			    		// $(allLinks).removeClass("active");
			    		// $(c).siblings().hide();
			    		// $(c).show();
			    		// $("a[data-class='"+dc+"']").addClass("active");
						// break;
				// }
				
		
}(jQuery));
		// $(function(){	
			// //Get all the anywhere tabs
			// var tabs = $("a[data-transit]");	
			// for(var i=0;i<tabs.length;i++){		
				// var id = $(tabs[i]).attr("href");
				// setEvents(tabs[i], id, tabs);
			// }	
		// });
// 		
// 		
		// function setEvents(link, target, allLinks){
			// //Get the pixel offset from the top of the current target.
			// if($(target).offset() !== undefined){	
				// SCROLL_PIXEL_OFFSETS[target] = $(target).offset().top+$(target).outerHeight(true)-$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
			// }
			// $(link).on({
				// "click": function(e){
					// var opt = $(this).attr("data-options");
					// var options = {};
					// opt = opt.split(",");
					// for(var j=0;j<opt.length;j++){
						// var o = opt[j].split(":");			
						// options[o[0]] = o[1];
					// }		
					// //Remove all active classes
					// $(allLinks).removeClass("active");
					// //Get class
					// var dc = $(this).attr("data-class");
					// $("a[data-class='"+dc+"']").addClass("active");						
					// switch(options.animation){
						// case "scroll":
							// var st = $(window).scrollTop();
							// if($("#breadcrumbs").is(":visible") || $(window).width() > 768)
								// offset = -$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
							// else
								// offset = -$("header").outerHeight(true);					
							// $(target).velocity("scroll", {duration: 1000, easing: "easeOutExpo", offset: offset});
							// break;
						// case "show":
							// //if(!$(this).hasClass("active")){
				    		// //var c = $(this).attr("href")+"-container";
				    		// //$(".side a").removeClass("active");
				    		// //$(".tab-content").children("div").hide();
				    		// //$(c).show();
				    		// //$("a[data-class='" + $(this).attr("data-class") + "']").addClass("active");
				    		// //$("#side-bar").attr("data-class",$(this).attr("data-class"));
				    		// //$(this).addClass("active");	
				    	// //}
// 				    	
				    	// //if($("#side-bar-mobile").is(":visible"))
				    	// //	toggleSideBar();
				    		// //Get the container
				    		// var c = $(this).attr("href")+"-container";
				    		// //Get the data class
				    		// $("#side-bar").attr("data-class", dc);
				    		// $(allLinks).removeClass("active");
				    		// $(c).siblings().hide();
				    		// $(c).show();
				    		// $("a[data-class='"+dc+"']").addClass("active");
							// break;
					// }
					// e.preventDefault();
				// },
			// });	
		// }
// 		
		// function checkScroll(num){
			// //iterate through offsets
			// //we have to create an offset
			// num = num + $("header").outerHeight(true)+$("#breacrumbs").outerHeight(true)+100;
			// var active = {};
			// var changeActive = false;
			// for(var offset in SCROLL_PIXEL_OFFSETS){
				// var o = SCROLL_PIXEL_OFFSETS[offset];
				// var oHeight = $(offset).outerHeight(); 
				// if(num > o && num < oHeight+o ){
					// changeActive = true;
					// active = $("a[href='"+offset+"']");
					// break;
				// }
			// }
			// if(changeActive){
				// $("a[data-transit]").removeClass("active");
				// $(active).addClass("active");
			// }else{
				// $("a[data-transit]").removeClass("active");
			// }
		// }
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//Get the height of the document header
		//components.headerHeight = $("header").outerHeight(true);
		//Grab all elements with that html attribute data-side-link
		//components.links = $("a[data-side-link]");
		//Create the sideLinksToggle button
		//components.toggle = $("<a href='#' class='side-links-toggle'><i class='fa fa-bars fa-2x'></i></a>");
		//Create the sideLinksOverlay
		//components.overlay = $("<div class='side-links-overlay'></div>");
		//Create the sideLinksContainer
		//var html = "";
		//html += "<div class='side-links'>";
		//	html += "<ul class='side-links-list'>";
		//	for(var i=0;i<components.links.length;i++){		
		//		html +=	"<li>"+components.links[i].outerHTML+"</li>";
		//	}
		//	html += "</ul>";
		//html += "</div>";
		//components.container = $(html);
		//components.links = $(components.container).find("a");
		//Prepend the elements to the DOM
		//Prepend the sideLinksContainer
		//$("body").prepend(components.container);
		//Prepend the sideLinksOverlay
		//$("body").prepend(components.overlay);
		//Prepend the sideLinksToggle button to the header
		//$("header").prepend(components.toggle);
		//Set the height of the sideLinksContainer to the total height of the window - the header height
		//$(components.container).height($(window).height()-components.headerHeight).css({"margin-top": components.headerHeight,"left":-$(components.container).outerWidth(true) });
		//Set events
		//When the toggle button is clicked.
		//$(components.toggle).on("click", function(e){
		//	if($(this).hasClass("active")){
		//		toggleContainer("close");		
		//	}else{
		//		toggleContainer("open");
		//		$(components.container).css({"marginTop":$("header").outerHeight(true)});				
		//	}
		//	e.preventDefault();
		//});
		//When a side link is clicked
		//for(var i=0;i<components.links.length;i++){
		//	$(components.links[i]).on("click", function(){
		//		if($(this).attr("href").indexOf("#") === -1) return true;
		//		//Remove any exsisting active classes
		//		$(components.links).removeClass("active");
		//		//Give an active class to the link
		//		$(this).addClass("active");
		//		//Close the side bar
		//		toggleContainer("close");
		//	});
		//}
		//When somewhere other than the container and toggle button is clicked
		//$(document).on("mouseup", function(e){
		//	if(!$(components.container).is(e.target) && $(components.container).has(e.target).length === 0 && !$(components.toggle).is(e.target) && $(components.toggle).has(e.target).length === 0){
		//		if($(components.container).is(":visible") ){
		//			toggleContainer("close");	
		//		}
		//	}
		//});
		//Window Resize - set the height of the side bar
		//$(window).on("resize", function(){
		//	$(components.container).height($(window).height()-components.headerHeight).css({"margin-top": components.headerHeight});
		//}); 	
		//Functions
		//Toggle the side bar
		//var toggleContainer = function(action){
		//	switch(action){
		//		case "open":
		//			$(components.container).velocity({left: 0},{display: "block"});
		//			$(components.toggle).addClass("active").children().velocity({"marginLeft":-10});
		//			$(components.overlay).show();
		//			break;
		//		case "close":
		//			$(components.container).velocity({left: -$(components.container).outerWidth(true)},{display: "none"});
		///			$(components.overlay).hide();
		//			$(components.toggle).removeClass("active").children().velocity({"marginLeft":0});
		//			break;
		//	}
		//};


