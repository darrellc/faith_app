$(function(){
    //Initialize foundation
    $(document).foundation(); 
    //Initialize Kwiks Slider
    $('#kwiks-slideshow').kwicks({
        maxSize: '60%',
        behavior: 'menu',
        autoResize: true,
        spacing: 0
    });    
    
    $("#side-bar, #body").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    
    
});

