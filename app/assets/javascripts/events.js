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

	
	