$(function(){
    //Initialize foundation
    $(document).foundation();
    //Initialize date time picker
    $("#dtBox").DateTimePicker({maxTime: "12:59", dateFormat: "MM-dd-yyyy"});
    //Set the sidebars height to the window height minus the height of the header
    $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    $("#side-bar-mobile").css("height", $(window).height()-$("header").outerHeight());    
    
    $.sideLinks(); 
    
    $("a[data-transit]").transitButtons();
     
});

