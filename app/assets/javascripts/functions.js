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
	//Needs to work with multiple open modals
	var open = $(".velocity-modal.open").not(id);		
	var zind = 100;
	//The modal is visible	
	if($(id).is(":visible")){
		zind = parseInt($(id).css("zIndex"));
		$(id).velocity("transition.expandOut", 500).removeClass("open").css({"zIndex": 110});
		if(open.length > 0)
			$("#modal-overlay").css("zIndex", zind - 40);
		else			
			$("#modal-overlay").hide().css({"zIndex": 100});
	//The modal is not visible
	}else{	
		for(var i=0;i<open.length;i++){
			if(zind < $(open[i]).css("z-index"))
				zind = parseInt($(open[i]).css("z-index")) + 20;		
		}
		$(id).css({marginLeft: -$(id).outerWidth()/2, zIndex: zind + 10}).velocity("transition.expandIn", 500).addClass("open");
		$("#modal-overlay").show().css("zIndex", zind);
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
