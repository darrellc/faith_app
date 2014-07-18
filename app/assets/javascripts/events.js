$(function(){
    //When window is resized
    $(window).resize(function(){
        $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
        $("#side-bar-mobile").css("height", $(window).height()-$("header").outerHeight());
        if($(window).width() < 768 ) $("#breadcrumbs").hide();
    });
    
    //The 
    $("body").on("click", "a.home-page-scroll-button", function(e){
    	var id = $(this).attr("href");
    	var offset = 0;
    	if($("#breadcrumbs").is(":visible") || $(window).width() > 768){
    		offset = -$("header").outerHeight(true)+5-$("#breadcrumbs").outerHeight(true);
    	}else{
    		offset = -$("header").outerHeight(true)+5;
    	}
    	$(id).velocity("scroll", {duration: 1000, easing: "easeOutExpo", offset: offset});
    	if($("#side-bar-mobile").is(":visible"))
    		toggleSideBar();
    	e.preventDefault();
    });
    
    $(window).scroll(function(){
		var sT = $(this).scrollTop();
		var con = $("#home-page .connections");
		var px = $(con).offset().top+$(con).outerHeight(true)-$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
		if($(window).width() > 768){
			if(sT > px ){
				if(!$("#breadcrumbs").is(":visible"))
					$("#breadcrumbs").show();
			}else{
				$("#breadcrumbs").hide();
			}
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
    
    $("body").on("click", ".delete-btn", function(e){
		if(!$(this).hasClass("disabled")){
			var dialog = $("#confirmModal");
	    	var button = $(dialog).find(".confirm-button");	    	
		   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
	    	$(button).attr({"href":$(this).attr("data-url")});
	    	//Fill in the information
	    	$(dialog).find(".confirm-type").html($(this).attr("data-type"));
	    	$(dialog).find(".confirm-name").html($(this).attr("data-name"));
	    	//Open the confirm dialog
	    	toggleModal(dialog);
		}
		e.preventDefault();
	});
    
    $("body").on("click", ".action-button",function(){
    	if($(this).attr("data-id") == undefined || $(this).attr("data-id") == "") alert("each action button must have a data-id");
    	if($(this).attr("data-action") == undefined || $(this).attr("data-action") == "") alert("each action button must have a data-action");
    	
    	$dialog = $($(this).attr("data-id"));
    	$dialog.children(".modal-dialog").children("div").hide();
    	var action = $(this).attr("data-action");
    	$dialog.children(".modal-dialog").children("."+action).show();
    });
    
    $("#body").on("click", "tbody tr", function(e){
		if($(this).attr("data-type") == undefined || $(this).attr("data-type") === "") alert("That row needs a data-type");
		if(!$(e.target).hasClass("fa-times") && !$(e.target).hasClass("delete") ){
			$.ajax({
				type: "GET",
				url: "/"+$(this).attr("data-type")+"/"+$(this).attr("data-id")
			});
		}
		e.preventDefault();
    });
    
    $("body").on("click", "a.reveal-action", function(e){
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
    	e.preventDefault();
    });    
    
    $("body").on("click", ".modal-button", function(){
		toggleModal($(this).attr("data-id"));			
    });
    
    $("body").on("click", ".close-velocity-modal", function(){  
    	toggleModal($(this).closest(".velocity-modal"));   	
    });
    
 	$(document).mouseup(function (e){
 		var containers = [".velocity-modal .modal-dialog", "#side-bar-mobile"];
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
						case ".velocity-modal .modal-dialog":
							//Get all velocity modals
							var mods = $(".velocity-modal.open");
							var close;
							for(var i=0;i<mods.length;i++){
								if(close === undefined){
									close = mods[i];
								}
								//get z-index
								closez = $(close).css("z-index");
								modz = $(mods[i]).css("z-index");
								
								//Compare z-index.  If the modz > closez then set close to mods[i]
								if(modz > closez)
									close = mods[i];
							}
							if($(e.target).hasClass("dtpicker-bg") || $("#dtBox").has(e.target).length !== 0) return;
							toggleModal(close);
							break;
					}	
 				}
 				
 			}
 		}
    	e.preventDefault();
	});
	
	$("body").on("click", ".delete-item-btn", function(){
		if(!$(this).hasClass("disabled")){
			var box = $(this).attr("data-box");
			//If no box found then we know that this is a temporary event item
			if(box === undefined)
				$(this).closest(".event-item").velocity("fadeOut").remove();
			else{
				var dialog = $("#confirmModal");
		    	var button = $(dialog).find(".confirm-button");	    	
			   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
		    	$(button).attr({"href":"/events/items/"+$(this).closest(".event-item").attr("data-id")});
		    	//Fill in the information
		    	$(dialog).find(".confirm-type").html($(this).attr("data-type"));
		    	$(dialog).find(".confirm-name").html($(this).attr("data-name"));
		    	//Open the confirm dialog
		    	toggleModal(dialog);
			}
		}
	});	
	
	//Specific Buttons
	$("#itemBox a.action-button").on("click", function(){
		$("#addItemForm input[name=container]").val("#itemBox .item-list");
	});
	$("#templateItemBox a.action-button").on("click", function(){
		$("#addItemForm input[name=container]").val("#templateItemBox .item-list");
	});
	$("#itemShowBox a.action-button").on("click", function(){
		$("#addItemForm input[name=container]").val("#itemShowBox .item-list");
		$("#addItemForm input[name=event_id]").val($(this).closest(".show").attr("data-id"));
	});
	
	$("#addEventForm #event_template_id").on("change", function(){		
		$(this).addClass("disabled");
		$.ajax({
			type: "GET",
			url: "/add_template?template_id=" + $(this).val()
		});
	});
	
});

	
	