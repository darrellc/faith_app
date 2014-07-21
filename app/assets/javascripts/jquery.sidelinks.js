(function( $ ){
	$.sideLinks = function( options ) {
		var components = {};
		var settings = $.extend({
	        'scrollSpeed '  : 500
		}, options);
		//Get the height of the document header
		components.headerHeight = $("header").outerHeight(true);
		//Grab all elements with that html attribute data-side-link
		components.links = $("a[data-side-link]");
		//Create the sideLinksToggle button
		components.toggle = $("<a href='#' class='side-links-toggle'><i class='fa fa-bars fa-2x'></i></a>");
		//Create the sideLinksOverlay
		components.overlay = $("<div class='side-links-overlay'></div>");
		//Create the sideLinksContainer
		var html = "";
		html += "<div class='side-links'>";
			html += "<ul class='side-links-list'>";
			for(var i=0;i<components.links.length;i++){		
				html +=	"<li>"+components.links[i].outerHTML+"</li>";
			}
			html += "</ul>";
		html += "</div>";
		components.container = $(html);
		components.links = $(components.container).find("a");
		//Prepend the elements to the DOM
		//Prepend the sideLinksContainer
		$("body").prepend(components.container);
		//Prepend the sideLinksOverlay
		$("body").prepend(components.overlay);
		//Prepend the sideLinksToggle button to the header
		$("header").prepend(components.toggle);
		//Set the height of the sideLinksContainer to the total height of the window - the header height
		$(components.container).height($(window).height()-components.headerHeight).css({"margin-top": components.headerHeight,"left":-$(components.container).outerWidth(true) });
		//Set events
		//When the toggle button is clicked.
		$(components.toggle).on("click", function(e){
			if($(this).hasClass("active")){
				toggleContainer("close");		
			}else{
				toggleContainer("open");
				$(components.container).css({"marginTop":$("header").outerHeight(true)});				
			}
			e.preventDefault();
		});
		//When a side link is clicked
		for(var i=0;i<components.links.length;i++){
			$(components.links[i]).on("click", function(){
				if($(this).attr("href").indexOf("#") === -1) return true;
				//Remove any exsisting active classes
				$(components.links).removeClass("active");
				//Give an active class to the link
				$(this).addClass("active");
				//Close the side bar
				toggleContainer("close");
			});
		}
		//When somewhere other than the container and toggle button is clicked
		$(document).on("mouseup", function(e){
			if(!$(components.container).is(e.target) && $(components.container).has(e.target).length === 0 && !$(components.toggle).is(e.target) && $(components.toggle).has(e.target).length === 0){
				if($(components.container).is(":visible") ){
					toggleContainer("close");	
				}
			}
		});
		//Window Resize - set the height of the side bar
		$(window).on("resize", function(){
			$(components.container).height($(window).height()-components.headerHeight).css({"margin-top": components.headerHeight});
		}); 	
		//Functions
		//Toggle the side bar
		var toggleContainer = function(action){
			switch(action){
				case "open":
					$(components.container).velocity({left: 0},{display: "block"});
					$(components.toggle).addClass("active").children().velocity({"marginLeft":-10});
					$(components.overlay).show();
					break;
				case "close":
					$(components.container).velocity({left: -$(components.container).outerWidth(true)},{display: "none"});
					$(components.overlay).hide();
					$(components.toggle).removeClass("active").children().velocity({"marginLeft":0});
					break;
			}
		};
	};
}(jQuery));


