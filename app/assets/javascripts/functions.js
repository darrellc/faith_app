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
	$(".alert-box.top").remove();
	var time = (alertP.timeout === undefined) ? 2000 : alertP.timeout;
	var alert = $("<div />", {"class":"alert-box top "+alertP.type+" radius bxsh-l pos-a z-500 mt-10", "html": alertP.msg}); 
	$("body").prepend(alert);
	$(alert).delay(time).fadeOut(300);
}

function toggleModal(id){
	//The modal is visible
	if(id === ".velocityModal"){
		var modals = $(".velocity-modal");
		$(".velocity-modal").velocity("transition.expandOut", 500);
		$("#modal-overlay").hide();
		return;
	}
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
