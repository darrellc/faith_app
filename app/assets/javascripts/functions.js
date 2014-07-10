/**
 * Creates an alert at the top of the frame. 
 * @param {Object} alertP
 * 	type - success, error, warning, info
 *  msg - The text to be out putted
 *  timeout - The time till the alert fades out.
 */
function createAlert(alertP){
	if(alertP.type === undefined) alert("createAlert - param: 'type' cannot be undefined.");
	if(alertP.msg === undefined) alert("createAlert - param: 'msg' cannot be undefined.");	
	var time = (alertP.timeout === undefined) ? 5000 : alertP.timeout;
	var alert = $("<div />", {"class":"alert-box top "+alertP.type+" radius bxsh-l pos-a z-2000 mt-10 d-n", "html": alertP.msg}); 
	$("body").prepend(alert);
	$(alert).velocity("transition.slideDownIn", {displayduration: 300,complete: function(){
		$(alert).velocity("transition.slideUpOut", {delay: time, duration: 300, complete: function(){
			$(alert).remove();
		} });	
	} });
}

function toggleModal(id){
	//The modal is visible	
	if($(id).is(":visible")){
		$(id).velocity("transition.expandOut", 500);
		$("#modal-overlay").hide();
	//The modal is not visible
	}else{
		$(id).css({marginLeft: -$(id).outerWidth()/2});
		$(id).velocity("transition.expandIn", 500);
		$("#modal-overlay").show();	
	}
}

function toggleSideBar(){//Mobile
	//side bar mobile
	var s = $("#side-bar-mobile");
	//overlay
	var o = $("#side-bar-overlay");
	//Side bar is open
	if($(s).is(":visible")){
		$("#side-bar-mobile").velocity({left: -200},{display: "none"});
		$("#side-bar-overlay").hide();
		$("#side-bar-button").removeClass("active");
	//Side bar is closed
	}else{
		$("#side-bar-mobile").velocity({left: 0},{display: "block"});
		$("#side-bar-overlay").show();
		$("#side-bar-button").addClass("active");
	}
	
}
