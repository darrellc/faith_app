$(function(){
    //When window is resized
    $(window).resize(function(){
        $("#side-bar-mobile,#body,#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    });   
    
    //Top bar 
    //Register button - large screen
    $("#registerLink").on("click", function(e){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $("#registerContainer").fadeOut(300);
            $("#body").show("slide", {direction: "left"}, 400);             
        }else{
            $(this).addClass("active");
            $("#body").hide("slide", {direction: "left"}, 400, function(){
                $("#registerContainer").fadeIn(300);                
            });
        }
        e.preventDefault();		
    });	
    
    //Login button - large screen
    $("#loginLink").click(function(e){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $("#loginForm").slideUp(400);
        }else{
            $(this).addClass("active");
            $("#loginForm").slideDown(400);
        }
        e.preventDefault();
    });
    
    //Side menu 
    $("#side-bar-button").on({
        click: function(e){
            if(!$(this).hasClass("open")){$(this).addClass("open");$("#side-bar-mobile").show("slide", "left",300);}
            else{$(this).removeClass("open");$("#side-bar-mobile").hide("slide", "left",300);}
            $("#side-bar-overlay").fadeToggle(300);
            e.preventDefault();
        }
    });
    
    $("#body .side a").on("click", function(e){
        var c = $(this).attr("href")+"-container";
        if(!$(c).is(":visible")){
            $("#body .side a").removeClass("active");
            $(".tab-content").children("div").hide();
            $(c).show();
            var lis = $("a[data-class='" + $(this).attr("data-class") + "']");
            console.log(lis);            
            $(lis).addClass("active");
            $("#side-bar").attr("data-class",$(this).attr("data-class"));
        }
        //Small screens
        if($("#side-bar-mobile").is(":visible")){
            $("#side-bar-mobile").hide("slide", "left",300);
            $("#side-bar-overlay").fadeToggle();
            $("#side-bar-button").removeClass("open");
        }
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
	    	$dialog.foundation("reveal","open");
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
    
    $("#body").on("click", "tr", function(){
		if($(this).attr("data-type") == undefined || $(this).attr("data-type") === "") alert("That row needs a data-type");
		$.ajax({
			type: "GET",
			url: "/"+$(this).attr("data-type")+"/"+$(this).attr("data-id")
		});
    });
    
    $("body").on("click", "a.reveal-action", function(){
    	var c = $(this).attr("data-id");
    	if($(this).hasClass("active")){
    		$(c).slideUp();
    		$(this).removeClass("active");
    	}else{
    		$(c).slideDown();
    		$(this).addClass("active");    		
    	}
    });
    
    
    
});

	
	