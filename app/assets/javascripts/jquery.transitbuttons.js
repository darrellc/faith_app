(function( $ ){
	$.fn.transitButtons = function( options ) {
		var components = {targets: {} };
		var settings = $.extend({}, $.fn.transitButtons.defaults, options);
		for(var i=0;i<this.length;i++){
			var id = $(this[i]).attr("href");
			components.targets[id] = {html: this[i].outerHTML, offset: $(id).offset().top, height: $(id).outerHeight(true)};
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
				e.preventDefault();
			});
		}
		$(components.topButton).on("click", function(){
			$(settings.topContainer).velocity("scroll", {duration: settings.scrollSpeed, easing: "easeOutExpo", offset: 0});
		});
		$.fn.transitButtons.checkTransitScroll(components.targets, components, settings);				
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
		'tracksOffset' : 0,
		'scrollPadding': 15
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
				if(!$(link).hasClass(s.activeLink)){
					var con = $(this).attr("href") + "-container";
					$(comp.links).removeClass(s.activeLink);
					$(con).siblings().hide();
					$(con).show();
					$("a[href='"+$(this).attr("href")+"']").addClass(s.activeLink);
					$(link).addClass(s.activeLink);					
				}				
				break;
			default:
				alert("You must have an option in the transit button");
				break;	
		}
	};
	
	$.fn.transitButtons.createTransitTop = function(){
		var b = "<a href='#' class='transitTopButton' ><i class='fa fa-arrow-up'></i></a>";
		return $(b);
	};
	
	$.fn.transitButtons.scrollOffset = function(comp, s){
		//The header is static do not include in scroll offset
		var offset = 0;
		if(s.staticHeader){
			if($(comp.tracks).is(":visible"))
				offset = $(comp.tracks).outerHeight(true);
		}else{
			if($(comp.tracks).is(":visible"))
				offset = $(s.header).outerHeight(true)+$(comp.tracks).outerHeight(true);
			else
				offset = $(s.header).outerHeight(true);
		}
		return offset;
	};
	
	$.fn.transitButtons.checkTransitScroll = function( tar, comp, s ){
		$(window).on("scroll", function(){
			//Get the distance from the top of the window in pixels.
			var sT = $(this).scrollTop();
			if(sT > 0){
				if(!$(comp.topButton).is(":visible"))
				 	$(comp.topButton).velocity("fadeIn");
			 }else{
			 	$(comp.topButton).velocity("fadeOut");
		 	}
			if(sT > s.tracksOffset-$.fn.transitButtons.scrollOffset(comp,s)){
				if(!$(comp.tracks).is(":visible"))
					$(comp.tracks).show();
			}else{
				$(comp.tracks).hide();
			} 
			var active = undefined;
			for(var t in tar){
				var o = tar[t].offset-$.fn.transitButtons.scrollOffset(comp, s);
				if(sT > o-s.scrollPadding && sT < o+tar[t].height+s.scrollPadding)
					active = $("a[href='"+t+"']");
			} 
			if(active !== undefined){
				$(comp.links).removeClass(s.activeLink);
				$(active).addClass(s.activeLink);
			}else{
				$(comp.links).removeClass(s.activeLink);
			}			
		});	
	};	
}(jQuery));