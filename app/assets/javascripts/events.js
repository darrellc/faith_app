$(function(){
	///////////////////////////////////////////
	//GLOBAL EVENTS///////////////////////////
	/////////////////////////////////////////
    //When window is resized
    $(window).resize(function(){
        $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
        $(".side-links").css("height", $(window).height()-$("header").outerHeight());
        if($(window).width() < 768 ) $("#breadcrumbs").hide();
        SCROLL_TARGET_OFFSETS = {};
        $(".connections a").each(function(){
			var t = $(this).attr("href");
			if(SCROLL_TARGET_OFFSETS[t] === undefined){
				SCROLL_TARGET_OFFSETS[t] = {fromTop: $(t).offset().top, height: $(t).outerHeight(true)};	
			}		
	    });
    });
    //When the document is clicked
    $(document).mouseup(function (e){
    	var sideBar = $(".side-links,.side-links-toggle"); 			 		
    	if(!$(sideBar).is(e.target) && $(sideBar).has(e.target).length === 0){
			if($(sideBar).is(":visible")){
				toggleSideBar("close");
			}	
		}
 		e.preventDefault();
	});
    //Toggle Sidebar
    $(".side-links-toggle").on("click", function(e){
    	if($(".side-links").is(":visible"))
    		toggleSideBar("close");
		else
			toggleSideBar("open");
		e.preventDefault();
    });
    //Window scrolling 
    $(window).on("scroll", function(e){
    	//Get the offset from the top.  This includes the fixed positioned header and breadcrumbs
    	var offset = 0;
    	if($(this).width() > 768)
			offset = $("header").outerHeight(true) + $("#breadcrumbs").outerHeight(true);
		else
			offset = $("header").outerHeight(true);
    	var sT = $(this).scrollTop();    	
		if(sT > 300 && $(this).width() > 768)
			$("#breadcrumbs").show();
		else
			$("#breadcrumbs").hide();
		var active = undefined;		
		for(var t in SCROLL_TARGET_OFFSETS){
			var tarOffset = SCROLL_TARGET_OFFSETS[t];
			var winTop = sT + offset;
			var fromTopPlusHeight = tarOffset.fromTop+tarOffset.height;
			if(winTop > tarOffset.fromTop-15 && winTop < fromTopPlusHeight+15){
				active = t;
			}
		}
		$("a[data-class]").removeClass("active");
		if(active !== undefined)
			$("a[href='"+active+"']").addClass("active");					
    });
    //Open velocity modal
    $("body").on("click", ".modal-button", function(e){
    	if($(".side-links").is(":visible")) toggleSideBar("close");    	
    	var modal = $(this).attr("data-id");    	
		toggleModal(modal, "open");		
		e.preventDefault();			
    });
    //Close velocity modal
    $("body").on("click", ".close-velocity-modal", function(e){  
    	toggleModal($(this).closest(".velocity-modal"), "close");   	
    	e.preventDefault();
    });
      
  	$("a[data-class]").on("click", function(e){
  		if($(".side-links").is(":visible")) toggleSideBar("close");
    	var dc = $(this).attr("data-class");
    	var target = $(this).attr("href");   	
  		//If the target is visible then we will scroll else we will show.
  		if($(target).is(":visible")){
  			var offset = 0;
	    	if($(window).width() > 768)
	    		offset = $("header").outerHeight(true) + $("#breadcrumbs").outerHeight(true);
			else
				offset = $("header").outerHeight(true);
	    	$(target).velocity("scroll", {duration: 1000, easing: "easeOutExpo", offset: -offset});	
  		}else{
  			$("a[data-class]").removeClass("active");
  			$("a[data-class='"+dc+"']").addClass("active");
  			$(target).show().siblings().hide();  			
  		}  		
  		e.preventDefault();
  	});
    //////////////////////////////////////
    //PORTAL EVENTS//////////////////////
    ////////////////////////////////////
    //When an action button is clicked    
    $("body").on("click", ".action-button",function(e){
    	if($(this).attr("data-id") === undefined || $(this).attr("data-id") == "") alert("each action button must have a data-id");
    	if($(this).attr("data-action") === undefined || $(this).attr("data-action") == "") alert("each action button must have a data-action");
    	if($(this).attr("data-action") === "edit" ) toggleLoader("open");
    	$dialog = $($(this).attr("data-id"));
    	$dialog.children(".modal-dialog").children("div").hide();
    	var action = $(this).attr("data-action");
    	$dialog.children(".modal-dialog").children("."+action).show();
    	e.preventDefault();
    });    
	//When a delete button is clicked    
    $("body").on("click", ".delete-btn", function(e){
    	console.log("DELETE BUTTON CLICKED");
		if(!$(this).hasClass("disabled")){
			var dialog = $("#confirmModal");
	    	var button = $(dialog).find(".confirm-button");	    	
		   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
	    	$(button).attr({"href":$(this).attr("data-url")});
	    	//Fill in the information
	    	$(dialog).find(".confirm-type").html($(this).attr("data-type"));
	    	$(dialog).find(".confirm-name").html($(this).attr("data-name"));
	    	//Open the confirm dialog
	    	toggleModal(dialog, "open");
		}
		e.preventDefault();
	});    
    //When a table row is clicked
    $("#body").on("click", "tbody tr", function(e){
		if($(this).attr("data-type") == undefined || $(this).attr("data-type") === "") alert("That row needs a data-type");
		if(!$(e.target).hasClass("fa") && !$(e.target).hasClass("delete") ){
			toggleLoader("open");
			$.ajax({
				type: "GET",
				url: "/"+$(this).attr("data-type")+"/"+$(this).attr("data-id"),
				dataType: "script",
				success: function(){
					toggleLoader("close");
				}					
			});
		}
		e.preventDefault();
    });
    //When a reveal action button is clicked
    $("body").on("click", "a.reveal-action", function(e){
   	   	var c = $(this).attr("data-id");
    	if($(this).hasClass("active")){
    		$(c).css("overflow","hidden").velocity("slideUp",{display: "none"});
    		$(this).removeClass("active");
    		$(this).children("i").attr("class", "fa fa-chevron-down fl-r");
    	}else{
    		$(c).css("overflow","hidden").velocity("slideDown", {display: "block", complete: function(){ $(c).css("height", "");} });
    		$(this).addClass("active");    		
    		$(this).children("i").attr("class", "fa fa-chevron-up fl-r");
    	}
    	e.preventDefault();
    }); 	
	//When an event item is clicked on
	$("body").on("click", ".delete-item-btn", function(e){
		if(!$(this).hasClass("disabled")){
			var id = $(this).closest(".event-item").attr("data-id");
			//If no box found then we know that this is a temporary event item
			var dialog = $("#confirmModal");
		   	var button = $(dialog).find(".confirm-button");	    	
		   	//Set the url to the href of the confirm button - this will trigger the REST delete call when the button is clicked.
	    	$(button).attr({"href":"/events/items/"+id});
	    	//Fill in the information
	    	$(dialog).find(".confirm-type").html($(this).attr("data-type"));
	    	$(dialog).find(".confirm-name").html($(this).attr("data-name"));
	    	//Open the confirm dialog
	    	toggleModal(dialog, "open");
		}
		e.preventDefault();
	});	
	
	//Show action for event items
	$("body").on("click", "div.event-item", function(e){
		console.log("EVENT ITEM CLICKED");
		if(!$(e.target).hasClass("fa") && !$(e.target).hasClass("delete") ){ 
		//Call an AJAX call. Call the EventItem Index method
			$.ajax({
				type: "GET",
				url: "/get_item?data-id="+id,
				dataType: "script"
			});
		}
		e.preventDefault();
	});
	////////////////////////////////
	//ONE ELEMENT ONLY
	///////////////////////////////
	//When the add item button on the event add box is clicked
	$("#itemBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#itemBox .item-list");
		e.preventDefault();
	});
	//When the add item button on the Event Template add box is clicked
	$("#templateItemBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#templateItemBox .item-list");
		e.preventDefault();
	});
	//When the add item button on the Event Show box is clicked
	$("#itemShowBox a.action-button").on("click", function(e){
		$("#addItemForm input[name=container]").val("#itemShowBox .item-list");
		$("#addItemForm input[name=event_id]").val($(this).closest(".show").attr("data-id"));
		e.preventDefault();
	});
	//When an event template is selected	
	$("#addEventForm #event_template_id").on("change", function(e){		
		$(this).addClass("disabled");
		$.ajax({
			type: "GET",
			url: "/add_template?template_id=" + $(this).val(),
			dataType: "script"
		});
		e.preventDefault();
	});
});

	
	