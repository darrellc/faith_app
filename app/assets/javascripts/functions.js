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
	var time = (alertP.timeout === undefined) ? 1000 : alertP.timeout;
	var alert = $("<div />", {"class":"alert-box top "+alertP.type+" radius bxsh-l pos-a z-2000 mt-10 d-n", "html": alertP.msg});
	$(".alert-box.top").remove(); 
	$("body").prepend(alert);
	$(alert).velocity("fadeIn", {duration: 100,complete: function(){
		$(alert).velocity("fadeOut", {delay: time, duration: 100});	
	} });
}

function toggleModal(id){
	//Needs to work with multiple open modals
	var open = $(".velocity-modal.open").not(id);		
	var zind = 100;
	//The modal is visible	
	if($(id).is(":visible")){
		zind = parseInt($(id).css("zIndex"));
		$(id).find(".modal-dialog").velocity("transition.expandOut",{duration: 500, display: "none", complete: function(){
			$(id).removeClass("open").css({"zIndex": 110}).hide();	
		} });		
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
		$(id).show().addClass("open").css({"zIndex": zind + 10});
		$(id).find(".modal-dialog").velocity("transition.expandIn",{duration: 500, display: "block"});
		$(id).children(".modal-dialog").show();
		$("#modal-overlay").show().css("zIndex", zind);
	}
}