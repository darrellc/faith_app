$(function(){
    //Initialize foundation
    $(document).foundation();
    //Initialize date time picker
    $("#dtBox").DateTimePicker({dateTimeFormat: "MM-dd-yyyy HH:mm:ss AA"});
    //Set the sidebars height to the window height minus the height of the header
    $("#side-bar").css("height", $(window).height()-$("header").outerHeight()-$("#footer").outerHeight());
    $("#side-bar-mobile").css("height", $(window).height()-$("header").outerHeight());       
});

