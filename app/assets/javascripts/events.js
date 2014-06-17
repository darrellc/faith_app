$(function(){
    //When window is resized
    $(window).resize(function(){
        $("#side-bar-mobile,#body,#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    });    
    
    //When a slide has been expanded completely
    $("#slideshow").on('expand-complete.kwicks', function(e, data){
        $(data.expanded).children("div").fadeIn(200);		
        var c = $("#middleContainer");		
        if(data.index !== -1){
            $(".slide").fadeOut(100).delay(200);			
            $("#slide"+data.index.toString()).fadeIn(300);
        }
    });    
    //When a slide is being expanded
    $("#slider").on('expand.kwicks', function(e, data) {	
        $(data.oldExpanded).children("div").hide();		
        $(data.collapsed).children("div").hide();
        if(data.index === -1){
            if(!$(".kwicks-selected").children("div").is(":visible"))
                    $(".kwicks-selected").children("div").fadeIn(1000);
            else
                    $(".kwicks-selected").children("div").show();
        }
    });
    
    
    //Top bar 
    //Register button - large screen
    $("#registerLink").on("click", function(e){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $("#registerContainer").fadeOut(300,function(){
                $("#body").show("slide", {direction: "left"}, 400);                    
            });            
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
            $(this).addClass("active");
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
});

	
	