$(function(){
    //When window is resized
    $(window).resize(function(){
        $("#side-bar-mobile,#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    });
    
    //The 
    $("body").on("click", "a.home-page-scroll-button", function(e){
    	var id = $(this).attr("href");
    	console.log(id);
    	$(id).velocity("scroll", {duration: 1000, easing: "easeOutExpo", offset: -$("header").outerHeight(true)+5-$("#breadcrumbs").outerHeight(true)});
    	if($("#side-bar-mobile").is(":visible"))
    		toggleSideBar();
    	e.preventDefault();
    });
    
    $(window).scroll(function(){
		var sT = $(this).scrollTop();
		var con = $("#home-page .connections");
		var px = $(con).offset().top+$(con).outerHeight(true);
		if(sT > px && !$("#breadcrumbs").is(":visible") ){
			$("#breadcrumbs").velocity("fadeIn");
		}else{
			$("#breadcrumbs").velocity("fadeOut");
		}
    });
    
    //Top bar 
    //Register button - large screen
    $("#registerLink").on("click", function(e){    	
    	if(!$(this).hasClass("active")){
    		$("#body").velocity("transition.slideLeftBigOut", {display: "none",complete: function(){
    			$("#registerContainer").velocity("fadeIn");	
    		} });	
    	}else{
    		$("#registerContainer").velocity("fadeOut", {complete: function(){
    			$("#body").velocity("transition.slideLeftBigIn", {display: "block"});
    		} });    		
    	}
    	$(this).toggleClass("active");
        e.preventDefault();		
    });
        
    ////////////////////////////////////    
    //Side menu 
    $("#side-bar-button").on("click", function(e){
    	toggleSideBar();    	
    	e.preventDefault();   	   	
	});
	//Change the panel
    $(".side a").on("click", function(e){
    	if(!$(this).hasClass("active")){
    		var c = $(this).attr("href")+"-container";
    		$(".side a").removeClass("active");
    		$(".tab-content").children("div").hide();
    		$(c).show();
    		$("a[data-class='" + $(this).attr("data-class") + "']").addClass("active");
    		$("#side-bar").attr("data-class",$(this).attr("data-class"));
    		$(this).addClass("active");	
    	}
    	
    	if($("#side-bar-mobile").is(":visible"))
    		toggleSideBar();
       	e.preventDefault();
    });
    
    $("#body").on("click", ".delete-btn", function(e){
		if(!$(this).hasClass("disabled")){
			var $dialog = $("#confirmDialog");
	    	var $button = $("#confirmDialog").find(".confirm-button");	    	
		   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
	    	$button.attr({"href":$(this).attr("data-url")});
	    	//Fill in the information
	    	$dialog.find(".confirm-type").html($(this).attr("data-type"));
	    	$dialog.find(".confirm-name").html($(this).attr("data-name"));
	    	//Open the confirm dialog
	    	toggleModal($dialog);
		}
		e.preventDefault();
	});
    
    $("body").on("click", ".action-button",function(){
    	if($(this).attr("data-id") == undefined || $(this).attr("data-id") == "") alert("each action button must have a data-id");
    	if($(this).attr("data-action") == undefined || $(this).attr("data-action") == "") alert("each action button must have a data-action");
    	
    	$dialog = $($(this).attr("data-id"));
    	$dialog.children("div").hide();
    	var action = $(this).attr("data-action");
    	$dialog.children("."+action).show();
    });
    
    $("#body").on("click", "tr", function(e){
		if($(this).attr("data-type") == undefined || $(this).attr("data-type") === "") alert("That row needs a data-type");
		if(!$(e.target).hasClass("fa-times")){
			$.ajax({
				type: "GET",
				url: "/"+$(this).attr("data-type")+"/"+$(this).attr("data-id")
			});
		}
		e.preventDefault();
    });
    
    $("body").on("click", "a.reveal-action", function(){
   	   	var c = $(this).attr("data-id");
    	if($(this).hasClass("active")){
    		$(c).css("overflow","hidden").velocity("slideUp");
    		$(this).removeClass("active");
    		$(this).children("i").attr("class", "fa fa-chevron-down fl-r");
    	}else{
    		$(c).css("overflow","hidden").velocity("slideDown");
    		$(this).addClass("active");    		
    		$(this).children("i").attr("class", "fa fa-chevron-up fl-r");
    	}
    });
    
    $("body").on("click", "a.add-action", function(){
    	switch($(this).attr("data-id")){
    		case "item":
    			toggleModal("#itemModal");    			
    			break;
    	}
    	
    });
    
    $("body").on("click", ".modal-button", function(){
		toggleModal($(this).attr("data-id"));			
    });
    
    $("body").on("click", ".close-velocity-modal", function(){  
    	toggleModal($(this).closest(".velocity-modal"));   	
    });
    
 	$(document).mouseup(function (e){
 		var containers = [".velocity-modal", "#side-bar-mobile"];
 		if($(e.target).hasClass("trigger") || $(e.target).parent().hasClass("trigger"))
 			return; 		
 		for(var i=0;i<containers.length;i++){
 			var c = containers[i]; 			
 			if(!$(c).is(e.target) && $(c).has(e.target).length === 0){
 				if($(c).is(":visible")){
 					switch(c){
						case "#side-bar-mobile":
							toggleSideBar();
							break;
					}	
 				}
 				
 			}
 		}
    	e.preventDefault();
	});
	
	$("body").on("click", ".add-action", function(){
		var box = $(this).parent().find($(this).attr("data-box"));
		var count = ($(box).children().length === 0) ? 0 : $(box).children().length;
		switch($(this).attr("data-id")){
			case "item":
				var elem = "<div class='bdb-g bdl-g bdc-ccc bg-ow clearfix ev cur-p'>";
						elem += "<div class='p-5 w-75p fl-l bdc-ccc bdr-g'>Item Name</div>"; 
						elem += "<div class='p-5 w-25p fl-l bdc-ccc bdr-g'>Duration</div>";
				   elem += "</div>";
				$(box).append(elem);
				break;
		}
	});    
});

	
	