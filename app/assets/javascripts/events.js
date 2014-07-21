$(function(){
    //When window is resized
    $(window).resize(function(){
        $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
        if($(window).width() < 768 ) $("#breadcrumbs").hide();
    });
    
    $(window).scroll(function(){
    	var sT = $(this).scrollTop();
		var con = $("#home-page .connections");
		var px = $(con).offset().top+$(con).outerHeight(true)-$("header").outerHeight(true)-$("#breadcrumbs").outerHeight(true);
		var px = px-100;
		if(sT !== 0){
			if(!$("#footer a.button").is(":visible") ){
				$("#footer a.button").velocity("fadeIn");	
			}			
		}else{
		 	$("#footer a.button").velocity("fadeOut");
		}
		//Check if scrollTop is lower than any of the scroll buttons
		checkScroll(sT);  
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
    
    $("body").on("click", ".action-button",function(e){
    	if($(this).attr("data-id") == undefined || $(this).attr("data-id") == "") alert("each action button must have a data-id");
    	if($(this).attr("data-action") == undefined || $(this).attr("data-action") == "") alert("each action button must have a data-action");
    	
    	$dialog = $($(this).attr("data-id"));
    	$dialog.children(".modal-dialog").children("div").hide();
    	var action = $(this).attr("data-action");
    	$dialog.children(".modal-dialog").children("."+action).show();
    	e.preventDefault();
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
    
    $("body").on("click", ".modal-button", function(e){
		toggleModal($(this).attr("data-id"));
		e.preventDefault();			
    });
    
    $("body").on("click", ".close-velocity-modal", function(e){  
    	toggleModal($(this).closest(".velocity-modal"));   	
    	e.preventDefault();
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
						case "#side-bar-mobile": toggleSideBar(); break;					
					}	
 				}
 				
 			}
 		}
    	e.preventDefault();
	});
	
	$("body").on("click", ".delete-item-btn", function(e){
		if(!$(this).hasClass("disabled")){
			var id = $(this).attr("data-id");
			//If no box found then we know that this is a temporary event item
			if(id === undefined){
				$(this).closest(".event-item").velocity("fadeOut").remove();
				createAlert({
					type: "success",
					msg: "The item was successfully deleted",
					timeout: 1000
				});
			}else{
				var dialog = $("#confirmModal");
		    	var button = $(dialog).find(".confirm-button");	    	
			   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
		    	$(button).attr({"href":"/events/items/"+id});
		    	//Fill in the information
		    	$(dialog).find(".confirm-type").html($(this).attr("data-type"));
		    	$(dialog).find(".confirm-name").html($(this).attr("data-name"));
		    	//Open the confirm dialog
		    	toggleModal(dialog);
			}
		}
		e.preventDefault();
	});	
	
	//Show action for event items
	$("body").on("click", "div.event-item", function(e){
		console.log("EVENT ITEM CLICKED");
		var id = ($(this).attr("data-id") === undefined) ?  "" : $(this).attr("data-id"); 
		//Call an AJAX call. Call the EventItem Index method
		$.ajax({
			type: "GET",
			url: "/get_item?data-id="+id
		});
		e.preventDefault();
	});
	
	//Specific Buttons
	$("#itemBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#itemBox .item-list");
		e.preventDefault();
	});
	$("#templateItemBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#templateItemBox .item-list");
		e.preventDefault();
	});
	$("#itemShowBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#itemShowBox .item-list");
		$("#addItemForm input[name=event_id]").val($(this).closest(".show").attr("data-id"));
		e.preventDefault();
	});
	
	$("#addEventForm #event_template_id").on("change", function(e){		
		$(this).addClass("disabled");
		$.ajax({
			type: "GET",
			url: "/add_template?template_id=" + $(this).val()
		});
		e.preventDefault();
	});
	
});

	
	